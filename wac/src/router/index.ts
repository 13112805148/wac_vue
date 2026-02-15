import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostDetailView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router