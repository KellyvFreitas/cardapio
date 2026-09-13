<script setup>
import { computed, onMounted, ref } from 'vue'
import { categories, menuItems } from '~/data/menu'

const search = ref('')
const activeCategory = ref('todos')
const selectedItem = ref(null)
const cartOpen = ref(false)

const cart = useCart()
const darkMode = useDarkMode()

onMounted(() => darkMode.init())

const filteredItems = computed(() => {
  const term = search.value.trim().toLowerCase()
  return menuItems.filter((item) => {
    const matchesCategory = activeCategory.value === 'todos' || item.categoryId === activeCategory.value
    const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
    return matchesCategory && matchesSearch
  })
})

function openItem(item) {
  selectedItem.value = item
}

function addToCart(item, qty = 1) {
  cart.add(item, qty)
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
    <NuxtRouteAnnouncer />

    <AppHeader
      :cart-count="cart.totalCount.value"
      :is-dark="darkMode.isDark.value"
      @toggle-cart="cartOpen = true"
      @toggle-dark="darkMode.toggle"
    />

    <HeroBanner />

    <MenuToolbar
      :categories="categories"
      :model-search="search"
      :model-category="activeCategory"
      @update:model-search="search = $event"
      @update:model-category="activeCategory = $event"
    />

    <main class="max-w-5xl mx-auto px-4 py-6">
      <div v-if="filteredItems.length" class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <MenuItemCard v-for="item in filteredItems" :key="item.id" :item="item" @open="openItem" @add="addToCart" />
      </div>
      <div v-else class="text-center py-20 text-neutral-400">
        <p class="text-4xl mb-3">🔍</p>
        <p>Nenhum item encontrado para "{{ search }}"</p>
      </div>
    </main>

    <footer class="text-center text-xs text-neutral-400 dark:text-neutral-600 py-8">
      Projeto de portfólio — cardápio digital fictício, sem pedidos reais.
    </footer>

    <ItemModal v-if="selectedItem" :item="selectedItem" @close="selectedItem = null" @add="addToCart" />
    <CartDrawer :open="cartOpen" @update:open="cartOpen = $event" />
  </div>
</template>
