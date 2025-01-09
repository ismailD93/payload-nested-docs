/** @type {import('eslint').Linter.Config} */
module.exports = {
  rules: {
    'no-unused-vars': 'warn',
    'no-case-declarations': 'off',
  },
  extends: ['next/core-web-vitals'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
