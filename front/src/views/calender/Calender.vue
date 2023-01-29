<template>
  <div>
    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
      Today
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="prev">
      <v-icon small> mdi-chevron-left </v-icon>
    </v-btn>
    <v-btn fab text small color="grey darken-2" @click="next">
      <v-icon small> mdi-chevron-right </v-icon>
    </v-btn>
    <v-toolbar-title v-if="$refs.calendar">
      {{ $refs.calendar.title }}
    </v-toolbar-title>
    <v-sheet height="500">
      <v-calendar ref="calendar" v-model="focus" color="primary"></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "CalenderPage",
  data() {
    return {
      focus: "",
    };
  },
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    setToday() {
      this.focus = "";
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
};
</script>

<style lang="scss" scoped></style>
