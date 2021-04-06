import Vue from 'vue'
import VueRouter from 'vue-router'
const News = () => import("@/views/News.vue")
const Code = () => import("@/views/Code.vue")
const Advice = () => import("@/views/Advice.vue")
const Report = () => import("@/views/Report.vue")

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'news'
  },
  // 租房资讯
  {
    path:'/news',
    name:"News",
    component:News
  },
  // 审核房源管家账号
  {
    path:'/code',
    name:"Code",
    component:Code
  },
  // 查看反馈意见
  {
    path:'/advice',
    name:"Advice",
    component:Advice
  },
  // 查看举报信息
  {
    path:'/report',
    name:"Report",
    component:Report
  },
]

const router = new VueRouter({
  routes
})

export default router
