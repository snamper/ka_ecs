/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2017-11-6
* */
import Vue from 'vue'
import Router from 'vue-router'
import { getStore } from '../config/utils'
import km from './km'
import ym from './ym'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login/')
    },
    km,
    ym
  ]
})

const load = (isShow) => {
  var routerLoad = document.getElementById('routerLoading')
  if (routerLoad) {
    isShow ? routerLoad.style.display = 'block' : routerLoad.style.display = 'none'
  }
}

router.beforeEach((to, from, next) => {
  load(true)
  var token = getStore('KA_ECS_USER')
  if (!token && to.path !== '/login' || to.path == '/') {
    next({ path: '/login' })
    return false
  }
  next()
})
router.afterEach((to, from) => {
  load()
})
export default router
