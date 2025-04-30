<template>
  <div id="app">
    <!-- Landing Page Header -->
    <HeaderComponent v-if="$route.path === '/' || $route.path === '/userlogin'" />
    
    <!-- All Other Pages Header -->
    <!-- <HeaderMain v-else /> -->
    <!-- <HeaderMain
    v-else-if="$route.path !== '/mocksquestion/:id'"
  /> -->

  <HeaderMain v-else-if="$route.name !== 'MockQuestion' && $route.name !== 'MockReview' " />
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
