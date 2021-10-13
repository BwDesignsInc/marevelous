module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./src/test/mock.js','./src/test/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'src'],
  };