import { createRouter, createWebHistory } from 'vue-router'
import LiveDataView from '../views/LiveDataView.vue'
import HistoricalDataView from '../views/HistoricalDataView.vue'
import CurrencyConverterView from '../views/CurrencyConverterView.vue'

const routes = [
  { path: '/', redirect: '/live' },
  { path: '/live', component: LiveDataView },
  { path: '/historical', component: HistoricalDataView },
  { path: '/converter', component: CurrencyConverterView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
