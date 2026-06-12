<template>
  <div>
    <NotesHeader
      :title="noteTitle"
      @back="returnFromNoteViaHeaderBack"
    />

    <section class="notes-page-sec">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb-wrapper visible">
          <div class="breadcrumb">
            <span class="breadcrumb-item" @click="goToNotesList">MLA CONTENT MAP</span>

            <template v-if="notesSection">
              <span class="breadcrumb-arrow">›</span>
              <span class="breadcrumb-item" @click="goToNotesList">{{ notesSection }}</span>
            </template>

            <template v-if="notesParentTitle">
              <span class="breadcrumb-arrow">›</span>
              <span class="breadcrumb-item" @click="returnFromNoteViaBreadcrumb">{{ notesParentTitle }}</span>
            </template>

            <template v-if="notesChildTitle">
              <span class="breadcrumb-arrow">›</span>
              <span class="breadcrumb-item" @click="returnFromNoteViaBreadcrumb">{{ notesChildTitle }}</span>
            </template>

            <span class="breadcrumb-arrow">›</span>
            <span class="breadcrumb-item active">{{ noteTitle }}</span>
          </div>
        </div>

        <div class="notes-main-with-toolbar">
          <div class="notes-content-column">
            <div
              ref="noteBodyRoot"
              class="notes-editor-container"
              @mouseenter="showBreadcrumb = true"
              @mouseleave="showBreadcrumb = false"
            >
              <div v-if="showSearchPanel" class="notes-search-panel" @click.stop>
                <input
                  v-model="searchInput"
                  type="search"
                  class="notes-search-input"
                  placeholder="Find…"
                  @keydown.enter.prevent="runSearchHighlight"
                />
                <button type="button" class="notes-search-btn" @click="runSearchHighlight">Highlight</button>
                <button type="button" class="notes-search-clear" @click="clearSearchMarks">Clear</button>
              </div>
              <div
                class="editor-wrapper note-html-content"
                :style="editorZoomStyle"
                v-html="editorContent"
              ></div>
            </div>
            <div class="brake-border"></div>
            <NotesLinkedQuestions
              :questions="linkedQuestions"
              :questions-loading="questionsLoading"
              :mock-questions="linkedMocks"
              :mocks-loading="mocksLoading"
              :title="noteTitle"
              :note-record-id="noteRecordId"
              :note-record-type="noteRecordType"
              @question-click="navigateToQuestion"
              @mock-click="navigateToMockQuestion"
            />
          </div>

          <aside class="notes-side-toolbar" aria-label="Note tools">
            <button type="button" class="notes-tool-btn" title="Search in Note" @click="toggleSearchPanel">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4.35-4.35" stroke-linecap="round" />
              </svg>
            </button>
            <div class="notes-tool-zoom" title="Text size">
              <button type="button" class="notes-tool-btn notes-tool-btn--sm" @click="zoomContent(0.08)">T+</button>
              <button type="button" class="notes-tool-btn notes-tool-btn--sm" @click="zoomContent(-0.08)">T−</button>
            </div>
            <button type="button" class="notes-tool-btn" title="Flag this note" @click="toggleToolbarFlag">
              <svg v-if="noteFlagged" width="20" height="18" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24" />
              </svg>
              <svg v-else width="20" height="18" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z" fill="transparent" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </button>
            <button type="button" class="notes-tool-btn" :title="noteReadLocal ? 'Marked as read — click to mark unread' : 'Mark as read'" @click="toggleToolbarRead">
              <span v-if="noteReadLocal" class="notes-tool-check notes-tool-check--on">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <span v-else class="notes-tool-check notes-tool-check--off"></span>
            </button>
            <button
              type="button"
              class="notes-tool-btn"
              :title="noteFeedbackActive ? 'Feedback saved' : 'Feedback'"
              @click="openNoteFeedbackModal"
            >
              <svg v-if="noteFeedbackActive" width="22" height="22" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.41003 1.45117C1.79003 1.45117 1.29004 1.95117 1.29004 2.57117V13.6912C1.29004 14.3112 1.79003 14.8112 2.41003 14.8112H3.73999C4.03999 14.8112 4.28003 15.0512 4.28003 15.3512V18.8812L7.75 14.9912C7.85 14.8812 8.00002 14.8112 8.15002 14.8112H17.25C17.87 14.8112 18.37 14.3112 18.37 13.6912V2.57117C18.37 1.95117 17.87 1.45117 17.25 1.45117H2.40002H2.41003Z" fill="#FFF200" />
                <path d="M3.75 20.8213C3.69 20.8213 3.62006 20.8113 3.56006 20.7813C3.35006 20.7013 3.20996 20.5013 3.20996 20.2813V15.8813H2.41003C1.20003 15.8813 0.209961 14.8913 0.209961 13.6813V2.56134C0.209961 1.35134 1.20003 0.361328 2.41003 0.361328H17.26C18.47 0.361328 19.46 1.35134 19.46 2.56134V13.6813C19.46 14.8913 18.47 15.8813 17.26 15.8813H8.40002L4.15002 20.6413C4.05002 20.7613 3.9 20.8213 3.75 20.8213ZM2.42004 1.45132C1.80004 1.45132 1.30005 1.95132 1.30005 2.57132V13.6913C1.30005 14.3113 1.80004 14.8113 2.42004 14.8113H3.75C4.05 14.8113 4.29004 15.0513 4.29004 15.3513V18.8813L7.76001 14.9913C7.86001 14.8813 8.01003 14.8113 8.16003 14.8113H17.26C17.88 14.8113 18.38 14.3113 18.38 13.6913V2.57132C18.38 1.95132 17.88 1.45132 17.26 1.45132H2.41003H2.42004Z" fill="#FBAD18" />
                <path d="M14.7601 10.1913H5.66016C5.36016 10.1913 5.12012 9.95134 5.12012 9.65134C5.12012 9.35134 5.36016 9.11133 5.66016 9.11133H14.7601C15.0601 9.11133 15.3002 9.35134 15.3002 9.65134C15.3002 9.95134 15.0601 10.1913 14.7601 10.1913Z" fill="#FBAD18" />
                <path d="M14.7601 6.69135H5.66016C5.36016 6.69135 5.12012 6.45134 5.12012 6.15134C5.12012 5.85134 5.36016 5.61133 5.66016 5.61133H14.7601C15.0601 5.61133 15.3002 5.85134 15.3002 6.15134C15.3002 6.45134 15.0601 6.69135 14.7601 6.69135Z" fill="#FBAD18" />
              </svg>
              <svg v-else width="22" height="22" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75 20.8584C3.69 20.8584 3.62006 20.8485 3.56006 20.8185C3.35006 20.7385 3.20996 20.5385 3.20996 20.3185V15.9185H2.41003C1.20003 15.9185 0.209961 14.9284 0.209961 13.7184V2.59845C0.209961 1.38845 1.20003 0.398438 2.41003 0.398438H17.26C18.47 0.398438 19.46 1.38845 19.46 2.59845V13.7184C19.46 14.9284 18.47 15.9185 17.26 15.9185H8.40002L4.15002 20.6784C4.05002 20.7984 3.9 20.8584 3.75 20.8584ZM2.42004 1.48843C1.80004 1.48843 1.30005 1.98843 1.30005 2.60843V13.7285C1.30005 14.3485 1.80004 14.8484 2.42004 14.8484H3.75C4.05 14.8484 4.29004 15.0885 4.29004 15.3885V18.9185L7.76001 15.0284C7.86001 14.9184 8.01003 14.8484 8.16003 14.8484H17.26C17.88 14.8484 18.38 14.3485 18.38 13.7285V2.60843C18.38 1.98843 17.88 1.48843 17.26 1.48843H2.41003H2.42004Z" fill="#8698A2" />
                <path d="M14.7601 10.2285H5.66016C5.36016 10.2285 5.12012 9.98845 5.12012 9.68845C5.12012 9.38845 5.36016 9.14844 5.66016 9.14844H14.7601C15.0601 9.14844 15.3002 9.38845 15.3002 9.68845C15.3002 9.98845 15.0601 10.2285 14.7601 10.2285Z" fill="#8698A2" />
                <path d="M14.7601 6.72845H5.66016C5.36016 6.72845 5.12012 6.48845 5.12012 6.18845C5.12012 5.88845 5.36016 5.64844 5.66016 5.64844H14.7601C15.0601 5.64844 15.3002 5.88845 15.3002 6.18845C15.3002 6.48845 15.0601 6.72845 14.7601 6.72845Z" fill="#8698A2" />
              </svg>
            </button>
          </aside>
        </div>
      </div>

      <div v-if="showReadConfirmPopup" class="notes-read-confirm-overlay">
        <div class="notes-read-confirm-popup">
          <p>{{ readConfirmMessage }}</p>
          <div class="notes-read-confirm-actions">
            <button type="button" class="notes-read-confirm-yes" @click="confirmReadToggle">Yes</button>
            <button type="button" class="notes-read-confirm-no" @click="cancelReadToggle">No</button>
          </div>
        </div>
      </div>

      <!-- Feedback: text only -->
      <transition name="notes-slide-modal">
        <div v-if="showFeedbackModal" class="notes-modal-overlays">
          <div class="notes-modal-contents">
            <div class="notes-feedback-form-box notes-feedback-form-box--simple">
              <div class="notes-feedback-cross feedback-modal-header">
                <h4 class="feedback-modal-title">Feedback</h4>
                <span class="notes-crossspan feedback-modal-close" @click="showFeedbackModal = false">
                  <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.38013 0.75L8.1701 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
                    <path d="M8.1701 0.75L1.38013 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
                  </svg>
                </span>
              </div>
              <form @submit.prevent="submitNoteFeedback">
                <div
                  v-for="(category, index) in noteFeedbackCategories"
                  :key="index"
                  class="notes-feedbackform-button"
                >
                  <button
                    type="button"
                    :class="{ 'notes-fb-active-btn': category.selectedOption }"
                    @click="toggleNoteFeedbackOptions(index)"
                  >{{ category.name }}</button>
                  <div class="notes-feeback-options" v-if="noteFeedbackShowOptionsIndex === index">
                    <div class="notes-feeback-option">
                      <input type="radio" :checked="category.selectedOption === 'Incorrect'" @click="selectNoteFeedbackOption(index, 'Incorrect')" value="Incorrect" />
                      <p :class="{ 'notes-fb-active-btn': category.selectedOption === 'Incorrect' }">Incorrect</p>
                    </div>
                    <div class="notes-feeback-option">
                      <input type="radio" :checked="category.selectedOption === 'Needs improvement'" @click="selectNoteFeedbackOption(index, 'Needs improvement')" value="Needs improvement" />
                      <p :class="{ 'notes-fb-active-btn': category.selectedOption === 'Needs improvement' }">Needs improvement</p>
                    </div>
                  </div>
                </div>
                <div class="notes-feedback-textarea-box notes-feedback-textarea-box--full">
                  <textarea
                    ref="noteFeedbackArea"
                    v-model="feedbackForm.optionfeedback"
                    class="notes-feedback-textarea notes-feedback-textarea--tall"
                    rows="1"
                    placeholder="Your feedback..."
                    @input="onNoteFeedbackTextareaInput"
                  />
                </div>
                <div class="notes-feedbackform-submitbtn">
                  <button
                    type="submit"
                    :disabled="isNoteFeedbackSubmitDisabled"
                    :class="{ 'notes-disabled-btn': isNoteFeedbackSubmitDisabled }"
                  >Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import NotesHeader from '@/components/NotesHeader.vue';
import NotesLinkedQuestions from '@/components/NotesLinkedQuestions.vue';
import { get, byMethod } from './lib/api';
import {
  autoGrowFeedbackTextarea,
  resetFeedbackTextareaHeight,
} from './lib/feedbackTextareaAutoGrow';
import {
  markNoteVisitedAsRead,
  markNoteUnread,
  isRecordRead,
  isRecordFlagged,
  fetchFlagged,
  toggleRecordFlag,
  feedbackHasContent,
  applyFeedbackToCache,
  hydrateNoteUserState,
} from './lib/notesUserPrefs';

export default {
  name: 'NotesPage',
  components: {
    NotesHeader,
    NotesLinkedQuestions,
  },
  data() {
    return {
      showBreadcrumb: false,
      loading: true,
      editorContent: '',
      noteTitle: '',
      notesSection: '',
      notesParentTitle: '',
      notesChildTitle: '',
      linkedQuestions: [],
      questionsLoading: true,
      linkedMocks: [],
      mocksLoading: true,
      noteFlagged: false,
      readRev: 0,
      contentZoom: 1,
      showSearchPanel: false,
      searchInput: '',
      showFeedbackModal: false,
      feedbackForm: { optionfeedback: '' },
      noteFeedbackCategories: [
        { name: 'Notes',       selectedOption: null },
        { name: 'Visual aids', selectedOption: null },
      ],
      noteFeedbackShowOptionsIndex: null,
      showReadConfirmPopup: false,
      readConfirmPending: null,
    };
  },
  created() {
    this.noteTitle       = localStorage.getItem('notestitle')     || 'Notes';
    this.notesSection    = localStorage.getItem('notesSection')   || '';
    this.notesParentTitle = localStorage.getItem('notesParentTitle') || '';
    this.notesChildTitle  = localStorage.getItem('notesChildTitle')  || '';
    // Fetch note content from API based on route params
    // const noteId = this.$route.params.id;
    const noteId = this.$route.query.id;

    const noteType = this.$route.query.type || localStorage.getItem('notestype') || 'notes';
    
    if (noteId) {
      this.fetchNoteContent(noteId, noteType);
      this.fetchLinkedQuestions(noteId, noteType);
      this.fetchLinkedMocks(noteId, noteType);
    }
    this.syncNoteReadAndFlag();
    hydrateNoteUserState();
  },
  watch: {
    '$route.query': {
      handler() {
        this.syncNoteReadAndFlag();
      },
      deep: true,
    },
    editorContent() {
      this.$nextTick(() => this.clearSearchMarks());
    },
  },
  computed: {
    isPageLoading() {
      return this.loading || this.questionsLoading || this.mocksLoading;
    },
    noteRecordId() {
      return this.$route.query.id || '';
    },
    noteRecordType() {
      const raw = this.$route.query.type || localStorage.getItem('notestype') || 'notes';
      return raw === 'subnotes' ? 'subnotes' : 'notes';
    },
    editorZoomStyle() {
      return { fontSize: `${16 * this.contentZoom}px` };
    },
    noteReadLocal() {
      void this.readRev;
      const id = this.noteRecordId;
      if (!id) return false;
      return isRecordRead(this.$store, this.noteRecordType, id);
    },
    isNoteFeedbackSubmitDisabled() {
      const hasText = (this.feedbackForm.optionfeedback || '').trim().length > 0;
      const hasCategory = this.noteFeedbackCategories.some(c => c.selectedOption);
      return !hasText && !hasCategory;
    },
    noteFeedbackActive() {
      const id = this.noteRecordId;
      if (!id) return false;
      return feedbackHasContent(this.$store, this.noteRecordType, id);
    },
    readConfirmMessage() {
      return this.readConfirmPending === 'unread'
        ? 'Are you sure you want to mark this note as unread?'
        : 'Are you sure you want to mark this note as read?';
    },
  },
  methods: {
    async syncNoteReadAndFlag() {
      const id = this.$route.query.id;
      const rawType = this.$route.query.type || localStorage.getItem('notestype') || 'notes';
      const t = rawType === 'subnotes' ? 'subnotes' : 'notes';
      if (id != null && id !== '') {
        this.readRev += 1;
        try {
          this.noteFlagged = await fetchFlagged(this.$store, t, id);
        } catch (e) {
          this.noteFlagged = isRecordFlagged(this.$store, t, id);
        }
      } else {
        this.noteFlagged = false;
      }
    },

    async toggleToolbarFlag() {
      const id = this.$route.query.id;
      const rawType = this.$route.query.type || localStorage.getItem('notestype') || 'notes';
      const t = rawType === 'subnotes' ? 'subnotes' : 'notes';
      if (id == null || id === '') return;
      try {
        this.noteFlagged = await toggleRecordFlag(this.$store, t, id);
      } catch (e) {
        /* ignore */
      }
    },

    toggleToolbarRead() {
      const id = this.$route.query.id;
      if (id == null || id === '') return;
      this.readConfirmPending = this.noteReadLocal ? 'unread' : 'read';
      this.showReadConfirmPopup = true;
    },

    confirmReadToggle() {
      const id = this.$route.query.id;
      const t = this.noteRecordType;
      if (id == null || id === '') return;
      if (this.readConfirmPending === 'unread') {
        markNoteUnread(this.$store, id, t);
      } else {
        markNoteVisitedAsRead(this.$store, id, t);
      }
      this.readRev += 1;
      this.cancelReadToggle();
    },

    cancelReadToggle() {
      this.showReadConfirmPopup = false;
      this.readConfirmPending = null;
    },

    toggleSearchPanel() {
      this.showSearchPanel = !this.showSearchPanel;
      if (!this.showSearchPanel) {
        this.clearSearchMarks();
      }
    },

    zoomContent(delta) {
      const next = Math.min(1.45, Math.max(0.85, this.contentZoom + delta));
      this.contentZoom = Math.round(next * 100) / 100;
    },

    escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    clearSearchMarks() {
      const root = this.$refs.noteBodyRoot;
      if (!root) return;
      root.querySelectorAll('mark.note-search-hit').forEach((mark) => {
        const parent = mark.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
        parent.normalize();
      });
    },

    runSearchHighlight() {
      this.clearSearchMarks();
      const q = (this.searchInput || '').trim();
      if (!q) return;
      const root = this.$refs.noteBodyRoot;
      if (!root) return;
      const contentEl = root.querySelector('.note-html-content');
      if (!contentEl) return;

      const textNodes = [];
      const walk = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          let p = node.parentNode;
          while (p && p !== contentEl) {
            if (p.nodeName === 'MARK' && p.classList && p.classList.contains('note-search-hit')) {
              return NodeFilter.FILTER_REJECT;
            }
            p = p.parentNode;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let n;
      while ((n = walk.nextNode())) {
        if (n.nodeValue && n.nodeValue.trim()) textNodes.push(n);
      }

      const re = new RegExp(`(${this.escapeRegExp(q)})`, 'gi');
      let hits = 0;
      const maxHits = 120;

      for (let i = 0; i < textNodes.length && hits < maxHits; i += 1) {
        const textNode = textNodes[i];
        const text = textNode.nodeValue;
        if (!text || !re.test(text)) {
          re.lastIndex = 0;
          continue;
        }
        re.lastIndex = 0;
        const parts = text.split(re);
        if (parts.length < 2) continue;

        const frag = document.createDocumentFragment();
        parts.forEach((part, idx) => {
          if (part === '' || part == null) return;
          if (idx % 2 === 1 && hits < maxHits) {
            const m = document.createElement('mark');
            m.className = 'note-search-hit';
            m.textContent = part;
            frag.appendChild(m);
            hits += 1;
          } else {
            frag.appendChild(document.createTextNode(part));
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      }

      const first = root.querySelector('mark.note-search-hit');
      if (first && typeof first.scrollIntoView === 'function') {
        first.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    },

    toggleNoteFeedbackOptions(index) {
      this.noteFeedbackShowOptionsIndex = this.noteFeedbackShowOptionsIndex === index ? null : index;
    },

    selectNoteFeedbackOption(index, option) {
      this.noteFeedbackCategories[index].selectedOption =
        this.noteFeedbackCategories[index].selectedOption === option ? null : option;
    },

    resetNoteFeedbackForm() {
      this.feedbackForm.optionfeedback = '';
      this.noteFeedbackCategories = this.noteFeedbackCategories.map(cat => ({ ...cat, selectedOption: null }));
      this.noteFeedbackShowOptionsIndex = null;
    },

    async openNoteFeedbackModal() {
      const id = this.noteRecordId;
      if (!id) return;
      this.resetNoteFeedbackForm();
      try {
        const res = await get('/note-feedback', { id, type: this.noteRecordType });
        const d = res.data?.data;
        if (d && d.optionfeedback) {
          this.feedbackForm.optionfeedback = d.optionfeedback;
        }
        if (d && d.categories) {
          this.noteFeedbackCategories = this.noteFeedbackCategories.map(cat => ({
            ...cat,
            selectedOption: d.categories[cat.name] || null,
          }));
        }
      } catch (e) {
        /* ignore */
      }
      this.showFeedbackModal = true;
      this.$nextTick(() => {
        resetFeedbackTextareaHeight(this.$refs.noteFeedbackArea);
      });
    },

    onNoteFeedbackTextareaInput() {
      autoGrowFeedbackTextarea(this.$refs.noteFeedbackArea);
      this.noteFeedbackShowOptionsIndex = null;
    },

    submitNoteFeedback() {
      const id = this.noteRecordId;
      if (!id) return;
      const selectedCategories = {};
      this.noteFeedbackCategories.forEach(cat => {
        if (cat.selectedOption) selectedCategories[cat.name] = cat.selectedOption;
      });
      const payload = {
        id,
        type: this.noteRecordType,
        optionfeedback: (this.feedbackForm.optionfeedback || '').trim(),
        categories: selectedCategories,
      };
      byMethod('POST', '/note-feedback', payload)
        .then((res) => {
          if (res.data.saved) {
            applyFeedbackToCache(this.noteRecordType, this.noteRecordId, true);
            this.showFeedbackModal = false;
          }
        })
        .catch(() => {
          /* ignore */
        });
    },

    clearNotesListReturnState() {
      try {
        [
          'notesPendingHighlightId',
          'notesRestore_column',
          'notesRestore_parentIndex',
          'notesRestore_childIndex',
          'notesRestore_grandIndex',
          'notesListRestoreSection',
          'notesListRestoreViewMode',
          'notesSuppressListHighlight',
        ].forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* ignore */
      }
    },

    goToNotesList() {
      this.clearNotesListReturnState();
      this.$router.push('/noteslistselection');
    },

    /**
     * Header back: same chapter/sublist expanded + orange outline on the note row only.
     */
    returnFromNoteViaHeaderBack() {
      const id = this.$route.query.id;
      try {
        localStorage.removeItem('notesSuppressListHighlight');
        if (id != null && id !== '') {
          localStorage.setItem('notesPendingHighlightId', String(id));
        }
        localStorage.setItem('notesListRestoreSection', 'BY AREAS');
        localStorage.setItem('notesListRestoreViewMode', 'areas');
      } catch (e) {
        /* ignore */
      }
      this.$router.push('/noteslistselection');
    },

    /**
     * Chapter / mid-tier breadcrumb: expand tree back on the list but do not outline a row.
     */
    returnFromNoteViaBreadcrumb() {
      try {
        localStorage.removeItem('notesPendingHighlightId');
        localStorage.setItem('notesSuppressListHighlight', '1');
        localStorage.setItem('notesListRestoreSection', 'BY AREAS');
        localStorage.setItem('notesListRestoreViewMode', 'areas');
      } catch (e) {
        /* ignore */
      }
      this.$router.push('/noteslistselection');
    },
    /**
     * Navigate to QuestionsPage, landing directly on the clicked question.
     * Priority: sublist > condition > presentation > subject (chapter).
     */
    navigateToQuestion(que) {
      let title, entityId;

      if (que.sublist_id) {
        title    = 'Sublist';
        entityId = que.sublist_id;
      } else if (que.condition_id) {
        title    = 'Conditions';
        entityId = que.condition_id;
      } else if (que.presentation_id) {
        title    = 'Presentations';
        entityId = que.presentation_id;
      } else {
        title    = 'Chapter';
        entityId = que.subject_id;
      }

      localStorage.setItem('questiontitle', title);
      localStorage.setItem('questionStartCode', que.code);
      const noteTitle = this.noteTitle || 'Notes';
      try {
        localStorage.setItem(
          'questionBreadcrumbLabels',
          JSON.stringify(['MLA CONTENT MAP', 'Notes', noteTitle])
        );
      } catch (e) { /* ignore */ }

      this.$router.push({ name: 'QuestionsPage', params: { id: entityId } });
    },
    /**
     * CMS sometimes saves invalid markup like <ul><ul><ul><li>...</li></ul></ul></ul>.
     * Each extra <ul> adds a full list-indent; unwrap so one <ul> wraps the items.
     */
    normalizeRedundantListWrappers(html) {
      if (!html || typeof html !== 'string') {
        return html;
      }
      let out = html;
      let prev;
      do {
        prev = out;
        out = out
          .replace(/<ul>\s*<ul>/gi, '<ul>')
          .replace(/<\/ul>\s*<\/ul>/gi, '</ul>')
          .replace(/<ol>\s*<ol>/gi, '<ol>')
          .replace(/<\/ol>\s*<\/ol>/gi, '</ol>');
      } while (out !== prev);
      return out;
    },
    fetchLinkedMocks(id, type) {
      this.mocksLoading = true;
      get('/note-linked-mocks', { id, type })
        .then((res) => {
          this.linkedMocks = res.data.data || [];
        })
        .catch((error) => {
          console.error('Error fetching linked mocks:', error);
          this.linkedMocks = [];
        })
        .finally(() => {
          this.mocksLoading = false;
        });
    },
    /**
     * Navigate to MockQuestionPreview (view-only) landing on the clicked question.
     */
    navigateToMockQuestion(que) {
      localStorage.setItem('question', 'normal');
      localStorage.setItem('mockObject', JSON.stringify({
        id: que.mock_id,
        title: que.mock_title,
        duration: que.mock_duration || 0,
      }));
      localStorage.setItem('mockStartQuestionId', String(que.id));
      this.$router.push({ name: 'MockQuestionPreview', params: { id: que.mock_id } });
    },
    fetchLinkedQuestions(id, type) {
      this.questionsLoading = true;
      get('/note-linked-questions', { id, type })
        .then((res) => {
          this.linkedQuestions = res.data.data || [];
        })
        .catch((error) => {
          console.error('Error fetching linked questions:', error);
          this.linkedQuestions = [];
        })
        .finally(() => {
          this.questionsLoading = false;
        });
    },
    fetchNoteContent(noteId, type) {
      this.loading = true;
      
      // Call API with id and type parameters
      get('/getnotecontent', {
        id: noteId,
        type: type
      })
      .then((res) => {
        if (res.data && res.data.content) {
          const raw = res.data.content?.content;
          this.editorContent = this.normalizeRedundantListWrappers(raw);
        } else {
          this.editorContent = '<p>No content available.</p>';
        }
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching note content:', error);
        this.editorContent = '<p>Error loading content. Please try again.</p>';
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.notes-page-sec {
  padding: 20px 0;
  min-height: calc(100vh - 200px);
}

.breadcrumb-wrapper {
  overflow: hidden;
  margin-bottom: 20px;
}

.breadcrumb-wrapper.visible {
  display: block;
}

.breadcrumb {
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  padding: 20px 0;
  justify-content: center;
}

.breadcrumb-item {
  padding: 3px 10px;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
  background: #BBBDBF;
}

.breadcrumb-item.active {
  background-color: #faad1b;
  color: white;
}

.breadcrumb-item:hover {
  background-color: #FADE91;
  color: #231F20;
}

.breadcrumb-arrow {
  padding: 0 6px;
  color: #BBBDBF;
  font-size: 16px;
}

.notes-editor-container {
  width: 100%;
  min-height: calc(100vh - 300px);
}

.notes-main-with-toolbar {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.notes-content-column {
  flex: 1;
  min-width: 0;
}

.notes-side-toolbar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 12px 8px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
  position: sticky;
  top: 100px;
}

.notes-tool-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #9e9e9e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0;
}

.notes-tool-btn:hover {
  background: #f5f5f5;
  color: #555;
}

.notes-read-confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.notes-read-confirm-popup {
  background: #fff;
  padding: 20px 25px;
  border-radius: 8px;
  width: 320px;
  max-width: calc(100vw - 32px);
  text-align: center;
}

.notes-read-confirm-popup p {
  margin: 0;
  font-size: 15px;
  color: #231f20;
}

.notes-read-confirm-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.notes-read-confirm-yes,
.notes-read-confirm-no {
  flex: 1;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.notes-read-confirm-yes {
  background: #faad1b;
  color: #fff;
}

.notes-read-confirm-no {
  background: #ccc;
  color: #231f20;
}

.notes-tool-zoom {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}

.notes-tool-btn--sm {
  width: 38px;
  height: 28px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.notes-tool-check {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.notes-tool-check--on {
  background: #4caf50;
  border: 1px solid #2e7d32;
}

.notes-tool-check--off {
  border: 2px solid #9e9e9e;
  background: transparent;
}

.notes-search-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
  background: #f8f8f8;
  border-radius: 10px;
}

.notes-search-input {
  flex: 1;
  min-width: 160px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.notes-search-btn,
.notes-search-clear {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #fbad18;
  background: #fbad18;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}

.notes-search-clear {
  background: #fff;
  color: #333;
  border-color: #ccc;
}

.note-html-content :deep(mark.note-search-hit) {
  background: #fff59d;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}

.notes-modal-overlays {
  width: 100%;
}

.notes-modal-contents {
  position: fixed;
  right: 38%;
  top: 22%;
  z-index: 9999;
}

.notes-slide-modal-enter-active,
.notes-slide-modal-leave-active {
  transition: opacity 0.25s ease;
}

.notes-slide-modal-enter,
.notes-slide-modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .notes-main-with-toolbar {
    flex-direction: column-reverse;
  }

  .notes-side-toolbar {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    top: 0;
    width: 100%;
  }

  .notes-modal-contents {
    right: 10%;
    left: 10%;
    top: 15%;
  }
}

.editor-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/*
  Match Laravel/admin WYSIWYG: black text, left alignment, consistent list gutters.
  #app uses text-align: center and color #2c3e50 — override here for note body.
*/
.note-html-content {
  --note-list-indent: 1.5em;
  text-align: left;
  color: #000;
  padding: 20px;
    line-height: 1.42;
}

.note-html-content :deep(h4) {
  font-size: 1.375em;
  font-weight: 700;
  color: #000;
  margin: 0.75em 0 0.5em;
}

.note-html-content :deep(p),
.note-html-content :deep(li),
.note-html-content :deep(td),
.note-html-content :deep(th) {
  color: #000;
}

.note-html-content :deep(a) {
  color: #000;
}

.note-html-content :deep(ul),
.note-html-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: var(--note-list-indent);
  max-width: 100%;
  box-sizing: border-box;
  list-style-position: outside;
  color: #000;
}

.note-html-content :deep(li > ul),
.note-html-content :deep(li > ol) {
  margin: 0.35em 0;
  padding-left: var(--note-list-indent);
}

/* Quill: tab-indented list rows add padding on <li> — drop it so nesting comes only from <ul>/<ol> */
.note-html-content :deep(li[class*="ql-indent"]) {
  padding-left: 0 !important;
}

/* Raw HTML: no Quill overrides; only safe layout defaults */
.note-html-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.note-html-content :deep(table) {
  max-width: 100%;
  border-collapse: collapse;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1220px;
  }
}

</style>

