export default (apiInstance) => ({
  async reqGetUser(store, payload = {}) {
    const { email } = payload;
    const result = await apiInstance.users.getUserInfo({ email });
  },
  async reqPostUser(store, payload = {}) {
    const { email, password, name, nickname, weight, height, age, sex } =
      payload;
    const result = await apiInstance.users.postUsers({
      ...(email && { email }),
      ...(password && { password }),
      ...(name && { name }),
      ...(nickname && { nickname }),
      ...(weight && { weight }),
      ...(height && { height }),
      ...(age && { age }),
      ...(sex && { sex }),
    });
    if (result.success) {
      // store.commit("setUser", result.data);
    }
  },
});
