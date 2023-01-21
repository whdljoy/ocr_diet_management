<template>
  <div class="j-container">
    <p-input v-model="id" label="아이디" />
    <p-input v-model="password" label="비밀번호" />
    <p-btn>로그인</p-btn>
  </div>
</template>

<script>
export default {
  name: "loginPage",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    postLogin() {},
  },
};
</script>

<style lang="scss" scoped></style>
