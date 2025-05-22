<template>
    <div class="progress-container" :style="{ width: size + 'px', height: size + 'px' }">
      <svg class="progress-ring" :width="size" :height="size">
        <circle
          class="progress-ring__background"
          :stroke="trackColor"
          fill="transparent"
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          :stroke-width="stroke"
        />
        <circle
          class="progress-ring__circle"
          :stroke="progressColor"
          fill="transparent"
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          :stroke-width="stroke"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
        />
      </svg>
      <div class="percentage-text" :style="{ fontSize: fontsize + 'px', color: Color }">{{ currentPercentage  }}%</div>
    </div>
  </template>
  
  <script>

export default {
  name: 'CircularProgress',
  props: {
    percentage: { type: Number, default: 75 },
    size: { type: Number, default: 30 },
    stroke: { type: Number, default: 3 },
    trackColor: { type: String, default: '#eee' },
    Color: { type: String, default: 'white' },
    fontsize: { type: Number, default: 10 },
    progressColor: { type: String, default: '#84e231' }
  },
  data() {
    return {
      currentPercentage: 0
    };
  },
  computed: {
    radius() {
      return (this.size - this.stroke) / 2;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    dashOffset() {
      return this.circumference * (1 - this.currentPercentage / 100);
    }
  },
  watch: {
    percentage: {
      immediate: true,
      handler(newVal) {
        this.animateProgress(newVal);
      }
    }
  },
  methods: {
    animateProgress(target) {
      let start = null;
      const duration = 1000; // 1 second
      const startVal = 0;
      const endVal = target;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentageProgress = Math.min(progress / duration, 1);
        this.currentPercentage = Math.floor(startVal + (endVal - startVal) * percentageProgress);

        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          this.currentPercentage = target; // ensure it lands exactly
        }
      };

      requestAnimationFrame(step);
    }
  }
};
//   export default {
//     name: 'CircularProgress',
//     props: {
//       percentage: {
//         type: Number,
//         default: 75
//       },
//       size: {
//         type: Number,
//         default: 30
//       },
//       stroke: {
//         type: Number,
//         default: 3
//       },
//       trackColor: {
//         type: String,
//         default: '#eee'
//       },

//       Color: {
//         type: String,
//         default: 'white'
//       },
//       fontsize: {
//         type: Number,
//         default: 12
//       },
//       progressColor: {
//         type: String,
//         default: '#84e231' // green
//       }
//     },
//     computed: {
//       radius() {
//         return (this.size - this.stroke) / 2
//       },
//       circumference() {
//         return 2 * Math.PI * this.radius
//       },
//       dashOffset() {
//         return this.circumference * (1 - this.percentage / 100)
//       }
//     }
//   }
  </script>
  
  <style scoped>
  .progress-container {
    position: relative;
    display: inline-block;
 
    border-radius: 50%;
  }
  
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .percentage-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: white;
  
  
    font-family: Helveticacondensed;
  }
  </style>
  