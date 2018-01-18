/**
  *@info 入口文件
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from 'vue';
import store from './store';
import router from './router';

import App from './App';

Vue.config.debug = true;

require("./assets/css/style.css");
require('./assets/js/layer/layer.js');
require("./assets/js/layer/need/layer.css");
require("./assets/js/ajax.js");
require("./assets/js/base64.min.js");



new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
