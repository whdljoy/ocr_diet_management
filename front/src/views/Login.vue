<template>
  <div class="login__wrapper">
    <img src="@/assets/main.png" style="width: 50%" />
    <div class="form__wrapper pl-10">
      <h1 class="text-h1-bold mb-10">로그인</h1>
      <p-input v-model="userId" label="아이디" class="mb-5" />
      <p-input v-model="passWord" label="비밀번호" />
      <div class="btn__container mt-10">
        <p-btn theme="secondary" @click="goToRegister">회원 가입</p-btn>
        <p-btn @click="reqGetUser"> 로그인</p-btn>
      </div>
    </div>
    <register :dialog="dialog" @close="dialog = false" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Register from "@/components/Register";
export default {
  name: "loginPage",
  components: {
    Register,
  },
  data() {
    return {
      userId: "",
      passWord: "",
      dialog: false,
    };
  },
  methods: {
    ...mapActions({
      getUser: "users/reqGetUser",
    }),
    async reqGetUser() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.getUser({
        email: "hgw4846@gmail.com",
      });
      this.loading = false;
      console.log(result);
    },
    goToRegister() {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login__wrapper {
  display: flex;
  .btn__container {
    gap: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .form__wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 120px;
  }
}
</style>
