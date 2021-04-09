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

// 前端路由
const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes,
})

// 全局前置守卫 判断用户是否有权限
router.beforeEach((to, from, next) => {
  // 当用户为 房源管家时，拥有的权限 -->发布房源,编辑房源信息，编辑房源状态
  if (to.name === 'PublishHouse' || to.name === 'EditHouseState' || to.name === 'EditHouseInfo') {
    if (!store.getters.isLogin) {
      message.error('请先登录系统')
      next({ name: 'Home' })
    }
    else if (store.getters.userRole === 'guser') {
      message.error('你不是房源管家，麻烦先注册，再登录系统')
      next({ name: 'Home' })
    }
    else {
      next()
    }
  }
  // 当用户为 租户时，拥有的权限 -->举报虚假房源,收藏房源
  else if (to.name === 'ReportFakeHouse' || to.name === 'Collection') {
    if (!store.getters.isLogin) {
      message.error('请先登录系统')
      next({ name: 'Home' })
    }
    else if (store.getters.userRole === 'buser') {
      message.error('你不是租户，麻烦先注册，再登录系统')
      next({ name: 'Home' })
    }
    else {
      next()
    }
  }
  // 当用户为 租户或房源管家时，拥有的权限 -->编辑个人信息，反馈意见
  else if (to.name === 'Advice' || to.name === 'EditPersonalInfo') {
    if (!store.getters.isLogin) {
      message.error('请先登录系统')
      next({ name: 'Home' })
    }
    else {
      next()
    }
  }
  // 未登录就可以使用的功能 -->首页，整租，分租
  else {
    next()
  }
})

export default router