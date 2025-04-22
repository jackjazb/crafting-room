/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/unbound-method */

const { resolve } = require('path');

module.exports = {
    ignorePatterns: [
        '**/dist/**/*'
    ],
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    plugins: [
        '@typescript-eslint',
        'sort-exports',
        'eslint-plugin-tsdoc'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: resolve(__dirname, 'tsconfig.base.json'),
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx'
            ]
        },
        'import/resolver': {
            typescript: {
                project: resolve(__dirname, 'tsconfig.base.json'),
                alwaysTryTypes: true //always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            }
        },
        'react': {
            version: 'detect'
        }
    },
    overrides: [
        {
            files: [
                '*.js'
            ],
            rules: {
                'tsdoc/syntax': 'off'
            }
        }
    ],
    rules: {
        'tsdoc/syntax': 'warn',
        'sort-exports/sort-exports': [
            'error',
            {
                sortDir: 'asc',
                pattern: '**/index.ts'
            }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true
                }
            }
        ],
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/unbound-method': [
            'error',
            {
                ignoreStatic: true
            }
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        'quote-props': [
            'error',
            'consistent-as-needed'
        ],
        'semi': 'error',
        'no-extra-semi': 'error',
        'quotes': [
            'error',
            'single'
        ],
        'jsx-quotes': [
            'error',
            'prefer-single'
        ],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'newline-per-chained-call': 'off',
        'array-element-newline': 'off',
        'function-paren-newline': [
            'error',
            'consistent'
        ],
        'function-call-argument-newline': [
            'error',
            'consistent'
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'nonblock-statement-body-position': [
            'error',
            'below'
        ],
        'eqeqeq': 'error',
        'max-len': [
            'error',
            {
                code: 120,
                tabWidth: 4,
                // "comments": 75,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        'no-trailing-spaces': 'error',
        'object-shorthand': [
            'error',
            'always'
        ],
        'object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: true
            }
        ],
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true
            }
        ],
        'eol-last': [
            'error',
            'always'
        ]
    }
};
