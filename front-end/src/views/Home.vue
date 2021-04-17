<template>
  <div class="home">
    <select-house
      :type="`null`"
      :sum="rentalHouseList.length"
      @filterRentalHouse="filterRentalHouse"
    ></select-house>
    <house-info :rental-house-list="rentalHouseList"></house-info>
  </div>
</template>

<script>
import root from "@/config/root.js"
import req from '@/api/req.js'
import message from "ant-design-vue/lib/message"
import HouseInfo from "@/components/common/HouseInfo.vue"
import SelectHouse from '@/components/common/SelectHouse.vue'
export default {
  name: "Home",
  components: {
    SelectHouse,
    HouseInfo
  },
  data () {
    return {
      // 出租房源 数据源
      rentalHouseList: []
    }
  },
  computed: {
    // 获取出租方式 选项列表
    typeList () {
      return root.typeList
    },
    // 获取房间朝向 选项列表
    directList () {
      return root.directList
    }
  },
  methods: {
    // 获取全部出租房源信息
    getAllRentalHouse () {
      let self = this
      req({
        method: 'get',
        url: '/api/house/getAllRentalHouse'
      }).then(res => {
        // console.log("获取到的出租房屋：", res)
        let list = res.data.data.map(house => {
          house.directName = self.directList.filter(direct => house.direct === direct.value)[0].label
          house.typeName = self.typeList.filter(type => house.type === type.value)[0].label
          house.tag = house.tag.split(',')
          return house
        })
        self.rentalHouseList = list
        // console.log("获取到的出租房屋：", self.rentalHouseList)
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
    // 筛选房源
    filterRentalHouse (filterOptions) {
      console.log(filterOptions)
      req({
        method: "post",
        url: "/api/house/selectRentalHouseByFilterOptions",
        data: filterOptions
      }).then(res => {
        console.log(res)
        // if (res.data.code === 200) {
        //   message.success(res.data.msg)
        // }
        // else {
        //   message.error(res.data.msg)
        // }
      }).catch(err => {
        message.error(err)
      })
    }
  },
  created () {
    this.getAllRentalHouse()
  }
};
</script>

<style>
.home {
  background: #fff;
  padding: 8px;
}
</style>
