module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  globals: {
    app: true,
    Vue: true,
    process: true
  },
  extends: [
    "prettier",
    "plugin:vue/recommended", // /base, /essential, /strongly-recommended, /recommended
    "plugin:prettier/recommended", // turns off all ESLINT rules that are unnecessary due to Prettier or might conflict with Prettier.
    "eslint:recommended"
  ],
  plugins: ["vue", "prettier"],
  rules: {
    //"prettier/prettier": "error",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "any",
          component: "any"
        },
        svg: "always",
        math: "always"
      }
    ],
    "no-console": "off",
    "vue/max-attributes-per-line": "off"
  }
};
