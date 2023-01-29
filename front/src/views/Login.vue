<template>
  <div class="login__wrapper">
    login
    <p-input v-model="userId" label="아이디" />
    <p-input v-model="passWord" label="비밀번호" />
    <div class="btn__container">
      <p-btn theme="secondary" @click="goToRegister">회원 가입</p-btn>
      <p-btn> 로그인</p-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      userId: "",
      passWord: "",
    };
  },
  methods: {
    goToRegister() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login__wrapper {
  max-width: 1280px;
  .btn__container {
    gap: 12px;
    display: flex;
  }
}
</style>
