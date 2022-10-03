import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import "@/utils/fontAwesomeIcon.js";

import './assets/style.css';
import './assets/dunsum.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
