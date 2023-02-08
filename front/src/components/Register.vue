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
      <template v-if="tap === 'user'">
        <p-input label="아이디" v-model="userId" />
        <p-input label="비밀번호" v-model="password" />
        <p-input label="이름" v-model="name" />
        <p-input label="닉네임" v-model="nickname" />
      </template>
      <template v-else-if="tap === 'info'">
        <p-input label="키" v-model="userId" />
        <p-input label="몸무게" v-model="password" />
        <p-input label="나이" v-model="name" />
        <div class="d-flex-column w-full mb-2">
          <span class="text-label mb-4">성별</span>
          <v-radio-group v-model="sex" class="ma-0 pa-0">
            <v-radio value="Male">
              <template v-slot:label>
                <span class="text-body-2-regular black--text">남성</span>
              </template>
            </v-radio>
            <v-radio value="Female">
              <template v-slot:label>
                <span class="text-body-2-regular black--text">여성</span>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </template>
      <div class="d-flex justify-end mt-5">
        <p-btn
          theme="grayLine"
          v-if="tap !== 'user'"
          class="mr-3"
          @click="prevBtn"
          >이전</p-btn
        >
        <p-btn theme="secondary" @click="nextBtn">{{ registerText }}</p-btn>
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
      tap: "user",
      sex: "",
    };
  },
  computed: {
    registerText() {
      return this.tap === "etc" ? "회원가입" : "다음";
    },
  },
  methods: {
    prevBtn() {
      switch (this.tap) {
        case "info":
          this.tap = "user";
          break;
        case "etc":
          this.tap = "info";
          break;
      }
    },
    nextBtn() {
      switch (this.tap) {
        case "user":
          this.tap = "info";
          break;
        case "info":
          this.tap = "etc";
          break;
        case "etc":
          // 회원가입
          break;
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped></style>
