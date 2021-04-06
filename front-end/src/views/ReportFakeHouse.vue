
<template>
  <div class="report-fake-house">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >举报虚假房源</span
        >
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-form-model
          class="reportForm"
          ref="reportForm"
          :model="reportForm"
          :rules="rules"
          v-bind="layout"
        >
          <a-form-model-item has-feedback label="房屋编号" prop="city">
            <a-input
              v-model="reportForm.code"
              autocomplete="off"
              placeholder="请输入房屋编号"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="房源管家" prop="pass">
            <a-input
              v-model="reportForm.pass"
              type="password"
              autocomplete="off"
              placeholder="请输入房源管家名字"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="举报理由" prop="checkPass">
            <a-textarea
              v-model="reportForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="请输入举报的理由"
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
          @click="report"
        >
          提交发布
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "ReportFakeHouse",
  data () {
    return {
      type: true,
      loading: false,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      reportForm: {
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
    report () {
      this.loading = true
      this.$refs.reportForm.validate(valid => {
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
      } else if (value !== this.reportForm.pass) {
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
.report-fake-house {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.reportForm {
  width: 600px;
}
</style>