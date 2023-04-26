export default (apiInstance) => ({
  async reqGetCalories(store, payload = {}) {
    const { userUuid, searchDate } = payload;
    const result = await apiInstance.calendar.getCalories({
      ...(userUuid && { userUuid }),
      ...(searchDate && { searchDate }),
    });
    if (result.status === 200) {
      store.commit("setMonthCalories", result.data);
    }
    return result;
  },

  async reqPostDiet(store, payload = {}) {
    const {
      userUuid,
      productName,
      carbohydrate,
      protein,
      fat,
      eachCalories,
      servingWT,
      date,
    } = payload;
    const result = await apiInstance.calendar.postDiet({
      ...(userUuid && { userUuid }),
      ...(productName && { productName }),
      carbohydrate,
      protein,
      fat,
      eachCalories,
      servingWT,
      date,
    });
  },
  async reqGetDiet(store, payload = {}) {
    const { userUuid, date } = payload;
    const result = await apiInstance.calendar.getDiet({
      ...(userUuid && { userUuid }),
      ...(date && { date }),
    });
    if (result.status === 200) {
      store.commit("setDayDiet", result.data);
    }
    return result;
  },
  async reqPutDiet(store, payload = {}) {
    const { dietUuid, count, productName } = payload;
    const result = await apiInstance.calendar.putDiet({
      ...(dietUuid && { dietUuid }),
      ...(count && { count }),
      ...(productName && { productName }),
    });
    return result;
  },

  async reqDeleteDiet(store, payload = {}) {
    const { dietUuid, userUuid } = payload;
    const result = await apiInstance.calendar.deleteDiet({
      ...(dietUuid && { dietUuid }),
      ...(userUuid && { userUuid }),
    });
    return result;
  },
});
