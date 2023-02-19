export default (apiInstance) => ({
  async reqGetUserUuid(store, payload = {}) {
    const { email, password } = payload;
    const result = await apiInstance.users.getLogin({
      ...(email && { email }),
      ...(password && { password }),
    });
    if (result.status === 200) {
      store.commit("setUserUuid", result.data);
    }
    return result;
  },
  async reqPostUser(store, payload = {}) {
    const {
      email,
      password,
      name,
      nickname,
      weight,
      height,
      age,
      sex,
      exercise,
      purpose,
    } = payload;
    const result = await apiInstance.users.postUsers({
      ...(email && { email }),
      ...(password && { password }),
      ...(name && { name }),
      ...(nickname && { nickname }),
      ...(weight && { weight }),
      ...(height && { height }),
      ...(age && { age }),
      ...(sex && { sex }),
      ...(exercise && { exercise }),
      ...(purpose && { purpose }),
    });
    return result;
  },
  async reqGetUser(store, payload = {}) {
    const { userUuid } = payload;
    if (!userUuid) {
      return;
    }
    const result = await apiInstance.users.getUser({
      ...(userUuid && { userUuid }),
    });
    if (result.status === 200) {
      store.commit("setUser", result.data);
    }
    return result;
  },
});
