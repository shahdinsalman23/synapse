<template>
    <div :class="wrapperClass">
      <div class="clinical-practice-total">
        <h4>{{ title }}</h4>
        <div class="total-percentage-marks">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: totalPercent }"></div>
          </div>
          <h5>{{ total }}</h5>
        </div>
      </div>
  
      <!-- MAIN LIST -->
      <div
        v-for="(item, pIndex) in items"
        :key="pIndex"
        class="mla-list-item-wrapper"
      >
        <div class="mla-list-item" @click="GOtoroute(item)">
          <!-- Arrow for parents with children -->
          
  
          <h4 class="item-title">{{ item.title }}
            <button
            v-if="item.children && item.children.length"
            class="arrow-btn"
            @click.stop="toggleParent(pIndex)"
            :aria-expanded="!!expandedParents[pIndex]"
          >
            {{ expandedParents[pIndex] ? '▼' : '▶' }}

            
          </button>
          </h4>
          <h5 class="item-progress" v-if="item.progress">{{ item.progress }}</h5>
        </div>
  
        <!-- SUBGRID (first-level children) -->
        <transition name="slide-fade">
          <div v-if="expandedParents[pIndex]" class="subgrid">
            <div  v-for="(child, cIndex) in item.children"
            :key="cIndex">

           
            <div
             
              class="subgrid-item"
            >
              <div class="subgrid-item-row" @click="GOtoroute(child)">
                
  
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
                    @click="GOtoroute(g)"
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
    },
    data() {
      return {
        // track which parent items are expanded (keyed by parent index)
        expandedParents: {},
        // track expanded children per parent: { parentIndex: { childIndex: true } }
        expandedChildren: {}
      };
    },
    computed: {
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
      GOtoroute(item) {
        console.log('items' , item)
        if (this.condition === 'conditionAreas') {
          this.$emit('AreaCondition', item);
          return;
        }
        // keep your current behavior (adjust route as needed)

        if(item.children){
            return

        }
        this.$router.push('/questionspage');
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
    background: #d7ebff;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #69baff;
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
    font-size: 13px;
    font-weight: 600;
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
  
  .total-percentage-marks {
    display: flex;
    align-items: center;
    gap: 5px;
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
  