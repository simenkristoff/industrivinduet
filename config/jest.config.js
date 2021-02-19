module.exports = {
  preset: 'ts-jest',
  rootDir: '../',
  roots: ['<rootDir>/client/', '<rootDir>/server/'],
  modulePathIgnorePatterns: ['__mockData__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(html|xml|txt|md)$': 'jest-raw-loader',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileTransformer.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-extended'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.*\\.scss$': '<rootDir>/__mocks__/styleMock.js',
    '@/(.*)$': '<rootDir>/client/$1',
    '@resources/(.*)$': '<rootDir>/resources/$1',
  },
  setupFiles: ['<rootDir>/client/jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
