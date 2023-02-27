export default (apiInstance) => ({
  async reqGetFood(store, payload = {}) {
    const { image } = payload;
    const result = await apiInstance.calendar.getSearchFood({
      ...(image && { image }),
    });
    console.log(result);
  },
});
