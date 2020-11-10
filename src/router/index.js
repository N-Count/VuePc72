import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'layout',
    path: '/',
    component: layout
  }
]

const router = new VueRouter({
  routes
})

export default router
