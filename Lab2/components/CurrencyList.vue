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

<script>
import CurrencyItem from './CurrencyItem.vue'

export default {
  name: 'CurrencyList',
  components: { CurrencyItem },

  props: {
    currencies: {
      type: Array,
      required: true,
    },
  },

  methods: {
    emitClick(code) {
      this.$emit('currency-clicked', code)
    },
  },
}
</script>
