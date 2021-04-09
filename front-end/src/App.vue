<template>
  <div id="app">
    <a-layout class="app-layout">
      <a-layout-header class="app-header">
        <a-row type="flex" align="middle">
          <a-col class="app-icon" :offset="1">
            <a-icon
              type="home"
              :style="{ color: '#1890ff', marginRight: '8px' }"
            />
            <span>毕业生租房</span>
          </a-col>
          <!-- 导航栏 -->
          <a-col :offset="5">
            <a-menu mode="horizontal" theme="dark" class="app-nav">
              <a-menu-item
                v-for="item in navMenuData"
                :key="item.path"
                @click="changeRouter(item)"
                >{{ item.text }}</a-menu-item
              >
            </a-menu>
          </a-col>

          <!-- 登录注册及登陆成功后徽标显示栏 -->
          <a-col :offset="4">
            <div class="app-status">
              <!-- 用户头像 -->
              <span style="margin-right: 6px">
                <a-icon type="aliwangwang" theme="filled" />
              </span>

              <!-- 注册登录 -->
              <span
                v-if="Object.keys(userInfo).length === 0"
                style="display: flex"
              >
                <login></login>
                <register></register>
              </span>

              <!-- 用户登陆成功 -->
              <span v-else-if="userInfo.role === 'guser'">
                <g-user-personal-center></g-user-personal-center>
              </span>

              <!-- 房源管家登录成功 -->
              <span v-else-if="userInfo.role === 'buser'">
                <b-user-personal-center></b-user-personal-center>
              </span>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <!-- 系统页面主要内容 -->
        <a-layout>
          <a-layout-content class="app-content">
            <router-view />
          </a-layout-content>
        </a-layout>
        <!-- 侧边栏导航菜单 -->
        <a-layout-sider theme="light" class="app-sider">
          <a-row type="flex" align="middle" style="height: 100%">
            <a-col>
              <a-menu class="app-sider-menu">
                <a-menu-item
                  v-for="item in siderMenuData"
                  :key="item.path"
                  @click="changeRouter(item)"
                >
                  <a-tooltip placement="left" :title="item.text">
                    <a-icon :style="{ fontSize: '28px' }" :type="item.icon" />
                  </a-tooltip>
                </a-menu-item>
              </a-menu>
            </a-col>
          </a-row>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import root from "@/config/root.js"
import req from "@/api/req"

import Login from "@/components/common/Login.vue"
import Register from '@/components/common/Register.vue'
import GUserPersonalCenter from '@/components/GUser/GUserPersonalCenter'
import BUserPersonalCenter from '@/components/BUser/BUserPersonalCenter'

export default {
  name: "app",
  components: {
    Login,
    Register,
    GUserPersonalCenter,
    BUserPersonalCenter
  },
  computed: {
    // 系統导航菜单
    navMenuData () {
      return root.navMenu
    },
    // 侧边栏导航菜单
    siderMenuData () {
      return root.siderMenu
    },
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    // 路由跳转
    changeRouter (item) {
      console.log("跳转的路由为：", item.path)
      this.$router.push(item.path)
    },
    // 用户点击浏览器刷新按钮时，重新请求用户信息，若token未过期，则将请求的数据放入vuex中
    getUserInfo () {
      req({
        method: 'get',
        url: '/api/getUserInfo'
      }).then(res => {
        console.log(res)
        // 将用户信息存进vuex
        this.$store.dispatch('insertUserInfo', res.data.user.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
}
</script>


<style scoped>
@media screen and (min-width: 1367px) {
  #app {
    width: 1920px;
    height: 1080px;
  }
}
@media screen and (max-width: 1366px) {
  #app {
    width: 1366px;
    height: 768px;
  }
}
.app-layout {
  width: 100%;
  height: 100%;
}
.app-header {
  height: 36px !important;
}
.app-icon {
  font-size: 22px;
  font-weight: 700;
  line-height: 36px !important;
  color: #fff;
}
.app-nav {
  line-height: 36px !important;
  border: 0 !important;
  background: #001529;
  color: #fff !important;
}
.app-status {
  display: flex;
  line-height: 36px !important;
  color: #fff;
}
.app-sider {
  flex: 0 0 40px;
  max-width: 40px !important;
  min-width: 40px !important;
  width: 40px !important;
}
.app-sider-menu {
  border: 0;
}
.app-sider-menu ::v-deep .ant-menu-item {
  padding: 6px;
}
.app-sider-menu ::v-deep .ant-menu-item .anticon {
  margin-right: 0;
}
.app-content {
  width: 100%;
  height: 100%;
  padding: 20px 200px;
}

/* 设置滚动条的样式 */
/* 局部不显示滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
<style>
/* 全局不显示滚动条 */
html {
  overflow: hidden;
}
</style>
