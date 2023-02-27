<template>
  <div>
    <calendarHeader />
    <div class="calendar__container">
      <p-calendar
        class="custom-calendar max-w-full h-full"
        is-expanded
        :attributes="attributes"
        ref="calendar"
      >
        <template v-slot:day-content="{ day, attributes }">
          <div
            class="flex flex-col h-full z-10 overflow-hidden"
            @click="showDay(day)"
          >
            <span class="day-label text-sm">{{ day.day }}</span>
            <p class="secondary--text">
              <span class="black--text text-body-2-bold">섭취량:</span>
              {{ ocrTotalCalories }} kcal
            </p>
            <p class="primary--text">
              <span class="black--text text-body-2-bold">목표 대사량:</span>
              {{ activation }} kcal
            </p>
            <div class="flex-grow overflow-y-auto overflow-x-auto">
              <p v-for="attr in attributes" :key="attr.key"></p>
            </div>
          </div>
        </template>
      </p-calendar>
      <day :dialog="dayDialog" :date="date" @close="dayDialog = false" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Day from "@/components/Day";
import CalendarHeader from "@/components/CalendarHeader";
export default {
  name: "CalendarPage",
  components: {
    Day,
    CalendarHeader,
  },
  data() {
    return {
      focus: "",
      attributes: [],
      dayDialog: false,
      date: new Date(),
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      userUuid: "users/getUserUuid",
      user: "users/getUser",
    }),
    activation() {
      let calories;
      switch (this.user?.purpose) {
        case "MINUS":
          calories = -500;
          break;
        case "CURRENT":
          calories = 0;
          break;
        case "PLUS":
          calories = 500;
          break;
      }
      return parseInt(this.user?.BMR * this.user?.exercise + calories) || 0;
    },
    ocrTotalCalories() {
      return 0;
    },
    userId() {
      return this.userUuid || localStorage.getItem("userUuid");
    },
  },
  methods: {
    ...mapActions({
      reqGetUser: "users/reqGetUser",
    }),
    showDay(day) {
      this.date = day.date;
      this.dayDialog = true;
    },
    async getUserData() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqGetUser({
        ...(this.userId && { userUuid: this.userId }),
      });
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
.calendar__container {
  padding: 40px 120px;
  height: 100%;
}
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
    --day-height: 150px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
    height: 100%;
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
      min-height: var(--day-height);
      // height: 100%;
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
