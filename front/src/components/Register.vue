<template>
  <v-dialog
    :value="dialog"
    persistent
    no-click-animation
    max-width="840px"
    content-class="white"
  >
    <div class="px-10 py-15">
      <div class="d-flex justify-space-between align-center mb-10">
        <h2 class="text-h2-bold text-center">회원 가입</h2>
        <v-icon @click="closeDialog">mdi-close-thick</v-icon>
      </div>
      <template v-if="!isAdditional">
        <p-input label="아이디" v-model="userId" />
        <p-input label="비밀번호" v-model="password" />
        <p-input label="이름" v-model="name" />
        <p-input label="닉네임" v-model="nickname" />
      </template>
      <template v-else>
        <p-input label="키" v-model="userId" />
        <p-input label="몸무게" v-model="password" />
        <p-input label="나이" v-model="name" />
      </template>
      <div class="d-flex justify-end mt-5">
        <p-btn
          theme="grayLine"
          v-if="isAdditional"
          class="mr-3"
          @click="isAdditional = false"
          >이전</p-btn
        >
        <p-btn theme="secondary" @click="register">{{ registerText }}</p-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userId: "",
      password: "",
      name: "",
      nickname: "",
      isAdditional: false,
    };
  },
  computed: {
    registerText() {
      return this.isAdditional ? "회원가입" : "다음";
    },
  },
  methods: {
    register() {
      if (!this.isAdditional) {
        this.isAdditional = true;
        return;
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
