import Vue from "vue";
import { sync } from "vuex-router-sync";
import VueCookies from "vue-cookies";
import "@/plugins";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

import GraphologyBuilder from "../server/lib/graphology_builder";
Vue.config.productionTip = true;
Vue.use(VueCookies);

const unsync = sync(store, router);

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
window._vm = vm;
unsync();
Vue.prototype.$graphology_builder = GraphologyBuilder;
