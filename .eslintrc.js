module.exports = {
  plugins: ['prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    tokens: true,
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~client', './web/src'],
          ['~client-test', './web/test'],
          ['~api', './api/src'],
          ['~api-test', './api/test'],
        ],
        extensions: ['.js', '.tsx', '.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*spec.ts',
          '**/*.spec.tsx',
          '**/*.spec.js',
          'api/src/test-after-env.ts',
        ],
      },
    ],
    'import/prefer-default-export': 0,
    'jest/lowercase-name': 0,
    'jest/require-top-level-describe': 0,
    'max-len': ['error', 120],
    'no-bitwise': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': ['error'],
    '@typescript-eslint/camelcase': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prefer-destructuring': 0,
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
        '@typescript-eslint/no-var-requires': ['error'],
      },
    },
  ],
};
