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
          <!-- 登录注册及徽标显示栏 -->
          <a-col :offset="4">
            <div class="app-login">
              <span style="margin-right: 6px"
                ><a-icon type="aliwangwang" theme="filled"
              /></span>
              <!-- 注册登录 -->
              <login></login>
              <register></register>

              <!-- 用户登陆成功 -->
              <!-- <a-popover>
                <template slot="content">
                  <a-menu>
                    <a-menu-item @click="$router.push('/editPersonalInfo')"
                      >修改个人信息</a-menu-item
                    >
                    <a-menu-item>查看浏览记录</a-menu-item>
                  </a-menu>
                </template>
                <span
                  ><a style="color: #fff" @click="loginModalVisible = true"
                    >Zswsown</a
                  ></span
                >
              </a-popover>
              <span
                ><a style="color: #fff" @click="registerModalVisible = true">
                  退出
                </a></span
              > -->

              <!-- 房源管家登录成功 -->
              <!-- <a-popover>
                <template slot="content">
                  <a-menu>
                    <a-menu-item @click="$router.push('/editPersonalInfo')"
                      >修改个人信息</a-menu-item
                    >
                    <a-menu-item @click="$router.push('/editHouseState')"
                      >房源状态管理</a-menu-item
                    >
                    <a-menu-item>更新房源</a-menu-item>
                  </a-menu>
                </template>
                <span
                  ><a style="color: #fff" @click="loginModalVisible = true"
                    >Zswsown</a
                  ></span
                >
              </a-popover>
              <span
                ><a style="color: #fff" @click="registerModalVisible = true">
                  退出
                </a></span
              > -->
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
    <login
      :login-modal-visible="getLoginModalVisible"
      @cancle="loginModalVisible = false"
    ></login>
    <register
      :register-modal-visible="getRegisterModalVisible"
      @cancle="registerModalVisible = false"
    ></register>
  </div>
</template>

<script>
import root from "@/config/root.js"
import Login from "@/components/Login.vue"
import Register from '@/components/Register.vue'

export default {
  name: "app",
  components: {
    Login,
    Register
  },
  data () {
    return {
      loginModalVisible: false,
      registerModalVisible: false
    }
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
    getLoginModalVisible () {
      return this.loginModalVisible
    },
    getRegisterModalVisible () {
      return this.registerModalVisible
    }
  },
  methods: {
    // 路由跳转
    changeRouter (item) {
      console.log("跳转的路由为：", item.path)
      this.$router.push(item.path)
    },
  }
}
</script>


<style scoped>
#app {
  width: 1366px;
  height: 768px;
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
.app-login {
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
  width: calc(100% - 40px);
  height: calc(100% - 36px);
  padding: 20px 200px;
}
</style>
