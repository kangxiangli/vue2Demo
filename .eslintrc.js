// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
   "arrow-body-style": [0],
    "comma-dangle": 0,
    "indent": [2, "tab", {"SwitchCase": 1}],
    "no-console": 0,
    "react/prop-types": 0,
    "react/jsx-indent-props": [2, "tab"]
  }
}
