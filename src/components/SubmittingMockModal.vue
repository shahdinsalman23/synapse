<template>
    <div class="modal-overlay submittingmock-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-buttons">
          <button class="unanswered-btn" @click="handleResume">{{ unansweredmain }} unanswered</button>
          <button class="submitmock-btn" @click="handleExit">Submit Mock
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


    props: {
    
    unansweredmain:{}

    
  },
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

  .unanswered-btn {
    background: #ED1C24;
    color: #fff;
    border-radius: 40px !important;
    padding: 13px 5px !important;
    width: 156.83px;
    height: 40.57px;
    line-height: 15px;
    font-weight: bold;
}

  .modal-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    margin: 0px 20px;
  }

  .submittingmock-overlay {
    top: 80px !important;
}
  
  /* .modal-content {
    background: #ffffff94; 
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    width: 1200px;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  } */

  .modal-content {
    background: #ffffff94; 
    backdrop-filter: blur(5px); 
    -webkit-backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    width: 80vw;
    height: 80vh;
    max-width: 1140px;
    max-height: 650px;
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
  animation: pure-fade-in 0.3s ease-out forwards; 
}

/* @keyframes modal-slide {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
} */

/* For leave transition */
.leaving .modal-content {
  animation: pure-fade-in 0.3s ease-out forwards; 
}

/* @keyframes modal-slide-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
} */



@keyframes pure-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pure-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}


  </style>