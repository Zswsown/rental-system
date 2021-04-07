<template>
  <div class="login">
    <span><a style="color: #fff" @click="visible = true">登录 </a></span>
    <span style="color: #fff"> / </span>
    <a-modal
      v-model="visible"
      title="账号登录"
      on-ok="handleOk"
      @cancel="cancle"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="loading" @click="login">
          登录
        </a-button>
      </template>
      <a-row style="margin-bottom: 24px">
        <a-row type="flex" justify="space-around">
          <a-col
            ><a-icon
              type="aliwangwang"
              theme="filled"
              :style="{ fontSize: '30px', marginBottom: '10px' }"
          /></a-col>
          <a-col
            ><a-icon
              type="reddit-circle"
              theme="filled"
              :style="{ fontSize: '30px', marginBottom: '10px' }"
          /></a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-radio-group
              v-model="role"
              style="display: flex; justify-content: space-around"
            >
              <a-radio :value="`guser`">租户</a-radio>
              <a-radio :value="`buser`">房源管家</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </a-row>
      <a-form-model
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="账号" prop="code">
          <a-input v-model="loginForm.code" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="验证码" prop="verificationCode">
          <a-input
            style="width: 60%"
            v-model="loginForm.verificationCode"
            autocomplete="off"
          />
          <span
            style="
              width: 36%;
              border: 1px solid #000;
              padding: 2px 8px;
              margin-left: 4%;
              z-index: 1;
            "
            >{{ verificationCode }}</span
          >
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import req from '@/api/req.js'
import { getVerificationCode } from "@/config/util.js"
import message from "ant-design-vue/lib/message"

export default {
  name: "Login",
  data () {
    return {
      // 登录者的身份
      role: 'guser',
      // 登录弹窗的显示状态
      visible: false,
      // 验证码
      verificationCode: "",
      // 登录按钮的加载状态
      loading: false,
      // 登录表单的布局样式
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      // 登录表单
      loginForm: {
        code: "",
        password: "",
        verificationCode: ""
      },
      // 登录表单校验规则
      rules: {
        code: [{ required: true, message: "请输入账号", trigger: 'change' }, { required: true, message: "请输入账号", trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: 'change' }, { required: true, message: "请输入密码", trigger: 'blur' }],
        verificationCode: [{ validator: this.validateVerificationCode, trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 提交登录
    login () {
      let self = this
      self.loading = true
      self.$refs.loginForm.validate(valid => {
        if (valid) {
          self.loading = false
          let data = {
            role: self.role,
            code: self.loginForm.code,
            password: self.loginForm.password
          }
          console.log("登录信息-data", data)
          req({
            method: "POST",
            url: "/api/login",
            data: data
          }).then(res => {
            if (res.data.error === 0) {
              console.log("登陆成功", res.data)
              self.$store.dispatch('insertUserInfo', res.data.data)
              self.visible = false
              message.success(res.data.message)
            } else {
              message.error(res.data.message)
            }
            self.$refs.loginForm.resetFields()
          }).catch(err => {
            message.error(err)
            self.$refs.loginForm.resetFields()
          })
        } else {
          self.loading = false
          console.log("请填写正确的登录信息")
          message.error("请填写正确的登录信息")
          return false
        }
      })
    },
    // 取消登录
    cancle () {
      this.visible = false
      this.$refs.loginForm.resetFields()
    },
    // 验证码校验规则
    validateVerificationCode (rule, value, callback) {
      if (this.loginForm.verificationCode.toLowerCase() !== this.verificationCode.toLowerCase()) {
        callback(new Error('验证码错误'))
      }
      else {
        callback()
      }
    }
  },
  watch: {
    // 验证码更新
    visible (newValue, oldValue) {
      if (newValue) {
        this.verificationCode = getVerificationCode()
      }
    }
  }
}
</script>

<style scoped>
</style>