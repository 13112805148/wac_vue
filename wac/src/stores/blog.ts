import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { posts, comments, categories, hotKeywords, type Post, type Comment } from '../data/posts'

export const useBlogStore = defineStore('blog', () => {
  // 状态
  const allPosts = ref<Post[]>(posts)
  const allComments = ref<Comment[]>(comments)
  const likedPosts = ref<number[]>([])
  const viewedPosts = ref<number[]>([])

  // 计算属性
  const featuredPosts = computed(() => 
    allPosts.value.filter(post => post.featured).slice(0, 3)
  )

  const popularPosts = computed(() => 
    [...allPosts.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
  )

  const trendingPosts = computed(() => 
    [...allPosts.value]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)
  )

  const postsByCategory = computed(() => (categoryId: string) => 
    allPosts.value.filter(post => post.category === categoryId)
  )

  const commentsByPost = computed(() => (postId: number) => 
    allComments.value.filter(comment => comment.postId === postId)
  )

  // 动作
  const likePost = (postId: number) => {
    const post = allPosts.value.find(p => p.id === postId)
    if (post) {
      if (likedPosts.value.includes(postId)) {
        post.likes -= 1
        likedPosts.value = likedPosts.value.filter(id => id !== postId)
      } else {
        post.likes += 1
        likedPosts.value.push(postId)
      }
    }
  }

  const viewPost = (postId: number) => {
    const post = allPosts.value.find(p => p.id === postId)
    if (post && !viewedPosts.value.includes(postId)) {
      post.views += 1
      viewedPosts.value.push(postId)
    }
  }

  const addComment = (postId: number, commentData: Omit<Comment, 'id' | 'postId'>) => {
    const newComment: Comment = {
      id: Math.max(...allComments.value.map(c => c.id), 0) + 1,
      postId,
      ...commentData
    }
    allComments.value.push(newComment)
    
    // 更新文章的评论数
    const post = allPosts.value.find(p => p.id === postId)
    if (post) {
      post.comments += 1
    }
  }

  const likeComment = (commentId: number) => {
    const comment = allComments.value.find(c => c.id === commentId)
    if (comment) {
      comment.likes += 1
    }
  }

  const searchPosts = (query: string) => {
    if (!query.trim()) return allPosts.value
    
    const lowerQuery = query.toLowerCase()
    return allPosts.value.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  const getDailyRecommendations = () => {
    // 简单的推荐算法：基于浏览历史、点赞数、发布时间等
    return [...allPosts.value]
      .sort((a, b) => {
        const scoreA = (a.likes * 0.3) + (a.views * 0.2) + (new Date(a.publishDate).getTime() * 0.5)
        const scoreB = (b.likes * 0.3) + (b.views * 0.2) + (new Date(b.publishDate).getTime() * 0.5)
        return scoreB - scoreA
      })
      .slice(0, 3)
  }

  return {
    // 状态
    allPosts,
    categories,
    hotKeywords,
    likedPosts,
    
    // 计算属性
    featuredPosts,
    popularPosts,
    trendingPosts,
    postsByCategory,
    commentsByPost,
    
    // 动作
    likePost,
    viewPost,
    addComment,
    likeComment,
    searchPosts,
    getDailyRecommendations
  }
})