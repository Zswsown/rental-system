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
              v-model="methods"
              name="methodOptions"
              :options="methodOptions"
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
              v-model="rents"
              name="rentOptions"
              :options="rentOptions"
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
              v-model="sizes"
              name="sizeOptions"
              :options="sizeOptions"
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
      <house-info
        v-for="item in filterHouseList"
        :key="item.header"
        :item="item"
      ></house-info>
    </a-row>
  </div>
</template>

<script>
import message from "ant-design-vue/lib/message"
import HouseInfo from '@/components/HouseInfo.vue'
export default {
  name: "SelectHouse",
  components: {
    HouseInfo
  },
  data () {
    return {
      filterSum: 22,
      methodOptions: [
        { label: '不限', value: 'all' },
        { label: '整租', value: 'entire' },
        { label: '合租', value: 'share' },
      ],
      methods: [],
      rentOptions: [
        { label: '≤1500', value: '0-1500' },
        { label: '1500-2000', value: '1500-2000' },
        { label: '2000-3000', value: '2000-3000' },
        { label: '3000-5000', value: '3000-5000' },
        { label: '5000-8000', value: '5000-8000' },
        { label: '≥8000', value: '8000-?' },
      ],
      rents: [],
      directionOptions: [
        { label: '东', value: 'east' },
        { label: '西', value: 'west' },
        { label: '南', value: 'south' },
        { label: '北', value: 'north' },
      ],
      directions: [],
      sizeOptions: [
        { label: '一居', value: '1' },
        { label: '两居', value: '2' },
        { label: '三居', value: '3' },
        { label: '四居+', value: '4' },
      ],
      sizes: [],
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