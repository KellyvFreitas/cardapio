<script setup>
defineProps({
  cartCount: { type: Number, default: 0 },
  isDark: { type: Boolean, default: false },
})
defineEmits(['toggle-cart', 'toggle-dark'])
</script>

<template>
  <header class="sticky top-0 z-40 h-16 bg-neutral-950/95 backdrop-blur border-b border-orange-900/40 text-white shadow-[0_1px_0_0_rgba(249,115,22,0.15)]">
    <div class="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🍔</span>
        <span class="font-extrabold text-lg tracking-tight text-white">Burguer<span class="text-orange-500">Hub</span></span>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="w-10 h-10 rounded-full flex items-center justify-center text-orange-100 hover:bg-orange-500/15 hover:text-orange-400 transition-colors"
          :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="$emit('toggle-dark')"
        >
          <AppIcon :name="isDark ? 'sun' : 'moon'" class="w-5 h-5" />
        </button>
        <button
          type="button"
          class="relative w-10 h-10 rounded-full flex items-center justify-center text-orange-100 hover:bg-orange-500/15 hover:text-orange-400 transition-colors"
          aria-label="Abrir carrinho"
          @click="$emit('toggle-cart')"
        >
          <AppIcon name="cart" class="w-5 h-5" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>
