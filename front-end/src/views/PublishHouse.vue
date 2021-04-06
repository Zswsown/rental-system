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
          class="publishForm"
          ref="publishForm"
          :model="publishForm"
          :rules="rules"
          v-bind="layout"
        >
          <a-form-model-item has-feedback label="小区所在城市" prop="city">
            <a-input
              v-model="publishForm.code"
              autocomplete="off"
              placeholder="请输入小区所在城市"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="小区" prop="pass">
            <a-input
              v-model="publishForm.pass"
              type="password"
              autocomplete="off"
              placeholder="请输入小区名字"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="房屋地址" prop="checkPass">
            <a-input
              v-model="publishForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="请输入出租房屋的地址"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="期望租金" prop="tel">
            <a-input
              v-model="publishForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您期望租出的价格"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="出租方式" prop="tel">
            <a-input
              v-model="publishForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的出租方式"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="手机号码" prop="tel">
            <a-input
              v-model="publishForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的手机号码"
            />
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
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
export default {
  name: "PublishHouse",
  data () {
    return {
      type: true,
      loading: false,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      publishForm: {
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
    publish () {
      this.loading = true
      this.$refs.publishForm.validate(valid => {
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
      } else if (value !== this.publishForm.pass) {
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
.publish-house {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.publishForm {
  width: 600px;
}
</style>