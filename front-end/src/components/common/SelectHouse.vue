<template>
  <div class="select-house">
    <a-row>
      <h2 style="font-weight: 700">筛选房源</h2>
    </a-row>
    <!-- 分割线 -->
    <a-divider style="margin: 0"></a-divider>
    <!-- 筛选条件 -->
    <a-row class="filter">
      <!-- 方式 -->
      <a-row>
        <a-col :span="1"><span style="font-weight: 700">方式</span></a-col>
        <a-col :span="23">
          <span>
            <a-checkbox-group
              v-model="types"
              name="typeList"
              :options="typeList"
            />
          </span>
        </a-col>
      </a-row>
      <!-- 租金 -->
      <a-row>
        <a-col :span="1"><span style="font-weight: 700">租金</span></a-col>
        <a-col :span="23">
          <span>
            <a-checkbox-group
              v-model="prices"
              name="priceList"
              :options="priceList"
            />
          </span>
        </a-col>
      </a-row>
      <!-- 户型 -->
      <a-row>
        <a-col :span="1"><span style="font-weight: 700">户型</span></a-col>
        <a-col :span="23">
          <span>
            <a-checkbox-group
              v-model="nums"
              name="numList"
              :options="numList"
            />
          </span>
        </a-col>
      </a-row>
      <!-- 朝向 -->
      <a-row>
        <a-col :span="1"><span style="font-weight: 700">朝向</span></a-col>
        <a-col :span="23">
          <span>
            <a-checkbox-group
              v-model="directions"
              name="directList"
              :options="directList"
            />
          </span>
        </a-col>
      </a-row>
    </a-row>
    <!-- 分割线 -->
    <a-divider></a-divider>
    <!-- 符合条件的房源总数 -->
    <a-row>
      <p style="font-weight: 700; font-size: 16px">
        已经为你找到{{ filterSum }}套租房
      </p>
    </a-row>
    <!-- 按什么规则排序 -->
    <a-row>
      <a-tabs default-active-key="new" @change="changeTab">
        <a-tab-pane key="new" tab="最新上架"></a-tab-pane>
        <a-tab-pane key="price" tab="价格"></a-tab-pane>
        <a-tab-pane key="area" tab="面积"></a-tab-pane>
      </a-tabs>
    </a-row>
    <!-- 符合筛选条件的房源 -->
    <a-row>
      <house-info :rental-house-list="rentalHouseList"></house-info>
    </a-row>
  </div>
</template>

<script>
import req from "@/api/req.js"
import root from "@/config/root.js"
import message from "ant-design-vue/lib/message"
import HouseInfo from '@/components/common/HouseInfo.vue'
export default {
  name: "SelectHouse",
  components: {
    HouseInfo
  },
  data () {
    return {
      filterSum: 22,
      // 选择的 出租方式
      types: [],
      // 选择的 出租价格
      prices: [],
      // 选择的 房间朝向
      directions: [],
      // 选择的 房间数量
      nums: [],
      // 出租房屋 数据源
      rentalHouseList: [],
    }
  },
  methods: {
    changeTab (v) {

    },
    // 获取全部出租房源信息
    getAllRentalHouse () {
      let self = this
      req({
        method: 'get',
        url: '/api/house/getAllRentalHouse'
      }).then(res => {
        console.log("获取到的出租房屋：", res)
        let list = res.data.data.map(house => {
          house.directName = self.directList.filter(direct => house.direct === direct.value)[0].label
          house.typeName = self.typeList.filter(type => house.type === type.value)[0].label
          house.tag = house.tag.split(',')
          return house
        })
        self.rentalHouseList = list
        console.log("获取到的出租房屋：", self.rentalHouseList)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    // 获取出租方式 选项列表
    typeList () {
      return root.typeList
    },
    // 获取出租价格 选项列表
    priceList () {
      return root.priceList
    },
    // 获取房间朝向 选项列表
    directList () {
      return root.directList
    },
    // 获取房间数量 选项列表
    numList () {
      return root.numList
    }
  },
  mounted () {
    this.getAllRentalHouse()
  }
}
</script>

<style scoped>
.filter ::v-deep .ant-row {
  line-height: 28px;
  margin: 3px;
}
</style>