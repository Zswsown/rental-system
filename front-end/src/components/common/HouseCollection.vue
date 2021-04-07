<template>
  <div class="house-collection">
    <a-row>
      <h2 style="font-weight: 700">收藏房源管理</h2>
    </a-row>
    <!-- 分割线 -->
    <a-divider></a-divider>
    <a-row>
      <a-table
        class="houseCollectionTable"
        :bordered="true"
        :pagination="false"
        row-key="id"
        :data-source="houseCollectionList"
        style="width: 100%"
        :columns="houseCollectionTableColumn"
      >
        <!-- id -->
        <span slot="id" slot-scope="text">
          <a style="vertical-align: middle; margin-left: 4px">{{ text }}</a>
        </span>
        <!-- 创建时间 -->
        <span slot="created_time" slot-scope="text">{{
          moment(text).format("YYYY/MM/DD HH:mm:ss")
        }}</span>
        <!-- 故障状态 -->
        <a-row slot="status" slot-scope="text, $item">
          <a-button type="primary">取消收藏</a-button>
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
      <a-pagination :total="20"> </a-pagination>
    </a-row>
  </div>
</template>

<script>
import moment from "moment"
import root from "@/config/root.js"
export default {
  name: "Housecollection",
  data () {
    return {
      houseCollectionTableColumn: [{
        "title": "房屋编号",
        "dataIndex": "id",
        "key": "id",
        "width": 80,
        "align": "center",
        "scopedSlots": {
          "customRender": "id"
        }
      }, {
        "title": "房屋区域",
        "dataIndex": "area",
        "key": "area",
        "width": 150,
        "align": "center",
        "scopedSlots": {
          "customRender": "area"
        }
      }, {
        "title": "收藏时间",
        "dataIndex": "created_time",
        "key": "created_time",
        "width": 150,
        "align": "center",
        "scopedSlots": {
          "customRender": "created_time"
        }
      }, {
        "title": "操作",
        "dataIndex": "status",
        "key": "status",
        "width": 180,
        "align": "center",
        "scopedSlots": {
          "customRender": "status"
        }
      }],
      houseCollectionList: [
        {
          id: "bys344",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼101室",
          created_time: 1617156519366,
          status: 'offline',
          statusEditVisible: null
        },
        {
          id: "bys350",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼109室",
          created_time: 1617159519366,
          status: 'rented',
          statusEditVisible: null
        },
        {
          id: "bys345",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼106室",
          created_time: 1617157518377,
          status: 'rented',
          statusEditVisible: null
        },
        {
          id: "bys346",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼105室",
          created_time: 1617157516388,
          status: 'disRented',
          statusEditVisible: null
        },
        {
          id: "bys347",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼104室",
          created_time: 1617157549399,
          status: 'disRented',
          statusEditVisible: null
        },
        {
          id: "bys348",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼103室",
          created_time: 1617156519300,
          status: 'disRented',
          statusEditVisible: null
        },
        {
          id: "bys349",
          area: "广州市番禺区汉溪长隆奥园天地时代park E1栋8楼102室",
          created_time: 1617157519311,
          status: 'offline',
          statusEditVisible: null
        }
      ]
    }
  },
  computed: {
    statusKeyValue () {
      return root.statusKeyValue
    },
    // moment
    moment () {
      return moment
    },
  },
  methods: {
    changeStatus (text, item) {

    },
  }
}
</script>

<style scoped>
.house-collection {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.housecollectionTable ::v-deep .ant-table-tbody > tr > td {
  padding: 6px 16px;
  overflow-wrap: break-word;
}
.housecollectionTable ::v-deep .ant-table-thead > tr > th {
  padding: 6px 16px;
  overflow-wrap: break-word;
}
</style>