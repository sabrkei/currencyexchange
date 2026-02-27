const BASE = 'https://api.frankfurter.dev/v1'

export async function getCurrencies() {
  const response = await fetch(`${BASE}/currencies`)
  return Object.keys(await response.json())
}

export async function getLiveRates(base) {
  const response = await fetch(`${BASE}/latest?base=${base}`)
  const data = await response.json()
  return Object.entries(data.rates).map(([code, rate]) => ({ code, rate }))
}

export async function getHistoricalRates(date, base) {
  const response = await fetch(`${BASE}/${date}?base=${base}`)
  const data = await response.json()
  return {
    rates: Object.entries(data.rates).map(([code, rate]) => ({ code, rate })),
    date: data.date,
  }
}

export async function convertCurrency(amount, from, to) {
  const response = await fetch(`${BASE}/latest?amount=${amount}&from=${from}&to=${to}`)
  const data = await response.json()
  return data.rates[to]
}
