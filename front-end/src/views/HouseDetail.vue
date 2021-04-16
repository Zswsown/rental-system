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
              v-if="!this.isCollect"
              icon="heart"
              size="large"
              type="primary"
              ghost
              @click="collectRentalHouse"
              :loading="collectLoading"
              >点击收藏</a-button
            >
            <a-button
              v-else
              size="large"
              type="primary"
              ghost
              @click="collectRentalHouse"
              :loading="collectLoading"
            >
              <a-icon type="heart" theme="filled"></a-icon>
              取消收藏
            </a-button>
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
      houseDetail: {},
      // 该房源收藏状态
      isCollect: false,
      // 点击收藏按钮后的加载状态
      collectLoading: false,
      // 获取到的收藏房源的信息
      collectHouse: {}
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
    },
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    },
    // 用户收藏房源信息
    userRentalHouseCollection () {
      return this.$store.state.userRentalHouseCollection
    }
  },
  methods: {
    // 获取出租房源信息
    getHouseDetail () {
      let self = this
      let { id, type } = self.$route.params
      let data = { id, type }
      // console.log("房源详情路由参数", data)
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
    // 获取用户收藏的房源信息 ->放vuex里面，若不发生增加或删除收藏房源时，用户都用该数据查看收藏房源
    getCollection () {
      let { id, role } = this.userInfo
      let data = { user_id: id, role: role }
      req({
        method: 'post',
        url: '/api/collection/getCollectionByUserId',
        data: data
      }).then(res => {
        console.log("该用户全部的收藏房源信息：", res.data.data)
        this.$store.dispatch('insertHouseCollection', res.data.data)
        console.log(this.$store.state.userRentalHouseCollection)
      }).catch(err => {
        console.log(err)
      })
    },
    // 判断用户是否收藏了该房源
    isCollectRentalHouse () {
      let userRentalHouseCollection = this.$store.state.userRentalHouseCollection
      let { id: rental_house_id, type } = this.$route.params
      let { id: user_id, role } = this.userInfo
      if (userRentalHouseCollection.length != 0) {
        let filterData = userRentalHouseCollection.filter((item) => {
          return item.user_id == user_id && item.role === role && item.rental_house_id == rental_house_id && item.type === type
        })
        this.isCollect = filterData.length != 0
        this.collectHouse = filterData[0]
        console.log("该房源收藏状态：", this.isCollect, filterData, userRentalHouseCollection)
      }
    },
    // 点击收藏
    collectRentalHouse () {
      if (this.isCollect) {
        this.isCollectRentalHouse()
        let data = {
          id: this.collectHouse.id
        }
        this.collectLoading = true
        req({
          method: "post",
          url: "/api/collection/deleteCollection",
          data: data
        }).then(res => {
          if (res.data.code === 200) {
            this.isCollect = !this.isCollect
            message.success(res.data.msg)
            this.getCollection()
          }
          else {
            message.error(res.data.msg)
          }
          this.collectLoading = false
        }).catch(err => {
          message.error(err)
          this.collectLoading = false
        })
      }
      else {
        console.log(this.$route.params, this.userInfo)
        let { id: rental_house_id, type } = this.$route.params
        let { role, id: user_id } = this.userInfo
        let data = {
          rental_house_id,
          type,
          role,
          user_id
        }
        this.collectLoading = true
        req({
          method: "post",
          url: "/api/collection/insertCollection",
          data: data
        }).then(res => {
          if (res.data.code === 200) {
            this.isCollect = !this.isCollect
            message.success(res.data.msg)
            this.getCollection()
          }
          else {
            message.error(res.data.msg)
          }
          this.collectLoading = false
        }).catch(err => {
          message.error(err)
          this.collectLoading = false
        })
      }
    }
  },
  created () {
    this.getHouseDetail()
    this.isCollectRentalHouse()
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
