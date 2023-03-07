export default {
  setMonthCalories(state, result) {
    state.monthCalories = JSON.parse(result);
  },
  setOcrData(state, result) {
    state.ocrData = [...result?.fields];
    state.ocrTable = [...result?.tables[0]?.cells];
  },
  setDayDiet(state, result) {
    const items = JSON.parse(result).map((item) => {
      return { ...item, setting: false };
    });
    state.dayDiet = items;
  },
};
