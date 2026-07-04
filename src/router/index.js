import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/views/lib/vuex";
import Home from "@/views/HomePage.vue";
import UserLogin from "@/views/UserLogin.vue";
import MockSection from "@/views/MockSection.vue";
import MockSelection from "@/views/MockSelection.vue";
import MockQuestion from "@/views/MockQuestion.vue";
import MockBirdsEye from "@/views/MockBirdsEye.vue";
import MockScore from "@/views/MockScore.vue";
import ReviewMockBirdsEye from "@/components/ReviewMockBirdsEye.vue";
import ReviewScroll from "@/views/ReviewScroll.vue";
import ReviewScrollModal from "@/views/ReviewScroll.vue";

import MLAListSelection from '../views/MLAListSelection.vue'
import QuestionsPage from "@/views/QuestionsPage.vue";
import QuestionBirdsEyeView from '@/views/QuestionBirdsEyeView.vue';
import MockQuestionPreview from "@/views/MockQuestionPreview.vue";
import NotesListSelection from "@/views/NotesListSelection.vue";
import NotesPage from "@/views/NotesPage.vue";
import SearchPage from "@/views/SearchPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import ForgotPasswordPage from "@/views/ForgotPasswordPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import about from "@/views/home/About.vue";
import underconstruction from "@/views/home/underconstruction.vue";



Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: SignupPage },
  { path: "/forgot-password", component: ForgotPasswordPage },
  { path: "/reset-password", component: ResetPasswordPage },
  { path: "/userlogin", component: UserLogin , meta: { requiresAuth: true } },
  { path: "/mocksection", component: MockSection , meta: { requiresAuth: true } },
  { path: "/mockselection", component: MockSelection , meta: { requiresAuth: true } },
  // { path: "/mocksquestion/:id", component: MockQuestion , meta: { requiresAuth: true } },
  { path: "/mocksquestion/:id", component: MockQuestion, name: 'MockQuestion', meta: { requiresAuth: true } },
  { path: "/mockbirdseye", component: MockBirdsEye , meta: { requiresAuth: true } },
  { path: "/mockscore/:id", component: MockScore ,  name: 'MockScore', meta: { requiresAuth: true } },
  { path: "/reviewmockbirdseye", component: ReviewMockBirdsEye , meta: { requiresAuth: true } },
  { path: "/reviewscroll/:id", component: ReviewScroll , name: 'MockReview', meta: { requiresAuth: true } },
  { path: "/reviewscrollmodal/:id", component: ReviewScrollModal , name: 'ReviewScrollModal' },

  { path: "/mlalistselection", component: MLAListSelection, name: "MLAList", meta: { requiresAuth: true } },
  { path: "/questionspage/:id", component: QuestionsPage, name: "QuestionsPage", meta: { requiresAuth: true } },
  { path: "/questionbirdseyeview", component: QuestionBirdsEyeView, name: "QuestionBirdsEyeView", meta: { requiresAuth: true } },

  { path: "/mocksquestionadmin/:id", component: MockQuestionPreview, name: 'MockQuestionPreview'},

  { path: "/noteslistselection", component: NotesListSelection, name: "MLAList", meta: { requiresAuth: true } },
  // { path: "/notespage/:id", component: NotesPage, name: "NotesPage", meta: { requiresAuth: true } },
  { path: "/notespage", component: NotesPage, name: "NotesPage", meta: { requiresAuth: true } },

  { path: "/search", component: SearchPage, name: "SearchPage", meta: { requiresAuth: true } },



  { path: "/about", component: about, name: "About", meta: { requiresAuth: true } },
  { path: "/underconstruction", component: underconstruction, name: "Underconstruction", meta: { requiresAuth: true }},



];



const router = new VueRouter({
  mode: "history",
  routes,
});


router.beforeEach((to, from, next) => {
  // Show global loader on every navigation
  store.dispatch('setPageLoading', true);

  const token = localStorage.getItem("token");

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      store.dispatch('setPageLoading', false);
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

// Hide loader once the incoming route component has finished rendering
router.afterEach(() => {
  setTimeout(() => {
    store.dispatch('setPageLoading', false);
  }, 300);
});

export default router;
