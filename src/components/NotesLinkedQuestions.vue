<template>
  <div class="nlq-sec">
    <!-- Accordion tab strip -->
    <div class="nlq-tabs">
      <div
        v-for="(tab, i) in visibleTabs"
        :key="tab.key"
        class="nlq-tab"
        @click="toggle(i)"
      >
        <div
          class="nlq-tab-header"
          :style="{ background: activeIndex === i ? tab.activeColor : '#A7A9AC' }"
        >
          <h4>{{ tab.label }}</h4>
          <div class="nlq-tab-icon">
            <svg v-if="activeIndex === i" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
              <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Sliding content panel -->
    <transition name="nlq-slide">
      <div
        v-if="activeIndex !== null"
        class="nlq-panel"
        :style="{
          borderColor: tabColor(activeTabKey),
          borderTopColor: tabColor(activeTabKey),
        }"
      >
        <!-- ── Questions tab ── -->
        <div v-if="activeTabKey === 'questions'">
          <div class="nlq-birdeye-card" :style="{ borderColor: tabColor('questions') }">
            <div class="nlq-birdeye-title" :style="{ background: tabColor('questions') }">
              {{ title }}
            </div>

            <div v-if="questionsLoading" class="nlq-state">Loading questions…</div>

            <div v-else-if="questions.length === 0" class="nlq-state">
              {{ emptyQuestionsMessage }}
            </div>

            <div v-else>
              <div class="nlq-birdeye-grid">
                <div
                  v-for="(que, index) in questions"
                  :key="que.id"
                  class="nlq-birdeye-box"
                  :style="{ background: boxColor(que) }"
                  @click="$emit('question-click', que)"
                  title="Click to attempt this question"
                >
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
              <div class="nlq-legend">
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#9ded6c;"></span> Correct
                </span>
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#ffbabe;"></span> Incorrect
                </span>
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#f1f2f2; border:1px solid #ccc;"></span> Not attempted
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Mocks tab (notes page only) ── -->
        <div v-else-if="activeTabKey === 'mocks'">
          <div class="nlq-birdeye-card" :style="{ borderColor: tabColor('mocks') }">
            <div class="nlq-birdeye-title" :style="{ background: tabColor('mocks') }">
              {{ title }}
            </div>

            <div v-if="mocksLoading" class="nlq-state">Loading mocks…</div>

            <div v-else-if="mockQuestions.length === 0" class="nlq-state">
              {{ emptyMocksMessage }}
            </div>

            <div v-else>
              <div class="nlq-birdeye-grid">
                <div
                  v-for="(que, index) in mockQuestions"
                  :key="que.id"
                  class="nlq-birdeye-box"
                  :style="{ background: boxColor(que) }"
                  @click="$emit('mock-click', que)"
                  title="Click to view this mock question"
                >
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
              <div class="nlq-legend">
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#9ded6c;"></span> Correct
                </span>
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#ffbabe;"></span> Incorrect
                </span>
                <span class="nlq-legend-item">
                  <span class="nlq-legend-dot" style="background:#f1f2f2; border:1px solid #ccc;"></span> Not attempted
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Notes tab (question / mock pages) ── -->
        <div v-else-if="activeTabKey === 'linked-notes'">
          <div class="nlq-birdeye-card" :style="{ borderColor: tabColor('linked-notes') }">
            <div class="nlq-birdeye-title" :style="{ background: tabColor('linked-notes') }">
              {{ title }}
            </div>

            <div v-if="notesLoading" class="nlq-state">Loading notes…</div>

            <div v-else-if="linkedNotes.length === 0" class="nlq-state">
              No notes are linked.
            </div>

            <div v-else>
              <div class="nlq-birdeye-grid">
                <div
                  v-for="(note, index) in linkedNotes"
                  :key="note.record_id + '-' + note.type"
                  class="nlq-birdeye-box nlq-birdeye-box--note"
                  @click="$emit('note-click', note)"
                  :title="note.label || note.display_code"
                >
                  <span>{{ index + 1 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Journal tab ── -->
        <div v-else-if="activeTabKey === 'journal'" class="nlq-journal-panel">
          <div v-if="!noteRecordId" class="nlq-state">
            <p>{{ journalEmptyHint }}</p>
          </div>
          <template v-else>
            <p class="nlq-journal-hint">Your journal is private to your account and stored in your Synapse profile.</p>
            <div v-if="journalLoading" class="nlq-state">Loading journal…</div>
            <div v-else class="nlq-journal-editor-wrap">
              <NotesEditor v-model="journalHtml" />
            </div>
            <div v-if="!journalLoading" class="nlq-journal-actions">
              <button type="button" class="nlq-journal-save" @click="saveJournal">Save</button>
              <span v-if="journalSaveMessage" class="nlq-journal-saved-msg">{{ journalSaveMessage }}</span>
            </div>
          </template>
        </div>

        <!-- ── Comments tab ── -->
        <div v-else-if="activeTabKey === 'comments'" class="nlq-comments-panel">
          <div v-if="!currentQuestion || !currentQuestion.id" class="nlq-state">
            <p>Select a question to view or add comments.</p>
          </div>
          <template v-else>
            <ul v-if="commentList.length" class="nlq-comments-list">
              <li v-for="comment in commentList" :key="comment.id" class="nlq-comment-item">
                <div class="nlq-user-avatar">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/047/733/682/non_2x/grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg"
                    alt=""
                  />
                </div>
                <div class="nlq-comment-content">
                  <div class="nlq-comment-header">
                    <span class="nlq-user-name">{{ commentUserName(comment) }}</span>
                  </div>
                  <p class="nlq-comment-text">{{ comment.comments || 'No details' }}</p>
                </div>
              </li>
            </ul>
            <p v-else class="nlq-state">No comments yet. Be the first to comment.</p>
            <div class="nlq-comment-input-container">
              <input
                v-model="commentDraft"
                type="text"
                placeholder="Write your comment…"
                @keyup.enter="saveComment"
              />
              <button type="button" class="nlq-send-button" :disabled="commentSaving" @click="saveComment">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#ED1C24" />
                </svg>
              </button>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NotesEditor from '@/components/NotesEditor.vue';
import { fetchJournalHtml, saveJournalHtml } from '@/views/lib/notesUserPrefs';
import { byMethod } from '@/views/lib/api';

export default {
  name: 'NotesLinkedQuestions',
  components: { NotesEditor },
  props: {
    questions:        { type: Array,   default: () => [] },
    questionsLoading: { type: Boolean, default: false },
    mockQuestions:    { type: Array,   default: () => [] },
    mocksLoading:     { type: Boolean, default: false },
    linkedNotes:      { type: Array,   default: () => [] },
    notesLoading:     { type: Boolean, default: false },
    title:            { type: String,  default: '' },
    noteRecordId:     { type: String,  default: '' },
    noteRecordType:   { type: String,  default: 'notes' },
    /** notes = full note page; links = question/mock page (4 tabs, no mocks tab) */
    variant:          { type: String,  default: 'notes' },
    currentQuestion:  { type: Object,  default: null },
    /** subject → /addcomment; mock → /addmockcomment */
    commentApi:       { type: String,  default: 'subject' },
  },
  data() {
    return {
      activeIndex: null,
      journalHtml: '',
      journalLoading: false,
      journalSaveMessage: '',
      journalSaveTimer: null,
      commentDraft: '',
      commentSaving: false,
      tabDefs: {
        questions:     { label: 'Questions', activeColor: '#00A2FD' },
        mocks:           { label: 'Mocks',     activeColor: '#ED1C24' },
        'linked-notes':  { label: 'Notes',     activeColor: '#FBAD18' },
        journal:         { label: 'Journal',   activeColor: '#FBAD18' },
        comments:        { label: 'Comments',  activeColor: '#ED1C24' },
      },
    };
  },
  computed: {
    visibleTabs() {
      if (this.variant === 'links') {
        return [
          { key: 'questions', ...this.tabDefs.questions },
          { key: 'linked-notes', ...this.tabDefs['linked-notes'] },
          { key: 'mocks', ...this.tabDefs.mocks },
          { key: 'journal', ...this.tabDefs.journal },
          { key: 'comments', ...this.tabDefs.comments },
        ];
      }
      return [
        { key: 'questions', ...this.tabDefs.questions },
        { key: 'mocks', ...this.tabDefs.mocks },
        { key: 'journal', ...this.tabDefs.journal },
        { key: 'comments', ...this.tabDefs.comments },
      ];
    },
    emptyQuestionsMessage() {
      return this.variant === 'links'
        ? 'No questions are linked.'
        : 'No questions are linked to this note.';
    },
    emptyMocksMessage() {
      return this.variant === 'links'
        ? 'No mocks are linked.'
        : 'No mock questions are linked to this note.';
    },
    journalEmptyHint() {
      if (this.variant === 'links') {
        return 'Open a question to use the journal.';
      }
      return 'Open a note or subnote to use the journal.';
    },
    commentList() {
      const q = this.currentQuestion;
      if (!q || !Array.isArray(q.comments)) return [];
      return q.comments;
    },
    activeTabKey() {
      if (this.activeIndex === null) return null;
      const tab = this.visibleTabs[this.activeIndex];
      return tab ? tab.key : null;
    },
  },
  watch: {
    noteRecordId: {
      handler() {
        this.loadJournalFromPrefs();
      },
      immediate: true,
    },
    noteRecordType() {
      this.loadJournalFromPrefs();
    },
    activeIndex() {
      const key = this.activeTabKey;
      if (key === 'journal' && this.noteRecordId) {
        this.loadJournalFromPrefs();
      }
    },
  },
  beforeDestroy() {
    if (this.journalSaveTimer) clearTimeout(this.journalSaveTimer);
  },
  methods: {
    recordTypeNorm() {
      return this.noteRecordType === 'subnotes' ? 'subnotes' : 'notes';
    },
    usesLocalJournal() {
      return this.noteRecordType === 'question' || this.noteRecordType === 'mock';
    },
    localJournalStorageKey() {
      if (!this.noteRecordId) return null;
      let uid = 'anon';
      try {
        const u = this.$store && this.$store.getters && this.$store.getters.user;
        if (u && u.id != null) uid = String(u.id);
      } catch (e) { /* ignore */ }
      return `synapse_journal_${this.noteRecordType}_${uid}_${this.noteRecordId}`;
    },
    async loadJournalFromPrefs() {
      if (!this.noteRecordId) {
        this.journalHtml = '';
        return;
      }
      this.journalLoading = true;
      try {
        if (this.usesLocalJournal()) {
          const key = this.localJournalStorageKey();
          this.journalHtml = key ? localStorage.getItem(key) || '' : '';
        } else {
          this.journalHtml = await fetchJournalHtml(
            this.$store,
            this.recordTypeNorm(),
            this.noteRecordId
          );
        }
      } catch (e) {
        this.journalHtml = '';
      } finally {
        this.journalLoading = false;
      }
    },
    async saveJournal() {
      if (!this.noteRecordId) return;
      try {
        if (this.usesLocalJournal()) {
          const key = this.localJournalStorageKey();
          if (key) localStorage.setItem(key, this.journalHtml || '');
        } else {
          await saveJournalHtml(
            this.$store,
            this.recordTypeNorm(),
            this.noteRecordId,
            this.journalHtml
          );
        }
      } catch (e) {
        this.journalSaveMessage = 'Could not save. Try again.';
        return;
      }
      this.journalSaveMessage = 'Saved.';
      if (this.journalSaveTimer) clearTimeout(this.journalSaveTimer);
      this.journalSaveTimer = setTimeout(() => {
        this.journalSaveMessage = '';
        this.journalSaveTimer = null;
      }, 2000);
      this.$emit('journal-updated', {
        id: this.noteRecordId,
        type: this.noteRecordType,
      });
    },
    commentUserName(comment) {
      if (comment && comment.user && comment.user.username) {
        return comment.user.username;
      }
      return 'User';
    },
    async saveComment() {
      const text = (this.commentDraft || '').trim();
      const q = this.currentQuestion;
      if (!text || !q || !q.id) return;
      this.commentSaving = true;
      const endpoint = this.commentApi === 'mock' ? '/addmockcomment' : '/addcomment';
      try {
        const res = await byMethod('post', endpoint, {
          question_id: q.id,
          comments: text,
        });
        if (res.data && res.data.saved) {
          this.commentDraft = '';
          this.$emit('comment-saved', q.id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.commentSaving = false;
      }
    },
    toggle(i) {
      this.activeIndex = this.activeIndex === i ? null : i;
    },
    /** Close expanded panel (used when changing question in mock review). */
    resetActiveTab() {
      this.activeIndex = null;
    },
    tabColor(key) {
      const def = this.tabDefs[key];
      return def ? def.activeColor : '#00A2FD';
    },
    boxColor(que) {
      if (que.score && que.score.correct == 1) return '#9ded6c';
      if (que.score && que.score.correct == 0) return '#ffbabe';
      return '#f1f2f2';
    },
  },
};
</script>

<style scoped>
.nlq-sec {
  padding: 0 0 30px 0;
}

/* ── Tab strip ── */
.nlq-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
}

.nlq-tab {
  flex: 1;
  cursor: pointer;
}

.nlq-tab-header {
  border-radius: 40px;
  padding: 5px 13px;
  height: 29.65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  transition: background 0.3s ease;
}

.nlq-tab-header h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  text-align: left;
}

.nlq-tab-icon svg {
  width: 20px;
  height: 20px;
}

/* ── Sliding panel ── */
.nlq-panel {
  border: 1px solid;
  border-top: 1px solid;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.29);
  margin-top: 15px;
  text-align: left;
}

.nlq-slide-enter-active,
.nlq-slide-leave-active {
  transition: all 0.3s ease;
}
.nlq-slide-enter,
.nlq-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ── Bird's-eye card ── */
.nlq-birdeye-card {
  border: 2px solid;
  border-radius: 10px;
  overflow: hidden;
}

.nlq-birdeye-title {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 16px;
  text-align: center;
}

/* ── Question / mock grid (mirrors QuestionBirdsEyeView) ── */
.nlq-birdeye-grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-column-gap: 4px;
  grid-row-gap: 8px;
  padding: 16px 12px 8px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.nlq-birdeye-grid::-webkit-scrollbar { height: 6px; }
.nlq-birdeye-grid::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}

.nlq-birdeye-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  background: #f1f2f2;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.nlq-birdeye-box:hover {
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nlq-birdeye-box--note {
  background: #fbad18a8;
  font-size: 12px;
}

/* ── Legend ── */
.nlq-legend {
  display: flex;
  gap: 20px;
  padding: 10px 16px 14px;
  flex-wrap: wrap;
}

.nlq-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #555;
}

.nlq-legend-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
}

/* ── Empty / loading state ── */
.nlq-state {
  text-align: center;
  padding: 30px 20px;
  color: #6d6e71;
  font-size: 14px;
  font-style: italic;
}

.nlq-state p { margin: 0; }

/* ── Journal tab ── */
.nlq-journal-panel {
  text-align: left;
}

.nlq-journal-hint {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #555;
  font-style: normal;
}

.nlq-journal-editor-wrap {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.nlq-journal-editor-wrap ::v-deep .quill-editor-full {
  height: auto;
  min-height: 200px;
}

.nlq-journal-editor-wrap ::v-deep .ql-container {
  min-height: 180px;
  height: 220px;
  font-size: 15px;
}

.nlq-journal-editor-wrap ::v-deep .ql-editor {
  min-height: 180px;
}

.nlq-journal-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.nlq-journal-save {
  background: #fbad18;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.nlq-journal-save:hover {
  filter: brightness(0.95);
}

.nlq-journal-saved-msg {
  font-size: 13px;
  color: #2e7d32;
}

/* ── Comments tab ── */
.nlq-comments-panel {
  text-align: left;
}

.nlq-comments-list {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  max-height: 280px;
  overflow-y: auto;
}

.nlq-comment-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.nlq-user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.nlq-comment-header {
  margin-bottom: 4px;
}

.nlq-user-name {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.nlq-comment-text {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

.nlq-comment-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}

.nlq-comment-input-container input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
}

.nlq-send-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.nlq-send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .nlq-tabs { gap: 8px; }

  .nlq-tab-header h4 { font-size: 11px; }

  .nlq-birdeye-grid {
    grid-template-columns: repeat(10, 1fr);
  }

  .nlq-birdeye-box {
    height: 36px;
    font-size: 12px;
  }
}
</style>
