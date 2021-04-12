<template>
  <div class="house-state">
    <a-row type="flex">
      <a-col style="margin-right: 20px">
        <h2 style="font-weight: 700">房源状态管理</h2>
      </a-col>
      <a-col>
        <span>出租方式：</span>
        <a-select
          v-model="type"
          style="width: 120px"
          :allowClear="true"
          @change="changeFilterOption"
        >
          <a-select-option v-for="item in typeList" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <!-- 分割线 -->
    <a-divider></a-divider>
    <a-row>
      <a-table
        class="houseStateTable"
        :bordered="true"
        :pagination="false"
        row-key="id"
        :data-source="rentalHouseList"
        style="width: 100%"
        :columns="rentalHouseTableColumn"
      >
        <!-- 房间编号 -->
        <span slot="id" slot-scope="text">
          <a style="vertical-align: middle; margin-left: 4px">{{ text }}</a>
        </span>
        <!-- 房屋区域 -->
        <span slot="address" slot-scope="text">
          <a style="vertical-align: middle; margin-left: 4px">{{ text }}</a>
        </span>
        <!-- 创建时间 -->
        <span slot="created_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 故障状态 -->
        <a-popover
          trigger="click"
          :visible="$item.statusEditVisible"
          slot="status"
          slot-scope="text, $item"
        >
          <template v-slot:content="">
            <div
              style="
                width: 240px;
                height: 32px;
                line-height: 31px;
                border-bottom: 1px solid #e8e8e8;
                margin-top: -10px;
              "
            >
              <span style="font-weight: bolder">修改房屋状态</span>
              <a-icon
                type="close"
                style="
                  float: right;
                  transform: translateY(9px);
                  color: red;
                  cursor: pointer;
                "
                @click="$item.statusEditVisible = false"
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
                v-for="(item, index) of statusList"
                :key="'statusList-' + index"
                @click="
                  () => {
                    $item.statusEditVisible = false;
                    changeStatus($item, index);
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
              color: statusList[text] ? statusList[text].color : '#1890ff',
              borderColor: statusList[text]
                ? statusList[text].color
                : '#1890ff',
              display: 'inline-block',
              height: '25px',
              lineHeight: '23px',
              padding: '0 10px',
              border: `1px solid ${
                statusList[text] ? statusList[text].color : '#1890ff'
              }`,
              borderRadius: '25px',
            }"
            @click="
              () => {
                $item.statusEditVisible = !$item.statusEditVisible;
              }
            "
          >
            {{ statusList[text] ? statusList[text].label : "未知" }}
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
      <a-pagination :total="20"> </a-pagination>
    </a-row>
  </div>
</template>

<script>
import moment from "moment"
import root from "@/config/root.js"
import req from "@/api/req.js"
export default {
  name: "HouseState",
  data () {
    return {
      // 房屋出租方式
      type: null,
      rentalHouseTableColumn: [{
        "title": "房间编号",
        "dataIndex": "id",
        "key": "id",
        "width": 80,
        "align": "center",
        "scopedSlots": {
          "customRender": "id"
        }
      }, {
        "title": "房屋区域",
        "dataIndex": "address",
        "key": "address",
        "width": 150,
        "align": "center",
        "scopedSlots": {
          "customRender": "address"
        }
      },
      {
        "title": "房屋标签",
        "dataIndex": "tag",
        "key": "tag",
        "width": 180,
        "align": "center",
        "scopedSlots": {
          "customRender": "tag"
        }
      },
      {
        "title": "房屋状态",
        "dataIndex": "status",
        "key": "status",
        "width": 180,
        "align": "center",
        "scopedSlots": {
          "customRender": "status"
        }
      },
      {
        "title": "创建时间",
        "dataIndex": "created_time",
        "key": "created_time",
        "width": 150,
        "align": "center",
        "scopedSlots": {
          "customRender": "created_time"
        }
      },
      ],
      // 出租房屋列表
      rentalHouseList: []
    }
  },
  computed: {
    // 房屋状态 选项列表
    statusList () {
      return root.statusList
    },
    // 出租方式 选项列表
    typeList () {
      return root.typeList
    },
    // moment
    moment () {
      return moment
    },
    // 获取用户状态
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    changeStatus (text, item) {

    },
    // 获取全部出租房源信息
    getRentalHouseList (type) {
      let self = this
      let { id } = self.userInfo
      let url = type == null ? '/api/house/getAllRentalHouseByBuserId' : (type === 'entire' ? '/api/house/getAllEntireHouseByBuserId' : '/api/house/getAllShareHouseByBuserId')
      req({
        method: 'post',
        url: url,
        data: { id }
      }).then(res => {
        console.log("获取到的出租房屋：", res)
        self.rentalHouseList = res.data.data
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
    },
    // 查询方式改变 出租房出租方式
    changeFilterOption (type) {
      this.getRentalHouseList(type)
    }
  },
  mounted () {
    this.getRentalHouseList(null)
  }
}
</script>

<style scoped>
.house-state {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.houseStateTable ::v-deep .ant-table-tbody > tr > td {
  padding: 6px 16px;
  overflow-wrap: break-word;
}
.houseStateTable ::v-deep .ant-table-thead > tr > th {
  padding: 6px 16px;
  overflow-wrap: break-word;
}
</style>