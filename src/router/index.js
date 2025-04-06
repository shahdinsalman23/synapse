import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/HomePage.vue";
import UserLogin from "@/views/UserLogin.vue";
import MockSection from "@/views/MockSection.vue";
import MockSelection from "@/views/MockSelection.vue";
import MockQuestion from "@/views/MockQuestion.vue";
import MockBirdsEye from "@/views/MockBirdsEye.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/userlogin", component: UserLogin },
  { path: "/mocksection", component: MockSection },
  { path: "/mockselection", component: MockSelection },
  { path: "/mocksquestion", component: MockQuestion },
  { path: "/mockbirdseye", component: MockBirdsEye },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
