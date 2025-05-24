<template>
  <div class="modal-overlay"  @click.self="closeModal">
    <div class="modal-content">
      <div class="feedback-form-box">
        <h4>Share feedback</h4>
        <form action="">
          <div class="feedbackform-button">
            <div class="feedbackform-button">
              <button @click.prevent="toggleOptions('question')"
              :class="{ 'active-btn': activeButton === 'question' }">Question</button>
              <div class="feeback-question-options" v-show="activeButton === 'question'">
                <div class="feeback-question-option" :class="{ 'selected': selectedOptions[activeButton] === 'incorrect' }">
                  <input type="radio" v-model="selectedOptions[activeButton]"  value="incorrect"  @change="updateStyle">
                  <p>incorrect</p>
                </div>
                <div class="feeback-question-option">
                  <input type="radio" v-model="selectedOptions[activeButton]"  value="incorrect"  @change="updateStyle">
                  <p>Needs improvement</p>
                </div>
              </div>
            </div>
           
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
export default {
  data() {
    return {
      activeButton: null,
      // selectedOptions: {
      //   question: null,
      //   answer: null,
      //   ruling: null,
      // },
      feedbackCategories: [
                { name: "Question", selectedOption: null },
                { name: "Answer", selectedOption: null },
                { name: "Rullingout", selectedOption: null },
                { name: "Condition", selectedOption: null },
                { name: "Explanation", selectedOption: null },
                { name: "Notes", selectedOption: null },
            ],
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    toggleOptions(buttonType) {
      this.activeButton = this.activeButton === buttonType ? null : buttonType;
    },
    lockBodyScroll() {
      this.scrollPosition = window.pageYOffset;
      document.body.classList.add('body-scroll-lock');
      document.body.style.top = `-${this.scrollPosition}px`;
    },

    unlockBodyScroll() {
      document.body.classList.remove('body-scroll-lock');
      window.scrollTo(0, this.scrollPosition);
      document.body.style.top = '';
    },
    },
    watch: {
    showPauseModal(newVal) {
      if (newVal) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    }
  },
  beforeUnmount() {
    if (this.showPauseModal) {
      this.unlockBodyScroll();
    }
  },
    updateStyle() {
      this.$forceUpdate(); 
    },
  
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 344px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: 0px 20px;
}

.modal-content {
  background: #ffffff94;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 1200px;
  /* height: 460px; */
  height: 57vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top center;
  animation: modal-slide 0.3s ease-out;
}

.feedback-form-box {
  border: 1px solid #93959875;
  width: 250px;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0 0 11.34px #000000cf;
  padding: 16px 20px 29px 20px;
}

.feedback-form-box h4 {
  padding: 0px 0px 19px 0px;
  color: #231F20;
}

.feedbackform-button button {
  font-family: Helvetica, Arial, sans-serif;
  border: 1px solid #808285;
  padding: 3px 20px;
  width: 145px;
  margin: 0px 0px 10px 0px;
  border-radius: 30px;
  color: #2F292B;
  cursor: pointer;
  
}

.feedbackform-submitbtn {
  margin: 12px 0px 0px 0px;
  position: relative;
}

.feedbackform-submitbtn button {
  border: 1px solid #20b14b82;
  background: #9DED6C;
  padding: 4px 10px;
  width: 81.96px;
  height: 23.02px;
  border-radius: 30px;
  color: #2F292B;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.feeback-question-options {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0px 0px 10px 0px;	
}

.feeback-question-option p {
    font-size: 11px;
}

.feeback-question-option {
    display: flex;
    align-items: center;
    gap: 3px;
}

.active-btn {
  background-color: #9DED6C !important;
  border-color: #20b14b !important;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}


.feeback-question-option input {
    border: 1px solid #8082857d;
    background: #EAEBEC;
    padding: 3px 25px 3px 10px;
    border-radius: 30px;
    font-size: 12px;
}

.feeback-question-option input:focus {
    outline: none;
}


.feeback-question-option.selected {
  background: #FFF9C4; 
  border-radius: 15px;
  padding: 2px 8px;
}

.feeback-question-option input[type="radio"]:checked {
  accent-color: #6B7280; 
}



@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


@keyframes modal-slide {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

/* For leave transition */
.leaving .modal-content {
  animation: modal-slide-up 0.3s ease-in;
}


@keyframes modal-slide-up {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
}

</style>