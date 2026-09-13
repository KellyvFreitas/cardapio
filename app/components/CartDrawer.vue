<script setup>
import { ref } from 'vue'

defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['update:open'])

const cart = useCart()
const orderPlaced = ref(false)

function close() {
  emit('update:open', false)
}

function checkout() {
  orderPlaced.value = true
  setTimeout(() => {
    cart.clear()
    orderPlaced.value = false
    close()
  }, 2200)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/50" @click="close" />
        <div class="absolute right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-neutral-800 shadow-xl flex flex-col">
          <div class="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-700 shrink-0">
            <h5 class="font-bold text-lg">Seu pedido</h5>
            <button
              type="button"
              class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
              aria-label="Fechar carrinho"
              @click="close"
            >
              <AppIcon name="close" class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="orderPlaced" class="h-full flex flex-col items-center justify-center text-center">
              <div class="text-5xl mb-3">✅</div>
              <p class="font-semibold text-lg">Pedido enviado!</p>
              <p class="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                Só um exemplo de portfólio — nenhum pedido real foi feito 🙂
              </p>
            </div>
            <div v-else-if="cart.lines.value.length === 0" class="h-full flex flex-col items-center justify-center text-center text-neutral-400">
              <p class="text-4xl mb-2">🛒</p>
              <p>Seu carrinho está vazio</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="line in cart.lines.value" :key="line.item.id" class="flex items-center gap-3">
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br shrink-0"
                  :class="line.item.gradient"
                >
                  {{ line.item.emoji }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium truncate">{{ line.item.name }}</p>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400">{{ formatCurrency(line.item.price) }}</p>
                </div>
                <div class="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-full px-1.5 py-1 shrink-0">
                  <button type="button" class="w-6 h-6 flex items-center justify-center" aria-label="Diminuir" @click="cart.decrement(line.item.id)">
                    <AppIcon name="minus" class="w-3.5 h-3.5" />
                  </button>
                  <span class="w-4 text-center text-sm font-medium">{{ line.qty }}</span>
                  <button type="button" class="w-6 h-6 flex items-center justify-center" aria-label="Aumentar" @click="cart.increment(line.item.id)">
                    <AppIcon name="plus" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!orderPlaced && cart.lines.value.length" class="p-4 border-t border-neutral-100 dark:border-neutral-700 space-y-3 shrink-0">
            <div class="flex items-center justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{{ formatCurrency(cart.totalPrice.value) }}</span>
            </div>
            <button
              type="button"
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
              @click="checkout"
            >
              Finalizar pedido
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
