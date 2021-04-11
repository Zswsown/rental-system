// 路由配置信息
export const routes = [
  /*
    不需登录就可以使用的功能
  */
  // 首页
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  // 整租
  {
    path: "/entireRent",
    name: "EntireRent",
    component: () => import("@/views/EntireRent.vue")
  },
  // 合租
  {
    path: "/shareRent",
    name: "ShareRent",
    component: () => import("@/views/ShareRent.vue")
  },
  //查看房源详情
  {
    path: "/houseDetail/:type/:id",
    name: "HouseDetail",
    component: () => import("@/views/HouseDetail.vue")
  },
  /*
    租户和房源管家共有的权限
  */
  // 反馈意见
  {
    path: "/advice",
    name: "Advice",
    component: () => import('@/views/Advice.vue')
  },
  // 编辑个人信息
  {
    path: '/editPersonalInfo/:role/:id',
    name: "EditPersonalInfo",
    component: () => import('@/components/common/EditPersonalInfo.vue')
  },

  /*
    租户特有的权限
  */
  // 举报虚假房源
  {
    path: "/reportFakeHouse",
    name: "ReportFakeHouse",
    component: () => import("@/views/ReportFakeHouse.vue")
  },
  // 收藏房源
  {
    path: '/collection',
    name: "Collection",
    component: () => import('@/views/Collection.vue')
  },

  /* 
    房源管家特有的权限
  */
  // 发布房源
  {
    path: "/publishHouse",
    name: "PublishHouse",
    component: () => import("@/views/PublishHouse.vue")
  },
  // 编辑房屋状态
  {
    path: '/editHouseState/:role/:id',
    name: "EditHouseState",
    component: () => import('@/components/BUser/HouseState.vue')
  },
  // 编辑房屋信息
  {
    path: '/editHouseInfo/:role/:id',
    name: "EditHouseInfo",
    component: () => import('@/components/BUser/EditHouseInfo.vue')
  }
]