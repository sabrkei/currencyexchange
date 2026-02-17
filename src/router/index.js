// router/index.js
// This file defines all the routes (URL paths) for the application
// Each route maps a URL path to a Vue component that should be displayed

// Import the createRouter function to create a new router instance
import { createRouter, createWebHistory } from 'vue-router'
// Import the LiveDataView component for displaying latest exchange rates
import LiveDataView from '../views/LiveDataView.vue'
// Import the HistoricalDataView component for fetching rates by date
import HistoricalDataView from '../views/HistoricalDataView.vue'
// Import the CurrencyConverterView component for converting between currencies
import CurrencyConverterView from '../views/CurrencyConverterView.vue'

// Define the array of route objects, each mapping a path to a component
const routes = [
  {
    // The root path redirects users to the live rates page by default
    path: '/',
    // Redirect instructs the router to navigate to /live instead
    redirect: '/live',
  },
  {
    // The /live path displays the latest exchange rates
    path: '/live',
    // The component to render when this path is visited
    component: LiveDataView,
  },
  {
    // The /historical path lets users look up rates for a specific date
    path: '/historical',
    // The component to render when this path is visited
    component: HistoricalDataView,
  },
  {
    // The /converter path provides a currency conversion tool
    path: '/converter',
    // The component to render when this path is visited
    component: CurrencyConverterView,
  },
]

// Create the router instance with HTML5 history mode and our routes
const router = createRouter({
  // Use HTML5 History API for clean URLs (no hash in the URL)
  history: createWebHistory(),
  // Pass our defined routes array to the router
  routes,
})

// Export the router so it can be used in main.js
export default router
