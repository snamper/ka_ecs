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

require("./assets/km/css/style.css");
require('./assets/km/js/layer/layer.js');
require("./assets/km/js/layer/need/layer.css");
require("./assets/km/js/laydate/laydate.js");
require("./assets/km/js/laydate/skins/default/laydate.css");
require("./assets/km/js/ajax.js");
require("./assets/km/js/base64.min.js");
require("./config/service.js");
require("./assets/ym/js/trim.js")



new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
