module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!node_modules/**'],
};
