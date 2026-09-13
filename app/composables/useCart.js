import { computed } from 'vue'

export function useCart() {
  const items = useState('cart-items', () => ({}))

  function add(item, qty = 1) {
    const current = items.value[item.id]
    items.value = {
      ...items.value,
      [item.id]: { item, qty: (current?.qty ?? 0) + qty },
    }
  }

  function remove(id) {
    const next = { ...items.value }
    delete next[id]
    items.value = next
  }

  function increment(id) {
    const current = items.value[id]
    if (!current) return
    items.value = { ...items.value, [id]: { ...current, qty: current.qty + 1 } }
  }

  function decrement(id) {
    const current = items.value[id]
    if (!current) return
    if (current.qty <= 1) {
      remove(id)
    } else {
      items.value = { ...items.value, [id]: { ...current, qty: current.qty - 1 } }
    }
  }

  function clear() {
    items.value = {}
  }

  const lines = computed(() => Object.values(items.value))
  const totalCount = computed(() => lines.value.reduce((sum, line) => sum + line.qty, 0))
  const totalPrice = computed(() => lines.value.reduce((sum, line) => sum + line.qty * line.item.price, 0))

  return { lines, totalCount, totalPrice, add, remove, increment, decrement, clear }
}
