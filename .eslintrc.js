module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    eqeqeq: 'error',
    'max-len': [
      'error',
      {
        code: 140,
      },
    ],
    'no-underscore-dangle': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'prefer-template': 'error',
    'simple-import-sort/imports': 'error',
    semi: ['error', 'never'],
    'template-curly-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 'error',
    camelcase: 'off',
    'eol-last': ['error', 'always'],
    indent: ['error', 2],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
}
