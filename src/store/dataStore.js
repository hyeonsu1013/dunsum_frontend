import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const dataStore = new Vuex.Store({
    userState : {
      counter : '',
    }
});
