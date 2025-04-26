<template>
    <div class="questionnumber-slide-container" ref="container">
      <!-- Left Scroll Arrow -->
      <div class="questionleft-arrow" @mouseenter="startScroll('left')" @mouseleave="stopScroll"
        @mousedown="fastScroll('left')" @mouseup="stopScroll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </div>
  
      <!-- Question Numbers Slider -->
      <div class="slider-wrapper" v-if="renderReady">
        <div class="questionnumber-slide scrollmenu" ref="scrollContainer" :style="slideStyle"
          @mousedown="onDragStart"
          @mousemove="onDragMove"
          @mouseup="onDragEnd"
          @mouseleave="onDragEnd"
          @touchstart="onDragStart"
          @touchmove="onDragMove"
          @touchend="onDragEnd">
          <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
            :style="{
              background: nav.score
                ? '#d2cbcb'
                : (nav.flag || nav.skip ? 'white' : 'white'),
            }"
            :class="{ 'activeindex': isPresentIndex(indexnav) }"
            @click="handleClick(indexnav)">
            {{ indexnav + 1 }}
  
            <svg v-if="nav.flag" class="red-flag" width="11" viewBox="0 0 19 17">
              <path d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                fill="#ED1C24" />
            </svg>
          </span>
        </div>
      </div>
  
      <!-- Skeleton Loading -->
      <div v-else class="slider-skeleton">
        <span v-for="n in 10" :key="n" class="questionnumber skeleton"></span>
      </div>
  
      <!-- Right Scroll Arrow -->
      <div class="questionright-arrow" @mouseenter="startScroll('right')" @mouseleave="stopScroll"
        @mousedown="fastScroll('right')" @mouseup="stopScroll">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuestionNumberSlider',
    props: {
      allquestions: { type: Array, required: true },
      currentQuestionIndex: { type: Number, required: true },
      renderReady: { type: Boolean, default: true },
      slideStyle: { type: Object, default: () => ({}) },
    },
    emits: ['update:currentQuestionIndex', 'question-clicked'],
    data() {
      return {
        scrollInterval: null,
        scrollDirection: '',
        scrollSpeed: 100,
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
      };
    },
    computed: {
      maxIndex() {
        return this.allquestions.length - 1;
      }
    },
    methods: {
      startScroll(direction) {
        this.scrollDirection = direction;
        if (!this.scrollInterval) {
          this.scrollInterval = setInterval(() => {
            if (this.scrollDirection === 'right' && this.currentQuestionIndex < this.maxIndex) {
              this.$emit('update:currentQuestionIndex', this.currentQuestionIndex + 1);
            } else if (this.scrollDirection === 'left' && this.currentQuestionIndex > 0) {
              this.$emit('update:currentQuestionIndex', this.currentQuestionIndex - 1);
            } else {
              this.stopScroll();
            }
          }, this.scrollSpeed);
        }
      },
      fastScroll(direction) {
        this.scrollDirection = direction;
        if (this.scrollInterval) clearInterval(this.scrollInterval);
  
        this.scrollInterval = setInterval(() => {
          if (direction === 'right' && this.currentQuestionIndex < this.maxIndex) {
            this.$emit('update:currentQuestionIndex', this.currentQuestionIndex + 8);
          } else if (direction === 'left' && this.currentQuestionIndex > 0) {
            this.$emit('update:currentQuestionIndex', this.currentQuestionIndex - 8);
          } else {
            this.stopScroll();
          }
        }, this.scrollSpeed / 2);
      },
      stopScroll() {
        if (this.scrollInterval) {
          clearInterval(this.scrollInterval);
          this.scrollInterval = null;
        }
      },
      isPresentIndex(indexnav) {
        return this.currentQuestionIndex === indexnav;
      },
      handleClick(index) {
        localStorage.setItem('presentindex', index);
        localStorage.setItem('breadcrumps', 'Normal');
        this.$emit('question-clicked', index);
        this.$emit('update:currentQuestionIndex', index);
      },
      onDragStart(e) {
        this.isDragging = true;
        this.startX = e.pageX || e.touches[0].pageX;
        this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
      },
      onDragMove(e) {
        if (!this.isDragging) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - this.startX) * 1.5; // Adjust speed
        this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
      },
      onDragEnd() {
        this.isDragging = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your styles for .questionnumber-slide-container, arrows, etc */
  .scrollmenu {
    cursor: grab;
  }
  .scrollmenu:active {
    cursor: grabbing;
  }

  .slider-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
}

.questionnumber-slide {
    display: flex;
    gap: 1px;
    /* will-change: transform;  <-- REMOVE THIS LINE */
    position: relative;
    padding: 40px 0px 30px 0px;
    /* Optionally, add overflow-x: auto if needed */
}

.questionnumber {
    min-width: 21.83px;
    text-align: center;
    padding: 15px 0px;
    border: 1px solid #231f2040;
    border-radius: 4px;
    flex-shrink: 0;
    font-size: 12px;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    font-family: Helveticacondensed;
    color: #000;
    height: 49.27px;
    display: flex;
    align-items: center;
    justify-content: center;
}

  </style>
  