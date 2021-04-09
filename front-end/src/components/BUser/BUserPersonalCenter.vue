<template>
  <div>
    <a-popover>
      <template slot="content">
        <a-menu>
          <a-menu-item @click="editPersonalInfo">修改个人信息</a-menu-item>
          <a-menu-item @click="editHouseState">房源状态管理</a-menu-item>
          <a-menu-item @click="editHouseInfo">更新房源</a-menu-item>
        </a-menu>
      </template>
      <span
        ><a style="color: #fff">{{ userInfo.code }}</a></span
      >
    </a-popover>
    <span><a style="color: #fff" @click="exit"> 退出 </a></span>
  </div>
</template>

<script>
export default {
  name: "BUserPersonalCenter",
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    // 跳转到对应的房源管家的个人中心
    editPersonalInfo () {
      this.$router.push('/editPersonalInfo/' + this.userInfo.role + '/' + this.userInfo.id)
    },
    // 更新房源状态
    editHouseState () {
      this.$router.push('/editHouseState/' + this.userInfo.role + '/' + this.userInfo.id)
    },
    // 编辑房源信息
    editHouseInfo () {
      this.$router.push('/editHouseInfo/' + this.userInfo.role + '/' + this.userInfo.id)
    },
    // 退出账号
    exit () {
      // 清除localstorage中的token
      storage.localStorage.removeItem('rental_system_token')
      // 清除vuex中的用户信息
      this.$store.dispatch('cleanUserInfo')
      message.success("账号退出成功!")
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>