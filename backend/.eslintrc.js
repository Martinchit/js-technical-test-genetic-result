module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
        "experimentalObjectRestSpread": true
        }
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": ["error"]
    }
}