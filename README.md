# Currency Exchange Hub

A Single Page Application built with Vue 3 and Vite that displays live and historical currency exchange rates, and lets users convert between currencies. Data is fetched from the [Frankfurter API](https://www.frankfurter.dev/) over HTTPS.

## Tech Stack

- **Vue 3** — Uses both Options API and Composition API
- **Vue Router** — Client-side routing between pages
- **Vite** — Build tool and dev server
- **Bootstrap 5** — Styling
- **Cypress** — End-to-end tests

## Pages

### Latest Rates (`/live`)
Fetches the current exchange rates from the Frankfurter API for a selected base currency. The user can switch the base currency using a dropdown, which triggers a new API call and re-renders the full list of rates. Rates are displayed using the shared `CurrencyList` component.

### Historical Data (`/historical`)
Lets the user pick any past date and a base currency, then loads the exchange rates recorded on that date. Nothing is fetched until the user clicks **Load Rates**, keeping the page clean until there is something to show. Results are also displayed via `CurrencyList`.

### Currency Converter (`/converter`)
Converts a user-entered amount from one currency to another using live rates. The user selects a **From** and **To** currency, enters an amount, and clicks **Convert**. A swap button lets the user quickly reverse the direction of the conversion. The result is shown inline without navigating away.

## Components

### `CurrencyList.vue`
A reusable list wrapper that receives a `currencies` array as a prop and renders one `CurrencyItem` per entry. Emits a `currency-clicked` event when an item is clicked.

### `CurrencyItem.vue`
Displays a single currency row — a flag emoji, the currency code, and the exchange rate. Built with the Composition API (`<script setup>`). Accepts a `currency` object as a prop and derives the flag emoji from the ISO currency code using a computed property.

## How the pages connect

All three pages are registered in `src/router/index.js` and rendered inside the `<router-view>` in `App.vue`. The navigation bar in `App.vue` contains `<router-link>` elements for each page. Navigating between pages does not reload the browser — Vue Router swaps the view component in place.

Both `LiveDataView` and `HistoricalDataView` delegate rendering to `CurrencyList`, which in turn renders a `CurrencyItem` for each rate. This means the display logic lives in one place while each page manages its own data fetching.

## Getting started

```bash
npm install
npm run dev
```

## Running tests

Start the dev server first, then run Cypress:

```bash
npm run dev
npx cypress open
```

## Build

```bash
npm run build
```
