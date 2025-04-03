import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/HomePage.vue";
import UserLogin from "@/views/UserLogin.vue";
import MockSection from "@/views/MockSection.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/userlogin", component: UserLogin },
  { path: "/mocksection", component: MockSection },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
