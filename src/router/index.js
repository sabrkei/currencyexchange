import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CurrencyConverterView from '../views/CurrencyConverterView.vue'
import HistoricalView from '../views/HistoricalView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/live',
    },
    {
      path: '/live',
      name: 'live',
      component: HomeView,
    },
    {
      path: '/converter',
      name: 'converter',
      component: CurrencyConverterView,
    },
    {
      path: '/historical',
      name: 'historical',
      component: HistoricalView,
    },
  ],
})

export default router