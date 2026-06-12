<template>
  <div id="app">
    <!-- Global full-screen loader -->
    <transition name="app-fade">
      <div v-if="$store.getters.pageLoading" class="app-loader-overlay">
        <div class="app-loader-wrap">
          <div class="app-loader"></div>
          <p class="app-loader-text">Loading…</p>
        </div>
      </div>
    </transition>

    <!-- Landing Page Header -->
    <HeaderComponent v-if="$route.path === '/' || $route.path === '/userlogin' || $route.path === '/about' || $route.path === '/underconstruction'" />
    
    <!-- All Other Pages Header -->
    <!-- <HeaderMain v-else /> -->
    <!-- <HeaderMain
    v-else-if="$route.path !== '/mocksquestion/:id'"
  /> -->

 <HeaderMain v-else-if="$route.name !== 'MockQuestion' && $route.name !== 'MockReview' && $route.name !== 'MLAList' &&  $route.name !== 'QuestionsPage'  &&  $route.name !== 'QuestionBirdsEyeView' &&  $route.name !== 'MockScore' && $route.name !=='NotesPage' && $route.name !== 'SearchPage' "   />
    <div>
      <main class="main-content">
      <router-view />
     </main>
    </div>
  

    <FooterComponent />
  
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import HeaderMain from "./components/HeaderMain.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    HeaderMain
  }
}
</script>

<style>
/* ── Global page loader ── */
.app-loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-loader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.app-loader {
  width: 140px;
  height: 24px;
  border-radius: 20px;
  color: #1A90FF;
  border: 2px solid;
  position: relative;
}

.app-loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  inset: 0 100% 0 0;
  border-radius: inherit;
  background: currentColor;
  animation: app-fill 2s infinite;
}

@keyframes app-fill {
  100% { inset: 0; }
}

.app-loader-text {
  color: #1A90FF;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.app-fade-enter-active,
.app-fade-leave-active {
  transition: opacity 0.35s ease;
}
.app-fade-enter,
.app-fade-leave-to {
  opacity: 0;
}

/* ── App shell ── */
#app {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;  
  display: flex;
  flex-direction: column; 
}

.main-content {  
  flex: 1;  
}

</style>
