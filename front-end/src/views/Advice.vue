
<template>
  <div class="advice">
    <a-row type="flex" justify="center" style="margin-bottom: 20px">
      <a-col>
        <span style="font-size: 30px; font-weight: 700; text-align: center"
          >反馈意见</span
        >
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-form-model
          class="adviceForm"
          ref="adviceForm"
          :model="adviceForm"
          :rules="rules"
          v-bind="layout"
        >
          <a-form-model-item has-feedback label="反馈意见" prop="advice">
            <a-textarea
              v-model="adviceForm.advice"
              autocomplete="off"
              placeholder="请输入反馈意见"
              :rows="4"
              style="height: 200px"
            />
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col>
        <a-button
          key="提交"
          type="primary"
          :loading="loading"
          @click="submitAdvice"
        >
          提交
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
export default {
  name: "Advice",
  data () {
    return {
      // 提交按钮 加载状态
      loading: false,
      // 表单布局
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      // 提交的反馈意见表单
      adviceForm: {
        advice: "",
      },
      // 举报虚假房源表单校验规则
      rules: {
        advice: [{ required: true, message: "请输入反馈意见", trigger: 'change' }, { required: true, message: "请输入反馈意见", trigger: 'blur' }]
      },
    }
  },
  computed: {
    // 用户信息
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    // 新增举报虚假房源信息
    submitAdvice () {
      this.loading = true
      this.$refs.adviceForm.validate(valid => {
        if (valid) {
          let data = {
            role: this.userInfo.role,
            user_id: this.userInfo.id,
            advice: this.adviceForm.advice
          }
          req({
            method: "post",
            url: "/api/advice/insertAdvice",
            data: data
          }).then(res => {
            if (res.data.code === 500) {
              message.success(res.data.msg);
            }
            else {
              message.error(res.data.msg)
            }
            this.loading = false
          }).catch(err => {
            message.error(err);
          })
        } else {
          this.loading = false
          console.log("未填写正确信息");
          message.error("未填写正确信息")
          return false;
        }
      })
    },
  }
}
</script>

<style>
.advice {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.adviceForm {
  width: 600px;
}
</style>