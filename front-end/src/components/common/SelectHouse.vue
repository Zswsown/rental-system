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
            <a-radio-group v-model="filterOptions.types">
              <a-radio
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</a-radio
              >
            </a-radio-group>
          </span>
        </a-col>
      </a-row>
      <!-- 租金 -->
      <a-row>
        <a-col :span="1"><span style="font-weight: 700">租金</span></a-col>
        <a-col :span="23">
          <span>
            <a-checkbox-group
              v-model="filterOptions.prices"
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
              v-model="filterOptions.nums"
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
              v-model="filterOptions.directions"
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
        已经为你找到{{ sum }}套租房
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
  </div>
</template>

<script>
import root from "@/config/root.js"
import HouseInfo from '@/components/common/HouseInfo.vue'
export default {
  name: "SelectHouse",
  components: {
    HouseInfo
  },
  props: {
    // 挑选到的房源数量
    sum: {
      type: Number,
      default: 0,
    },
    // 出租方式
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filterSum: 22,
      // 筛选的条件
      filterOptions: {
        // 选择的 出租方式
        types: this.type,
        // 选择的 出租价格
        prices: [],
        // 选择的 房间朝向
        directions: [],
        // 选择的 房间数量
        nums: []
      },
      // 出租房屋 数据源
      rentalHouseList: [],
    }
  },
  methods: {
    changeTab (v) {

    },
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
  watch: {
    filterOptions: {
      handler (newValue) {
        console.log(newValue)
        this.$emit('filterRentalHouse', newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.filter ::v-deep .ant-row {
  line-height: 28px;
  margin: 3px;
}
</style>