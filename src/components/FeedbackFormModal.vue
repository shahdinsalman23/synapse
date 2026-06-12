<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="feedback-form-box">
        <div class="feedback-modal-header">
          <h4 class="feedback-modal-title">Feedback</h4>
          <button type="button" class="feedback-modal-close crossspan" aria-label="Close" @click="closeModal">
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.38013 0.75L8.1701 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M8.1701 0.75L1.38013 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <form action="">
          <div class="feedbackform-button">
            <button
              type="button"
              @click.prevent="toggleOptions('question')"
              :class="{ 'active-btn': activeButton === 'question' }"
            >Question</button>
            <div class="feeback-question-options" v-show="activeButton === 'question'">
              <div class="feeback-question-option">
                <input type="radio" value="incorrect" />
                <p>Incorrect</p>
              </div>
              <div class="feeback-question-option">
                <input type="radio" value="needs-improvement" />
                <p>Needs improvement</p>
              </div>
            </div>
          </div>
          <div class="feedback-textarea-box">
            <textarea
              ref="feedbackArea"
              class="feedback-textarea"
              rows="1"
              placeholder="Your feedback..."
              @input="onFeedbackTextareaInput"
            ></textarea>
          </div>
          <div class="feedbackform-submitbtn">
            <button type="submit">Submit</button>
            <div class="cardbottom-shadow">
              <img src="/images/cardshadow.png" alt="">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { autoGrowFeedbackTextarea } from '@/views/lib/feedbackTextareaAutoGrow';

export default {
  data() {
    return {
      activeButton: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    toggleOptions(buttonType) {
      this.activeButton = this.activeButton === buttonType ? null : buttonType;
    },
    onFeedbackTextareaInput() {
      autoGrowFeedbackTextarea(this.$refs.feedbackArea);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.25);
}

.modal-content {
  pointer-events: auto;
}
</style>
