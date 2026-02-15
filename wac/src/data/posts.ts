export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: number;
  likes: number;
  views: number;
  comments: number;
  tags: string[];
  featured: boolean;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  avatar: string;
  publishDate: string;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export const categories: Category[] = [
  { id: 'vue', name: 'Vue.js', count: 8, icon: 'bi-bootstrap' },
  { id: 'typescript', name: 'TypeScript', count: 6, icon: 'bi-filetype-ts' },
  { id: 'frontend', name: '前端开发', count: 12, icon: 'bi-code-slash' },
  { id: 'tools', name: '开发工具', count: 5, icon: 'bi-tools' },
  { id: 'performance', name: '性能优化', count: 4, icon: 'bi-speedometer2' },
  { id: 'architecture', name: '架构设计', count: 3, icon: 'bi-diagram-3' }
];

export const posts: Post[] = [
  {
    id: 1,
    title: '探索Vue 3中的组合式API',
    excerpt: '组合式API是Vue 3的一大亮点。它提供了一种更灵活、可复用的方式来组织组件逻辑...',
    content: '组合式API是Vue 3的一大亮点。它提供了一种更灵活、可复用的方式来组织组件逻辑。与选项式API相比，开发者可以根据逻辑关注点来组织代码，而不是按照选项（data, methods, computed）来分散代码。这在大型复杂组件中尤其有用，能显著提高代码的可读性和可维护性。本文将深入探讨组合式API的核心概念，如 `setup` 函数、`ref`、`reactive` 以及生命周期钩子如何在新API中使用。',
    category: 'vue',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    author: '技术达人',
    publishDate: '2024-12-15',
    readTime: 8,
    likes: 156,
    views: 2345,
    comments: 23,
    tags: ['Vue 3', '组合式API', '前端框架'],
    featured: true
  },
  {
    id: 2,
    title: 'Vite入门：下一代前端构建工具',
    excerpt: 'Vite以其闪电般的冷启动和快速的热模块替换（HMR）彻底改变了前端开发体验...',
    content: 'Vite以其闪电般的冷启动和快速的热模块替换（HMR）彻底改变了前端开发体验。它利用浏览器原生的ES模块支持，在开发过程中无需打包，从而实现了极高的速度。本文将指导你如何使用Vite创建一个新的Vue项目，并解释其工作原理，以及为什么它比传统的打包工具（如Webpack）在开发阶段更快。',
    category: 'tools',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    author: '构建专家',
    publishDate: '2024-12-12',
    readTime: 6,
    likes: 89,
    views: 1567,
    comments: 15,
    tags: ['Vite', '构建工具', '开发效率'],
    featured: true
  },
  {
    id: 3,
    title: '使用Pinia进行Vue状态管理',
    excerpt: 'Pinia是Vue官方推荐的最新状态管理库，它设计得非常轻量、简单且对TypeScript支持友好...',
    content: 'Pinia是Vue官方推荐的最新状态管理库，它设计得非常轻量、简单且对TypeScript支持友好。它的API设计直观，摒弃了mutations，只保留state, getters, 和 actions。这使得状态管理逻辑更直接、更易于理解。此外，Pinia的模块化设计和出色的开发者工具集成，使其成为Vue 3项目中状态管理的首选方案。',
    category: 'vue',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    author: '状态管理师',
    publishDate: '2024-12-10',
    readTime: 7,
    likes: 134,
    views: 1987,
    comments: 18,
    tags: ['Pinia', '状态管理', 'Vuex'],
    featured: false
  },
  {
    id: 4,
    title: 'Vue Router 4高级技巧',
    excerpt: 'Vue Router是构建单页应用（SPA）的基石。最新版本带来了更强大的功能和更优的性能...',
    content: 'Vue Router是构建单页应用（SPA）的基石。最新版本带来了更强大的功能和更优的性能。本篇文章将介绍一些高级路由技巧，例如动态路由、嵌套路由、导航守卫，以及如何利用 `useRouter` 和 `useRoute` 组合式API在组件中优雅地处理路由逻辑。我们还将探讨如何实现路由懒加载，以优化应用的初始加载时间。',
    category: 'vue',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop',
    author: '路由大师',
    publishDate: '2024-12-08',
    readTime: 9,
    likes: 78,
    views: 1234,
    comments: 12,
    tags: ['Vue Router', '路由', 'SPA'],
    featured: false
  },
  {
    id: 5,
    title: 'TypeScript在Vue项目中的最佳实践',
    excerpt: 'TypeScript为Vue项目带来了类型安全和更好的开发体验。本文将分享在实际项目中的最佳实践...',
    content: 'TypeScript为Vue项目带来了类型安全和更好的开发体验。本文将分享在实际项目中的最佳实践，包括如何配置TypeScript、定义组件类型、使用Composition API时的类型提示等。',
    category: 'typescript',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop',
    author: '类型专家',
    publishDate: '2024-12-05',
    readTime: 10,
    likes: 167,
    views: 2456,
    comments: 21,
    tags: ['TypeScript', '类型安全', 'Vue'],
    featured: true
  },
  {
    id: 6,
    title: '前端性能优化的实用技巧',
    excerpt: '性能优化是前端开发中永恒的话题。本文分享一些实用的性能优化技巧，帮助提升用户体验...',
    content: '性能优化是前端开发中永恒的话题。本文分享一些实用的性能优化技巧，包括代码分割、懒加载、缓存策略、图片优化等，帮助提升用户体验。',
    category: 'performance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    author: '性能工程师',
    publishDate: '2024-12-03',
    readTime: 12,
    likes: 145,
    views: 2678,
    comments: 19,
    tags: ['性能优化', '用户体验', '前端'],
    featured: false
  }
];

export const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: '前端爱好者',
    content: '这篇文章讲得很详细，对理解组合式API很有帮助！',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
    publishDate: '2024-12-16',
    likes: 5
  },
  {
    id: 2,
    postId: 1,
    author: 'Vue开发者',
    content: '期待更多关于Vue 3的深度文章！',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face',
    publishDate: '2024-12-15',
    likes: 3
  }
];

export const hotKeywords = [
  'Vue 3', 'TypeScript', '性能优化', 'Vite', 'Pinia', '前端框架'
];