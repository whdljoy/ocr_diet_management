<template>
  <div class="login__wrapper">
    <img src="@/assets/background.png" style="width: 50%" />
    <div class="form__wrapper">
      <div class="bg__wrapper px-10 py-10 rounded">
        <h1 class="text-h1-bold mb-10">로그인</h1>
        <p-input v-model="email" label="아이디" class="mb-5" />
        <p-input type="password" v-model="password" label="비밀번호" />
        <div class="btn__container mt-10">
          <p-btn theme="secondary" @click="goToRegister">회원 가입</p-btn>
          <p-btn @click="getLogin"> 로그인</p-btn>
        </div>
      </div>
    </div>
    <register :dialog="dialog" @close="dialog = false" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Register from "@/components/Register";
export default {
  name: "loginPage",
  components: {
    Register,
  },
  data() {
    return {
      email: "",
      password: "",
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      userUuid: "users/getUserUuid",
    }),
  },
  methods: {
    ...mapActions({
      reqGetUserUuid: "users/reqGetUserUuid",
    }),
    async getLogin() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = await this.reqGetUserUuid({
        ...(this.email && { email: this.email }),
        ...(this.password && { password: this.password }),
      });
      this.loading = false;
      if (result.status === 200) {
        localStorage.setItem("userUuid", this.userUuid);
        this.$router.push({
          name: "calendar",
        });
      }
    },
    goToRegister() {
      this.dialog = true;
    },
  },
  created() {
    if (this.$route?.params?.isRegister) {
      this.dialog = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.login__wrapper {
  background: rgb(115, 120, 255);
  background: linear-gradient(
    0deg,
    rgba(115, 120, 255, 1) 9%,
    rgba(153, 155, 224, 1) 79%
  );
  display: flex;
  .btn__container {
    gap: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .form__wrapper {
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 240px;
    padding-left: 120px;
    .bg__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: $gray1;
    }
  }
}
</style>
