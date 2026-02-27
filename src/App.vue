<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-4 py-1">
      <div class="container align-items-center">
        <RouterLink class="navbar-brand" to="/live">
          <img src="/images/logo.png" alt="Logo" height="150">
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav fs-5 gap-2">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/live">Live Rates</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/converter">Converter</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/historical">Historical</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer class="border-top mt-5 py-4 text-center text-muted">
    Historical Currency Exchange by <a href="https://gbg-web.com" target="_blank" rel="noopener">gbg-web.com</a>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
