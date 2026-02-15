<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const activeTab = ref('all')

const filteredPosts = computed(() => {
  let result = blogStore.allPosts
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(post => post.category === selectedCategory.value)
  }
  
  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // 标签页筛选
  if (activeTab.value === 'featured') {
    result = result.filter(post => post.featured)
  } else if (activeTab.value === 'popular') {
    result = [...result].sort((a, b) => b.views - a.views)
  } else if (activeTab.value === 'trending') {
    result = [...result].sort((a, b) => b.likes - a.likes)
  }
  
  return result
})

const navigateToPost = (postId: number) => {
  blogStore.viewPost(postId)
  router.push(`/post/${postId}`)
}

const likePost = (postId: number, event: Event) => {
  event.stopPropagation()
  blogStore.likePost(postId)
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const selectTab = (tab: string) => {
  activeTab.value = tab
}

const selectHotKeyword = (keyword: string) => {
  searchQuery.value = keyword
}

// 每日推荐
const dailyRecommendations = computed(() => blogStore.getDailyRecommendations())

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="home-view">
    <div class="container py-5">
      <!-- 头部区域 -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold text-primary mb-3">技术博客</h1>
        <p class="lead text-muted">分享前端开发、Vue.js、TypeScript等技术心得</p>
        
        <!-- 搜索框和热搜 -->
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="input-group mb-3">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-search text-muted"></i>
              </span>
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control border-start-0" 
                placeholder="搜索文章..."
              >
            </div>
            
            <!-- 热搜关键词 -->
            <div class="hot-keywords mb-4">
              <span class="text-muted me-2">热搜：</span>
              <span 
                v-for="keyword in blogStore.hotKeywords" 
                :key="keyword"
                class="badge bg-light text-dark me-2 mb-2 cursor-pointer"
                @click="selectHotKeyword(keyword)"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分类导航 -->
      <div class="categories-section mb-5">
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <button 
            :class="['btn', selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary']"
            @click="selectCategory('all')"
          >
            全部
          </button>
          <button 
            v-for="category in blogStore.categories"
            :key="category.id"
            :class="['btn', selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary']"
            @click="selectCategory(category.id)"
          >
            <i :class="category.icon + ' me-1'"></i>
            {{ category.name }} ({{ category.count }})
          </button>
        </div>
      </div>

      <!-- 标签页 -->
      <div class="tabs-section mb-4">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button 
              :class="['nav-link', activeTab === 'all' ? 'active' : '']"
              @click="selectTab('all')"
            >
              全部文章
            </button>
          </li>
          <li class="nav-item">
            <button 
              :class="['nav-link', activeTab === 'featured' ? 'active' : '']"
              @click="selectTab('featured')"
            >
              精选推荐
            </button>
          </li>
          <li class="nav-item">
            <button 
              :class="['nav-link', activeTab === 'popular' ? 'active' : '']"
              @click="selectTab('popular')"
            >
              热门文章
            </button>
          </li>
          <li class="nav-item">
            <button 
              :class="['nav-link', activeTab === 'trending' ? 'active' : '']"
              @click="selectTab('trending')"
            >
              趋势排行
            </button>
          </li>
        </ul>
      </div>

      <div class="row">
        <!-- 主内容区域 -->
        <div class="col-lg-8">
          <!-- 文章列表 -->
          <div class="row g-4">
            <div 
              v-for="post in filteredPosts" 
              :key="post.id"
              class="col-md-6"
            >
              <div 
                class="card h-100 shadow-sm border-0 post-card"
                @click="navigateToPost(post.id)"
              >
                <div class="card-img-top position-relative">
                  <img :src="post.image" class="card-img-top" :alt="post.title" style="height: 180px; object-fit: cover;">
                  <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge bg-primary">
                      {{ blogStore.categories.find(c => c.id === post.category)?.name }}
                    </span>
                  </div>
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title text-primary fw-bold">{{ post.title }}</h5>
                  <p class="card-text text-muted flex-grow-1 small">{{ post.excerpt }}</p>
                  
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="post-meta small text-muted">
                      <span><i class="bi bi-eye me-1"></i>{{ post.views }}</span>
                      <span class="mx-2">•</span>
                      <span><i class="bi bi-heart me-1"></i>{{ post.likes }}</span>
                      <span class="mx-2">•</span>
                      <span><i class="bi bi-clock me-1"></i>{{ post.readTime }}分钟</span>
                    </div>
                    <button 
                      @click="likePost(post.id, $event)"
                      :class="['btn', 'btn-sm', blogStore.likedPosts.includes(post.id) ? 'btn-danger' : 'btn-outline-danger']"
                    >
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 无搜索结果提示 -->
          <div v-if="filteredPosts.length === 0" class="text-center py-5">
            <i class="bi bi-search display-1 text-muted mb-3"></i>
            <h4 class="text-muted">没有找到相关文章</h4>
            <p class="text-muted">尝试使用其他关键词搜索</p>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="col-lg-4">
          <!-- 每日推荐 -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h6 class="mb-0"><i class="bi bi-star me-2"></i>每日推荐</h6>
            </div>
            <div class="card-body">
              <div 
                v-for="post in dailyRecommendations" 
                :key="post.id"
                class="d-flex mb-3 pb-3 border-bottom"
                @click="navigateToPost(post.id)"
                style="cursor: pointer;"
              >
                <img :src="post.image" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;" :alt="post.title">
                <div class="flex-grow-1">
                  <h6 class="mb-1 small">{{ post.title }}</h6>
                  <div class="text-muted small">
                    <span><i class="bi bi-eye me-1"></i>{{ post.views }}</span>
                    <span class="mx-1">•</span>
                    <span><i class="bi bi-heart me-1"></i>{{ post.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 热门排行 -->
          <div class="card mb-4 border-0 shadow-sm">
            <div class="card-header bg-warning text-dark">
              <h6 class="mb-0"><i class="bi bi-fire me-2"></i>热门排行</h6>
            </div>
            <div class="card-body">
              <div 
                v-for="(post, index) in blogStore.popularPosts" 
                :key="post.id"
                class="d-flex align-items-center mb-2"
                @click="navigateToPost(post.id)"
                style="cursor: pointer;"
              >
                <span class="badge bg-warning text-dark me-2">{{ index + 1 }}</span>
                <span class="small flex-grow-1">{{ post.title }}</span>
                <span class="text-muted small">{{ post.views }}</span>
              </div>
            </div>
          </div>

          <!-- 趋势排行 -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-success text-white">
              <h6 class="mb-0"><i class="bi bi-graph-up me-2"></i>趋势排行</h6>
            </div>
            <div class="card-body">
              <div 
                v-for="(post, index) in blogStore.trendingPosts" 
                :key="post.id"
                class="d-flex align-items-center mb-2"
                @click="navigateToPost(post.id)"
                style="cursor: pointer;"
              >
                <span class="badge bg-success me-2">{{ index + 1 }}</span>
                <span class="small flex-grow-1">{{ post.title }}</span>
                <span class="text-muted small">{{ post.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.card-title {
  font-size: 1.1rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.btn-outline-primary {
  border-width: 2px;
  font-weight: 500;
}
</style>