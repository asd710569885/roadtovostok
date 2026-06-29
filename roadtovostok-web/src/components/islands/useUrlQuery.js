import { ref, onMounted, onUnmounted } from 'vue'

/** Read/write URL search params without vue-router. */
export function useUrlQuery(paramName, { sync = true } = {}) {
  const value = ref('')

  function read() {
    if (typeof window === 'undefined') return ''
    const raw = new URLSearchParams(window.location.search).get(paramName)
    return raw ?? ''
  }

  function write(next) {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (next) url.searchParams.set(paramName, next)
    else url.searchParams.delete(paramName)
    window.history.replaceState({}, '', url)
    value.value = next ?? ''
  }

  function onPopState() {
    value.value = read()
  }

  onMounted(() => {
    value.value = read()
    window.addEventListener('popstate', onPopState)
  })

  onUnmounted(() => {
    window.removeEventListener('popstate', onPopState)
  })

  function setQuery(next) {
    if (!sync) {
      value.value = next ?? ''
      return
    }
    write(next)
  }

  return { value, setQuery, read }
}
