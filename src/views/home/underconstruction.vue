<template>
    <div class="uc-wrapper">
      <div class="uc-card">
        <!-- SVG ICON -->
        <svg
          class="uc-icon"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="#1976d2" stroke-width="3" stroke-linecap="round">
            <path d="M8 48h48" />
            <path d="M16 48V26l16-10 16 10v22" />
            <path d="M24 48V34h16v14" />
            <path d="M28 22h8" />
            <path d="M20 16l24 8" />
          </g>
        </svg>
  
        <h1>Under Construction</h1>
        <p>
          We're working hard to bring you this feature.<br />
          Please check back soon.
        </p>
  
        <button @click="goBack">Go Back</button>
      </div>
    </div>
  </template>
  
<script>

  
  export default {
    name: 'UnderConstructionPage',
    methods: {
      goBack() {
        if (this.$router) {
          this.$router.back();
        }
      }
    }
};
</script>
<style scoped>
.uc-wrapper {
    height: 100vh;
    background: radial-gradient(circle at top, #ffffff, #f5f7fa);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .uc-card {
    background: white;
    padding: 45px 50px;
    border-radius: 14px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    max-width: 420px;
    animation: fadeInUp 0.6s ease;
  }
  
  .uc-icon {
    width: 120px;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }
  
  .uc-card h1 {
    font-size: 30px;
    margin-bottom: 12px;
    color: #222;
  }
  
  .uc-card p {
    color: #555;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 28px;
  }
  
  .uc-card button {
    padding: 11px 26px;
    border: none;
    border-radius: 8px;
    background: #1976d2;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  
  .uc-card button:hover {
    background: #125aa0;
    transform: translateY(-2px);
  }
  
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  }
  
  @keyframes fadeInUp {
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

  
