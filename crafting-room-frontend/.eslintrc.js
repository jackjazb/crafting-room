/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable quote-props */
/* eslint-disable quotes */

const { join } = require("path");

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "../.eslintrc",                   // extends the parent `../.eslint` config,
    "plugin:@next/next/recommended",  // and adds nextjs,
    "plugin:react/recommended"        // and react plugins
  ],
  "plugins": [
    "@next/eslint-plugin-next",
    "eslint-plugin-react"
  ],
  "parserOptions": {
    "tsconfigRootDir": __dirname,
    "project": "tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "project": join(__dirname, "tsconfig.json")
      }
    }
  },
  "rules": {
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "react/jsx-closing-tag-location": ["error"],
    "react/jsx-tag-spacing": ["error", {
      "closingSlash": "never",
      "beforeSelfClosing": "always",
      "afterOpening": "never",
      "beforeClosing": "never"
    }],
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }],
    "react/jsx-sort-props": ["error", {
      "callbacksLast": true,
      // "shorthandLast": false,
      "reservedFirst": true,
      "ignoreCase": true,
      "noSortAlphabetically": true
    }],
    "react/jsx-one-expression-per-line": ["error", { "allow": "none" }], //single-child
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line"
    }],
    "react/style-prop-object": ["error"],
    "react/jsx-no-useless-fragment": ["error"],
    "react/jsx-pascal-case": ["error"],
    "react/jsx-closing-bracket-location": ["error", {
      "selfClosing": "tag-aligned",
      "nonEmpty": "tag-aligned"
    }],
    "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
    "react/jsx-equals-spacing": ["error"]
  }
};
