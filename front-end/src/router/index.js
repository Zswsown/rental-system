import Vue from "vue"
import VueRouter from "vue-router"
import store from '../store/index'
import { routes } from './routes'
import message from "ant-design-vue/lib/message"


// 防止重复点击路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes,
})

// 全局前置守卫 判断用户是否有权限
router.beforeEach((to, from, next) => {
  // 当用户为 房源管家时，拥有的权限
  if (to.name === 'PublishHouse') {
    if (!store.getters.isLogin) {
      message.error('请先登录系统')
      next({ name: 'Home' })
    }
    else if (store.getters.userRole === 'guser') {
      message.error('你不是房源管家，麻烦先注册在登录系统')
      next({ name: 'Home' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router