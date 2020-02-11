// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    google: true,
    document: false,
    navigator: false,
    window: false,
  },
  parserOptions: {
    ecmaVersion: 6,
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb-base',
    'plugin:vue/strongly-recommended',
  ],
  plugins: [
    'import',
    'html',
  ],
  rules: {
    'indent': ['error', 2, {'SwitchCase': 1}],
    'max-len': ['error', {code: 180}],
    'import/no-unresolved': 0,
    'function-paren-newline': ['off', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/extensions': ['off', 'never'],
    'no-use-before-define': 0,
    'vue/html-self-closing': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/no-use-v-if-with-v-for': 0,
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1
      },
    ],
  },
  settings: {
    'import/resolver': 'webpack',
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
};
