<template>
  <div class="maincont"  :style="{ width: width + 'px' , gap:Gap + 'px'}">

  
  <div class="linear-progress-container" :style="{ height: Containerheight + 'px', backgroundColor: trackColor }">
    <div
      class="linear-progress-bar"
      :style="{
        width: currentPercentage + '%',
        backgroundColor: progressColor,
        height: height + 'px',
        transition: 'width 0.5s ease'
      }"
    ></div>
    
  </div>
  <div class="linear-progress-texts" :style="{ fontSize: fontSize + 'px', color: color }">
    {{ currentPercentage }}%
  </div>
</div>
</template>

<script>
export default {
  name: 'LinearProgress',
  props: {
    percentage: { type: Number, default: 75 },
    height: { type: Number, default: 12 },
    Containerheight: { type: Number, default: 14 },

    trackColor: { type: String, default: 'red' },
    progressColor: { type: String, default: '#84e231' },
    color: { type: String, default: '#98a7af' },
    fontSize: { type: Number, default: 32 },
    fontcolor: { type: String, default: '#98a7af' },
    width:{type: Number, default: 210},
    Gap:{type: Number, default: 20}

  },
  data() {
    return {
      currentPercentage: 0
    };
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
      const duration = 1000;
      const startVal = this.currentPercentage;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressPercent = Math.min(progress / duration, 1);
        this.currentPercentage = Math.floor(startVal + (target - startVal) * progressPercent);

        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          this.currentPercentage = target;
        }
      };

      requestAnimationFrame(step);
    }
  }
};
</script>

<style scoped>

.maincont {
  width: 17%;
  display: flex;
  justify-content: space-between;
  align-items: center;
   
}
.linear-progress-container {
  position: relative;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1.8px solid white;
}

.linear-progress-bar {
  border-radius: 10px;
}

.linear-progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  white-space: nowrap;
  font-family: Helveticacondensed, sans-serif;
}

.linear-progress-texts {font-family: 'Helveticacondensed';color: #98a7af;font-weight: bold;}
</style>
