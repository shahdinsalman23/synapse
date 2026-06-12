<template>
    <div :class="wrapperClass">
      <div class="white-back">
      <div class="clinical-practice-total">
        <h4>{{ title }}</h4>
        <div class="total-percentage-marks">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: headerProgressPercent }"></div>
          </div>
          <h5>{{ headerProgressFraction }}</h5>
        </div>
      </div>
      </div>
  
      <!-- MAIN LIST -->
      <div
        v-for="(item, pIndex) in items"
        :key="pIndex"
        class="notes-list-item-wrapper"
      >
      <div
          class="notes-list-item"
          :class="{ 'notes-row-highlight': isHighlighted(item) }"
          @click="handleRowClick(pIndex, item)"
        >
          <h4 class="item-title">{{pIndex + 1}}. {{ item.title }}</h4>
          <div class="notes-row-trailing">
            <div class="notes-row-icons" @click.stop>
              <span class="notes-icon-pencil notes-icon-pencil--placeholder" aria-hidden="true"></span>
              <span
                class="notes-icon-cell notes-icon-cell--static"
                title="Flagged if any note or subnote in this chapter is flagged"
              >
                <svg v-if="prefsChapterAnyFlag(item)" class="notes-flag-svg" width="18" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24" />
                </svg>
                <svg v-else class="notes-flag-svg notes-flag-svg--muted" width="18" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z" fill="transparent" stroke="#6d6e71" stroke-width="1.6" />
                </svg>
              </span>
              <span
                class="notes-icon-cell notes-icon-cell--static"
                title="Read when every note and subnote in this chapter is read"
              >
                <span v-if="prefsChapterAllRead(item)" class="notes-check notes-check--on" aria-hidden="true">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span v-else class="notes-check notes-check--off" aria-hidden="true"></span>
              </span>
            </div>
            <span
              v-if="item.children && item.children.length"
              class="arrow-btn"
              :aria-expanded="!!expandedParents[pIndex]"
            >
              {{ expandedParents[pIndex] ? '▼' : '▶' }}
            </span>
          </div>
        </div>
  
        <!-- SUBGRID (first-level children) --> 
        <transition name="slide-fade">
          <div v-if="expandedParents[pIndex]" class="subgrid">
            <div  v-for="(child, cIndex) in item.children"
            :key="cIndex">

           
            <div
             
              class="subgrid-item"
              :class="{ 'notes-row-highlight': isHighlighted(child) }"
            >
              <div
                  class="subgrid-item-row"
                  @click.stop="handleChildRowClick(pIndex, cIndex, child)"
                >
                <div class="child-title-wrap">
                  <h5 class="child-title">{{ child.title }}</h5>
                </div>
                <div class="notes-row-trailing">
                  <div class="notes-row-icons" @click.stop>
                    <span
                      class="notes-icon-pencil"
                      :class="{ 'notes-icon-pencil--active': prefsJournal('notes', child.id) }"
                      title="Journal: orange when this note has saved journal text"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L8 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span
                      class="notes-icon-cell notes-icon-cell--btn"
                      title="Flag this note"
                      @click.stop="toggleListFlag('notes', child.id)"
                    >
                      <svg v-if="prefsFlagged('notes', child.id)" class="notes-flag-svg" width="18" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24" />
                      </svg>
                      <svg v-else class="notes-flag-svg notes-flag-svg--muted" width="18" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z" fill="transparent" stroke="#6d6e71" stroke-width="1.6" />
                      </svg>
                    </span>
                    <span class="notes-icon-cell notes-icon-cell--static" title="Read status for this note">
                      <span v-if="prefsNoteRead(child)" class="notes-check notes-check--on" aria-hidden="true">
                        <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </span>
                      <span v-else class="notes-check notes-check--off" aria-hidden="true"></span>
                    </span>
                  </div>
                  <span
                    v-if="child.children && child.children.length"
                    class="arrow-btn child-arrow"
                    :aria-expanded="expandedChildren[pIndex] && !!expandedChildren[pIndex][cIndex]"
                  >
                    {{ expandedChildren[pIndex] && expandedChildren[pIndex][cIndex] ? '▼' : '▶' }}
                  </span>
                </div>
              </div>
  
             
            </div>
             <!-- GRANDCHILD LIST (second-level children) -->
             <transition name="slide-fade">
                <div
                  v-if="expandedChildren[pIndex] && expandedChildren[pIndex][cIndex]"
                  class="grandchild-list"
                >
                  <div
                    v-for="(g, gIndex) in child.children"
                    :key="gIndex"
                    class="grandchild-item"
                    :class="{ 'notes-row-highlight': isHighlighted(g) }"
                    @click.stop="handleGrandchildClick(pIndex, cIndex, gIndex, g)"
                  >
                    <h5 class="gc-title">{{ g.title }}</h5>
                    <div class="notes-row-icons" @click.stop>
                      <span
                        class="notes-icon-pencil"
                        :class="{ 'notes-icon-pencil--active': prefsJournal('subnotes', g.id) }"
                        title="Journal: orange when this subnote has saved journal text"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 20h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <path d="M16.5 3.5a2.121 2.121 0 013 3L8 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span
                        class="notes-icon-cell notes-icon-cell--btn"
                        title="Flag this subnote"
                        @click.stop="toggleListFlag('subnotes', g.id)"
                      >
                        <svg v-if="prefsFlagged('subnotes', g.id)" class="notes-flag-svg" width="18" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24" />
                        </svg>
                        <svg v-else class="notes-flag-svg notes-flag-svg--muted" width="18" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z" fill="transparent" stroke="#6d6e71" stroke-width="1.6" />
                        </svg>
                      </span>
                      <span class="notes-icon-cell notes-icon-cell--static" title="Read when you have opened this subnote">
                        <span v-if="prefsSubRead(g.id)" class="notes-check notes-check--on" aria-hidden="true">
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                        <span v-else class="notes-check notes-check--off" aria-hidden="true"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </transition>
          </div>
        </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import {
    chapterAllRead,
    chapterAnyFlagged,
    noteReadAggregate,
    isRecordFlagged,
    isRecordRead,
    toggleRecordFlag,
    journalHasContent,
    notesProgressStats,
  } from '@/views/lib/notesUserPrefs';

  export default {
    name: "NotesSubList",
    props: {
      title: String,
      total: String,
      items: {
        type: Array,
        default: () => []
      },
      wrapperClass: {
        type: String,
        default: ""
      },
      condition: String,
    },
    data() {
      return {
        // track which parent items are expanded (keyed by parent index)
        expandedParents: {},
        // track expanded children per parent: { parentIndex: { childIndex: true } }
        expandedChildren: {},
        restoreApplied: false,
        highlightNoteId: null,
        listPrefsKey: 0,
      };
    },
    computed: {
      sectionName() {
        const t = (this.title || '').toLowerCase();
        if (t.includes('clinical'))      return 'Clinical Practice';
        if (t.includes('professional'))  return 'Professional Knowledge';
        return this.title;
      },

      columnProgress() {
        void this.listPrefsKey;
        return notesProgressStats(this.$store, this.items);
      },

      headerProgressPercent() {
        return `${this.columnProgress.percent}%`;
      },

      headerProgressFraction() {
        const { read, total } = this.columnProgress;
        return `${read}/${total}`;
      },

      columnKey() {
        const w = (this.wrapperClass || '').toLowerCase();
        if (w.includes('clinical')) return 'clinical';
        if (w.includes('professional')) return 'professional';
        return 'clinical';
      },
    },

    watch: {
      items: {
        handler() {
          this.$nextTick(() => this.applyNotesListRestore());
        },
        deep: true,
      },
    },

    mounted() {
      this._notesPrefsStorage = (ev) => {
        if (ev && ev.key && String(ev.key).indexOf('notesUserPrefs_') === 0) {
          this.listPrefsKey += 1;
        }
      };
      window.addEventListener('storage', this._notesPrefsStorage);
      this.$nextTick(() => this.applyNotesListRestore());
    },
    activated() {
      this.listPrefsKey += 1;
    },
    beforeDestroy() {
      if (this._notesPrefsStorage) {
        window.removeEventListener('storage', this._notesPrefsStorage);
      }
    },
    methods: {
      prefsChapterAllRead(item) {
        void this.listPrefsKey;
        return chapterAllRead(this.$store, item);
      },
      prefsChapterAnyFlag(item) {
        void this.listPrefsKey;
        return chapterAnyFlagged(this.$store, item);
      },
      prefsNoteRead(note) {
        void this.listPrefsKey;
        return noteReadAggregate(this.$store, note);
      },
      prefsJournal(type, id) {
        void this.listPrefsKey;
        return journalHasContent(this.$store, type, id);
      },
      prefsFlagged(type, id) {
        void this.listPrefsKey;
        return isRecordFlagged(this.$store, type, id);
      },
      prefsSubRead(id) {
        void this.listPrefsKey;
        return isRecordRead(this.$store, 'subnotes', id);
      },
      toggleListFlag(type, id) {
        if (id == null) return;
        const t = type === 'subnotes' ? 'subnotes' : 'notes';
        toggleRecordFlag(this.$store, t, id)
          .then(() => {
            this.listPrefsKey += 1;
          })
          .catch(() => {
            /* ignore */
          });
      },

      isHighlighted(entity) {
        if (!entity || this.highlightNoteId == null) return false;
        const hid = entity.id != null ? String(entity.id) : '';
        return hid !== '' && hid === String(this.highlightNoteId);
      },

      persistNotesListRestore({ parentIndex, childIndex, grandIndex, noteId }) {
        try {
          localStorage.setItem('notesRestore_column', this.columnKey);
          localStorage.setItem('notesRestore_parentIndex', String(parentIndex));
          if (childIndex != null && childIndex !== '') {
            localStorage.setItem('notesRestore_childIndex', String(childIndex));
          } else {
            localStorage.removeItem('notesRestore_childIndex');
          }
          if (grandIndex != null && grandIndex !== '') {
            localStorage.setItem('notesRestore_grandIndex', String(grandIndex));
          } else {
            localStorage.removeItem('notesRestore_grandIndex');
          }
          if (noteId != null && noteId !== '') {
            localStorage.setItem('notesPendingHighlightId', String(noteId));
          }
        } catch (e) {
          /* ignore */
        }
      },

      applyNotesListRestore() {
        if (this.restoreApplied) return;

        const col = localStorage.getItem('notesRestore_column');
        if (!col || col !== this.columnKey) return;

        const pidRaw = localStorage.getItem('notesRestore_parentIndex');
        if (pidRaw === null || pidRaw === '') return;

        const pIndex = parseInt(pidRaw, 10);
        if (Number.isNaN(pIndex) || !this.items || !this.items.length || !this.items[pIndex]) return;

        const highlightId = localStorage.getItem('notesPendingHighlightId');
        const suppressHighlight = localStorage.getItem('notesSuppressListHighlight') === '1';

        /* Expand-only (breadcrumb back): suppress true, highlight id cleared */
        if (!suppressHighlight && (!highlightId || highlightId === '')) return;

        this.restoreApplied = true;

        this.expandedParents = { ...this.expandedParents, [pIndex]: true };

        const cidRaw = localStorage.getItem('notesRestore_childIndex');
        if (cidRaw !== null && cidRaw !== '') {
          const cIndex = parseInt(cidRaw, 10);
          if (!Number.isNaN(cIndex)) {
            this.expandedChildren = {
              ...this.expandedChildren,
              [pIndex]: { ...(this.expandedChildren[pIndex] || {}), [cIndex]: true },
            };
          }
        }

        this.highlightNoteId = suppressHighlight || !highlightId ? null : String(highlightId);

        try {
          localStorage.removeItem('notesRestore_column');
          localStorage.removeItem('notesRestore_parentIndex');
          localStorage.removeItem('notesRestore_childIndex');
          localStorage.removeItem('notesRestore_grandIndex');
          localStorage.removeItem('notesPendingHighlightId');
          localStorage.removeItem('notesSuppressListHighlight');
        } catch (e) {
          /* ignore */
        }
      },

      GOtoroute(item, type) {
        if (this.condition === 'conditionAreas') {
          this.$emit('AreaCondition', item);
          return;
        }
        // keep your current behavior (adjust route as needed)

        if(item.children){
            return

        }

        localStorage.setItem("notestitle", item?.title);
        // this.$router.push(`/notespage/${item.id}`);
        this.$router.push({
          path: '/notespage',
          query: {
            id: item.id,
            type: type || 'notes',
          },
        });

      },
  
      handleRowClick(pIndex, item) {
        if (item.children && item.children.length) {
          this.toggleParent(pIndex);
        } else {
          localStorage.setItem('notesSection', this.sectionName);
          localStorage.removeItem('notesParentTitle');
          localStorage.removeItem('notesChildTitle');
          this.persistNotesListRestore({
            parentIndex: pIndex,
            childIndex: null,
            grandIndex: null,
            noteId: item.id,
          });
          this.GOtoroute(item);
        }
      },

      handleChildRowClick(pIndex, cIndex, child) {
        if (child.children && child.children.length) {
          this.toggleChild(pIndex, cIndex);
        } else {
          localStorage.setItem('notesSection', this.sectionName);
          localStorage.setItem('notesParentTitle', this.items[pIndex]?.title || '');
          localStorage.removeItem('notesChildTitle');
          this.persistNotesListRestore({
            parentIndex: pIndex,
            childIndex: cIndex,
            grandIndex: null,
            noteId: child.id,
          });
          this.GOtoroute(child, 'notes');
        }
      },

      handleGrandchildClick(pIndex, cIndex, gIndex, g) {
        localStorage.setItem('notesSection', this.sectionName);
        localStorage.setItem('notesParentTitle', this.items[pIndex]?.title || '');
        localStorage.setItem('notesChildTitle', this.items[pIndex]?.children?.[cIndex]?.title || '');
        this.persistNotesListRestore({
          parentIndex: pIndex,
          childIndex: cIndex,
          grandIndex: gIndex,
          noteId: g.id,
        });
        this.GOtoroute(g, 'subnotes');
      },

      toggleParent(pIndex) {
        // toggle parent expansion (immutable assignment to keep reactivity across Vue versions)
        this.expandedParents = {
          ...this.expandedParents,
          [pIndex]: !this.expandedParents[pIndex]
        };
        // optional: close child expansions for this parent when collapsing
        if (!this.expandedParents[pIndex]) {
          // when collapsing parent, remove its child-expanded state
          const copy = { ...this.expandedChildren };
          delete copy[pIndex];
          this.expandedChildren = copy;
        }
      },
  
      toggleChild(pIndex, cIndex) {
        const parentMap = this.expandedChildren[pIndex] || {};
        const newParentMap = { ...parentMap, [cIndex]: !parentMap[cIndex] };
        this.expandedChildren = { ...this.expandedChildren, [pIndex]: newParentMap };
      },
  
      formatQuestions(q) {
        if (!q) return "";
        if (Array.isArray(q)) return q.join(', ');
        return String(q);
      }
    }
  };
  </script>
  
  <style scoped>

  ::-webkit-scrollbar {
    width: 3px;
    height: 20px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fade91;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #f5d469;
  }

  .areas-clinical-practice {
   
    height: 81vh;
    overflow-y: scroll;
}

.areas-professional-knowledge {
    height: 81vh;
    overflow-y: scroll;
}
  /* keep your existing look + additional layout for nested grids */
 
  
  .notes-list-item-wrapper {
    margin-bottom: 8px;
  }
  
  /* main item row (same styling you had) */
  .notes-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #eee;
    background: #FADE91;
    margin: 0px 0px 7px 0px;
    padding: 17px 14px 12px 20px;
    border-radius: 10px;
    cursor: pointer;
}

  .notes-list-item-wrapper:nth-child(even) .notes-list-item {
    background: rgba(250, 222, 145, 0.55);
  }
  
  

.notes-list-item h4 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 600;
    text-align: start;
}

.notes-list-item h5 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}

  
  .arrow {
    font-size: 14px;
    margin-left: 8px;
    transition: transform 0.2s;
  }
  
  .arrow.open {
    transform: rotate(90deg);
  }
  
  .sublist {
    margin-top: 4px;
    padding-left: 20px; /* indentation for children */
    border-left: 3px solid #f5d469; /* yellow accent border */
  }
  
  .sublist .notes-list-item {
    background: #fce9b8; /* lighter yellow for children */
  }
  
  .sublist .notes-list-item:hover {
    background: #f5d469;
  }

  /* Notes (subgrid items) match their parent chapter's color — no alternating within */
  .notes-list-item-wrapper:nth-child(odd) .subgrid-item {
    background: #FADE91;
  }
  .notes-list-item-wrapper:nth-child(even) .subgrid-item {
    background: rgba(250, 222, 145, 0.55);
  }

  /* Grandchildren also match the chapter color (via the same wrapper) */
  .notes-list-item-wrapper:nth-child(odd) .grandchild-item {
    background: #FADE91;
  }
  .notes-list-item-wrapper:nth-child(even) .grandchild-item {
    background: rgba(250, 222, 145, 0.55);
  }
  
  .item-title {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
    margin: 0;
    flex: 1;
    min-width: 0;
  }
  
  .item-progress {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
    margin: 0;
  }
  
  /* arrow indicator */
  .arrow-btn {
    background: none;
    border: none;
    font-size: 12px;
    color: #231F20;
    flex-shrink: 0;
    pointer-events: none;
    user-select: none;
  }
  
  /* subgrid (children shown when parent expanded) */
  .subgrid {
    margin-top: 10px;
    padding: 12px 0px 12px 25px;
    background: #fef9e8;
    border-radius: 8px;
  
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
  }
  
  /* each child cell inside subgrid */
  .subgrid-item {

    border-radius: 8px;
    padding: 17px 14px 12px 20px;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.02) inset;
  }
  
  /* child row header */
  .subgrid-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: pointer;
  }
  
  .child-arrow {
    margin: 0;
  }
  
  /* child title + optional questions */
  .child-title-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
  }
  
  .child-title {
    margin: 0;
    font-weight: 600;
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
  }
  
  .child-questions {
    margin-top: 4px;
    font-size: 11px;
    color: #666;
  }
  
  /* grandchild list (when child expanded) */
  .grandchild-list {
    margin-top: 8px;
    padding-top: 8px;
    /* border-top: 1px dashed #e6eef7; */
    display: flex
;
    flex-direction: column;
    gap: 6px;
    background: white;
    padding-left: 25px;
}

.grandchild-item {
    padding: 17px 14px 12px 20px;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}


  
  .gc-title {
    font-size: 12px;
    font-weight: 600;
    font-family: 'Helveticacondensed';
  }
  .gc-questions {
    font-size: 11px;
    color: #666;
    margin-left: 6px;
  }
  
  /* progress bar (kept from your component) */
  .progress-bar {
    background: #BBBDBF;
    border-radius: 20px;
    width: 80px;
    height: 8px;
    overflow: hidden;
    border: 1px solid #FFFFFF;
    flex-shrink: 0;
  }
  .progress-fill {
    background: #9DED6C;
    height: 100%;
    transition: width 0.3s ease;
  }

  .total-percentage-marks {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .clinical-practice-total h4 {
    flex: 1;
    min-width: 0;
    margin: 0;
  }

  .total-percentage-marks h5 {
    margin: 0;
    font-size: 13px;
    font-family: 'Helveticacondensed', sans-serif;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
  }

  /* transitions */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.25s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  /* Alternate background for subgrid children */


  .clinical-practice-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border: 0.75px solid #b07507;
    background: #FAAD1B;
}

  /* Returned-from-note outline (header back only) — full card */
  .notes-row-highlight {
    outline: 2px solid #FAAD1B;
    outline-offset: -2px;
  }

  .grandchild-item.notes-row-highlight {
    border-radius: 6px;
  }

  .subgrid-item.notes-row-highlight {
    border-radius: 8px;
  }

  .notes-list-item.notes-row-highlight {
    border-radius: 10px;
  }

  /* Read / flag / journal indicators */
  .notes-row-trailing {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .notes-row-icons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .notes-icon-pencil {
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #9e9e9e;
    flex-shrink: 0;
    pointer-events: none;
  }

  .notes-icon-pencil--active {
    color: #fbad18;
  }

  .notes-icon-pencil--placeholder {
    visibility: hidden;
  }

  .notes-icon-cell {
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .notes-icon-cell--btn {
    cursor: pointer;
  }

  .notes-flag-svg {
    display: block;
  }

  .notes-check {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .notes-check--on {
    background: #4caf50;
    border: 1px solid #2e7d32;
  }

  .notes-check--off {
    border: 2px solid #9e9e9e;
    background: transparent;
  }

  .grandchild-item .gc-title {
    flex: 1;
    min-width: 0;
        text-align: left;
  }
  
  </style>
  