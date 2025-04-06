<template>
    <div class="modal-overlay" @click.self="closeModal">
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
  }
  
  .modal-content {
    background: #ffffff94; 
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    width: 1200px;
    height: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
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

.modal-content {
  transform-origin: top center;
  animation: modal-slide 0.3s ease-out;
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