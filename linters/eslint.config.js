const eslintPluginReact = require('eslint-plugin-react')
const eslintPluginSimpleImportSort = require('eslint-plugin-simple-import-sort')
const eslintPluginSortDestructureKeys = require('eslint-plugin-sort-destructure-keys')
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports')
const { defineConfig, globalIgnores } = require('eslint/config')
const js = require('@eslint/js')
const globals = require('globals')

module.exports = defineConfig([
  globalIgnores(['**/static/*', '**/build/*', '**/dist/*', 'linters/*', 'webpack.config.js']),
  {
    name: 'eslint-config-scripts',
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        wp: true,
        jQuery: true,
        block_params: true,
        plugin_params: true,
        fw_data: true,
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          ts: true,
          tsx: true
        },
        sourceType: 'module'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error'
    },
    plugins: {
      react: eslintPluginReact,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
      js
    },
    extends: [
      'js/recommended'
    ],
    settings: {
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
      indent: ['error', 2],
      react: {
        version: 'detect'
      }
    },
    rules: {
      'object-shorthand': 'off',
      'space-before-function-paren': 'off',
      'comma-dangle': ['error', 'only-multiline'],
      'generator-star-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'unused-imports/no-unused-imports': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-console': 'warn',
      'operator-linebreak': ['error', 'before'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-sort-props': [
        1,
        {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'ignore',
          reservedFirst: true
        }
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        2,
        {
          caseSensitive: false
        }
      ]
    }
  }
])
