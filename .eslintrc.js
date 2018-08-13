module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "prettier"
  ],
  "plugins": [
    "import",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "linebreak-style": 0
  }
};
