module.exports = {
  root: true,
  extends: ['eslint-config-airbnb-base', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    'webdriverio/wdio': true,
  },
  globals: {
    // chai
    expect: true,
    AssertionError: true,
    Assertion: true,
  },
  rules: {
    'max-len': [
      'error',
      {
        code: 120,
        comments: 180,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'func-names': 'off', // выключаем для того, что бы удобно использовать context в mocha
    'no-unused-expressions': 'off',
    'no-empty': 'off',
    strict: 'error',
    'no-loop-func': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'class-methods-use-this': 'off',

    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/newline-after-description': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-example': 'off',
    'filenames/match-regex': ['error', '^[a-z-.]+$', true],
  },
  plugins: ['jsdoc', 'webdriverio', 'prettier', 'filenames'],
  overrides: [
    {
      files: ['**/{helpers,specs}/**/*.js'],
      rules: {
        'filenames/match-regex': ['error', '^[a-z-]+$'],
      },
    },
  ],
};
