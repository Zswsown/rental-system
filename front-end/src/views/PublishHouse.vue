<template>
  <div class="publish-house">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >发布出租房源</span
        >
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-form-model
          class="publishHouseForm"
          ref="publishHouseForm"
          :model="publishHouseForm"
          :rules="rules"
          v-bind="layout"
        >
          <!-- 出租方式 -->
          <a-row>
            <a-form-model-item has-feedback label="出租方式" prop="type">
              <a-select v-model="publishHouseForm.type">
                <a-select-option v-for="item in typeList" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-row>
          <!-- 出租房间数量 -->
          <a-row>
            <a-form-model-item has-feedback label="出租房间数量" prop="num">
              <a-input-number v-model="num" :min="1" />
            </a-form-model-item>
          </a-row>
          <!-- 房屋描述 -->
          <a-row>
            <a-form-model-item has-feedback label="房屋描述" prop="desc">
              <a-textarea
                v-model="publishHouseForm.desc"
                :rows="2"
                placeholder="请输入房屋描述"
              ></a-textarea>
            </a-form-model-item>
          </a-row>
          <!-- 所在地区 -->
          <a-row>
            <a-form-model-item has-feedback label="所在地区">
              <a-cascader
                :options="provinceOptionList"
                :load-data="loadData"
                :field-names="{
                  label: 'areaName',
                  value: 'id',
                  children: 'children',
                }"
                placeholder="请选择所在地区"
                @change="getHouseArea"
              />
            </a-form-model-item>
          </a-row>
          <!-- 详细地址 -->
          <a-row>
            <a-form-model-item has-feedback label="房屋地址" prop="address">
              <a-textarea
                v-model="publishHouseForm.address"
                :rows="2"
                placeholder="请输入房间地址"
              ></a-textarea>
            </a-form-model-item>
          </a-row>
          <!-- 出租房信息 -->
          <a-row
            style="
              border: 1px solid #eee;
              padding: 0px 8px;
              max-height: 500px;
              overflow: auto;
            "
          >
            <a-row
              v-for="(rentalHouse, index) in publishHouseForm.rentalHouse"
              :key="`rentalHouse` + index"
            >
              <a-row>
                <h3 style="font-weight: 700">第{{ index + 1 }}间出租房信息</h3>
              </a-row>
              <!-- 房间面积 -->
              <a-form-model-item has-feedback label="房间面积">
                <a-input-number v-model="rentalHouse.area" :min="1" />
              </a-form-model-item>
              <!-- 房间租金 -->
              <a-form-model-item has-feedback label="租金(:元)">
                <a-input-number v-model="rentalHouse.price" :min="1" />
              </a-form-model-item>
              <!-- 房间朝向 -->
              <a-form-model-item has-feedback label="房间朝向">
                <a-select v-model="rentalHouse.direct">
                  <a-select-option v-for="item in directList" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <!-- 房间标签 -->
              <a-form-model-item has-feedback label="房间标签">
                <a-select
                  v-model="rentalHouse.tag"
                  mode="tags"
                  placeholder="请输入房间的标签"
                >
                </a-select>
              </a-form-model-item>
              <!-- 房间描述 -->
              <a-form-model-item has-feedback label="房间描述">
                <a-textarea
                  v-model="rentalHouse.desc"
                  :rows="2"
                  placeholder="请输入房间描述"
                ></a-textarea>
              </a-form-model-item>
              <!-- 房间照片 -->
              <!-- <a-form-model-item has-feedback label="房间照片">
                <a-upload list-type="picture" :remove="removePictures(rentalHouse.picURL)" :before-upload="beforePicturesUpload">
                  <a-button> <a-icon type="upload" /> 上传 </a-button>
                </a-upload>
              </a-form-model-item> -->
            </a-row>
          </a-row>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" style="margin-top: 8px">
      <a-col>
        <a-button
          key="提交发布"
          type="primary"
          :loading="loading"
          @click="publish"
        >
          提交发布
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import req from '@/api/req.js'
import request from '@/api/request.js'
import message from "ant-design-vue/lib/message"
export default {
  name: "PublishHouse",
  data () {
    return {
      // 出租房间数量
      num: 1,
      // 出租方式 选项列表
      typeList: [
        { label: '不限', value: 'all' },
        { label: '整租', value: 'entire' },
        { label: '分租', value: 'share' }
      ],
      // 房间朝向 选项列表
      directList: [
        { label: '东', value: 'east' },
        { label: '西', value: 'west' },
        { label: '南', value: 'south' },
        { label: '北', value: 'north' }
      ],
      // 省份列表
      provinceList: [],
      // 省份选项列表
      provinceOptionList: [],
      // 城市列表
      cityList: [],
      // 城市选项列表
      cityOptionList: [],
      // 区县列表
      countryList: [],
      // 区县选项列表
      countryOptionList: [],
      // 街道列表
      areaList: [],
      // 街道选项列表
      areaOptionList: [],
      // 发布房源 表单布局
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      // 发布房源 提交的表单
      publishHouseForm: {
        // 出租方式
        type: "all",
        // 描述
        desc: "",
        // 出租房间数量
        num: 1,
        // 出租房省份id
        province_id: '',
        // 出租房城市id
        city_id: '',
        // 出租房区县id
        country_id: '',
        // 出租房街道id
        area_id: '',
        // 房间地址
        address: "",
        // 出租房信息
        rentalHouse: [
          {
            // 房间面积
            area: 0,
            // 房间朝向
            direct: "east",
            // 房间描述
            desc: "",
            // 房间标签
            tag: [],
            // 房间出租价格
            price: 0,
            // 房间照片
            // picURL: []
          }
        ]
      },
      // 发布房源表单 校验规则
      rules: {
        num: [{ required: true, message: '请输入出租房间数量', trigger: 'blur' }]
      },
      // 提交发布房源 表单的状态
      loading: false,
    }
  },
  methods: {
    // 提交 发布房源表单
    publish () {
      this.loading = true
      this.$refs.publishHouseForm.validate(valid => {
        if (valid) {
          this.loading = false
          let data = {
            ...this.publishHouseForm,
            num: this.num,
            userInfo: this.userInfo
          }
          console.log("发布的房源信息：", data)
          req({
            method: "POST",
            url: "/api/house/publishHouse",
            data: data
          }).then(res => {
            if (res.data.code === 500) {
              message.success(res.data.msg)
              console.log(res)
            }
            else {
              message.error(res.data.msg)
              console.log(res)
            }
          }).catch(err => {
            console.log(err)
            message.error(error)
          })
          // message.success("注册成功");
          // this.visible = false
        } else {
          this.loading = false
          console.log("请填写正确的房源发布信息")
          message.error("请填写正确的房源发布信息")
          return false
        }
      })
    },
    // 获取省份列表信息(初始)
    getPrivinceList () {
      let data = {
        level: 1,
        page: 0,
      }
      for (let i = 0; i < 4; i++) {
        data.page++
        request({
          method: 'get',
          url: '/areaName',
          params: {
            level: data.level,
            page: data.page
          },
        }).then(res => {
          this.provinceList = this.provinceList.concat(res.data.showapi_res_body.data)
          this.provinceOptionList = this.provinceList.map(({ id, areaName, level }) => {
            return {
              id,
              areaName,
              // 省份级别不展开列表
              isLeaf: !(level == 1)
            }
          })
        }).catch(err => {
          console.log(err)
          message.error(err)
        })
      }
    },
    // 动态加载数据(第一次选择时会触发该函数，已经加载的数据不会再加载)
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      // 加载标识
      targetOption.loading = true
      // 加载城市列表
      if (selectedOptions.length === 1) {
        request({
          method: 'get',
          url: '/areaDetail',
          params: {
            parentId: targetOption.id
          },
        }).then(res => {
          let cityList = res.data.showapi_res_body.data.map(({ id, areaName, level }) => {
            return {
              id,
              areaName,
              // 不异步加载省份数据（已经初始化了）
              isLeaf: level == 1
            }
          })
          targetOption.loading = false
          targetOption.children = cityList
          this.provinceOptionList = [...this.provinceOptionList]
        }).catch(err => {
          targetOption.loading = false
          console.log("城市列表加载失败", err)
          message.error("城市列表加载失败")
        })
      }
      // 加载区县列表
      else if (selectedOptions.length === 2) {
        request({
          method: 'get',
          url: '/areaDetail',
          params: {
            parentId: targetOption.id
          },
        }).then(res => {
          let countryList = res.data.showapi_res_body.data.map(({ id, areaName, level }) => {
            return {
              id,
              areaName,
              isLeaf: level == 1
            }
          })
          targetOption.loading = false
          targetOption.children = countryList
          this.provinceOptionList = [...this.provinceOptionList]
        }).catch(err => {
          targetOption.loading = false
          console.log("区县列表加载失败", err)
          message.error("区县列表加载失败")
        })
      }
      // 加载街道列表
      else if (selectedOptions.length === 3) {
        request({
          method: 'get',
          url: '/areaDetail',
          params: {
            parentId: targetOption.id
          },
        }).then(res => {
          let areaList = res.data.showapi_res_body.data.map(({ id, areaName }) => {
            return {
              id,
              areaName,
            }
          })
          targetOption.loading = false
          targetOption.children = areaList
          this.provinceOptionList = [...this.provinceOptionList]
        }).catch(err => {
          targetOption.loading = false
          console.log("街道列表加载失败", err)
          message.error("街道列表加载失败")
        })
      }
      // console.log(targetOption, selectedOptions)
    },
    // 省市区街道 选择完毕
    getHouseArea (value, selectedOptions) {
      console.log(value, selectedOptions)
      this.publishHouseForm.province_id = value[0]
      this.publishHouseForm.city_id = value[1]
      this.publishHouseForm.country_id = value[2]
      this.publishHouseForm.area_id = value[3]
    },
    // 清空
    clean () {
      this.provinceList = []
    },
    // 页面构建时初始化
    mounted_init () {
      this.clean
      this.getPrivinceList()
    }
  },
  computed: {
    // 获取用户身份信息
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  mounted () {
    this.mounted_init()
  },
  watch: {
    // 出租房数量 与 出租房信息的个数 一样多
    num (newValue, oldValue) {
      let rentalHouseList = []
      for (let i = 0; i < newValue; i++) {
        rentalHouseList.push({
          area: 1,
          direct: "east",
          desc: "",
          tag: [],
          price: 1,
          // picURL: []
        })
      }
      this.publishHouseForm.rentalHouse = rentalHouseList
    }
  }
}
</script>

<style>
.publish-house {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.publishHouseForm {
  width: 600px;
}
::-webkit-scrollbar {
  display: none;
}
</style>