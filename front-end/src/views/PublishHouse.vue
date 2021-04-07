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
          <!-- 房屋地址 -->
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
            api: "/api/buser/publishHouse",
            data: data
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          // message.success("注册成功");
          // this.visible = false
        } else {
          this.loading = false
          console.log("请填写正确的房源发布信息");
          message.error("请填写正确的房源发布信息")
          return false;
        }
      })
    },
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    // 出租房数量 与 出租房信息的个数 一样多
    num (newValue, oldValue) {
      let rentalHouseList = []
      console.log(newValue, oldValue)
      for (let i = 0; i < newValue; i++) {
        rentalHouseList.push({
          area: 0,
          direct: "east",
          desc: "",
          tag: [],
          price: 0,
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