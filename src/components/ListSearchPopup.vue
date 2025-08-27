<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-box">
      <!-- Top bar with search + close -->
      <div class="popup-header">
        <img src="../../public/images/searchlistpopupicon.png" alt="search" class="icon-search" />
        <svg
          @click="closePopup"
          xmlns="http://www.w3.org/2000/svg"
          class="icon-close"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <div class="popup-content">
        <div class="popup-search-box">
          <!-- search header -->
          <div class="popup-search-header">
            <div class="search-left-arrow-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon-chevron-right"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <input type="search" id="search" placeholder="Search..." name="search" />
            <!-- search svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#grad)"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8AD9FF" />
                  <stop offset="100%" stop-color="#115FFF" />
                </linearGradient>
              </defs>
              <circle cx="13" cy="11" r="8" />
              <line x1="3" y1="21" x2="7.35" y2="16.65" />
            </svg>
          </div>

          <!-- switches -->
          <div class="popup-search-switches">
            <div
              v-for="(item, index) in switches"
              :key="index"
              class="popup-search-switch"
            >
              <label class="switch">
                <input type="checkbox" v-model="item.active" />
                <span class="slider"></span>
              </label>
              <h6>{{ item.label }}</h6>
            </div>
          </div>
        </div>

        <!-- Render multiple PopupFoundResult for active switches -->
        <div class="results-list">
          <PopupFoundResult
            v-for="(item, index) in activeSwitches"
            :key="index"
            :label="item.label"
            :keyword="keyword"
            :resultsCount="34"
            :theme="item.theme"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupFoundResult from "./PopupFoundResult.vue";

export default {
  name: "ListSearchPopup",
  components: {
    PopupFoundResult,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: "Fatigue",
      switches: [
        {
          label: "Questions",
          active: false,
          theme: { primary: "#1A90FF", secondary: "#D7EBFF" },
        },
        {
          label: "Notes",
          active: false,
          theme: { primary: "#F59C00", secondary: "#fce2b5" },
        },
        {
          label: "Journal",
          active: false,
          theme: { primary: "#28A745", secondary: "#D4EDDA" },
        },
        {
          label: "Comment",
          active: false,
          theme: { primary: "#6F42C1", secondary: "#E0D4F7" },
        },
      ],
    };
  },
  computed: {
    activeSwitches() {
      return this.switches.filter((s) => s.active);
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-box {
  width: 959px;
  height: auto;
  background: #fff;
  border: 2px solid #1A90FF;
  border-radius: 40px;
  position: relative;
  padding: 20px;
  opacity: 0.9;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-search {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-close {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.popup-content {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  padding: 0px 30px 30px 30px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.icon-chevron-right {
  width: 18px;
  height: 18px;
  cursor: pointer;
  color: #929497;
  transition: 0.2s;
  position: relative;
  top: 2px;
}

.icon-chevron-right:hover {
  color: #1A90FF;
}

.popup-search-box {
  width: 233px;
  border: 1px solid #1A90FF;
  border-radius: 20px;
  box-shadow: 1.42px 1.42px 2.84px 0px #00000080;
  padding: 13px 10px;
}

.popup-search-header {
  display: flex;
  align-items: center;
  gap: 5px;
}

.popup-search-header input {
  width: 100%;
  border: 0.5px solid #1A90FF;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
  font-family: 'Helveticacondensed';
  letter-spacing: 0.5px;
}

.popup-search-header input:focus {
  outline: none;
}

/* switches style */
.popup-search-switches {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 0px 0px 30px;
}

.popup-search-switch {
  display: flex;
  align-items: center;
  gap: 7px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 16px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 20px;
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: .3s;
}

input:checked + .slider {
  background-color: #A6A8AB;
}

input:checked + .slider:before {
  transform: translateX(16px);
  background-color: #95EC51;
}

.popup-search-switch h6 {
  color: #58595B;
  font-size: 14px;
  font-family: 'Helveticacondensed';
  letter-spacing: 0.5px;
}
</style>
