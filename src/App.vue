<template>
  <div id="app">
    <!-- Landing Page Header -->
    <HeaderComponent v-if="$route.path === '/' || $route.path === '/userlogin'" />
    
    <!-- All Other Pages Header -->
    <HeaderMain v-else />
    
    <router-view />
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
