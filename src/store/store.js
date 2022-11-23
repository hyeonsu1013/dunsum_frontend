import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
      isLogin : false,
      // servers : [],
    },
    mutations : {
      SET_LOGIN(state, value) {
        state.isLogin = value || false;
      },
      SET_SRVR(state, value) {
        state.servers = value || [];
      }
    }
});
