import Vue from "vue";
import { sync } from "vuex-router-sync";
import VueCookies from "vue-cookies";
import VueD3 from "vue-d3";
import "@/plugins";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
Vue.use(Vuetify)

Vue.config.productionTip = true;
Vue.use(VueCookies);
Vue.use(VueD3);

const unsync = sync(store, router);

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
window._vm = vm;
unsync();
