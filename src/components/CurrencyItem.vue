<template>
  <li class="list-group-item d-flex justify-content-between align-items-center" :title="currency.code">
    <span class="fw-bold text-primary">{{ flag }} {{ currency.code }}</span>
    <span class="text-secondary">{{ currency.rate }}</span>
  </li>
</template>

<script>
const FLAG_OVERRIDES = { EUR: '\u{1F1EA}\u{1F1FA}', XDR: '' }

function codeToFlag(code) {
  if (FLAG_OVERRIDES[code] !== undefined) return FLAG_OVERRIDES[code]
  return String.fromCodePoint(
    ...code.slice(0, 2).split('').map(c => 0x1F1E6 + c.charCodeAt(0) - 65)
  )
}

export default {
  name: 'CurrencyItem',
  props: {
    currency: {
      type: Object,
      required: true,
    },
  },
  computed: {
    flag() {
      return codeToFlag(this.currency.code)
    },
  },
}
</script>
