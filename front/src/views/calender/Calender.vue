<template>
  <div>
    <calenderHeader />
    <p-calendar
      class="custom-calendar max-w-full"
      is-expanded
      :attributes="attributes"
      ref="calender"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div
          class="flex flex-col h-full z-10 overflow-hidden"
          @click="showDay(day)"
        >
          <span class="day-label text-sm">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p v-for="attr in attributes" :key="attr.key"></p>
          </div>
        </div>
      </template>
    </p-calendar>
    <day :dialog="dayDialog" :date="date" />
  </div>
</template>

<script>
import Day from "@/components/Day";
import CalenderHeader from "@/components/CalenderHeader";
export default {
  name: "CalenderPage",
  components: {
    Day,
    CalenderHeader,
  },
  data() {
    return {
      focus: "",
      attributes: [],
      dayDialog: false,
      date: new Date(),
    };
  },
  methods: {
    showDay(day) {
      this.date = day.date;
      console.log(day);
      console.log(this.date);
      this.dayDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
::v-deep {
  .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
    & .vc-header {
      background-color: #f1f5f8;
      padding: 10px 0;
    }
    & .vc-weeks {
      padding: 0;
    }
    & .vc-weekday {
      background-color: var(--weekday-bg);
      border-bottom: var(--weekday-border);
      border-top: var(--weekday-border);
      padding: 5px 0;
    }
    & .vc-day {
      padding: 0 5px 3px 5px;
      text-align: left;
      height: var(--day-height);
      min-width: var(--day-width);
      background-color: white;
      &.weekday-1,
      &.weekday-7 {
        background-color: #eff8ff;
      }
      &:not(.on-bottom) {
        border-bottom: var(--day-border);
        &.weekday-1 {
          border-bottom: var(--day-border-highlight);
        }
      }
      &:not(.on-right) {
        border-right: var(--day-border);
      }
    }
    & .vc-day-dots {
      margin-bottom: 5px;
    }
  }
}
</style>
