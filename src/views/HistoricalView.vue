<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title mb-1">Historical Rates</h2>
      <p class="text-muted mb-3">Look up historical currency rates for any date.</p>

      <div class="row g-3 mb-3 align-items-end">
        <div class="col-md-4">
          <label for="date" class="form-label">Date</label>
          <input id="date" type="date" v-model="date" class="form-control" />
        </div>
        <div class="col-md-4">
          <label for="base-currency-historical" class="form-label">Base Currency</label>
          <select id="base-currency-historical" v-model="baseCurrency" class="form-select">
            <option v-for="c in availableCurrencies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary w-100" @click="fetchHistoricalRates" :disabled="loading">
            {{ loading ? 'Loading...' : 'Load Rates' }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="error" class="alert alert-danger mt-3">{{ error }}</div>

      <div v-if="rates.length > 0 && !loading">
        <h4 class="mt-4">Rates for {{ loadedDate }}</h4>
        <CurrencyList :currencies="rates" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CurrencyList from '../components/CurrencyList.vue'

const date = ref(new Date().toISOString().split('T')[0])
const baseCurrency = ref('EUR')
const availableCurrencies = ref([])
const rates = ref([])
const loadedDate = ref('')
const loading = ref(false)
const error = ref('')

async function fetchCurrencies() {
  try {
    const response = await fetch('https://api.frankfurter.dev/currencies')
    availableCurrencies.value = Object.keys(await response.json())
  } catch (err) {
    error.value = 'Failed to load currency list.'
  }
}

async function fetchHistoricalRates() {
  if (!date.value) return
  loading.value = true
  error.value = ''
  rates.value = []
  try {
    const response = await fetch(`https://api.frankfurter.dev/${date.value}?from=${baseCurrency.value}`)
    const data = await response.json()
    rates.value = Object.entries(data.rates).map(([code, rate]) => ({ code, rate }))
    loadedDate.value = data.date
  } catch (err) {
    error.value = 'Could not fetch historical rates for the selected date. Please try another date.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchCurrencies)
</script>