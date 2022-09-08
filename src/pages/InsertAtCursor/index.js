import Vue from "vue";
import App from "./index.vue";
import ElementUI from "element-ui";


import "@/assets/theme/index.css";
import "@/assets/theme/self.css";

import Vuex from "vuex";

import { storeConfig } from "fusion-ui";

Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(Vuex);
const store = new Vuex.Store(storeConfig);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
