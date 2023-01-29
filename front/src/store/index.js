import Vue from "vue";
import Vuex from "vuex";
import ApiClient from "@/api";
import { baseUrl } from "@/config.js";

import users from "./modules/users";
import calender from "./modules/calender";
Vue.use(Vuex);
const api = new ApiClient(null, { baseURL: baseUrl }, ["users", "calender"]);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // users: {
    //   ...users,
    //   actions: users.actions(api),
    // },
    // calender: {
    //   ...calender,
    //   actions: calender.actions(api),
    // },
  },
});
