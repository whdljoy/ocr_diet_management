export default (apiInstance) => ({
  async reqGetUser(store, payload = {}) {
    const { email } = payload;
    console.log(apiInstance.users);
    const result = await apiInstance.users.getUserInfo({ email });
    console.log(result);
    // if (result.success) {
    //   // store.commit("setUser", result.data);
    // }
  },
});
