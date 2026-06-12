/**
 * Notes UI state:
 * - Read: localStorage (per user bucket) — unchanged.
 * - Flag + journal + feedback presence: Laravel API (`synapse_2025` routes) + reactive in-memory cache.
 */

import Vue from 'vue';
import { get, byMethod } from './api';

function userKey(store) {
  try {
    const u = store && store.getters && store.getters.user;
    if (u && u.id != null) return String(u.id);
  } catch (e) {
    /* ignore */
  }
  try {
    const raw = localStorage.getItem('vuex');
    if (raw) {
      const j = JSON.parse(raw);
      const id = j && j.user && j.user.id;
      if (id != null) return String(id);
    }
  } catch (e) {
    /* ignore */
  }
  return 'anon';
}

function storageKey(store) {
  return `notesUserPrefs_${userKey(store)}`;
}

function loadPrefs(store) {
  try {
    const raw = localStorage.getItem(storageKey(store));
    if (!raw) return { read: {} };
    const j = JSON.parse(raw);
    return {
      read: j.read || {},
    };
  } catch (e) {
    return { read: {} };
  }
}

function savePrefs(store, prefs) {
  try {
    localStorage.setItem(storageKey(store), JSON.stringify({ read: prefs.read || {} }));
  } catch (e) {
    /* ignore */
  }
}

export function recordKey(type, id) {
  return `${type}:${String(id)}`;
}

/** Reactive cache for flags + journal + feedback presence (Vue 2 reactivity). */
export const noteUserApiCache = Vue.observable({
  version: 0,
  flagMap: {},
  journalNonemptyMap: {},
  feedbackNonemptyMap: {},
});

const journalHtmlByKey = {};
let hydrateInFlight = null;

function bumpApiVersion() {
  noteUserApiCache.version += 1;
}

export function hydrateNoteUserState() {
  if (hydrateInFlight) return hydrateInFlight;
  hydrateInFlight = get('/note-user-state')
    .then((res) => {
      const nextFlags = {};
      (res.data?.data?.flags || []).forEach((k) => {
        nextFlags[k] = true;
      });
      const nextJ = {};
      (res.data?.data?.journal_nonempty || []).forEach((k) => {
        nextJ[k] = true;
      });
      const nextFb = {};
      (res.data?.data?.feedback_nonempty || []).forEach((k) => {
        nextFb[k] = true;
      });
      noteUserApiCache.flagMap = nextFlags;
      noteUserApiCache.journalNonemptyMap = nextJ;
      noteUserApiCache.feedbackNonemptyMap = nextFb;
      bumpApiVersion();
    })
    .catch(() => {
      /* offline / 401 — leave cache */
    })
    .finally(() => {
      hydrateInFlight = null;
    });
  return hydrateInFlight;
}

export function applyFlagToCache(type, id, flagged) {
  const k = recordKey(type === 'subnotes' ? 'subnotes' : 'notes', id);
  if (flagged) Vue.set(noteUserApiCache.flagMap, k, true);
  else Vue.delete(noteUserApiCache.flagMap, k);
  bumpApiVersion();
}

export function applyJournalNonemptyToCache(type, id, hasContent) {
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const k = recordKey(t, id);
  if (hasContent) Vue.set(noteUserApiCache.journalNonemptyMap, k, true);
  else Vue.delete(noteUserApiCache.journalNonemptyMap, k);
  bumpApiVersion();
}

export function applyFeedbackToCache(type, id, hasFeedback) {
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const k = recordKey(t, id);
  if (hasFeedback) Vue.set(noteUserApiCache.feedbackNonemptyMap, k, true);
  else Vue.delete(noteUserApiCache.feedbackNonemptyMap, k);
  bumpApiVersion();
}

/** notes | subnotes */
export function markNoteVisitedAsRead(store, noteId, recordType) {
  if (noteId == null || noteId === '') return;
  const type = recordType === 'subnotes' ? 'subnotes' : 'notes';
  const prefs = loadPrefs(store);
  prefs.read[recordKey(type, noteId)] = true;
  savePrefs(store, prefs);
}

/** Clear read state for a note or subnote (toolbar "unread"). */
export function markNoteUnread(store, noteId, recordType) {
  if (noteId == null || noteId === '') return;
  const type = recordType === 'subnotes' ? 'subnotes' : 'notes';
  const prefs = loadPrefs(store);
  delete prefs.read[recordKey(type, noteId)];
  savePrefs(store, prefs);
}

export function isRecordRead(store, type, id) {
  if (id == null) return false;
  const prefs = loadPrefs(store);
  return !!prefs.read[recordKey(type, id)];
}

export async function toggleRecordFlag(store, type, id) {
  if (id == null) return false;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const res = await byMethod('post', '/note-flag-toggle', { id, type: t });
  const flagged = !!res.data?.data?.flagged;
  applyFlagToCache(t, id, flagged);
  return flagged;
}

export function isRecordFlagged(store, type, id) {
  void noteUserApiCache.version;
  if (id == null) return false;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  return !!noteUserApiCache.flagMap[recordKey(t, id)];
}

export async function fetchJournalHtml(store, type, id) {
  if (id == null) return '';
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const k = recordKey(t, id);
  if (Object.prototype.hasOwnProperty.call(journalHtmlByKey, k)) {
    return journalHtmlByKey[k];
  }
  const res = await get('/note-journal', { id, type: t });
  const html = res.data?.data?.html ?? '';
  journalHtmlByKey[k] = html;
  return html;
}

export async function saveJournalHtml(store, type, id, html) {
  if (id == null) return;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const k = recordKey(t, id);
  await byMethod('post', '/note-journal', { id, type: t, html });
  journalHtmlByKey[k] = html;
  const plain = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  applyJournalNonemptyToCache(t, id, plain.length > 0);
}

/** Sync read of cached journal HTML (use after fetchJournalHtml). */
export function getJournalHtmlFromCache(store, type, id) {
  if (id == null) return '';
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const k = recordKey(t, id);
  return journalHtmlByKey[k] != null ? journalHtmlByKey[k] : '';
}

export function journalHasContent(store, type, id) {
  void noteUserApiCache.version;
  if (id == null) return false;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  return !!noteUserApiCache.journalNonemptyMap[recordKey(t, id)];
}

export function feedbackHasContent(store, type, id) {
  void noteUserApiCache.version;
  if (id == null) return false;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  return !!noteUserApiCache.feedbackNonemptyMap[recordKey(t, id)];
}

export async function fetchFlagged(store, type, id) {
  if (id == null) return false;
  const t = type === 'subnotes' ? 'subnotes' : 'notes';
  const res = await get('/note-flagged', { id, type: t });
  const flagged = !!res.data?.data?.flagged;
  applyFlagToCache(t, id, flagged);
  return flagged;
}

/** All navigable leaves under a chapter (for read / flag aggregation) */
export function chapterDescendantRecords(chapter) {
  const list = [];
  if (!chapter || !chapter.children || !chapter.children.length) return list;
  for (const note of chapter.children) {
    if (note.children && note.children.length) {
      for (const sub of note.children) {
        if (sub.id != null) list.push({ type: 'subnotes', id: sub.id });
      }
    } else if (note.id != null) {
      list.push({ type: 'notes', id: note.id });
    }
  }
  return list;
}

export function chapterAllRead(store, chapter) {
  const leaves = chapterDescendantRecords(chapter);
  if (!leaves.length) return false;
  return leaves.every((r) => isRecordRead(store, r.type, r.id));
}

export function chapterAnyFlagged(store, chapter) {
  const leaves = chapterDescendantRecords(chapter);
  return leaves.some((r) => isRecordFlagged(store, r.type, r.id));
}

/** All navigable note/subnote leaves across multiple chapter trees */
export function allLeavesFromChapters(chapters) {
  if (!Array.isArray(chapters)) return [];
  const list = [];
  for (const chapter of chapters) {
    list.push(...chapterDescendantRecords(chapter));
  }
  return list;
}

/** Read progress for sidebar: count of marked-read leaves vs total leaves */
export function notesProgressStats(store, chapters) {
  const leaves = allLeavesFromChapters(chapters);
  const total = leaves.length;
  if (!total) return { read: 0, total: 0, percent: 0 };
  const read = leaves.filter((r) => isRecordRead(store, r.type, r.id)).length;
  return {
    read,
    total,
    percent: Math.round((read / total) * 100),
  };
}

/** Note row: leaf note, or parent of subnotes — read aggregate */
export function noteReadAggregate(store, note) {
  if (!note) return false;
  if (note.children && note.children.length) {
    return note.children.every((sub) => sub.id != null && isRecordRead(store, 'subnotes', sub.id));
  }
  return isRecordRead(store, 'notes', note.id);
}

export function noteAnyFlagged(store, note) {
  if (!note) return false;
  if (isRecordFlagged(store, 'notes', note.id)) return true;
  if (note.children && note.children.length) {
    return note.children.some((sub) => isRecordFlagged(store, 'subnotes', sub.id));
  }
  return false;
}
