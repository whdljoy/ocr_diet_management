<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style>
@import "style/vuetify.min.css";
@import "style/import-font.css";
@import "style/reset.css";
@import "style/global.css";
</style>
<style lang="scss">
@import "~@/style/styles.scss";
.v-snack__content {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
}
</style>
<style scoped>
#app {
  position: relative;
}

#app > .web {
  height: 100%;
  width: 100%;
}
</style>
