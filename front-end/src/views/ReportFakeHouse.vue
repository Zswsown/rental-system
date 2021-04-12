
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
          <a-form-model-item has-feedback label="出租方式" prop="type">
            <a-select v-model="reportForm.type" style="width: 120px">
              <a-select-option v-for="item in typeList" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item has-feedback label="房屋编号" prop="house_id">
            <a-input-number
              v-model="reportForm.house_id"
              autocomplete="off"
              placeholder="请输入房屋编号"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="房源管家ID" prop="buser_id">
            <a-input-number
              v-model="reportForm.buser_id"
              autocomplete="off"
              placeholder="请输入房源管家ID"
            />
          </a-form-model-item>
          <a-form-model-item
            has-feedback
            label="举报理由"
            prop="illegal_resson"
          >
            <a-textarea
              v-model="reportForm.illegal_resson"
              autocomplete="off"
              placeholder="请输入举报理由"
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
import root from "@/config/root.js"
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
export default {
  name: "ReportFakeHouse",
  data () {
    return {
      // 提交按钮 加载状态
      loading: false,
      // 表单布局
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      // 提交的举报虚假房源表单
      reportForm: {
        type: "entire",
        house_id: 0,
        buser_id: 0,
        illegal_reason: ""
      },
      // 举报虚假房源表单校验规则
      rules: {
        type: [{ required: true, message: "请输入账号", trigger: 'change' }, { required: true, trigger: 'blur' }],
        house_id: [{ required: true, message: "请输入房屋编号", trigger: 'change' }, { required: true, trigger: 'blur' }],
        buser_id: [{ required: true, message: "请输入房源管家ID", trigger: 'change' }, { required: true, trigger: 'blur' }],
        illegal_reason: [{ required: true, message: "请输入举报理由", trigger: 'change' }, { required: true, trigger: 'blur' }],
      },
    }
  },
  computed: {
    // 出租方式 选项列表
    typeList () {
      return root.typeList
    },
  },
  methods: {
    // 新增举报虚假房源信息
    report () {
      this.loading = true
      this.$refs.reportForm.validate(valid => {
        if (valid) {
          req({
            method: "post",
            url: "/api/illegal/insertReportFakeHouse",
            data: this.reportForm
          }).then(res => {
            if (res.data.code === 500) {
              message.success(res.data.msg);
              thie.$refs.reportForm.resetFields()
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