const STORAGE_KEY = 'cardapio-theme'

export function useDarkMode() {
  const isDark = useState('dark-mode', () => false)

  function apply(value) {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', value)
      localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light')
    }
  }

  function toggle() {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = saved ? saved === 'dark' : prefersDark
      apply(isDark.value)
    }
  }

  return { isDark, toggle, init }
}
