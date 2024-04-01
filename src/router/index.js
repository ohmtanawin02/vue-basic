import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductCategory from './modules/product-category'
import { getAuthDecode } from '@/utils/auth'
import Auth from './modules/auth'
import Product from './modules/product'
// import ProductMock from './modules/product-mock'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  Auth,
  Product,
  ProductCategory,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/PageNotFound.vue'),
    meta: {
      layout: 'Blank'
    }
  }
]

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const data = getAuthDecode()
  if (to.name === 'Login' && data) {
    next({ name: 'ProductCategoriesList' })
  } else {
    next()
  }
})
export default router
