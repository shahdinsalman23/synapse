import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import "./styles/global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

// AOS initialization
AOS.init({
  duration: 1000,
  once: true,
  offset: 120, 
  disable: 'mobile',
  easing: 'ease-out-quad' 
});

Vue.config.productionTip = false;


Vue.mixin({
  mounted() {
    this.$nextTick(() => {
      AOS.refresh(); 
    });
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');