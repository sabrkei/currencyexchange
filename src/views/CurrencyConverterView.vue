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
        <!-- Swap button reverses the from/to currencies -->
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
      <!-- Result shown after a successful conversion -->
      <div v-if="result !== null" class="alert alert-success text-center mt-3">
        <span>{{ amount }} {{ fromCurrency }}</span>
        <span class="mx-2">=</span>
        <span class="fw-bold">{{ result.toFixed(4) }} {{ toCurrency }}</span>
      </div>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrencies, convertCurrency } from '../services/frankfurter.js'

const ALLOWED = ['EUR', 'USD', 'GBP', 'NOK', 'DKK', 'SEK', 'AUD', 'CNY']

const amount = ref(100)
const fromCurrency = ref('EUR')
const toCurrency = ref('USD')
const result = ref(null)
const loading = ref(false)
const error = ref('')
const availableCurrencies = ref([])

onMounted(fetchCurrencies)

// Fetches the allowed currencies for the dropdowns
async function fetchCurrencies() {
  try {
    const all = await getCurrencies()
    availableCurrencies.value = all.filter(c => ALLOWED.includes(c))
  } catch {
    error.value = 'Failed to load currency list.'
  }
}

// Swaps the from and to currency selections
function swapCurrencies() {
  ;[fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value]
}

// Converts the entered amount using the Frankfurter API
async function convert() {
  if (fromCurrency.value === toCurrency.value) {
    result.value = amount.value
    return
  }
  loading.value = true
  error.value = ''
  try {
    result.value = await convertCurrency(amount.value, fromCurrency.value, toCurrency.value)
  } catch {
    error.value = 'Conversion failed. Please try again.'
  }
  loading.value = false
}
</script>
