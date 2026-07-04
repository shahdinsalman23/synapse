<template>
    <div :class="wrapperClass">
      <div class="white-back">

      
      <div class="clinical-practice-total">
        

        
        <h4>{{ title }}</h4>
        <div class="total-percentage-marks">
          <div class="progress-bar" :class="{ 'progress-bar--score': showScoreDetail }">
            <div class="progress-fill" :style="{ width: totalPercent }"></div>
          </div>
          <h5>{{ total }}</h5>
        </div>
      </div>
      </div>
  
      <!-- MAIN LIST -->
      <div
        v-for="(item, pIndex) in items"
        :key="pIndex"
        class="mla-list-item-wrapper"
      >
        <div class="mla-list-item" :class="{ 'mla-row-highlight': isHighlighted(item) }" @click="GOtoroute(item, pIndex)">
          <!-- Arrow for parents with children -->
          
  
          <h4 class="item-title">{{pIndex + 1}}. {{ item.title }}
            <button
            v-if="item.children && item.children.length"
            class="arrow-btn"
            @click.stop="toggleParent(pIndex)"
            :aria-expanded="!!expandedParents[pIndex]"
          >
            {{ expandedParents[pIndex] ? '▼' : '▶' }}

            
          </button>
          </h4>
          <!-- Score progress (correct/total) -->
          <div class="item-score-wrap">
            <template v-if="!showScoreDetail">
              <div class="item-progress-wrap">
                <div class="item-progress-bar">
                  <div class="item-progress-fill" :style="{ width: progressPercent(item) }"></div>
                </div>
                <span class="item-progress-only">{{ progressFraction(item) }}</span>
              </div>
            </template>
            <template v-else-if="hasAttemptedForScoreBar(item)">
              <div class="attemptscore">
              <span class="item-score-pct">{{ scorePercent(item) }}</span>
              
              <span class="item-score-counts">{{ item.correct_count }}/{{ item.questions_count ?? 0 }}</span>
              </div>
              <div class="item-score-bar">
                <div
                  class="item-score-fill"
                  :style="{ width: scorePercent(item) }"
                ></div>
              </div>
            </template>
            <template v-else>
              <span class="item-score-zero">0/{{ item.questions_count ?? 0 }}</span>
            </template>
          </div>

        </div>
  
        <!-- SUBGRID (first-level children) --> 
        <transition name="slide-fade">
          <div v-if="expandedParents[pIndex]" class="subgrid">
            <div  v-for="(child, cIndex) in item.children"
            :key="cIndex">

           
            <div
              class="subgrid-item"
              :class="{ 'mla-row-highlight': isHighlighted(child) }"
            >
              <div class="subgrid-item-row" @click="GOtorouteSublist(child, item, pIndex, cIndex)">
                
  
                <div class="child-title-wrap">
                  <h5 class="child-title">{{ child.title }}
                    <button
                  v-if="child.children && child.children.length"
                  class="arrow-btn child-arrow"
                  @click.stop="toggleChild(pIndex, cIndex)"
                  :aria-expanded="expandedChildren[pIndex] && !!expandedChildren[pIndex][cIndex]"
                >
                  {{ expandedChildren[pIndex] && expandedChildren[pIndex][cIndex] ? '▼' : '▶' }}
                </button>
                  </h5>
                  <!-- <small v-if="child.questions" class="child-questions"> {{ formatQuestions(child.questions) }} </small> -->
                </div>
  
                <div class="child-progress" v-if="child.progress">{{ child.progress }}</div>
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
                    :class="{ 'mla-row-highlight': isHighlighted(g) }"
                    @click="GOtorouteGrandchild(g, child, item, pIndex, cIndex, gIndex)"
                  >
                    <h5 class="gc-title">{{ g.title }}</h5>
                    <!-- <small v-if="g.questions" class="gc-questions"> ({{ g.questions.join(', ') }})</small>ss -->
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
  export default {
    name: "MLASubList",
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
      /** false: list shows attempted/total only; true: score bars (only rows with attempts) */
      showScoreDetail: {
        type: Boolean,
        default: true
      },
      /**
       * Internal section key used for restoring activeSection on back-nav.
       * 'BY AREAS' (default) or 'ALPHABETICALLY' for the Conditions column.
       */
      listSection: {
        type: String,
        default: 'BY AREAS'
      }
    },
    data() {
      return {
        expandedParents: {},
        expandedChildren: {},
        highlightItemId: null,
        restoreApplied: false,
      };
    },
    watch: {
      items: {
        handler() {
          this.$nextTick(() => this.applyQuestionListRestore());
        },
        deep: true,
      },
    },
    mounted() {
      this.$nextTick(() => this.applyQuestionListRestore());
    },
    activated() {
      this.restoreApplied = false;
      this.$nextTick(() => this.applyQuestionListRestore());
    },
    computed: {
      breadcrumbSectionLabel() {
        if (this.listSection === 'ALPHABETICALLY') return 'Presentations and conditions';
        return 'By areas';
      },
      // small helper to show total percent in progress-fill width,
      // expects total like '0/134' or you can pass float like '20%'
      totalPercent() {
        // If total is a percent string return it, otherwise try to parse 'x/y'
        if (!this.total) return "0%";
        if (this.total.includes('%')) return this.total;
        const parts = (this.total || "").split('/');
        if (parts.length === 2) {
          const a = Number(parts[0]) || 0;
          const b = Number(parts[1]) || 1;
          const pct = Math.round((a / b) * 100);
          return `${pct}%`;
        }
        return "20%";
      }
    },
    methods: {
      isHighlighted(item) {
        if (!item || this.highlightItemId == null) return false;
        const hid = item.id != null ? String(item.id) : '';
        return hid !== '' && hid === String(this.highlightItemId);
      },

      persistQuestionListRestore({ pIndex, pId, cIndex, cId, gIndex, gId }) {
        try {
          localStorage.setItem('questionListRestore_section', this.listSection || 'BY AREAS');
          localStorage.setItem('questionListRestore_column', this.title || '');
          localStorage.setItem('questionListRestore_parentIndex', String(pIndex ?? ''));
          localStorage.setItem('questionListRestore_parentId', String(pId ?? ''));
          localStorage.setItem('questionListRestore_childIndex', cIndex != null ? String(cIndex) : '');
          localStorage.setItem('questionListRestore_childId', cId != null ? String(cId) : '');
          localStorage.setItem('questionListRestore_grandIndex', gIndex != null ? String(gIndex) : '');
          localStorage.setItem('questionListRestore_grandId', gId != null ? String(gId) : '');
        } catch (e) { /* ignore */ }
      },

      applyQuestionListRestore() {
        if (this.restoreApplied) return;

        const col = localStorage.getItem('questionListRestore_column');
        if (!col || col !== this.title) return;

        const pidRaw = localStorage.getItem('questionListRestore_parentIndex');
        if (pidRaw === null || pidRaw === '') return;

        const pIndex = parseInt(pidRaw, 10);
        if (Number.isNaN(pIndex) || !this.items || !this.items.length || !this.items[pIndex]) return;

        const highlightId = localStorage.getItem('questionPendingHighlightId');
        const suppress = localStorage.getItem('questionSuppressListHighlight') === '1';

        if (!suppress && !highlightId) return;

        this.restoreApplied = true;

        // Only expand the parent row if we're restoring a child/grandchild underneath it.
        // If the user clicked a top-level leaf (no children), expanding would show an empty subgrid.
        const cidRaw = localStorage.getItem('questionListRestore_childIndex');
        const gidRaw = localStorage.getItem('questionListRestore_grandIndex');
        const hasChild = cidRaw !== null && cidRaw !== '';

        if (hasChild) {
          this.expandedParents = { ...this.expandedParents, [pIndex]: true };

          const cIndex = parseInt(cidRaw, 10);
          if (!Number.isNaN(cIndex) && (gidRaw !== null && gidRaw !== '')) {
            // Expand the child panel so grandchild list is visible
            this.expandedChildren = {
              ...this.expandedChildren,
              [pIndex]: { ...(this.expandedChildren[pIndex] || {}), [cIndex]: true },
            };
          }
        }

        this.highlightItemId = (suppress || !highlightId) ? null : String(highlightId);

        if (this.highlightItemId) {
          this.$nextTick(() => {
            const el = this.$el && this.$el.querySelector('.mla-row-highlight');
            if (el && typeof el.scrollIntoView === 'function') {
              el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          });
        }

        try {
          [
            'questionListRestore_column', 'questionListRestore_parentIndex', 'questionListRestore_parentId',
            'questionListRestore_childIndex', 'questionListRestore_childId',
            'questionListRestore_grandIndex', 'questionListRestore_grandId',
            'questionPendingHighlightId', 'questionSuppressListHighlight',
          ].forEach(k => localStorage.removeItem(k));
        } catch (e) { /* ignore */ }
      },

      scorePercent(item) {
        const correct = Number(item.correct_count) || 0;
        const total   = Number(item.questions_count) || 1;
        return Math.round((correct / total) * 100) + '%';
      },

      progressFraction(item) {
        const attempted = Number(item.attempted_count);
        const total = Number(item.questions_count) || 0;
        const a = Number.isFinite(attempted) ? attempted : 0;
        return `${a}/${total}`;
      },

      progressPercent(item) {
        const attempted = Number(item.attempted_count) || 0;
        const total = Number(item.questions_count) || 0;
        if (!total) return '0%';
        return Math.min(Math.round((attempted / total) * 100), 100) + '%';
      },

      /** Show scoring bar only when the user has attempted at least one question in this row */
      hasAttemptedForScoreBar(item) {
        if (item.attempted_count !== undefined && item.attempted_count !== null) {
          return (Number(item.attempted_count) || 0) > 0;
        }
        return (Number(item.correct_count) || 0) > 0;
      },

      setQuestionBreadcrumb(labels) {
        try {
          localStorage.setItem('questionBreadcrumbLabels', JSON.stringify(labels));
        } catch (e) {
          /* ignore quota / private mode */
        }
      },

      GOtoroute(item, pIndex) {
        console.log('items' , item , this.title)
        if (this.condition === 'conditionAreas') {
          this.$emit('AreaCondition', item);
          return;
        }

        if(item.children?.length > 0){
            return
        }

        this.persistQuestionListRestore({ pIndex, pId: item.id, cIndex: null, cId: null, gIndex: null });

        localStorage.setItem("questiontitle", this.title);
        this.setQuestionBreadcrumb([
          'MLA Content Map',
          this.breadcrumbSectionLabel,
          this.title,
          item.title || 'Questions'
        ]);
        this.$router.push(`/questionspage/${item.id}`);
//         this.$router.push({
//   path: '/questionspage',
//   query: {
//     id: item.id,
//     area: item.area_id
//   }
// })

      },

      GOtorouteSublist(child, parentItem, pIndex, cIndex) {
        console.log('items' , child , this.title)
        if (this.condition === 'conditionAreas') {
          this.$emit('AreaCondition', child);
          return;
        }

        if(child.children?.length > 0){
            return
        }

        this.persistQuestionListRestore({ pIndex, pId: parentItem?.id, cIndex, cId: child.id, gIndex: null });

        localStorage.setItem("questiontitle", "Sublist");
        this.setQuestionBreadcrumb([
          'MLA Content Map', 
          this.breadcrumbSectionLabel,
          this.title,
          (parentItem && parentItem.title) || '',
          child.title || 'Questions'
        ].filter(Boolean));
        this.$router.push(`/questionspage/${child.id}`);


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
      },

      GOtorouteGrandchild(g, child, parentItem, pIndex, cIndex, gIndex) {
        if (this.condition === 'conditionAreas') {
          return;
        }
        this.persistQuestionListRestore({ pIndex, pId: parentItem?.id, cIndex, cId: child?.id, gIndex, gId: g?.id });
        localStorage.setItem("questiontitle", this.title);
        this.setQuestionBreadcrumb([
          'MLA Content Map', 
          this.breadcrumbSectionLabel,
          this.title,
          (parentItem && parentItem.title) || '',
          (child && child.title) || '',
          g.title || 'Questions'
        ].filter(Boolean));
        this.$router.push(`/questionspage/${g.id}`);
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
    background: #d7ebff;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #69baff;
  }

  .areas-clinical-practice {
   
    height: 83vh;
    overflow-y: scroll;
}

.areas-professional-knowledge {
    height: 83vh;
    overflow-y: scroll;
}
  /* keep your existing look + additional layout for nested grids */
 
  
  .mla-list-item-wrapper {
    margin-bottom: 8px;
  }
  
  /* main item row (same styling you had) */
  .mla-list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: #D7EBFF;
    margin: 0px 0px 7px 0px;
    padding: 17px 14px 12px 20px;
    border-radius: 10px;
    cursor: pointer;
}
  
  .mla-list-item:hover {
    background: #c2e0ff; /* hover shade */
  }
  
  

.mla-list-item h4 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}

.mla-list-item h5 {
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
    border-left: 3px solid #a5d8ff; /* blue accent border */
  }
  
  .sublist .mla-list-item {
    background: #ecf6ff; /* lighter blue for children */
  }
  
  .sublist .mla-list-item:hover {
    background: #d9eeff;
  }

  .subgrid > div:nth-child(odd) .subgrid-item {
    background: #94ccfb;
  }
  .subgrid > div:nth-child(even) .subgrid-item {
    background: #c2e0ff;
  }

  .grandchild-list > .grandchild-item:nth-child(odd) {
    background: #c2e0ff; /* dark blue */
  }
  .grandchild-list > .grandchild-item:nth-child(even) {
    background: #94ccfb; /* light blue */
  }
  
  
  /* Alternate background for grandchild list */
  .grandchild-list > div:nth-child(odd) .grandchild-item {
    background: #c2e0ff; /* your original */
  }
  .grandchild-list >div:nth-child(even)  .grandchild-item {
    background: #94ccfb; /* slightly lighter */
  }
  
  .item-title {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
    margin: 0;
  }
  
  .item-progress {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
    margin: 0;
  }

  /* ── Per-row score progress ── */
  .item-score-wrap {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 110px;
    flex-shrink: 0;
    align-content: center;
  }

  .item-score-pct {
    font-size: 13px;
    font-weight: 700;
    color: #231F20;
    line-height: 1;
  }

  .item-score-bar {
    width: 100%;          /* fills the fixed 90px column */
    height: 6px;
    background: #DF001B;
    border-radius: 4px;
    overflow: hidden;
  }

  .item-score-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 4px;
    transition: width 0.4s ease;
  }

  .item-score-counts {
    font-size: 10px;
    color: #555;
    line-height: 0;
  }

  .attemptscore {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5px;
    gap: 5px;
}

  /* zero state: keep the same column width, right-aligned like scored rows */
  .item-score-zero {
    font-size: 13px;
    color: #231F20;
    font-weight: 300;
    text-align: right;
    width: 100%;
  }
  
  /* arrow button */
  .arrow-btn {
    background: none;
    border: none;
    font-size: 14px;
    margin-left: 5px;
    cursor: pointer;
  }
  
  /* subgrid (children shown when parent expanded) */
  .subgrid {
    margin-top: 10px;
    padding: 12px 0px 12px 25px;
    background: #f5fbff;
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

.grandchild-item
 {
   
    padding: 17px 14px 12px 20px;
    border-radius: 6px;
 
    cursor: pointer;
    width: 100%;
    display: flex
;
}


  
  .gc-title {
    font-size: 12px;
    font-weight: 600;
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
    width: 60px;
    height: 6px;
    overflow: hidden;
    border: 1px solid #FFFFFF;
  }
  .progress-fill {
    background: #9DED6C;
    height: 100%;
  }

  .progress-bar--score {
    background: #DF001B;
  }
  
  .total-percentage-marks {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .total-fraction-plain {
    margin: 0;
    color: #231f20;
    font-size: 14px;
    font-family: 'Helveticacondensed', sans-serif;
    font-weight: 300;
  }

  .item-progress-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    width: 100%;
  }

  .item-progress-bar {
    width: 70px;
    height: 6px;
    background: #9ebfdf;
    border-radius: 4px;
    overflow: hidden;
  }

  .item-progress-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 4px;
    transition: width 0.4s ease;
  }

  .item-progress-only {
    font-size: 10px;
    font-weight: 300;
    color: #231f20;
    text-align: right;
    width: 100%;
  }
  
  /* ── Back-navigation highlight ── */
  .mla-row-highlight {
    outline: 2px solid #1A90FF;
    outline-offset: -2px;
  }
  .mla-list-item.mla-row-highlight {
    border-radius: 10px;
  }
  .subgrid-item.mla-row-highlight {
    border-radius: 8px;
  }
  .grandchild-item.mla-row-highlight {
    border-radius: 6px;
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

  
  </style>
  