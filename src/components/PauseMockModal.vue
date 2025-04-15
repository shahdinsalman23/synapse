<template>
   <transition name="fade">
    <div class="modal-overlay" @click.self="closeModal" v-if="show">
      <div class="modal-content">
        <div class="modal-buttons">
          <button class="modal-resume-btn" @click="handleResume">Resume Mock</button>
          <button class="modal-exit-btn" @click="handleExit">Exit Mock
            <div class="cardbottom-shadow">
                <img src="/images/cardshadow.png" alt="">
              </div>
          </button>
        </div>
      </div>
    </div>
  </transition>
  </template>
  
  <script>
  export default {
    methods: {
      closeModal() {
        this.$emit('close');
      },
      handleResume() {
        this.$emit('resume');
      },
      handleExit() {
        this.$emit('exit');
      }
    }
  }
  </script>
  
  <style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

  .modal-overlay {
    position: fixed;
    top: 100px;
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
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: content-fade 0.3s ease-out;
  }
  
  h3 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.5rem;
  }
  
  .modal-buttons {
    display: flex;
    flex-direction: column;
    gap: 43px;
  }
  
  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .modal-resume-btn {
    background-color: #9DED6C;
    color: #231F20;
    padding: 13px 20px;
    border-radius: 30px;
    border: 1px solid #00A14B;
    font-weight: bold;
  }
  

  .modal-exit-btn {
    background-color: #ED1C24;
    color: white;
    font-weight: bold;
    border-radius: 40px;
    padding: 13px 38px;
    position: relative;
  }
  
  .modal-exit-btn:hover {
    background-color: #cc3636;
  }


  @keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}


@keyframes content-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}




  </style>