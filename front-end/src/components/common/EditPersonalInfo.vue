<template>
  <div class="edit-personal-info">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >{{ getUserRole }}--编辑个人信息</span
        >
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-form-model
          class="editForm"
          ref="editForm"
          :model="editForm"
          :rules="rules"
          v-bind="layout"
        >
          <a-form-model-item has-feedback label="用户昵称" prop="nickname">
            <a-input
              v-model="editForm.nickname"
              autocomplete="off"
              placeholder="请输入用户昵称"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="电话号码" prop="tel">
            <a-input
              v-model="editForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的手机号码"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="绑定邮箱" prop="email">
            <a-input
              v-model="editForm.email"
              type="email"
              autocomplete="off"
              placeholder="请输入要绑定的邮箱"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="性别" prop="sex">
            <a-radio-group v-model="editForm.sex">
              <a-radio :value="`woman`">
                <a-icon type="woman"></a-icon>
              </a-radio>
              <a-radio :value="`man`">
                <a-icon type="man"></a-icon>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-button key="保存" type="primary" :loading="loading" @click="edit">
          保存
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
export default {
  name: "EditPersonalInfo",
  data () {
    return {
      // 用户身份
      role: "",
      // 判断性别激活状态
      sexActive: "",
      // 提交按钮加载状态
      loading: false,
      // 表单布局
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      // 用户信息表单
      editForm: {
        nickname: "",
        tel: "",
        email: "",
        sex: "",
      },
      // 表单校验规则
      rules: {
        nickname: [{ required: true, message: "请输入用户昵称", trigger: 'change' }, { required: true, trigger: 'blur' }],
        tel: [{ required: true, message: "请输入电话号码", trigger: 'change' }, { required: true, trigger: 'blur' }],
      },
    }
  },
  computed: {
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    },
    // 获取用户身份
    getUserRole () {
      return this.role === 'guser' ? '租户' : '房源管家'
    }
  },
  methods: {
    // 更新用户信息
    edit () {
      this.loading = true
      this.$refs.editForm.validate(valid => {
        if (valid) {
          let url = this.userInfo.role === 'guser' ? "/api/guser/updateGUser" : "/api/buser/updateBUser"
          req({
            method: "post",
            url: url,
            data: {
              id: this.$route.params.id,
              ...this.editForm
            },
          }).then(res => {
            this.loading = false
            if (res.data.code === 200) {
              message.success(res.data.msg)
              console.log(res.data.data)
              this.getUserInfo()
            }
            else {
              message.error(res.data.msg)
            }
          }).catch(err => {
            this.loading = false
            message.success("用户信息更新失败", err)
          })
        } else {
          this.loading = false
          console.log("用户信息未正确填写")
          message.error("用户信息未正确填写")
          return false
        }
      })
    },
    // 获取新的用户信息，若token未过期，则将请求的数据放入vuex中
    getUserInfo () {
      req({
        method: 'get',
        url: '/api/getUserInfo'
      }).then(res => {
        console.log(res)
        // 将用户信息存进vuex
        this.$store.dispatch('insertUserInfo', res.data.user.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取租户个人信息
    getGUserInfo () {
      let { nickname, tel, email, sex, role } = this.$store.state.userInfo
      this.editForm = { nickname, tel, email, sex }
      this.role = role
    },
  },
  created () {
    this.getGUserInfo()
  }
}
</script>

<style>
.edit-personal-info {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.editForm {
  width: 600px;
}
.sexClass {
  color: #fa5741;
}
</style>