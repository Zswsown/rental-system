<template>
  <div class="advice">
    <a-row>
      <h2 style="font-weight: 700">虚假房源举报信息</h2>
    </a-row>
    <!-- 分割线 -->
    <a-divider style="margin-top: 0"></a-divider>
    <a-row>
      <a-table
        class="illegalTable"
        :bordered="true"
        :pagination="false"
        row-key="id"
        :data-source="illegalList"
        style="width: 100%"
        :columns="illegalTableColumn"
      >
        <!-- 角色 -->
        <span slot="role" slot-scope="text">
          {{ text == "guser" ? "租户" : "房源管家" }}
        </span>
        <!-- 提交时间 -->
        <span slot="create_time" slot-scope="text">
          {{ moment(text).format("YYYY/MM/DD HH:mm:ss") }}
        </span>
        <!-- 回复时间 -->
        <span slot="update_time" slot-scope="text">
          {{ text != null ? moment(text).format("YYYY/MM/DD HH:mm:ss") : text }}
        </span>
        <!-- 故障状态 -->
        <a-row slot="operation" slot-scope="text, record">
          <a-button type="primary" @click="record.replyModalVisible = true">
            回复
          </a-button>
          <a-modal
            title="回复反馈意见"
            :visible="record.replyModalVisible"
            :confirm-loading="record.replyModalConfirmLoading"
            ok-text="回复"
            cancel-text="取消"
            @ok="replyAdvice(record)"
            @cancel="record.replyModalVisible = false"
          >
            <a-textarea :rows="4" v-model="record.replyEdit"></a-textarea>
          </a-modal>
        </a-row>
      </a-table>
    </a-row>
    <a-row style="margin-top: 20px">
      <!-- <a-pagination
        :total="queryWorkOrderListPageInfo.total"
        :current="queryWorkOrderListPageInfo.current"
        :page-size="queryWorkOrderListPageInfo.size"
        :show-quick-jumper="true"
        :show-less-items="true"
        :show-size-changer="true"
        :show-total="(total) => `共${total}条`"
        style="margin-top: 20px"
        @change="
          (page, pageSize) => {
            queryWorkOrderListPageInfo.current = page;
            getWorkOrderList();
          }
        "
        @showSizeChange="
          (current, size) => {
            queryWorkOrderListPageInfo.size = size;
            queryWorkOrderListPageInfo.current = 1;
            getWorkOrderList();
          }
        "
      ></a-pagination> -->
      <!-- <a-pagination :total="20"> </a-pagination> -->
    </a-row>
  </div>
</template>

<script>
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
import moment from "moment"
import root from "@/config/root.js"
export default {
  name: "Advice",
  data () {
    return {
      // 举报虚假房源列表
      illegalList: [],
      // 举报虚假房源表格列
      illegalTableColumn: [
        {
          "title": "序号",
          "dataIndex": "id",
          "key": "id",
          "align": "center",
          "width": "100px",
          "scopedSlots": {
            "customRender": "id"
          }
        },
        {
          "title": "角色",
          "dataIndex": "role",
          "key": "role",
          "align": "center",
          "scopedSlots": {
            "customRender": "role"
          }
        },
        {
          "title": "角色id",
          "dataIndex": "user_id",
          "key": "user_id",
          "align": "center",
          "scopedSlots": {
            "customRender": "user_id"
          }
        },
        {
          "title": "反馈意见",
          "dataIndex": "advice",
          "key": "advice",
          "width": 160,
          "align": "center",
          "scopedSlots": {
            "customRender": "advice"
          }
        },
        {
          "title": "提交时间",
          "dataIndex": "create_time",
          "key": "create_time",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "create_time"
          }
        },
        {
          "title": "回复状态",
          "dataIndex": "replyStatus",
          "key": "replyStatus",
          "align": "center",
          "scopedSlots": {
            "customRender": "replyStatus"
          }
        },
        {
          "title": "回复内容",
          "dataIndex": "reply_advice",
          "key": "reply_advice",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "reply_advice"
          }
        },
        {
          "title": "回复时间",
          "dataIndex": "update_time",
          "key": "update_time",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "update_time"
          }
        },
        {
          "title": "操作",
          "key": "operation",
          "align": "center",
          "scopedSlots": {
            "customRender": "operation"
          }
        }
      ],
    }
  },
  computed: {
    // moment
    moment () {
      return moment
    },
    // 获取出租方式 选项列表
    typeList () {
      return root.typeList
    },
    // 回复举报虚假房源信息 状态列表
    replyStatusList () {
      return root.replyStatusList
    }
  },
  methods: {
    // 获取全部举报虚假房源信息
    getAllAdvice () {
      req({
        method: 'get',
        url: '/api/advice/selectAllAdvice'
      }).then(res => {
        console.log(res)
        this.illegalList = res.data.data.map(item => {
          item.replyModalVisible = false
          item.replyModalConfirmLoading = false
          item.replyStatus = this.replyStatusList[item.status].label
          item.replyEdit = ""
          return item
        })
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
    // 回复举报虚假房源消息
    replyAdvice (record) {
      let { id, reply_advice } = record
      let data = { id, reply_advice }
      req({
        method: 'post',
        url: '/api/advice/updateAdvice',
        data: data
      }).then(res => {
        console.log(res)
        if (res.data.code === 500) {
          message.success(res.data.msg)
          record.replyModalVisible = false
          this.getAllAdvice()
        }
        else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    }
  },
  mounted () {
    this.getAllAdvice()
  }
}
</script>

<style scoped>
.advice {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.illegalTable ::v-deep .ant-table-tbody > tr > td {
  padding: 6px;
  overflow-wrap: break-word;
}
.illegalTable ::v-deep .ant-table-thead > tr > th {
  padding: 6px;
  overflow-wrap: break-word;
}
</style>