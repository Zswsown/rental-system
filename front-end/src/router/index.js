import Vue from "vue"
import VueRouter from "vue-router"
const Home = () => import("@/views/Home.vue")
const EntireRent = () => import("@/views/EntireRent.vue")
const ShareRent = () => import("@/views/ShareRent.vue")
const PublishHouse = () => import("@/views/PublishHouse.vue")
const ReportFakeHouse = () => import("@/views/ReportFakeHouse.vue")
const Advice = () => import('@/views/Advice.vue')
const EditPersonalInfo = () => import('@/components/common/EditPersonalInfo.vue')
const EditHouseState = () => import('@/components/BUser/HouseState.vue')
const EditHouseInfo = () => import('@/components/BUser/EditHouseInfo.vue')
const Collection = () => import('@/views/Collection.vue')

// 防止重复点击路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  // 整租
  {
    path: "/entireRent",
    name: "EntireRent",
    component: EntireRent
  },
  // 合租
  {
    path: "/shareRent",
    name: "ShareRent",
    component: ShareRent
  },
  // 发布房源
  {
    path: "/publishHouse",
    name: "PublishHouse",
    component: PublishHouse
  },
  // 举报虚假房源
  {
    path: "/reportFakeHouse",
    name: "ReportFakeHouse",
    component: ReportFakeHouse
  },
  // 反馈意见
  {
    path: "/advice",
    name: "Advice",
    component: Advice
  },
  // 编辑个人信息
  {
    path: '/editPersonalInfo/:role/:id',
    name: "EditPersonalInfo",
    component: EditPersonalInfo
  },
  // 编辑房屋状态
  {
    path: '/editHouseState/:role/:id',
    name: "EditHouseState",
    component: EditHouseState
  },
  // 编辑房屋信息
  {
    path: '/editHouseInfo/:role/:id',
    name: "EditHouseInfo",
    component: EditHouseInfo
  },
  // 收藏房源
  {
    path: '/collection',
    name: "Collection",
    component: Collection
  }
]

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes,
})

export default router