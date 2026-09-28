module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'utils/**/*.js',
    'pages/**/*.js',
    'components/**/*.js',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};
