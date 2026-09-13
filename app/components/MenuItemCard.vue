<script setup>
defineProps({
  item: { type: Object, required: true },
})
defineEmits(['open', 'add'])
</script>

<template>
  <div
    class="group bg-neutral-900 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-orange-900/20 transition-shadow overflow-hidden border border-neutral-800 cursor-pointer flex flex-col"
    @click="$emit('open', item)"
  >
    <div class="relative h-32 sm:h-40 flex items-center justify-center text-5xl sm:text-6xl bg-gradient-to-br" :class="item.gradient">
      <span>{{ item.emoji }}</span>
      <span
        v-if="item.tag"
        class="absolute top-2 left-2 text-xs font-semibold bg-neutral-950/80 text-orange-400 px-2 py-0.5 rounded-full"
      >
        {{ item.tag }}
      </span>
    </div>
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <h5 class="font-semibold text-white text-sm sm:text-base">{{ item.name }}</h5>
      <p class="text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-2 flex-1">{{ item.description }}</p>
      <div class="flex items-center justify-between mt-3">
        <span class="font-bold text-orange-400 text-sm sm:text-base">{{ formatCurrency(item.price) }}</span>
        <button
          type="button"
          class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
          aria-label="Adicionar ao carrinho"
          @click.stop="$emit('add', item)"
        >
          <AppIcon name="plus" class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
