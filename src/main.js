import Vue from 'vue'
import App from './App.vue'
import loading from "@/plugs/loading/index";
import "@/plugs/loading/src/loading.css";
Vue.use(loading);

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
