<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})
const emit = defineEmits(['close', 'add'])

const qty = ref(1)
watch(
  () => props.item,
  () => { qty.value = 1 },
)

function confirmAdd() {
  emit('add', props.item, qty.value)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />
      <div class="relative bg-white dark:bg-neutral-800 w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="h-40 sm:h-48 flex items-center justify-center text-7xl sm:text-8xl bg-gradient-to-br relative shrink-0" :class="item.gradient">
          {{ item.emoji }}
          <button
            type="button"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center"
            aria-label="Fechar"
            @click="$emit('close')"
          >
            <AppIcon name="close" class="w-5 h-5" />
          </button>
        </div>
        <div class="p-5 overflow-y-auto">
          <span v-if="item.tag" class="text-xs font-semibold text-orange-600 dark:text-orange-400">{{ item.tag }}</span>
          <h5 class="text-xl font-bold text-neutral-900 dark:text-white">{{ item.name }}</h5>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2 text-sm leading-relaxed">{{ item.description }}</p>
          <div class="flex items-center justify-between mt-5">
            <span class="text-lg font-bold text-orange-600 dark:text-orange-400">{{ formatCurrency(item.price) }}</span>
            <div class="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-700 rounded-full px-2 py-1">
              <button type="button" class="w-8 h-8 flex items-center justify-center" aria-label="Diminuir quantidade" @click="qty = Math.max(1, qty - 1)">
                <AppIcon name="minus" class="w-4 h-4" />
              </button>
              <span class="w-5 text-center font-medium">{{ qty }}</span>
              <button type="button" class="w-8 h-8 flex items-center justify-center" aria-label="Aumentar quantidade" @click="qty++">
                <AppIcon name="plus" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div class="p-5 pt-0 shrink-0">
          <button
            type="button"
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
            @click="confirmAdd"
          >
            Adicionar · {{ formatCurrency(item.price * qty) }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
