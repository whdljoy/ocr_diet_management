import Vue from "vue";
import Vuex from "vuex";
import ApiClient from "@/api";
import { baseUrl } from "@/config";
import users from "./modules/users";
import calendar from "./modules/calendar";
import external from "./modules/external";
Vue.use(Vuex);
const api = new ApiClient({ baseURL: baseUrl }, ["users", "calendar"]);
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users: {
      ...users,
      actions: users.actions(api),
    },
    calendar: {
      ...calendar,
      actions: calendar.actions(api),
    },
    external: {
      ...external,
    },
  },
});
