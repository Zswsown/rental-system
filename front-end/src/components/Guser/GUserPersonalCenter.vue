<template>
  <div>
    <a-popover>
      <template slot="content">
        <a-menu>
          <a-menu-item @click="editPersonalInfo">修改个人信息</a-menu-item>
          <a-menu-item>查看浏览记录</a-menu-item>
        </a-menu>
      </template>
      <span>
        <a style="color: #fff">{{ userInfo.code }}</a>
      </span>
    </a-popover>
    <span><a style="color: #fff" @click="exit"> 退出 </a></span>
  </div>
</template>

<script>
export default {
  name: "GUserPersonalCenter",
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    // 跳转到对应的用户的个人中心
    editPersonalInfo () {
      this.$router.push('/editPersonalInfo/' + this.userInfo.role + '/' + this.userInfo.id)
    },
    // 退出账号
    exit () {
      this.$store.dispatch('cleanUserInfo')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>