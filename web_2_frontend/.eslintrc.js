module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import', 'jsx-a11y', 'prettier'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'object-curly-spacing': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single'],
    semi: ['warn', 'never'],
    indent: ['warn', 2, { SwitchCase: 1 }],
    'key-spacing': 'error',
    eqeqeq: ['error', 'smart'],
    'comma-dangle': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 6, maxEOF: 0, maxBOF: 1 }],
    'react/prop-types': 'error',
    'react/no-array-index-key': 'error',
    'react/self-closing-comp': 'error',
    'react/no-danger': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/no-string-refs': 'warn',
    'react/jsx-no-target-blank': 'off', // all major browsers already behave as if rel='noopener' is set
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always'
      }
    ],
    'import/newline-after-import': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        ignore: ['␍']
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
