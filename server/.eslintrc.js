module.exports = {
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jsdoc/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsdoc',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    'object-shorthand': [
      'error',
      'always',
    ],
    'comma-style': [
      'error',
      'last',
    ],
    'comma-dangle': [
      'error', {
        arrays: 'always',
        objects: 'always',
        imports: 'always',
        exports: 'always',
        functions: 'never',
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
  },
};
