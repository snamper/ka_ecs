import Vue from 'vue';
import Main from './main.vue';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const hasOwn = function(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const isVNode = function(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  // let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  // options.onClose = function() {
  //   Message.close(id, userOnClose);
  // };
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  // instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};

// ['success', 'warning', 'info', 'error'].forEach(type => {
//   Message[type] = options => {
//     if (typeof options === 'string') {
//       options = {
//         message: options
//       };
//     }
//     options.type = type;
//     return Message(options);
//   };
// });

Message.close = function(id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      // if (typeof userOnClose === 'function') {
      //   userOnClose(instances[i]);
      // }
      instances.splice(i, 1);
      break;
    }
  }
};
export default Message;
