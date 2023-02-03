<template>
  <v-dialog :value="dialog" content-class="white">
    <div>
      <h4 class="text-h4-medium">{{ today }}</h4>
    </div>
  </v-dialog>
</template>

<script>
import { dateFormat } from "@/utils";
export default {
  name: "DayDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  computed: {
    today() {
      return dateFormat.getDateFormat(this.date, "yyyy년 MM월 dd일");
    },
  },
  watch: {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
