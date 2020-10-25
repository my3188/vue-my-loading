import Vue from "vue";
import loadingVue from "./loading.vue";
import { addClass, removeClass, getStyle } from "./dom";
// import { PopupManager } from 'element-ui/src/utils/popup';
import afterLeave from "./after-leave";
const zIndex = 1000;
function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
const LoadingConstructor = Vue.extend(loadingVue);

const defaults = {
  loaderType: "bars",
  color: "#4f8bff",
  height: 80,
  width: 80,
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: "",
};

let fullscreenLoading;

LoadingConstructor.prototype.originalPosition = "";
LoadingConstructor.prototype.originalOverflow = "";

LoadingConstructor.prototype.close = function() {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  afterLeave(
    this,
    (_) => {
      const target = this.fullscreen || this.body ? document.body : this.target;
      removeClass(target, "v-my-loading-parent--relative");
      removeClass(target, "v-my-loading-parent--hidden");
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
    },
    300
  );
  this.visible = false;
};

const addStyle = (options, parent, instance) => {
  let maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, "position");
    instance.originalOverflow = getStyle(document.body, "overflow");
    maskStyle.zIndex = zIndex;
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, "position");
    ["top", "left"].forEach((property) => {
      let scroll = property === "top" ? "scrollTop" : "scrollLeft";
      maskStyle[property] =
        options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] +
        "px";
    });
    ["height", "width"].forEach((property) => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + "px";
    });
  } else {
    instance.originalPosition = getStyle(parent, "position");
  }
  Object.keys(maskStyle).forEach((property) => {
    instance.$el.style[property] = maskStyle[property];
  });
};

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }

  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement("div"),
    data: options
  });

  addStyle(options, parent, instance);
  if (instance.originalPosition !== "absolute" && instance.originalPosition !== "fixed") {
    addClass(parent, "v-my-loading-parent--relative");
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, "v-my-loading-parent--hidden");
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};

export default Loading;
