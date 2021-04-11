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
              name="typeOptions"
              :options="typeOptions"
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
              name="priceOptions"
              :options="priceOptions"
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
              name="numsOptions"
              :options="numsOptions"
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
              name="directionOptions"
              :options="directionOptions"
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
      // 出租方式 选项列表
      typeOptions: [
        // { label: '不限', value: 'all' },
        { label: '整租', value: 'entire' },
        { label: '合租', value: 'share' },
      ],
      // 选择的 出租方式
      types: [],
      // 出租价格 选项列表
      priceOptions: [
        { label: '≤1500', value: '0-1500' },
        { label: '1500-2000', value: '1500-2000' },
        { label: '2000-3000', value: '2000-3000' },
        { label: '3000-5000', value: '3000-5000' },
        { label: '5000-8000', value: '5000-8000' },
        { label: '≥8000', value: '8000-?' },
      ],
      // 选择的 出租价格
      prices: [],
      // 房间朝向 选项列表
      directionOptions: [
        { label: '东', value: 'east' },
        { label: '西', value: 'west' },
        { label: '南', value: 'south' },
        { label: '北', value: 'north' },
      ],
      // 选择的 房间朝向
      directions: [],
      // 房间数量 选项列表
      numsOptions: [
        { label: '一居', value: '1' },
        { label: '两居', value: '2' },
        { label: '三居', value: '3' },
        { label: '四居+', value: '4' },
      ],
      // 选择的 房间数量
      nums: [],
      // 出租房屋 数据源
      rentalHouseList: [],
      filterHouseList: [
        {
          header: "整租·汉溪长隆 2室1厅 南",
          detail: "广州-番禺-汉溪长隆 / 64㎡ / 南 / 2室一厅",
          price: "5000"
        },
        {
          header: "整租·南村万博 1室1厅 南",
          detail: "广州-番禺-南村万博 / 22㎡ / 南 / 1室一厅",
          price: "2000"
        },
        {
          header: "整租·汉溪长隆 1室1厅 南",
          detail: "广州-番禺-汉溪长隆 / 24㎡ / 南 / 2室一厅",
          price: "2000"
        },
        {
          header: "整租·钟村 2室1厅 南",
          detail: "广州-番禺-钟村 / 64㎡ / 南 / 2室一厅",
          price: "4500"
        },
        {
          header: "整租·大石 2室1厅 南",
          detail: "广州-番禺-大石 / 64㎡ / 南 / 2室一厅",
          price: "4500"
        },
        {
          header: "整租·大石 2室1厅 南",
          detail: "广州-番禺-大石 / 64㎡ / 南 / 2室一厅",
          price: "4500"
        },
      ]
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
          house.directName = self.directionOptions.filter(direct => house.direct === direct.value)[0].label
          house.typeName = self.typeOptions.filter(type => house.type === type.value)[0].label
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