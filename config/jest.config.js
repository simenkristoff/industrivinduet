module.exports = {
  // Setting the root to the actual root, since this file is in root/config
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>app/'],
  modulePathIgnorePatterns: ['__mockData__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    // Allow `@/` to map to `src/client/` in Jest tests
    '@/(.*)$': '<rootDir>/app/$1',
    '@resources/(.*)$': '<rootDir>/resources/$1',
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.ts',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
