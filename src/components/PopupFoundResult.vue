<template>
  <div class="main-box">
    <div
      class="found-search-result-box"
      :style="{ borderColor: theme.primary }"
    >
      <div
        class="found-result-head"
        :style="{ background: theme.primary, borderColor: theme.primary }"
      >
        <h4>
          Found {{ resultsCount }} result for '{{ keyword }}' in {{ label }}
        </h4>
      </div>
      <div class="found-search-content">
        <div
          v-for="num in resultsCount"
          :key="num"
          class="number-box"
          :style="{ background: theme.secondary }"
        >
          {{ num }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupFoundResult",
  props: {
    label: { type: String, required: true },
    keyword: { type: String, required: true },
    resultsCount: { type: Number, default: 10 },
    theme: {
      type: Object,
      default: () => ({
        primary: "#1A90FF",
        secondary: "#D7EBFF",
      }),
    },
  },
};
</script>

<style scoped>
.main-box {
  width: 100%;
}

.found-search-result-box {
  border: 0.5px solid;
  border-radius: 20px;
}

.found-result-head {
  border: 0.5px solid;
  box-shadow: 1.42px 1.42px 2.84px 0px #00000080;
  padding: 8px 0px 6px 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.found-result-head h4 {
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}

.found-search-content {
  padding: 20px 20px;
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
}

.number-box {
  padding: 12px 0px;
  border-radius: 5px;
  font-family: "Helveticacondensed";
  color: #000000;
  font-size: 12px;
  width: 36px;
  height: 31px;
  line-height: 7px;
  text-align: center;
}
</style>
