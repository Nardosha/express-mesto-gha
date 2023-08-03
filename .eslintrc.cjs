module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "enforce-import-name": 0,
    "no-underscore-dangle": ["error", {"allow": ["_id"]}],
    'consistent-return': 'warn',
    "import/named": 0,
    "import/extensions": 0,
  }
};
