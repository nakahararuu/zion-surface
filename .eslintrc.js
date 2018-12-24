module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/strongly-recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "quotes": ["error", "single"],
    "semi": [2, "never"],
    "no-console": "off",
    "prettier/prettier": ["error", { "semi": false, "singleQuote": true }],
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/component-name-in-template-casing": ["error", "kebab-case"]
  }
}
