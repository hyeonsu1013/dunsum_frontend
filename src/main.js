import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 공통기능
import mixin from "./assets/js/mixin"

// Vuex
import { dataStore } from '@/store/dataStore'

import "@/utils/fontAwesomeIcon.js";

import './assets/style.css';
import './assets/scss/dunsum.scss';
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.mixin(mixin);

new Vue({
  router,
  store: dataStore,
  vuetify,
  render: h => h(App)
}).$mount('#app')
