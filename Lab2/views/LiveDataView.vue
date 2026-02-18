<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title mb-3">Latest Exchange Rates</h2>
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="base-currency" class="form-label mb-0">Choose your currency:</label>
        <select id="base-currency" v-model="baseCurrency" @change="fetchLatestRates" class="form-select w-auto">
          <option v-for="code in availableCurrencies" :key="code" :value="code">{{ code }}</option>
        </select>
      </div>
      <p v-if="loading" class="text-muted fst-italic">Loading latest rates...</p>
      <p v-if="error" class="text-danger">{{ error }}</p>
      <CurrencyList
        v-if="!loading && currencies.length"
        :currencies="currencies"
      />
    </div>
  </div>
</template>

<script>
import CurrencyList from '../components/CurrencyList.vue'

export default {
  name: 'LiveDataView',
  components: { CurrencyList },

  data() {
    return {
      currencies: [],
      availableCurrencies: [],
      baseCurrency: 'EUR',
      loading: false,
      error: '',
    }
  },

  created() {
    this.fetchCurrencies()
    this.fetchLatestRates()
  },

  methods: {
    async fetchCurrencies() {
      try {
        const response = await fetch('https://api.frankfurter.dev/v1/currencies')
        const data = await response.json()
        const allowed = ['EUR','USD','GBP','NOK','DKK','SEK','AUD','CNY']
        this.availableCurrencies = Object.keys(data).filter(c => allowed.includes(c))
      } catch {
      }
    },

    async fetchLatestRates() {
      this.loading = true
      this.error = ''
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${this.baseCurrency}`
        )
        const data = await response.json()
        this.currencies = Object.entries(data.rates)
          .map(([code, rate]) => ({ code, rate }))
      } catch {
        this.error = 'Failed to load latest rates. Please try again.'
      }
      this.loading = false
    },
  },
}
</script>
