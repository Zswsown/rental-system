<template>
  <div class="house-detail">
    <!-- 头部 -->
    <a-row>
      <!-- 标题 -->
      <a-row style="margin: 20px 0 5px">
        <a style="font-size: 28px; font-weight: 700; color: #000">
          <span>{{ houseDetail.typeName }}·</span>
          <span style="margin-right: 8px">{{ houseDetail.area_name }}</span>
          <span style="margin-right: 8px">{{ houseDetail.desc }}</span>
          <span>{{ houseDetail.directName }}</span>
        </a>
      </a-row>
      <!-- 房屋编号 -->
      <a-row style="color: #9399a5; font-size: 14px; margin-bottom: 20px">
        <span>房屋编号：RENTABLHOUSE</span>
        <span>{{ houseDetail.type }}</span>
        <span>{{ houseDetail.id }}</span>
      </a-row>
    </a-row>
    <!-- 详情 -->
    <a-row type="flex">
      <!-- 照片 -->
      <a-row style="width: 450px; height: 300px; margin-right: 20px">
        <span>
          <img
            style="width: 100%; height: 100%"
            src="https://img95.699pic.com/photo/50042/0407.jpg_wh300.jpg"
            alt="房间照片"
          />
        </span>
      </a-row>
      <!-- 详细信息 -->
      <a-row style="width: calc(100% - 470px)">
        <!-- 价格 -->
        <a-row style="color: #fa5741">
          <span style="font-size: 30px; font-weight: 700; margin-right: 6px">{{
            houseDetail.price
          }}</span>
          <span>元/月</span>
        </a-row>
        <!-- 标签 -->
        <a-row style="padding-bottom: 15px; border-bottom: 1px solid #e4e6f0">
          <a-tag color="orange" v-for="tag in houseDetail.tag" :key="tag">{{
            tag
          }}</a-tag>
        </a-row>
        <!-- 详细信息 -->
        <a-row style="padding: 15px 0; border-bottom: 1px solid #e4e6f0">
          <a-row>
            <span>居住类型：</span>
            <span>{{ houseDetail.typeName }}</span>
          </a-row>
          <a-row>
            <span>房屋类型：</span>
            <span style="padding-right: 8px">{{ houseDetail.desc }}</span>
            <span>{{ houseDetail.area }}㎡</span>
          </a-row>
        </a-row>
        <!-- 房源管家名片 -->
        <a-row type="flex" style="padding: 15px 0">
          <a-row>
            <a-avatar
              :size="64"
              icon="home"
              :style="{ backgroundColor: `#f56a00` }"
            />
          </a-row>
          <a-row style="padding-left: 20px; color: #000; font-size: 16px">
            <a-col style="margin-bottom: 10px">
              <span>房源管家：</span>
              <span style="font-size: 18px; font-weight: 700">{{
                houseDetail.nickname
              }}</span>
            </a-col>
            <a-col>
              <span>管家id：</span>
              <span>HouseKeeper{{ houseDetail.house_id }}</span>
            </a-col>
          </a-row>
        </a-row>
        <!-- 咨询 -->
        <a-row
          type="flex"
          style="border-bottom: 1px solid #e4e6f0; padding-bottom: 10px"
        >
          <a-col style="padding-right: 40px">
            <a-button
              icon="phone"
              size="large"
              type="primary"
              @click="telHouseKeeper"
              >电话咨询</a-button
            >
          </a-col>
          <a-col>
            <a-button
              icon="home"
              size="large"
              type="primary"
              ghost
              @click="orderSeeRentalHouse"
              >预约看房</a-button
            >
          </a-col>
        </a-row>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import req from '@/api/req.js'
import root from '@/config/root.js'
import _ from 'lodash'
import message from "ant-design-vue/lib/message"
export default {
  name: "HouseDetails",
  data () {
    return {
      // 房屋详细信息
      houseDetail: {}
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
    // 获取出租房源信息
    getHouseDetail () {
      let self = this
      let { id, type } = self.$route.params
      let data = { id, type }
      console.log("房源详情路由参数", data)
      req({
        method: "POST",
        url: "/api/house/getRentalHouse",
        data: data
      }).then(res => {
        let house = _.defaultsDeep({}, res.data.data[0])
        house.directName = (self.directList.filter(direct => house.direct === direct.value)[0]).label
        house.typeName = (self.typeList.filter(type => house.type === type.value)[0]).label
        house.tag = house.tag.split(',')
        self.houseDetail = house
        console.log("获取到的出租房源信息", self.houseDetail)
      }).catch(err => {
        console.log(err)
      })
    },
    // 电话咨询房源管家
    telHouseKeeper () {
      let self = this
      this.$confirm({
        title: '你想要电话咨询房源管家吗?',
        content: self.houseDetail.tel,
        okText: '复制手机号码',
        onOk () { self.copyHouseKeeperTel(self.houseDetail.tel) },
        cancelText: '取消',
        onCancel () { },
      });
    },
    // 复制房源管家电话
    copyHouseKeeperTel (value) {
      let copyInput = document.createElement("input")
      copyInput.value = value // copyInput.setAttribute('readonly', 'readonly');//避免ios端聚焦引起的白屏抖动
      document.body.appendChild(copyInput) //插入body
      copyInput.select() //选择对象
      // copyInput.setSelectionRange(0, link.length);//ios端使用setSelectionRange避免选择不全问题
      document.execCommand("Copy") //执行复制命令
      message.success('复制成功')
      copyInput.remove() //移除
    },
    // 预约看房
    orderSeeRentalHouse () {
      message.success("预约看房成功！")
    }
  },
  created () {
    this.getHouseDetail()
  }
}
</script>

<style scoped>
.house-detail {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  display: none;
}
</style>