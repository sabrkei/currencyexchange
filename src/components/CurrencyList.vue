<template>
  <ul class="list-group mt-3">
    <CurrencyItem
      v-for="currency in currencies"
      :key="currency.code"
      :currency="currency"
      @click="emitClick(currency.code)"
    />
  </ul>
</template>

<script setup>
import CurrencyItem from './CurrencyItem.vue'

defineProps({
  currencies: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['currency-clicked'])

function emitClick(code) {
  emit('currency-clicked', code)
}
</script>
