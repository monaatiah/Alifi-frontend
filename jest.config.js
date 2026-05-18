const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/themes/(.*)$': '<rootDir>/src/themes/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/content/(.*)$': '<rootDir>/src/content/$1',
    '\\.(svg|png|jpg|jpeg|gif|webp|ico)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

module.exports = createJestConfig(customJestConfig);
