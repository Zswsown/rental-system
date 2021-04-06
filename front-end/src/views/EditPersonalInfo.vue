<template>
  <div class="edit-personal-info">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >编辑个人信息</span
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
          <a-form-model-item has-feedback label="用户名" prop="city">
            <a-input
              v-model="editForm.code"
              autocomplete="off"
              placeholder="请输入用户名"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="手机号码" prop="pass">
            <a-input
              v-model="editForm.pass"
              type="password"
              autocomplete="off"
              placeholder="请输入手机号码"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="绑定邮箱" prop="checkPass">
            <a-input
              v-model="editForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="请输入要绑定的邮箱"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="微信号" prop="tel">
            <a-input
              v-model="editForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的微信号"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="个性签名" prop="tel">
            <a-input
              v-model="editForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的个性签名"
            />
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
export default {
  name: "EditPersonalInfo",
  data () {
    return {
      type: true,
      loading: false,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      editForm: {
        type: "tenant",
        code: "",
        pass: "",
        checkPass: "",
        tel: ""
      },
      rules: {
        code: [{ required: true, message: "请输入账号", trigger: 'change' }, { required: true, trigger: 'blur' }],
        pass: [{ required: true, message: "请输入密码", trigger: 'change' }, { required: true, trigger: 'blur' }],
        checkPass: [{ validator: this.validatePass, trigger: 'change' }],
        tel: [{ validator: this.validateTel, trigger: 'change' }],
      },
    }
  },
  methods: {
    edit () {
      this.loading = true
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.loading = false
          message.success("注册成功");
          this.visible = false
        } else {
          this.loading = false
          console.log("注册信息未填写");
          message.error("注册信息未填写")
          return false;
        }
      })
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editForm.pass) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    },
    validateTel (rule, value, callback) {
      if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号码格式错误'));
      }
      else {
        callback();
      }
    }
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
</style>