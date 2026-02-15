<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToHome = () => {
  router.push('/')
}

const navigateToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#" @click.prevent="navigateToHome">
        <i class="bi bi-journal-text me-2"></i>
        我的技术博客
      </a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="navigateToHome">
              <i class="bi bi-house me-1"></i>
              首页
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="navigateToAbout">
              <i class="bi bi-info-circle me-1"></i>
              关于
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffd700 !important;
}
</style>