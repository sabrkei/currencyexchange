<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="/images/exChange.png" alt="Currency Exchange Hub" style="height: 80px" />
        </router-link>
        <button class="navbar-toggler" type="button" @click="navOpen = !navOpen">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ show: navOpen }">
          <div class="navbar-nav ms-auto gap-2">
            <router-link to="/live" class="btn btn-outline-primary" @click="navOpen = false">Latest Rates</router-link>
            <router-link to="/historical" class="btn btn-outline-primary" @click="navOpen = false">Historical Data</router-link>
            <router-link to="/converter" class="btn btn-outline-primary" @click="navOpen = false">Converter</router-link>
          </div>
        </div>
      </div>
    </nav>
    <main class="container flex-grow-1 py-4" style="max-width: 900px">
      <router-view />
    </main>
    <footer class="text-center py-3 border-top text-muted small">
      <p>Lab2 - Vite Project with Cypress Tests <a href="https://gbg-web.com/" target="_blank">GBG-Web</a></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { navOpen: false }
  },
}
</script>
