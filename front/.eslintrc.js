module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    jquery: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:prettier/recommended",
  ],
  // https://eslint.vuejs.org/user-guide/
  plugins: ["vue"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "espree",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "template-curly-spacing": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "no-async-promise-executor": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
