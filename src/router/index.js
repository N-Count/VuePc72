import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index'
import layout from '@/views/layout/index'
import Home from '@/views/layout/Home/index'
import Articles from '@/views/layout/Articles/index'
import Pictrues from '@/views/layout/Pictures/index'
import NotFound from '@/views/NotFound/index'
import { getToken } from '@/utils/storage'
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
    component: layout,
    children: [
      {
        name: 'Home',
        path: '/',
        component: Home
      },
      {
        name: 'Articles',
        path: '/articles',
        component: Articles
      },
      {
        name: 'Pictrues',
        path: '/pictrues',
        component: Pictrues
      }
    ]
  },
  {
    name: 'noFound',
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})
// beforeEach:在所有路由跳转之前先进入beforeEach做判断，然后再根据判断结果执行
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
