import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import mixin from './assets/js/mixin'

// vuetify
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Vuex
import { dataStore } from '@/store/dataStore'

import "@/utils/fontAwesomeIcon.js";

import './assets/style.css';
import './assets/dunsum.css';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.mixin(mixin);

new Vue({
  vuetify,
  router,
  store: dataStore,
  render: h => h(App)
}).$mount('#app')
