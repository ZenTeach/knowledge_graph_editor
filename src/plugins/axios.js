import Vue from "vue";
import service_config from "@/services/service_config";
// Lib imports
import axios from "axios";
const api = axios.create(service_config);
Vue.prototype.$http = api;
