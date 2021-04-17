<template>
  <div class="report">
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
        <!-- 提交时间 -->
        <span slot="create_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 回复时间 -->
        <span slot="update_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 故障状态 -->
        <a-row slot="operation" slot-scope="text, record">
          <a-button
            type="primary"
            @click="record.replyReportModalVisible = true"
            >回复</a-button
          >
          <a-modal
            title="回复举报消息"
            :visible="record.replyReportModalVisible"
            :confirm-loading="record.replyReportModalConfirmLoading"
            ok-text="回复"
            cancel-text="取消"
            @ok="replyReport(record)"
            @cancel="record.replyReportModalVisible = false"
          >
            <a-textarea :rows="4" v-model="record.replyReportEdit"></a-textarea>
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
  name: "Report",
  data () {
    return {
      // 举报虚假房源列表
      illegalList: [],
      // 举报虚假房源表格列
      illegalTableColumn: [
        {
          "title": "房源管家id",
          "dataIndex": "buser_id",
          "key": "buser_id",
          "align": "center",
          "width": "100px",
          "scopedSlots": {
            "customRender": "buser_id"
          }
        },
        {
          "title": "出租方式",
          "dataIndex": "typeName",
          "key": "typeName",
          "align": "center",
          "scopedSlots": {
            "customRender": "typeName"
          }
        },
        {
          "title": "房屋id",
          "dataIndex": "house_id",
          "key": "house_id",
          "align": "center",
          "scopedSlots": {
            "customRender": "house_id"
          }
        },
        {
          "title": "举报理由",
          "dataIndex": "illegal_reason",
          "key": "illegal_reason",
          "width": 160,
          "align": "center",
          "scopedSlots": {
            "customRender": "illegal_reason"
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
          "dataIndex": "replyReportStatus",
          "key": "replyReportStatus",
          "align": "center",
          "scopedSlots": {
            "customRender": "replyReportStatus"
          }
        },
        {
          "title": "回复内容",
          "dataIndex": "reply_report",
          "key": "reply_report",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "reply_report"
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
    getAllReportFakeHouse () {
      req({
        method: 'get',
        url: '/api/illegal/selectReportFakeHouse'
      }).then(res => {
        console.log(res)
        this.illegalList = res.data.data.map(item => {
          item.replyReportModalVisible = false
          item.replyReportModalConfirmLoading = false
          item.replyReportStatus = this.replyStatusList[item.status].label
          item.replyReportEdit = ""
          item.typeName = this.typeList.filter(type => item.type === type.value)[0].label
          return item
        })
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
    // 回复举报虚假房源消息
    replyReport (record) {
      let { id, replyReportEdit } = record
      let data = { id, reply_report: replyReportEdit }
      req({
        method: 'post',
        url: '/api/illegal/updateReportFakeHouse',
        data: data
      }).then(res => {
        console.log(res)
        if (res.data.code === 500) {
          message.success(res.data.msg)
          record.replyReportModalVisible = false
          this.getAllReportFakeHouse()
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
    this.getAllReportFakeHouse()
  }
}
</script>

<style scoped>
.report {
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