<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title mb-1">Currency Converter</h2>
      <p class="text-muted mb-3">Convert between currencies using live exchange rates</p>
      <div class="row g-3 mb-3 align-items-end">
        <div class="col">
          <label for="amount" class="form-label">Amount</label>
          <input
            id="amount"
            type="number"
            v-model.number="amount"
            min="0"
            placeholder="Enter amount"
            class="form-control"
          />
        </div>
        <div class="col">
          <label for="fromCurrency" class="form-label">From</label>
          <select id="fromCurrency" v-model="fromCurrency" class="form-select">
            <option v-for="c in availableCurrencies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-outline-secondary" @click="swapCurrencies" title="Swap currencies">&#8646;</button>
        </div>
        <div class="col">
          <label for="toCurrency" class="form-label">To</label>
          <select id="toCurrency" v-model="toCurrency" class="form-select">
            <option v-for="c in availableCurrencies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary w-100" @click="convert" :disabled="loading">
        {{ loading ? 'Converting...' : 'Convert' }}
      </button>
      <div v-if="result !== null" class="alert alert-success text-center mt-3">
        <span>{{ amount }} {{ fromCurrency }}</span>
        <span class="mx-2">=</span>
        <span class="fw-bold">{{ result.toFixed(4) }} {{ toCurrency }}</span>
      </div>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyConverterView',

  data() {
    return {
      amount: 100,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      result: null,
      loading: false,
      error: '',
      availableCurrencies: [],
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
      } catch (err) {
        this.error = 'Failed to load currency list.'
      }
    },

    swapCurrencies() {
      const temp = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = temp
    },

    async convert() {
      if (this.fromCurrency === this.toCurrency) {
        this.result = this.amount
        return
      }
      this.loading = true
      this.error = ''
      try {
        const url = `https://api.frankfurter.dev/v1/latest?amount=${this.amount}&from=${this.fromCurrency}&to=${this.toCurrency}`
        const response = await fetch(url)
        const data = await response.json()
        this.result = data.rates[this.toCurrency]
      } catch (err) {
        this.error = 'Conversion failed. Please try again.'
      }
      this.loading = false
    },
  },
}
</script>
