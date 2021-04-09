<template>
  <div class="register">
    <span><a style="color: #fff" @click="visible = true"> 注册</a></span>
    <a-modal
      v-model="visible"
      title="账号注册"
      on-ok="handleOk"
      @cancel="cancle"
    >
      <template slot="footer">
        <a-button
          key="注册"
          type="primary"
          :loading="loading"
          @click="register"
        >
          注册
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
              <a-radio value="guser">租户</a-radio>
              <a-radio value="buser">房源管家</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </a-row>
      <a-form-model
        ref="registerForm"
        :model="registerForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item has-feedback label="账号" prop="code">
          <a-input v-model="registerForm.code" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="密码" prop="password">
          <a-input
            v-model="registerForm.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="确认密码" prop="checkPass">
          <a-input
            v-model="registerForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="手机号码" prop="tel">
          <a-input v-model="registerForm.tel" type="tel" autocomplete="off" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import req from '@/api/req.js'
import message from "ant-design-vue/lib/message"
export default {
  name: "register",
  data () {
    return {
      // 弹窗显示状态
      visible: false,
      // 注册者的身份
      role: 'guser',
      // 表单提交按钮的加载状态
      loading: false,
      // 表单的布局
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      },
      // 注册表单
      registerForm: {
        code: "",
        password: "",
        checkPass: "",
        tel: ""
      },
      // 注册表单的校验规则
      rules: {
        code: [{ required: true, message: "请输入账号", trigger: 'change' }, { required: true, trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: 'change' }, { required: true, trigger: 'blur' }],
        checkPass: [{ validator: this.validatePass, trigger: 'change' }],
        tel: [{ validator: this.validateTel, trigger: 'change' }],
      },
    }
  },
  methods: {
    // 提交注册
    register () {
      this.loading = true
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = false
          let data = {
            role: this.role,
            ...this.registerForm
          }
          console.log("注册信息-data", data)
          req({
            method: "POST",
            url: "/api/register",
            data: data
          }).then(res => {
            if (res.data.code === 500) {
              message.success(res.data.msg)
            } else {
              message.error(res.data.msg)
            }
            this.visible = false
            this.$refs.registerForm.resetFields()
          }).catch(err => {
            message.error(err)
            this.visible = false
            this.$refs.registerForm.resetFields()
          })
        } else {
          this.loading = false
          console.log("注册信息未填写")
          message.error("注册信息未填写")
          return false
        }
      })
    },
    // 取消注册
    cancle () {
      this.visible = false
      this.$refs.registerForm.resetFields()
    },
    // 密码的二次校验
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次密码输入不一致！"))
      } else {
        callback()
      }
    },
    // 联系方式（手机号码）的校验
    validateTel (rule, value, callback) {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号码格式错误'))
      }
      else {
        callback()
      }
    }
  }
}
</script>

<style scoped>
</style>