import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import colors from "@/utils/colors";
// import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: false,
    themes: {
      light: colors,
      dark: colors,
    },
  },
});
