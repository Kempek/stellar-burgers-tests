require('dotenv').config();
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1'
    // ... другие алиасы, которые ты используешь
  }
};
