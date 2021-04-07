<template>
  <div>
    <a-popover>
      <template slot="content">
        <a-menu>
          <a-menu-item @click="changeRouter">修改个人信息</a-menu-item>
          <a-menu-item>查看浏览记录</a-menu-item>
        </a-menu>
      </template>
      <span><a style="color: #fff">Zswsown</a></span>
    </a-popover>
    <span><a style="color: #fff"> 退出 </a></span>
  </div>
</template>

<script>
export default {
  name: "GUserPersonalCenter",
  method: {
    changeRouter () {
      // $router.push('/editPersonalInfo')
    }
  }
}
</script>

<style>
</style>