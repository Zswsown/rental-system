<template>
  <div class="edit-house">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >更新出租房源</span
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
          <a-form-model-item has-feedback label="小区所在城市" prop="city">
            <a-input
              v-model="editForm.code"
              autocomplete="off"
              placeholder="请输入小区所在城市"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="小区">
            <a-input
              v-model="editForm.pass"
              autocomplete="off"
              placeholder="请输入小区名字"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="房屋地址">
            <a-input
              v-model="editForm.checkPass"
              autocomplete="off"
              placeholder="请输入出租房屋的地址"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="期望租金">
            <a-input
              v-model="editForm.tel"
              type="tel"
              autocomplete="off"
              placeholder="请输入您期望租出的价格"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="出租方式">
            <a-input
              type="tel"
              autocomplete="off"
              placeholder="请输入您的出租方式"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="联系方式">
            <a-input
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
          key="提交修改"
          type="primary"
          :loading="loading"
          @click="edit"
        >
          提交修改
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "editHouse",
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
.edit-house {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.editForm {
  width: 600px;
}
</style>