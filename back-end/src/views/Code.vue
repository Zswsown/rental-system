<template>
  <div class="code">
    <a-row>
      <h2 style="font-weight: 700">审核房源管家账号</h2>
    </a-row>
    <!-- 分割线 -->
    <a-divider style="margin-top: 0"></a-divider>
    <a-row>
      <a-table
        class="illegalTable"
        :bordered="true"
        :pagination="false"
        row-key="id"
        :data-source="buserCodeList"
        style="width: 100%"
        :columns="buserCodeTableColumn"
      >
        <!-- 提交时间 -->
        <span slot="create_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 回复时间 -->
        <span slot="update_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 审核状态 -->
        <a-popover
          trigger="click"
          :visible="record.statusEditVisible"
          slot="status"
          slot-scope="text, record"
        >
          <template v-slot:content>
            <div
              style="
                width: 240px;
                height: 32px;
                line-height: 31px;
                border-bottom: 1px solid #e8e8e8;
                margin-top: -10px;
              "
            >
              <span style="font-weight: bolder">修改审核状态</span>
              <a-icon
                type="close"
                style="
                  float: right;
                  transform: translateY(9px);
                  color: red;
                  cursor: pointer;
                "
                @click="record.statusEditVisible = false"
              ></a-icon>
            </div>
            <div style="width: 240px; margin-top: 10px">
              <div
                :style="{
                  marginLeft: index ? '10px' : '0',
                  cursor: 'pointer',
                  color: item.color,
                  borderColor: item.color,
                  display: 'inline-block',
                  height: '25px',
                  lineHeight: '23px',
                  padding: '0 10px',
                  border: `1px solid ${item.color}`,
                  borderRadius: '25px',
                }"
                v-for="(item, index) of buserCodeStatusList"
                :key="'buserCodeStatusList-' + index"
                @click="
                  () => {
                    record.statusEditVisible = false;
                    changeBuserCodeStatus(record, index);
                  }
                "
              >
                {{ item.label }}
              </div>
            </div>
          </template>
          <div
            :style="{
              cursor: 'pointer',
              color: buserCodeStatusList[text]
                ? buserCodeStatusList[text].color
                : '#1890ff',
              borderColor: buserCodeStatusList[text]
                ? buserCodeStatusList[text].color
                : '#1890ff',
              display: 'inline-block',
              height: '25px',
              lineHeight: '23px',
              padding: '0 10px',
              border: `1px solid ${
                buserCodeStatusList[text]
                  ? buserCodeStatusList[text].color
                  : '#1890ff'
              }`,
              borderRadius: '25px',
            }"
            @click="
              () => {
                record.statusEditVisible = !record.statusEditVisible;
              }
            "
          >
            {{
              buserCodeStatusList[text]
                ? buserCodeStatusList[text].label
                : "未知"
            }}
          </div>
        </a-popover>
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
  name: "Code",
  data () {
    return {
      // 房源管家账号列表
      buserCodeList: [],
      // 房源管家账号表格列
      buserCodeTableColumn: [
        {
          "title": "序号",
          "dataIndex": "id",
          "key": "id",
          "align": "center",
          "width": "60px",
          "scopedSlots": {
            "customRender": "id"
          }
        },
        {
          "title": "账号",
          "dataIndex": "code",
          "key": "code",
          "align": "center",
          "width": "100px",
          "scopedSlots": {
            "customRender": "code"
          }
        },
        {
          "title": "昵称",
          "dataIndex": "nickname",
          "key": "nickname",
          "align": "center",
          "width": "100px",
          "scopedSlots": {
            "customRender": "nickname"
          }
        },
        {
          "title": "联系方式",
          "dataIndex": "tel",
          "key": "tel",
          "align": "center",
          "width": "100px",
          "scopedSlots": {
            "customRender": "tel"
          }
        },
        {
          "title": "邮箱地址",
          "dataIndex": "email",
          "key": "email",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "email"
          }
        },
        {
          "title": "申请理由",
          "dataIndex": "reason",
          "key": "reason",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "reason"
          }
        },
        {
          "title": "审核状态",
          "dataIndex": "status",
          "key": "status",
          "align": "center",
          "scopedSlots": {
            "customRender": "status"
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
          "title": "审核时间",
          "dataIndex": "update_time",
          "key": "update_time",
          "align": "center",
          "width": "160px",
          "scopedSlots": {
            "customRender": "update_time"
          }
        },

      ],
    }
  },
  computed: {
    // moment
    moment () {
      return moment
    },
    // 房源管家账号 审核状态列表
    buserCodeStatusList () {
      return root.buserCodeStatusList
    }
  },
  methods: {
    // 获取全部举报虚假房源信息
    getAllBUser () {
      req({
        method: 'get',
        url: '/api/buser/selectAllBUser'
      }).then(res => {
        console.log(res)
        this.buserCodeList = res.data.data.map(item => {
          item.statusEditVisible = false
          return item
        })
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
    // 修改房源管家审核状态
    changeBuserCodeStatus (record, index) {
      console.log(record, index)
      let { id } = record
      let data = { id, status: index }
      req({
        method: 'post',
        url: '/api/buser/updateBUserById',
        data: data
      }).then(res => {
        if (res.data.code === 200) {
          this.getAllBUser()
          message.success(res.data.msg)
        }
        else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
  },
  mounted () {
    this.getAllBUser()
  }
}
</script>

<style scoped>
.code {
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