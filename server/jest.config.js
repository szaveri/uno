
module.exports = {
  roots: [
    'src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '@config(.*)$': '<rootDir>/src/config/$1',
    '@modules(.*)$': '<rootDir>/src/modules$1',
    '@helpers(.*)$': '<rootDir>/src/helpers$1',
  },
};
