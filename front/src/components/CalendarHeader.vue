<template>
  <header class="header__container border-box">
    <div class="header__wrap">
      <template>
        <p
          class="mr-10 text-body-1-bold nickname__wrapper rounded-lg px-4 py-2"
        >
          <v-icon>mdi-account</v-icon> {{ nickname }}
        </p>
        <p-btn theme="secondary" @click="toLogout">
          {{ text.logOut }}
        </p-btn>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "featureHeader",
  components: {},
  data() {
    return {
      loading: false,
      text: {
        logOut: "로그아웃",
      },
    };
  },

  computed: {
    ...mapGetters({ user: "users/getUser" }),
    nickname() {
      return this.user?.nickname || "-";
    },
  },
  methods: {
    toLogout() {
      this.$router.push({
        name: "login",
      });
    },
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
  justify-content: center;
}
.nickname__wrapper {
  box-shadow: 0 1px 0 0 $gray3;
  border: 1px solid $gray5;
}
.header__container .header__wrap {
  width: 100%;
  padding: 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 240px;
  justify-content: flex-end;
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
</style>
