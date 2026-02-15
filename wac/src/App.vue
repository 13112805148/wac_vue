<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  padding-top: 76px; /* 导航栏高度 */
  min-height: calc(100vh - 76px);
}
</style>