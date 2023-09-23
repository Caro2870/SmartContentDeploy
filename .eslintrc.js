module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-param-reassign": 0,
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    semi: ["error", "always"],
    "max-len": "off",
    "linebreak-style": "off",

    camelcase: [
      "error",
      { properties: "never", ignoreDestructuring: true, ignoreImports: true },
    ],

    "arrow-parens": ["error", "as-needed"],
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/component-name-in-template-casing": ["error","kebab-case", {
      "registeredComponentsOnly": true,
      "ignores": []
    }],
    "vue/multiline-html-element-content-newline": "off",
    quotes: ["warn", "single"],
  },
};