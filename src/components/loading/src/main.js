import Vue from 'vue';
import Main from './main.vue';
let LoadingConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Loading = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  
  let id = 'loading_' + seed++;

  instance = new LoadingConstructor({
    data: options
  });
  instance.id = id;

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instances.push(instance);
  return instance.vm;
};

export default Loading;
