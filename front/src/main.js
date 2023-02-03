import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import PChip from "@/components/common/PoinChip";
import PBtn from "@/components/common/Button";
import PInput from "@/components/common/Input";
import PTextarea from "@/components/common/Textarea";
import PSelect from "@/components/common/Select";
import PSwitch from "@/components/common/Switch";
import PTable from "@/components/common/Table";
import PCheckbox from "@/components/common/Checkbox";
import Calendar from "v-calendar/lib/components/calendar.umd";
Vue.config.productionTip = false;
Vue.component("PBtn", PBtn);
Vue.component("PInput", PInput);
Vue.component("PTextarea", PTextarea);
Vue.component("PSelect", PSelect);
Vue.component("PTable", PTable);
Vue.component("PCheckbox", PCheckbox);
Vue.component("PChip", PChip);
Vue.component("PSwitch", PSwitch);
Vue.component("PCalendar", Calendar);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
