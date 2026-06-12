import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    user: null,
    pageLoading: false,
};

const store = new Vuex.Store({
    state,
    getters: {
        user: (state) => state.user,
        pageLoading: (state) => state.pageLoading,
    },
    actions: {
        user: (context, user) => {
            context.commit('user', user);
        },
        setPageLoading: (context, value) => {
            context.commit('setPageLoading', value);
        },
    },
    mutations: {
        user: (state, user) => {
            state.user = user;
        },
        setPageLoading: (state, value) => {
            state.pageLoading = value;
        },
    },
    plugins: [createPersistedState()]
});

export default store;
