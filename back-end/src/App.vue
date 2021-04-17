<template>
  <div id="app">
    <a-layout class="app-layout">
      <a-layout-header class="app-header">
        <a-row type="flex" align="middle">
          <a-col class="app-icon">
            <a-icon
              type="home"
              :style="{ color: '#1890ff', marginRight: '8px' }"
            />
            <span>毕业生租房后台管理系统</span>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <!-- 侧边栏导航菜单 -->
        <a-layout-sider theme="light" class="app-sider">
          <a-row>
            <a-col>
              <a-menu class="app-sider-menu" :selected-keys="activeKey">
                <a-menu-item
                  v-for="item in siderMenuData"
                  :key="item.path"
                  @click="changeRouter(item)"
                >
                  <a-icon
                    :style="{ fontSize: '28px', verticalAlign: 'middle' }"
                    :type="item.icon"
                  />
                  <span>{{ item.text }}</span>
                </a-menu-item>
              </a-menu>
            </a-col>
          </a-row>
        </a-layout-sider>
        <!-- 系统页面主要内容 -->
        <a-layout>
          <a-layout-content class="app-content">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import root from "@/config/root.js"
export default {
  name: "App",
  computed: {
    // 系统侧边栏
    siderMenuData () {
      return root.siderMenu
    },
    // 获取激活的菜单项 -->根据路由判断
    activeKey () {
      return [this.$route.path]
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
@media screen and (min-width: 1367px) {
  #app {
    width: 1920px;
    height: 1080px;
  }
}
@media screen and (max-width: 1366px) {
  #app {
    width: 1366px;
    height: 635px;
  }
}
.app-header {
  padding: 0 16px;
}
.app-layout {
  width: 100%;
  height: 100%;
}
.app-icon {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}
.app-nav {
  border: 0 !important;
  background: #001529;
  color: #fff !important;
}
.app-login {
  color: #fff;
}
.app-sider {
  padding-top: 10px;
}
.app-content {
  height: calc(100% - 64px);
  padding: 20px 20px;
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


