<template>
  <div class="house-details"></div>
</template>

<script>
import req from '@/api/req.js'
export default {
  name: "HouseDetails",
  data () {
    return {
      // 房屋详细信息
      houseDetail: {}
    }
  },
  methods: {
    // 获取出租房源信息
    getHouseDetail () {
      let {
        id,
        type
      } = this.$route.params
      let data = { id, type }
      console.log("房源详情路由参数", data)
      req({
        method: "POST",
        url: "/api/house/getRentalHouse",
        data: data
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getHouseDetail()
  }
}
</script>

<style scoped>
</style>