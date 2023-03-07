export default {
  getMonthCalories(state) {
    return state.monthCalories || [];
  },
  getOcrData(state) {
    return state.ocrData || [];
  },
  getOcrTable(state) {
    return state.ocrTable || [];
  },
  getDayDiet(state) {
    return state.dayDiet || [];
  },
};
