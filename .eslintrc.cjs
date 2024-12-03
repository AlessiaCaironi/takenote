module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "prettier",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'prettier',
    'react-refresh'
  ],
  rules: {
    "semi": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    "no-use-before-define": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-empty-function": "off",
    "no-undef": "off",
    "import/order": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "prettier/prettier": [
      "error", {
        "semi": false,
        "singleQuote": true
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
