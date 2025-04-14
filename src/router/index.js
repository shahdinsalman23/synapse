import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/HomePage.vue";
import UserLogin from "@/views/UserLogin.vue";
import MockSection from "@/views/MockSection.vue";
import MockSelection from "@/views/MockSelection.vue";
import MockQuestion from "@/views/MockQuestion.vue";
import MockBirdsEye from "@/views/MockBirdsEye.vue";
import MockScore from "@/views/MockScore.vue";
import ReviewMockBirdsEye from "@/components/ReviewMockBirdsEye.vue";
import ReviewScroll from "@/views/ReviewScroll.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/userlogin", component: UserLogin , meta: { requiresAuth: true } },
  { path: "/mocksection", component: MockSection , meta: { requiresAuth: true } },
  { path: "/mockselection", component: MockSelection , meta: { requiresAuth: true } },
  // { path: "/mocksquestion/:id", component: MockQuestion , meta: { requiresAuth: true } },
  { path: "/mocksquestion/:id", component: MockQuestion, name: 'MockQuestion', meta: { requiresAuth: true } },
  { path: "/mockbirdseye", component: MockBirdsEye , meta: { requiresAuth: true } },
  { path: "/mockscore/:id", component: MockScore , meta: { requiresAuth: true } },
  { path: "/reviewmockbirdseye", component: ReviewMockBirdsEye , meta: { requiresAuth: true } },
  { path: "/reviewscroll/:id", component: ReviewScroll , meta: { requiresAuth: true } },
];

const router = new VueRouter({
  mode: "history",
  routes,
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next("/"); // Redirect to homepage if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
