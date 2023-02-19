export default {
  setUser(state, result) {
    state.user = JSON.parse(result);
  },
  setUserUuid(state, result) {
    state.userUuid = JSON.parse(result).userUuid;
  },
};
