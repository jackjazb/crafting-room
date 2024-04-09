/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */

const { resolve } = require('path');

module.exports = {
  root: true,
  extends: [
    resolve(__dirname, '../.eslintrc.cjs')
  ],
  plugins: [],
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json')
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json')
      }
    }
  },
  rules: {}
};
