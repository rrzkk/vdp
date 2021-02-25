module.exports= {
  roots: [
    "./test"
  ],
  
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}