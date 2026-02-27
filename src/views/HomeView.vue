<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="card-title mb-1">Live Exchange Rates</h2>
      <div class="col-md-3">
        <label for="base-currency" class="form-label">Base Currency</label>
        <!-- Changing selection triggers a new API fetch -->
        <select id="base-currency" v-model="baseCurrency" @change="fetchLiveRates" class="form-select">
          <option v-for="c in availableCurrencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <CurrencyList v-else :currencies="currencies" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CurrencyList from '../components/CurrencyList.vue'
import { getCurrencies, getLiveRates } from '../services/frankfurter.js'

const currencies = ref([])
const baseCurrency = ref('EUR')
const availableCurrencies = ref([])
const loading = ref(true)
const error = ref('')

// Fetches all available currencies for the base currency dropdown
async function fetchCurrencies() {
  try {
    availableCurrencies.value = await getCurrencies()
  } catch {
    error.value = 'Failed to load currency list.'
  }
}

// Fetches live exchange rates for the selected base currency
async function fetchLiveRates() {
  loading.value = true
  error.value = ''
  try {
    currencies.value = await getLiveRates(baseCurrency.value)
  } catch {
    error.value = 'Failed to fetch live rates. Please try again.'
  } finally {
    loading.value = false
  }
}

// Load currencies and rates when the page mounts
onMounted(async () => {
  await fetchCurrencies()
  await fetchLiveRates()
})
</script>
