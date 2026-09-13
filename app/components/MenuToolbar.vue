<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelSearch: { type: String, default: '' },
  modelCategory: { type: String, default: 'todos' },
})
defineEmits(['update:modelSearch', 'update:modelCategory'])
</script>

<template>
  <div class="sticky top-16 z-30 bg-neutral-50/90 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-100 dark:border-neutral-800">
    <div class="max-w-5xl mx-auto px-4 py-3 space-y-3">
      <div class="relative">
        <AppIcon name="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          :value="modelSearch"
          type="text"
          placeholder="Buscar no cardápio..."
          class="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          @input="$emit('update:modelSearch', $event.target.value)"
        />
      </div>
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0"
          :class="modelCategory === cat.id
            ? 'bg-orange-500 text-white'
            : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'"
          @click="$emit('update:modelCategory', cat.id)"
        >
          {{ cat.emoji }} {{ cat.label }}
        </button>
      </div>
    </div>
  </div>
</template>
