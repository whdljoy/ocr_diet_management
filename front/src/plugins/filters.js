import numeral from "numeral";
import moment from "moment";

export default {
  install(Vue, options) {
    Vue.filter("delimitNumber", (val, format = "0,0") =>
      numeral(val).format("0,0")
    );
    Vue.filter("dday", (val) => {
      return "D" + moment().startOf("day").diff(val, "days");
    });
  },
};
