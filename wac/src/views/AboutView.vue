<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-view">
    <div class="container py-5">
      <!-- 返回按钮 -->
      <div class="mb-4">
        <button @click="navigateToHome" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-arrow-left me-1"></i>
          返回首页
        </button>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- 头部区域 -->
          <div class="text-center mb-5">
            <div class="about-avatar mb-4">
              <i class="bi bi-person-circle display-1 text-primary"></i>
            </div>
            <h1 class="display-4 fw-bold text-primary mb-3">关于我</h1>
            <p class="lead text-muted">热爱技术，乐于分享的前端开发者</p>
          </div>

          <!-- 内容区域 -->
          <div class="about-content">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <h3 class="h4 mb-4 text-primary">个人简介</h3>
                <p class="mb-3">我是一名专注于前端开发的技术爱好者，对Vue.js、TypeScript和现代Web技术有着浓厚的兴趣。</p>
                
                <h4 class="h5 mt-4 mb-3 text-primary">技术栈</h4>
                <div class="row">
                  <div class="col-md-6">
                    <ul class="list-unstyled">
                      <li><i class="bi bi-check-circle text-success me-2"></i>Vue.js 3</li>
                      <li><i class="bi bi-check-circle text-success me-2"></i>TypeScript</li>
                      <li><i class="bi bi-check-circle text-success me-2"></i>Vite</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <ul class="list-unstyled">
                      <li><i class="bi bi-check-circle text-success me-2"></i>Bootstrap 5</li>
                      <li><i class="bi bi-check-circle text-success me-2"></i>Pinia</li>
                      <li><i class="bi bi-check-circle text-success me-2"></i>Vue Router</li>
                    </ul>
                  </div>
                </div>

                <h4 class="h5 mt-4 mb-3 text-primary">博客特色</h4>
                <ul>
                  <li>专注于Vue 3和现代前端技术</li>
                  <li>实用的开发技巧和最佳实践</li>
                  <li>清晰的代码示例和解释</li>
                  <li>响应式设计，支持移动端访问</li>
                </ul>

                <div class="mt-4 p-3 bg-light rounded">
                  <h5 class="h6 mb-2">📧 联系我</h5>
                  <p class="mb-0 small">如果您有任何问题或建议，欢迎通过邮件联系我。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  min-height: calc(100vh - 76px);
}

.about-avatar {
  animation: float 3s ease-in-out infinite;
}

.about-content {
  line-height: 1.7;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.card {
  border-radius: 12px;
}

.list-unstyled li {
  margin-bottom: 0.5rem;
}
</style>