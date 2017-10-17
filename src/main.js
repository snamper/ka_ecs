import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.debug = true;

require("./assets/css/style.css")
require('./assets/js/layer/layer.js')
require("./assets/js/layer/need/layer.css")
require("./assets/js/ajax.js")


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
