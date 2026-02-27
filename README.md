# Currency Exchange Hub

A Single Page Application built with Vue 3 and Vite that displays live and historical currency exchange rates, and lets users convert between currencies. Data is fetched from the [Frankfurter API](https://www.frankfurter.dev/) (v1) over HTTPS.

## Tech Stack

- **Vue 3** — Composition API (`<script setup>`) throughout
- **Vue Router** — Client-side routing between pages
- **Vite** — Build tool and dev server
- **Bootstrap 5** — Layout and base components
- **Inter & Poppins** — Google Fonts for typography
- **flagcdn.com** — Country flag images mapped from currency codes
- **Cypress** — End-to-end tests

## Pages

### Live Rates (`/live`)
Fetches current exchange rates from the Frankfurter API (`/v1/latest?base=`) for a selected base currency. The user can switch the base currency using a dropdown, which triggers a new API call and re-renders the full list of rates. Rates are displayed using the shared `CurrencyList` component.

### Historical Data (`/historical`)
Lets the user pick any past date and a base currency, then loads the exchange rates recorded on that date (`/v1/{date}?base=`). Nothing is fetched until the user clicks **Load Rates**. Results are displayed via `CurrencyList`.

### Currency Converter (`/converter`)
Converts a user-entered amount from one currency to another using live rates (`/v1/latest?amount=&from=&to=`). The user selects **From** and **To** currencies, enters an amount, and clicks **Convert**. A swap button reverses the conversion direction. The result is shown inline without navigating away.

## Components

### `CurrencyList.vue`
A reusable list wrapper that receives a `currencies` array as a prop and renders one `CurrencyItem` per entry. Emits a `currency-clicked` event when an item is clicked.

### `CurrencyItem.vue`
Displays a single currency row — a country flag image (from `flagcdn.com`), the currency code, and the exchange rate. Uses a full currency-to-ISO-country-code mapping to resolve the correct flag for each currency.

## API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /v1/currencies` | Load the full list of available currencies |
| `GET /v1/latest?base={code}` | Fetch live rates for a base currency |
| `GET /v1/{date}?base={code}` | Fetch historical rates for a specific date |
| `GET /v1/latest?amount={n}&from={a}&to={b}` | Convert an amount between two currencies |

## How the pages connect

All three pages are registered in `src/router/index.js` and rendered inside `<RouterView>` in `App.vue`. The navbar in `App.vue` contains `<RouterLink>` elements for each page. Navigation does not reload the browser — Vue Router swaps the view component in place.

Both `HomeView` and `HistoricalView` delegate list rendering to `CurrencyList`, which renders a `CurrencyItem` for each rate. Display logic lives in one place while each page manages its own data fetching.

## Getting started

```bash
npm install
npm run dev
```

## Running tests

Start the dev server first, then run Cypress in headless mode or open the interactive GUI:

```bash
# Headless
npm run dev
npx cypress run

# Interactive GUI
npm run dev
npx cypress open
```

### Test coverage

| Test | What it checks |
|---|---|
| Navigates between pages | Navbar links route to `/live`, `/converter`, `/historical` |
| Live rates display | At least 5 exchange rates load on `/live` |
| Historical rates | Rates load for a selected date on `/historical` |
| Currency converter | Entering an amount and clicking Convert shows a result |
| Base currency change | Changing the base currency on `/live` refreshes rates |

## Build

```bash
npm run build
```
