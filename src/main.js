import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui";
import router from "./router";
import "@/assets/theme/base.css";
import "@/assets/theme/index.css";
import "@/assets/theme/self.css";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(ElementUI)
Vue.use(Vuex);

//Vue原型挂载axios，全局使用
Vue.prototype.$axios = axios;

//引入fusion-ui组件
import { storeConfig } from "fusion-ui";
const store = new Vuex.Store(storeConfig);

//初始化自定义组件
import wrap from "@vue/web-component-wrapper";
import VueWebComponent from "@/components/vueWebComponent";
//注册自定义组件
const CustomElement = wrap(Vue, VueWebComponent);
window.customElements.define("my-custom-element", CustomElement);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");