<template>
  <div class="progress-wrapper">
    <span class="label">{{ label }}</span>
    <div class="progress-bar" :class="{ 'progress-bar--score': mode === 'score' }">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <span class="percentage">{{ progress }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: 'Progress'
    },
    mode: {
      type: String,
      default: 'progress',
      validator: (v) => ['progress', 'score'].includes(v),
    }
  }
}
</script>

<style scoped>
.progress-wrapper {
  display: flex;
  align-items: center;
  background-color:transparent;
  color: white;
  padding: 0px 15px;
  border-radius: 3px;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.label {
  margin-right: 5px;
  font-weight: bold;
}

.progress-bar {
    flex: 1;
    height: 10px;
    background-color: transparent;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 5px 0 0px;
    border: 2px solid #FFFFFF;
}


.progress-fill {
  height: 100%;
  background-color: #9DED6C;
  transition: width 0.3s ease;
}

.progress-bar--score {
  background-color: #DF001B;
}

.percentage {
  font-weight: bold;
}
</style>
