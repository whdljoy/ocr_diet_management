const { defineConfig } = require("@vue/cli-service");
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/style/config/_variables.scss"; 
          @import "~@/style/config/_mixin.scss";
        `,
      },
    },
  },
};
