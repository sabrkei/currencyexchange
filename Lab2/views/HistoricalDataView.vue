<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title mb-1">Historical Exchange Rates</h2>
      <p class="text-muted mb-3">Select a date to view exchange rates from that day</p>
      <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
        <input type="date" v-model="selectedDate" class="form-control w-auto" />
        <label for="hist-base" class="form-label mb-0">Base:</label>
        <select id="hist-base" v-model="baseCurrency" class="form-select w-auto">
          <option v-for="code in availableCurrencies" :key="code" :value="code">{{ code }}</option>
        </select>
        <button @click="fetchHistoricalData" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Loading...' : 'Load Rates' }}
        </button>
      </div>
      <p v-if="loading" class="text-muted fst-italic">Loading data...</p>
      <p v-if="error" class="text-danger">{{ error }}</p>
      <p v-if="fetchedDate" class="text-muted small mb-2">Rates from: {{ fetchedDate }}</p>
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
  name: 'HistoricalDataView',
  components: { CurrencyList },

  data() {
    return {
      selectedDate: '',
      currencies: [],
      availableCurrencies: [],
      baseCurrency: 'EUR',
      loading: false,
      error: '',
      fetchedDate: '',
    }
  },

  created() {
    this.fetchCurrencies()
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

    async fetchHistoricalData() {
      if (!this.selectedDate) return
      this.loading = true
      this.error = ''
      this.fetchedDate = ''
      try {
        const url = `https://api.frankfurter.dev/v1/${this.selectedDate}?base=${this.baseCurrency}`
        const response = await fetch(url)
        const data = await response.json()
        this.fetchedDate = data.date
        this.currencies = Object.entries(data.rates)
          .map(([code, rate]) => ({ code, rate }))
      } catch {
        this.error = 'Failed to load historical data. Check the date and try again.'
      }
      this.loading = false
    },
  },
}
</script>
