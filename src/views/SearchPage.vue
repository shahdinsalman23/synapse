<template>
  <div class="search-page" :class="{ 'search-page--notes': isNotesSource }">
    <header class="search-top-banner">
      <div class="container search-top-inner">
        <svg class="search-top-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient :id="searchTopGradientId" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" :stop-color="searchGradientStart" />
              <stop offset="100%" :stop-color="searchGradientEnd" />
            </linearGradient>
          </defs>
          <circle cx="10.5" cy="10.5" r="6.5" :stroke="`url(#${searchTopGradientId})`" stroke-width="3" />
          <path d="M15.5 15.5 L21 21" :stroke="`url(#${searchTopGradientId})`" stroke-width="3" stroke-linecap="round" />
        </svg>
        <button type="button" class="search-back-btn" aria-label="Exit search" @click="goBack">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98962 17.0108C4.64962 17.3508 4.10965 17.3508 3.76965 17.0108L0.309687 13.5508C-0.0303125 13.2108 -0.0303125 12.6708 0.309687 12.3308L3.76965 8.87078C4.10965 8.53078 4.64962 8.53078 4.98962 8.87078C5.32962 9.21078 5.32962 9.75078 4.98962 10.0908L3.00964 12.0708H13.5996C14.6896 12.0708 15.4497 12.0708 16.0497 12.0208C16.6297 11.9708 16.9596 11.8708 17.2096 11.7308C17.5996 11.5008 17.9297 11.1808 18.1597 10.7808C18.2997 10.5308 18.3996 10.2008 18.4496 9.62078C18.4996 9.03078 18.4996 8.27078 18.4996 7.17078C18.4996 6.08078 18.4996 5.32078 18.4496 4.72078C18.3996 4.14078 18.2997 3.81078 18.1597 3.56078C17.9297 3.17078 17.6096 2.84078 17.2096 2.61078C16.9596 2.47078 16.6297 2.37078 16.0497 2.32078C15.4597 2.27078 14.6996 2.27078 13.5996 2.27078H12.6296C12.1496 2.27078 11.7696 1.88078 11.7696 1.41078C11.7696 0.930782 12.1596 0.550781 12.6296 0.550781H13.6396C14.6796 0.550781 15.5196 0.550783 16.1996 0.610783C16.8996 0.670783 17.5097 0.810783 18.0597 1.13078C18.7197 1.51078 19.2596 2.05078 19.6396 2.71078C19.9596 3.26078 20.0897 3.88078 20.1597 4.57078C20.2197 5.25078 20.2196 6.09078 20.2196 7.13078V7.21078C20.2196 8.25078 20.2197 9.09078 20.1597 9.77078C20.0997 10.4708 19.9596 11.0808 19.6396 11.6308C19.2596 12.2908 18.7197 12.8308 18.0597 13.2108C17.5097 13.5308 16.8896 13.6608 16.1996 13.7308C15.5196 13.7908 14.6796 13.7908 13.6396 13.7908H3.00964L4.98962 15.7708C5.32962 16.1108 5.32962 16.6508 4.98962 16.9908V17.0108Z" :fill="searchAccentColor"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="container search-body" :class="{ 'search-body--split': selectedHit }">
      <aside class="search-sidebar">
        <div class="search-sidebar-inner">
          <div class="search-controls-box">
            <div class="search-input-row">
              <button
                v-if="selectedHit"
                type="button"
                class="search-back-to-results"
                aria-label="Back to results"
                @click="clearSelection"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <input
                v-model="query"
                type="search"
                placeholder="Search..."
                @keyup.enter="runSearch"
              />
              <button type="button" class="search-go-btn" @click="runSearch" aria-label="Search">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" :stroke="searchAccentColor" stroke-width="2.5">
                  <circle cx="13" cy="11" r="8" />
                  <line x1="3" y1="21" x2="7.35" y2="16.65" />
                </svg>
              </button>
            </div>

            <div class="search-category-checks">
              <label v-for="cat in categoryOptions" :key="cat.key" class="search-check-row">
                <input type="checkbox" v-model="cat.checked" />
                <span class="search-check-box" aria-hidden="true"></span>
                <span>{{ cat.label }}</span>
              </label>
            </div>

            <div v-if="questionsCategoryChecked" class="search-question-scope">
              <p class="search-scope-label">Search questions in:</p>
              <label v-for="opt in questionScopeOptions" :key="opt.value" class="search-radio-row">
                <input type="radio" v-model="questionScope" :value="opt.value" name="question_scope" />
                <span>{{ opt.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <main v-if="selectedHit" class="search-main">
        <div class="search-detail-panel">
          <button type="button" class="search-detail-back" @click="clearSelection">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to results
          </button>
          <div v-if="detailLoading" class="search-state">Loading…</div>
          <div v-else-if="detailError" class="search-state search-state--error">{{ detailError }}</div>
          <div v-else-if="detail" class="search-detail-body">
            <div
              v-if="detail.context_label && detail.category === 'questions'"
              class="search-context-banner"
              v-html="highlightPlain(detail.context_label)"
            />

            <h2 v-if="detailTitle" class="search-detail-title" v-html="highlightPlain(detailTitle)"></h2>

            <div v-if="detail.category === 'questions' && detail.question" class="search-question-body">
              <div class="search-q-text" v-html="highlightHtml(detail.question.question_text)"></div>
              <div
                v-for="opt in detail.question.options || []"
                :key="opt.id"
                class="search-q-option"
              >
                <strong>{{ opt.prefix }}.</strong>
                <span v-html="highlightHtml(opt.option_text)"></span>
              </div>
              <button type="button" class="search-open-full" @click="openQuestionInApp">Open question</button>
            </div>

            <div v-else-if="detail.category === 'notes'" class="search-note-body">
              <div
                v-if="detail.content_html"
                class="search-rich-content"
                v-html="highlightHtml(detail.content_html)"
              ></div>
              <button type="button" class="search-open-full search-open-full--notes" @click="openNoteInApp">Open note</button>
            </div>

            <div
              v-else-if="detail.content_html"
              class="search-rich-content"
              v-html="highlightHtml(detail.content_html)"
            ></div>
          </div>
        </div>
      </main>

      <div v-else class="search-results-stack">
        <div v-if="loading" class="search-state">Searching…</div>
        <div v-else-if="searchError" class="search-state search-state--error">{{ searchError }}</div>
        <div v-else-if="hasSearched && !hasAnyResults" class="search-state">No results found.</div>
        <div v-else-if="!hasSearched" class="search-state search-state--hint">Enter a term and search.</div>

        <div v-else class="search-results-list">
          <div
            v-for="block in visibleResultBlocks"
            :key="block.key"
            class="search-result-block"
            :style="{ borderColor: block.theme.primary }"
          >
            <div class="search-result-head" :style="{ background: block.theme.primary }">
              <h4>Found {{ block.count }} result{{ block.count === 1 ? '' : 's' }} for '{{ lastQuery }}' in {{ block.label }}</h4>
            </div>
            <div class="search-result-grid">
              <button
                v-for="item in block.items"
                :key="block.key + '-' + item.index"
                type="button"
                class="search-result-num"
                :style="{ background: item.source_theme?.secondary || block.theme.secondary }"
                @click="selectHit(block.key, item)"
              >
                {{ item.index }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from './lib/api';
import { highlightHtml, highlightPlain } from './lib/searchHighlight';

const CATEGORY_META = {
  questions: { label: 'Questions', theme: { primary: '#1A90FF', secondary: '#D7EBFF' } },
  notes: { label: 'Notes', theme: { primary: '#F59C00', secondary: '#fce2b5' } },
  journal: { label: 'Journal', theme: { primary: '#28A745', secondary: '#D4EDDA' } },
  comment: { label: 'Comment', theme: { primary: '#6F42C1', secondary: '#E0D4F7' } },
};

export default {
  name: 'SearchPage',
  data() {
    return {
      query: '',
      lastQuery: '',
      questionScope: 'text',
      questionScopeOptions: [
        { value: 'presentations', label: 'Presentations' },
        { value: 'conditions', label: 'Conditions' },
        { value: 'text', label: 'Text (Q body and options)' },
      ],
      categoryOptions: [
        { key: 'questions', label: 'Questions', checked: true },
        { key: 'notes', label: 'Notes', checked: true },
        { key: 'journal', label: 'Journal', checked: true },
        { key: 'comment', label: 'Comment', checked: true },
      ],
      results: {},
      loading: false,
      searchError: '',
      hasSearched: false,
      selectedHit: null,
      detail: null,
      detailLoading: false,
      detailError: '',
      returnPath: '/mlalistselection',
    };
  },
  computed: {
    isNotesSource() {
      if (this.$route.query.source === 'notes') return true;
      const from = String(this.$route.query.from || this.returnPath || '');
      return from.includes('noteslistselection');
    },
    searchAccentColor() {
      return this.isNotesSource ? '#faad1b' : '#1A90FF';
    },
    searchTopGradientId() {
      return this.isNotesSource ? 'searchTopGradNotes' : 'searchTopGradQuestions';
    },
    searchGradientStart() {
      return this.isNotesSource ? '#fde68a' : '#8AD9FF';
    },
    searchGradientEnd() {
      return this.isNotesSource ? '#faad1b' : '#115FFF';
    },
    questionsCategoryChecked() {
      const row = this.categoryOptions.find((c) => c.key === 'questions');
      return row && row.checked;
    },
    activeCategories() {
      return this.categoryOptions.filter((c) => c.checked).map((c) => c.key);
    },
    visibleResultBlocks() {
      return this.activeCategories
        .map((key) => {
          const bucket = this.results[key];
          if (!bucket || !bucket.count) return null;
          const meta = CATEGORY_META[key];
          return {
            key,
            label: meta.label,
            theme: meta.theme,
            count: bucket.count,
            items: bucket.items || [],
          };
        })
        .filter(Boolean);
    },
    hasAnyResults() {
      return this.visibleResultBlocks.length > 0;
    },
    detailTitle() {
      if (!this.detail) return '';
      if (this.detail.category === 'questions' && this.detail.question) {
        const code = this.detail.question.code || '';
        return code ? `${code}` : 'Question';
      }
      return this.detail.title || '';
    },
  },
  watch: {
    activeCategories: {
      handler() {
        if (this.lastQuery) this.runSearch();
      },
      deep: true,
    },
    questionScope() {
      if (this.lastQuery && this.questionsCategoryChecked) this.runSearch();
    },
  },
  created() {
    if (this.$route.query.from) {
      this.returnPath = this.$route.query.from;
    } else if (this.$route.query.source === 'notes') {
      this.returnPath = '/noteslistselection';
    }
    if (this.$route.query.q) {
      this.query = this.$route.query.q;
      this.runSearch();
    }
  },
  methods: {
    highlightHtml(html) {
      return highlightHtml(html, this.lastQuery || this.query);
    },

    highlightPlain(text) {
      return highlightPlain(text, this.lastQuery || this.query);
    },

    goBack() {
      this.$router.push(this.returnPath);
    },

    clearSelection() {
      this.selectedHit = null;
      this.detail = null;
      this.detailError = '';
    },

    syncSearchQueryToRoute(q) {
      const nextQuery = { ...this.$route.query, q };
      if (this.$route.query.q === q) return;
      this.$router.replace({ path: this.$route.path, query: nextQuery }).catch(() => {});
    },

    async runSearch() {
      const q = (this.query || '').trim();
      if (!q) return;
      if (!this.activeCategories.length) {
        this.searchError = 'Select at least one category.';
        return;
      }

      this.loading = true;
      this.searchError = '';
      this.hasSearched = true;
      this.selectedHit = null;
      this.detail = null;

      try {
        const res = await get('/search', {
          q,
          question_scope: this.questionScope,
          categories: this.activeCategories,
        });
        this.lastQuery = res.data.query || q;
        this.results = res.data.results || {};
        this.syncSearchQueryToRoute(this.lastQuery);
      } catch (e) {
        this.results = {};
        this.searchError = 'Search failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async selectHit(category, item) {
      this.selectedHit = { category, item };
      this.detailLoading = true;
      this.detailError = '';
      this.detail = null;

      try {
        const params = {
          category,
          id: item.id,
          record_type: item.record_type || undefined,
          source_theme: item.source_theme?.key || undefined,
        };
        const res = await get('/search/detail', params);
        const data = res.data.data || {};
        this.detail = {
          ...data,
          category,
          context_label: item.context_label || null,
        };
      } catch (e) {
        this.detailError = 'Could not load this result.';
      } finally {
        this.detailLoading = false;
      }
    },

    /**
     * QuestionsPage loads a list by entity id (presentation/condition/sublist/chapter),
     * not by question id — same pattern as NotesPage.navigateToQuestion.
     */
    openQuestionInApp() {
      const q = this.detail && this.detail.question;
      if (!q) return;
      const hit = (this.selectedHit && this.selectedHit.item) || {};
      const src = { ...hit, ...q };

      let title;
      let entityId;
      if (src.sublist_id) {
        title = 'Sublist';
        entityId = src.sublist_id;
      } else if (src.condition_id) {
        title = 'Conditions';
        entityId = src.condition_id;
      } else if (src.presentation_id) {
        title = 'Presentations';
        entityId = src.presentation_id;
      } else if (src.subject_id) {
        title = 'Chapter';
        entityId = src.subject_id;
      } else {
        return;
      }

      const startCode = src.code || q.code || '';
      localStorage.setItem('questiontitle', title);
      if (startCode) {
        localStorage.setItem('questionStartCode', startCode);
      }
      try {
        localStorage.setItem(
          'questionBreadcrumbLabels',
          JSON.stringify(['MLA CONTENT MAP', 'Search', title])
        );
      } catch (e) { /* ignore */ }

      this.$router.push({
        name: 'QuestionsPage',
        params: { id: entityId },
        query: {
          from: this.$route.fullPath,
          ...(startCode ? { startCode } : {}),
        },
      });
    },

    openNoteInApp() {
      if (!this.selectedHit || !this.detail) return;
      const type = this.detail.record_type || this.selectedHit.item.record_type || 'notes';
      const id = this.selectedHit.item.id;
      const title = this.detail.title || 'Notes';
      localStorage.setItem('notestitle', title);
      localStorage.setItem('notestype', type === 'subnotes' ? 'subnotes' : 'notes');
      localStorage.setItem('notesid', String(id));
      localStorage.setItem('notesListRestoreSection', 'BY AREAS');
      localStorage.setItem('notesListRestoreViewMode', 'areas');
      this.$router.push({
        path: '/notespage',
        query: { type: type === 'subnotes' ? 'subnotes' : 'notes', id: String(id), from: this.$route.fullPath },
      });
    },
  },
};
</script>

<style scoped>
.search-page {
  min-height: calc(100vh - 120px);
  background: #fff;
  text-align: left;
}

.search-top-banner {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 0;
}

.search-top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-top-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.search-back-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
}

.search-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 24px 20px 40px;
  min-height: calc(100vh - 180px);
}

.search-body--split {
  flex-direction: row;
  align-items: flex-start;
  gap: 0;
  padding: 0;
}

.search-sidebar {
  width: 233px;
  flex: none;
  min-height: auto;
}

.search-body--split .search-sidebar {
  width: 25%;
  flex: 0 0 25%;
  border-right: 1px solid #d0d2d3;
  min-height: calc(100vh - 180px);
}

.search-sidebar-inner {
  padding: 0;
}

.search-body--split .search-sidebar-inner {
  padding: 24px 12px 40px;
  position: sticky;
  top: 0;
}

.search-main {
  width: 75%;
  flex: 1 1 75%;
  min-width: 0;
  min-height: calc(100vh - 180px);
}

.search-results-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-controls-box {
  width: 100%;
  border: 1px solid #1A90FF;
  border-radius: 20px;
  box-shadow: 1.42px 1.42px 2.84px rgba(0, 0, 0, 0.5);
  padding: 13px 10px;
}

.search-page--notes .search-controls-box,
.search-page--notes .search-input-row input {
  border-color: #faad1b;
}

.search-page--notes .search-back-to-results:hover {
  color: #faad1b;
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-back-to-results {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #929497;
  flex-shrink: 0;
}

.search-back-to-results:hover {
  color: #1A90FF;
}

.search-input-row input {
  flex: 1;
  border: 0.5px solid #1A90FF;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 14px;
  font-family: Helveticacondensed, Helvetica, sans-serif;
}

.search-input-row input:focus {
  outline: none;
}

.search-go-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.search-category-checks {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 8px;
}

.search-check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-family: Helveticacondensed, Helvetica, sans-serif;
  color: #58595B;
  position: relative;
}

.search-check-row input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.search-check-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid #939598;
  border-radius: 3px;
  flex-shrink: 0;
  background: #fff;
  position: relative;
}

.search-check-row input:checked + .search-check-box {
  background: #1A90FF;
  border-color: #1A90FF;
}

.search-check-row input:checked + .search-check-box::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.search-question-scope {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid #d0d2d3;
  padding-left: 4px;
}

.search-scope-label {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 600;
  color: #58595B;
}

.search-radio-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 13px;
  color: #58595B;
  cursor: pointer;
}

.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.search-result-block {
  border: 0.5px solid;
  border-radius: 20px;
  overflow: hidden;
}

.search-result-head {
  padding: 8px 12px 6px;
  box-shadow: 1.42px 1.42px 2.84px rgba(0, 0, 0, 0.5);
}

.search-result-head h4 {
  margin: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.search-result-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 16px;
}

.search-result-num {
  border: none;
  padding: 12px 0;
  border-radius: 5px;
  font-family: Helveticacondensed, Helvetica, sans-serif;
  font-size: 12px;
  width: 36px;
  height: 31px;
  line-height: 7px;
  cursor: pointer;
  color: #000;
}

.search-detail-panel {
  padding: 24px 28px 40px;
  overflow-y: auto;
  max-height: calc(100vh - 180px);
}

.search-detail-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  border: none;
  background: transparent;
  color: #1A90FF;
  font-size: 14px;
  font-weight: 600;
  font-family: Helveticacondensed, Helvetica, sans-serif;
  cursor: pointer;
  padding: 4px 0;
}

.search-page--notes .search-detail-back {
  color: #faad1b;
}

.search-detail-back:hover {
  text-decoration: underline;
}

.search-detail-body {
  max-width: 900px;
}

.search-context-banner {
  background: #eef6ff;
  border-left: 4px solid #1A90FF;
  padding: 10px 14px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #231F20;
  border-radius: 0 8px 8px 0;
}

.search-detail-title {
  font-size: 18px;
  margin: 0 0 16px;
  color: #58595B;
}

.search-q-text {
  border: 1px solid #d0d2d3;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  line-height: 1.5;
}

.search-q-option {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

.search-open-full {
  margin-top: 16px;
  background: #1A90FF;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
}

.search-open-full--notes {
  background: #F59C00;
}

.search-rich-content {
  line-height: 1.55;
}

.search-state {
  padding: 20px;
  text-align: center;
  color: #58595B;
}

.search-state--error {
  color: #ED1C24;
}

.search-page >>> .search-hit,
.search-page ::v-deep .search-hit,
.search-page >>> mark.search-hit,
.search-page ::v-deep mark.search-hit {
  background: #ffe566;
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}

.search-state--hint {
  color: #929497;
}

@media (max-width: 900px) {
  .search-body--split {
    flex-direction: column;
  }

  .search-body--split .search-sidebar,
  .search-main {
    width: 100%;
    flex: none;
    min-height: auto;
  }

  .search-body--split .search-sidebar {
    border-right: none;
    border-bottom: 1px solid #d0d2d3;
  }

  .search-body--split .search-sidebar-inner {
    position: static;
  }

  .search-detail-panel {
    max-height: none;
  }
}
</style>
