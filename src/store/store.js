import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
      isLogin : false,
      isSearch : false,
      // servers : [],
    },
    mutations : {
      SET_LOGIN(state, value) {
        state.isLogin = value || false;
      },
      SET_SRVR(state, value) {
        state.servers = value || [];
      },
      SET_SEARCH(state, value) {
        state.isSearch = value || !state.isSearch;
      },
    }
});
