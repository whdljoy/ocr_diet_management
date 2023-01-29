<template>
  <header class="header__container border-box">
    <div class="header__wrap">
      <poin-logo class="mr-10" />

      <routing-menu class="mr-auto" />

      <template v-if="campusOnly">
        <div v-if="!authenticated" class="login__wrap">
          <span @click="logInOut">{{ text.logIn }}</span>
          |
          <span @click="toJoinPath">{{ text.join }}</span>
        </div>
        <template v-else>
          <router-link
            :to="{
              name: 'campus-playlist',
              params: { ...$route.params, campusDomain: domain },
            }"
            class="playlist-btn"
            >내 진행상황</router-link
          >
          <user-profile />
        </template>
      </template>

      <template v-else>
        <router-link style="all: unset" :to="{ name: 'campus-register' }">
          <button v-if="!loading && !campusYn" class="campus-register-btn">
            {{ text.campusRegister }}
          </button>
        </router-link>
        <button v-if="!authenticated" @click="logInOut" class="login-btn">
          {{ text.logIn }}
        </button>
        <user-profile v-else class="ml-3" />
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import globalMixin from "@/mixins/global";

export default {
  name: "poin-header",
  components: {},
  mixins: [globalMixin],
  data() {
    return {
      loading: false,
      text: {
        logIn: "로그인",
        join: "회원가입",
        campusRegister: "무료로 시작하기",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
};
</script>

<style scoped lang="scss">
.header__container {
  width: 100%;
  height: var(--header-height);
  z-index: var(--header-zIndex);

  box-sizing: border-box;
  position: relative;
  background-color: $white;
  box-shadow: 0 1px 0 0 $gray3;

  display: flex;
  flex-direction: row;
  align-items: center;
}
.header__container .header__wrap {
  max-width: 1240px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
}
.header__container .login__wrap {
  font-size: 12px;
  margin-left: 13px;
  color: #1c1c1c;
  font-weight: 00;
  display: flex;
  align-items: center;
}
.header__container .login__wrap span {
  cursor: pointer;
  padding: 0 8px;
}
.login-btn {
  background-color: $white;
  border: 1.5px solid $gray3;
  border-radius: 8px;
  color: $black;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.5px;
  margin-left: 8px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  height: 40px;
  &:hover {
    background-color: $primary100;
    border-color: $primary500;
    color: $primary800;
  }
}
.campus-register-btn {
  background-color: $primary;
  border: 1.5px solid $primary;
  border-radius: 8px;
  color: $white;
  padding: 8px 20px;
  margin-left: 16px;
  transition: all 0.3s ease-in-out;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.5px;
  &:hover {
    background-color: $primary800;
    border-color: $primary800;
  }
}
.playlist-btn {
  font-size: 14px;
  color: $black;
  border: 1px solid $white;
  font-weight: 500;
  padding: 8px 12px;
  line-height: 22px;
  border-radius: 8px;
  margin-right: 12px;
  position: relative;
  @include hover-before;
}
</style>
