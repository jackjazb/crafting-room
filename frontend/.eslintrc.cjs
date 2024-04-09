/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */

const { resolve } = require('path');

module.exports = {
  root: true,
  extends: [
    resolve(__dirname, '../.eslintrc.cjs'),
    'plugin:@next/next/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    '@next/eslint-plugin-next',
    'eslint-plugin-react'
  ],
  parserOptions: {
    project: resolve(__dirname, 'tsconfig.json')
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: resolve(__dirname, 'tsconfig.json')
      }
    },
    'react': {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-first-prop-new-line': [
      'error',
      'multiline'
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1
      }
    ],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        // "shorthandLast": false,
        reservedFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true
      }
    ],
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'none'
      }
    ], //single-child
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line'
      }
    ],
    'react/style-prop-object': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-closing-bracket-location': [
      'error',
      {
        selfClosing: 'tag-aligned',
        nonEmpty: 'tag-aligned'
      }
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never'
      }
    ],
    'react/jsx-equals-spacing': 'error',
    'react/prop-types': 'off' //`NextPage` type has a meltdown without this
  }
};
