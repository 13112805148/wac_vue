<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const postId = computed(() => parseInt(route.params.id as string))
const newComment = ref('')
const commentAuthor = ref('')

const currentPost = computed(() => {
  return blogStore.allPosts.find(post => post.id === postId.value)
})

const postComments = computed(() => 
  blogStore.commentsByPost(postId.value)
)

const relatedPosts = computed(() => {
  if (!currentPost.value) return []
  return blogStore.allPosts
    .filter(post => post.id !== postId.value && post.category === currentPost.value.category)
    .slice(0, 3)
})

const navigateToPost = (id: number) => {
  blogStore.viewPost(id)
  router.push(`/post/${id}`)
}

const navigateToHome = () => {
  router.push('/')
}

const likePost = () => {
  if (currentPost.value) {
    blogStore.likePost(currentPost.value.id)
  }
}

const submitComment = () => {
  if (!newComment.value.trim() || !commentAuthor.value.trim()) return
  
  blogStore.addComment(postId.value, {
    author: commentAuthor.value,
    content: newComment.value,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
    publishDate: new Date().toISOString().split('T')[0],
    likes: 0
  })
  
  newComment.value = ''
  commentAuthor.value = ''
}

const likeComment = (commentId: number) => {
  blogStore.likeComment(commentId)
}

// 确保页面滚动到顶部并记录浏览
onMounted(() => {
  window.scrollTo(0, 0)
  if (currentPost.value) {
    blogStore.viewPost(currentPost.value.id)
  }
})
</script>

<template>
  <div class="post-detail-view">
    <div v-if="currentPost" class="container py-5">
      <!-- 返回按钮 -->
      <div class="mb-4">
        <button @click="navigateToHome" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-arrow-left me-1"></i>
          返回首页
        </button>
      </div>

      <!-- 文章内容 -->
      <article class="blog-post">
        <header class="text-center mb-5">
          <div class="mb-3">
            <span class="badge bg-primary fs-6">
              {{ blogStore.categories.find(c => c.id === currentPost.category)?.name }}
            </span>
          </div>
          <h1 class="display-5 fw-bold text-primary mb-3">{{ currentPost.title }}</h1>
          <div class="text-muted mb-4">
            <i class="bi bi-person me-1"></i>
            <span>{{ currentPost.author }}</span>
            <span class="mx-2">•</span>
            <i class="bi bi-calendar me-1"></i>
            <time>{{ currentPost.publishDate }}</time>
            <span class="mx-2">•</span>
            <i class="bi bi-clock me-1"></i>
            <span>阅读时间 {{ currentPost.readTime }}分钟</span>
          </div>
          
          <!-- 文章统计 -->
          <div class="d-flex justify-content-center gap-4 mb-4">
            <div class="text-center">
              <div class="h4 mb-1 text-primary">{{ currentPost.views }}</div>
              <small class="text-muted">阅读量</small>
            </div>
            <div class="text-center">
              <div class="h4 mb-1 text-danger">{{ currentPost.likes }}</div>
              <small class="text-muted">点赞数</small>
            </div>
            <div class="text-center">
              <div class="h4 mb-1 text-success">{{ currentPost.comments }}</div>
              <small class="text-muted">评论数</small>
            </div>
          </div>
          
          <!-- 文章标签 -->
          <div class="mb-4">
            <span 
              v-for="tag in currentPost.tags" 
              :key="tag"
              class="badge bg-light text-dark me-2"
            >
              #{{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章封面图 -->
        <div class="text-center mb-5">
          <img :src="currentPost.image" :alt="currentPost.title" class="img-fluid rounded shadow" style="max-height: 400px; width: 100%; object-fit: cover;">
        </div>

        <div class="post-content">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="content-body">
                <p class="lead fw-bold">{{ currentPost.excerpt }}</p>
                <p>{{ currentPost.content }}</p>
                
                <!-- 示例内容扩展 -->
                <div class="my-4 p-4 bg-light rounded">
                  <h5 class="text-primary">💡 关键要点</h5>
                  <ul class="mb-0">
                    <li>Vue 3的组合式API提供了更好的代码组织方式</li>
                    <li>TypeScript支持使得开发更加安全可靠</li>
                    <li>Bootstrap 5提供了现代化的UI组件</li>
                    <li>响应式设计确保良好的用户体验</li>
                    <li>模块化开发提高代码复用性</li>
                  </ul>
                </div>

                <p class="fw-bold">在实际开发中，这些技术的结合能够显著提升开发效率和代码质量。希望本文对您的学习有所帮助！</p>
                
                <!-- 点赞按钮 -->
                <div class="text-center my-5">
                  <button 
                    @click="likePost"
                    :class="['btn', 'btn-lg', blogStore.likedPosts.includes(currentPost.id) ? 'btn-danger' : 'btn-outline-danger']"
                  >
                    <i class="bi bi-heart-fill me-2"></i>
                    {{ blogStore.likedPosts.includes(currentPost.id) ? '已点赞' : '点赞文章' }}
                    <span class="badge bg-light text-dark ms-2">{{ currentPost.likes }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- 评论区域 -->
      <section class="comments-section mt-5 pt-5 border-top">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h3 class="h4 mb-4">
              <i class="bi bi-chat-dots me-2 text-primary"></i>
              评论 ({{ postComments.length }})
            </h3>
            
            <!-- 发表评论 -->
            <div class="card mb-4 border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">发表评论</h5>
                <div class="mb-3">
                  <input 
                    v-model="commentAuthor"
                    type="text" 
                    class="form-control" 
                    placeholder="您的昵称"
                  >
                </div>
                <div class="mb-3">
                  <textarea 
                    v-model="newComment"
                    class="form-control" 
                    rows="3" 
                    placeholder="写下您的评论..."
                  ></textarea>
                </div>
                <button 
                  @click="submitComment"
                  class="btn btn-primary"
                  :disabled="!newComment.trim() || !commentAuthor.trim()"
                >
                  发表评论
                </button>
              </div>
            </div>
            
            <!-- 评论列表 -->
            <div v-if="postComments.length > 0" class="comments-list">
              <div 
                v-for="comment in postComments" 
                :key="comment.id"
                class="card mb-3 border-0 shadow-sm"
              >
                <div class="card-body">
                  <div class="d-flex align-items-start">
                    <img :src="comment.avatar" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;" :alt="comment.author">
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0">{{ comment.author }}</h6>
                        <small class="text-muted">{{ comment.publishDate }}</small>
                      </div>
                      <p class="mb-2">{{ comment.content }}</p>
                      <div class="d-flex align-items-center">
                        <button 
                          @click="likeComment(comment.id)"
                          class="btn btn-sm btn-outline-danger"
                        >
                          <i class="bi bi-heart me-1"></i>
                          {{ comment.likes }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 无评论提示 -->
            <div v-else class="text-center py-4">
              <i class="bi bi-chat-quote display-1 text-muted mb-3"></i>
              <p class="text-muted">暂无评论，快来发表第一条评论吧！</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 相关文章 -->
      <section v-if="relatedPosts.length > 0" class="mt-5 pt-5 border-top">
        <h3 class="h4 mb-4">相关文章</h3>
        <div class="row g-3">
          <div v-for="post in relatedPosts" :key="post.id" class="col-md-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <h6 class="card-title">{{ post.title }}</h6>
                <p class="card-text small text-muted">{{ post.excerpt.slice(0, 80) }}...</p>
                <button 
                  @click="navigateToPost(post.id)"
                  class="btn btn-outline-primary btn-sm"
                >
                  继续阅读
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 文章不存在的情况 -->
    <div v-else class="container py-5 text-center">
      <i class="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
      <h2 class="text-muted">文章不存在</h2>
      <p class="text-muted mb-4">抱歉，您要查找的文章不存在或已被删除。</p>
      <button @click="navigateToHome" class="btn btn-primary">
        <i class="bi bi-house me-1"></i>
        返回首页
      </button>
    </div>
  </div>
</template>

<style scoped>
.blog-post {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.content-body p {
  margin-bottom: 1.5rem;
}

.lead {
  font-size: 1.25rem;
  font-weight: 500;
  color: #495057;
}
</style>