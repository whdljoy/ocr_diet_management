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
      <template v-if="tab === 'user'">
        <p-input label="아이디" v-model="userId" />
        <p-input label="비밀번호" v-model="password" />
        <p-input label="이름" v-model="name" />
        <p-input label="닉네임" v-model="nickname" />
      </template>
      <template v-else-if="tab === 'info'">
        <p-input label="키" v-model="height" suffix="cm" />
        <p-input label="몸무게" v-model="weight" suffix="kg" />
        <p-input label="나이 (만)" v-model="age" suffix="세" />
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
          v-if="tab !== 'user'"
          class="mr-3"
          @click="prevBtn"
          >이전</p-btn
        >
        <p-btn theme="secondary" @click="nextBtn" :disabled="nextBtnDisabled">{{
          registerText
        }}</p-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
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
      tab: "user",
      sex: "",
      height: "",
      weight: "",
      age: "",
      loading: false,
    };
  },
  computed: {
    registerText() {
      return this.tab === "etc" ? "회원가입" : "다음";
    },
    nextBtnDisabled() {
      if (this.tab === "user") {
        if (
          this.userId === "" ||
          this.password === "" ||
          this.name === "" ||
          this.nickname === ""
        ) {
          return true;
        }
      }
      if (this.tab === "info") {
        if (
          this.weight === "" ||
          this.height === "" ||
          this.age === "" ||
          this.sex === ""
        ) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      reqPostUser: "users/reqPostUser",
    }),
    prevBtn() {
      switch (this.tab) {
        case "info":
          this.tab = "user";
          break;
        case "etc":
          this.tab = "info";
          break;
      }
    },
    nextBtn() {
      switch (this.tab) {
        case "user":
          this.tab = "info";
          break;
        case "info":
          this.tab = "etc";
          break;
        case "etc":
          this.postUser();
          break;
      }
    },
    closeDialog() {
      this.$emit("close");
    },
    async postUser() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const result = this.reqPostUser({
        ...(this.email && { email: this.email }),
        ...(this.password && { password: this.password }),
        ...(this.name && { name: this.name }),
        ...(this.nickname && { nickname: this.nickname }),
        ...(this.weight && { weight: this.weight }),
        ...(this.height && { height: this.height }),
        ...(this.age && { age: this.age }),
        ...(this.sex && { sex: this.sex }),
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
