/* eslint-disable */

import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
// import './registerServiceWorker'



Vue.config.debug = true;
Vue.config.productionTip = false

require("./assets/km/css/style.css");
require("./assets/km/js/layer/need/layer.css");
require("./assets/km/js/laydate/skins/default/laydate.css");
require("./assets/main.css");
require("./assets/km/css/search.css");
require('./assets/km/js/layer/layer.js');
require("./assets/km/js/laydate/laydate.js");
require("./assets/km/js/ajax.js");
require("./assets/km/js/base64.min.js");
require("./config/service.js");
require("./assets/ym/js/trim.js");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
