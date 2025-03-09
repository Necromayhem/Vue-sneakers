import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // Определение файлов для линтинга
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  // Игнорируемые файлы и директории
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Основная конфигурация ESLint
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // Настройка правил ESLint
  {
    rules: {
      'vue/no-multiple-template-root': 'off', //
      'vue/multi-word-component-names': 'off', // Отключаем правило
      // Отключаем правило
      // Добавьте другие правила здесь
    },
  },
]
