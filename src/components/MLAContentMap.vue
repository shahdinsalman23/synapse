<template>
  <div>
    <div class="mla-content-map">
      <h4>MLA Content Map</h4>
      <button class="mla-areas-btn mla-btn" :class="{ active: viewMode === 'areas' }"  @click="$emit('set-view-mode', 'areas')">Areas</button>
      <button class="mla-presentation-btn mla-btn" :class="{ active: viewMode === 'presentations' }" @click="$emit('set-view-mode', 'presentations')">Presentations and conditions</button>
      <p>(Only reflects all areas of clinical practice)</p>
      <div class="precon-btnclick-data" v-if="viewMode === 'presentations'">
        <div class="precon-radio-btn" :class="{ active: selectedOption === 'alphabetically' }" @click="selectOption('alphabetically')">
          <input type="radio" name="sortOption" value="alphabetically" v-model="selectedOption" />
          <h6>Alphabetically</h6>
        </div>
        <div class="precon-radio-btn" :class="{ active: selectedOption === 'byareas' }" @click="selectOption('byareas')">
          <input type="radio" name="sortOption" value="byareas" v-model="selectedOption" />
          <h6>by areas</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MLAContentMap",
  props: {
    viewMode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedOption: 'alphabetically'
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.$emit('sort-changed', option);
    }
  }
}
</script>


<style scoped>

.mla-btn.active {
  background: #1A90FF;
  color: #FFF;
  border-color: #0276BA;
}



</style>