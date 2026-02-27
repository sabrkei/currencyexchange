<template>
  <li class="list-group-item d-flex justify-content-between align-items-center" :title="currency.code">
    <span class="d-flex align-items-center fw-bold text-primary">
      <img
        v-if="countryCode"
        :src="`https://flagcdn.com/24x18/${countryCode}.png`"
        :srcset="`https://flagcdn.com/48x36/${countryCode}.png 2x`"
        :alt="currency.code"
        class="currency-flag"
      />
      {{ currency.code }}
    </span>
    <span class="text-secondary">{{ currency.rate }}</span>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { CURRENCY_COUNTRY } from '../utils/currencyCountryMap.js'

const props = defineProps({
  currency: {
    type: Object,
    required: true,
  },
})

const countryCode = computed(() => CURRENCY_COUNTRY[props.currency.code] ?? null)
</script>
