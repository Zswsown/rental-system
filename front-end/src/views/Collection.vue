<template>
  <div class="collection">
    <a-row>
      <a-col style="margin-right: 20px">
        <h2 style="font-weight: 700">我关注的房源</h2>
      </a-col>
    </a-row>
    <!-- 分割线 -->
    <a-divider></a-divider>
    <a-row>
      <a-table
        class="collectRentalHouseTable"
        :bordered="true"
        :pagination="false"
        :row-key="
          (record) => {
            return record.type + record.c_id;
          }
        "
        :data-source="collectRentalHouseList"
        style="width: 100%"
        :columns="collectRentalHouseTableColumn"
      >
        <!-- 房间编号 -->
        <span slot="id" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">{{
            text
          }}</span>
        </span>
        <!-- 所在区域 -->
        <span slot="province_name" slot-scope="text, record">
          <span
            >{{ record.province_name }}/{{ record.city_name }}/{{
              record.country_name
            }}/{{ record.area_name }}</span
          >
        </span>
        <!-- 房屋区域 -->
        <span slot="address" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间面积 -->
        <span slot="area" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间租金 -->
        <span slot="price" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间朝向 -->
        <span slot="direct" slot-scope="text, record">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ record.direct }}
          </span>
        </span>
        <!-- 房间描述 -->
        <span slot="desc" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间标签 -->
        <span slot="tag" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 操作 -->
        <a-row slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定取消吗？"
            @confirm="deleteCollection(record)"
          >
            <a-button type="primary">取消收藏</a-button>
          </a-popconfirm>
        </a-row>
      </a-table>
    </a-row>
    <!-- <a-row style="margin-top: 20px">
      <a-pagination
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
      ></a-pagination>
      <a-pagination :total="20"> </a-pagination>
    </a-row> -->
  </div>
</template>

<script>
import root from "@/config/root.js"
import moment from "moment"
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
export default {
  name: "HouseState",
  data () {
    return {
      // 出租房屋状态表格列
      collectRentalHouseTableColumn: [
        {
          "title": "编号",
          "dataIndex": "id",
          "key": "id",
          // "width": 80,
          "align": "center",
          "scopedSlots": {
            "customRender": "id"
          }
        },
        {
          "title": "所处区域",
          "dataIndex": "province_name",
          "key": "province_name",
          "width": 120,
          "align": "center",
          "scopedSlots": {
            "customRender": "province_name"
          }
        },
        {
          "title": "房屋地址",
          "dataIndex": "address",
          "key": "address",
          "width": 100,
          "align": "center",
          "scopedSlots": {
            "customRender": "address"
          }
        },
        {
          "title": "房间面积",
          "dataIndex": "area",
          "key": "area",
          // "width": 180,
          "align": "center",
          "scopedSlots": {
            "customRender": "area"
          }
        },
        {
          "title": "房间租金",
          "dataIndex": "price",
          "key": "price",
          // "width": 180,
          "align": "center",
          "scopedSlots": {
            "customRender": "price"
          }
        },
        {
          "title": "房间朝向",
          "dataIndex": "direct",
          "key": "direct",
          // "width": 180,
          "align": "center",
          "scopedSlots": {
            "customRender": "direct"
          }
        },
        {
          "title": "房间描述",
          "dataIndex": "desc",
          "key": "desc",
          "width": 100,
          "align": "center",
          "scopedSlots": {
            "customRender": "desc"
          }
        },
        {
          "title": "房屋标签",
          "dataIndex": "tag",
          "key": "tag",
          "width": 140,
          "align": "center",
          "scopedSlots": {
            "customRender": "tag"
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
      // 出租房屋列表
      collectRentalHouseList: []
    }
  },
  computed: {
    // moment
    moment () {
      return moment
    },
    // 获取用户状态
    userInfo () {
      return this.$store.state.userInfo
    },
    // 获取房间朝向 选项列表
    directList () {
      return root.directList
    }
  },
  methods: {
    // 获取用户收藏的房源信息 ->放vuex里面，若不发生增加或删除收藏房源时，用户都用该数据查看收藏房源
    getCollection () {
      let { id, role } = this.$store.state.userInfo
      let data = { user_id: id, role: role }
      req({
        method: 'post',
        url: '/api/collection/getCollectionByUserId',
        data: data
      }).then(res => {
        console.log("该用户全部的收藏房源信息：", res.data.data)
        let data = res.data.data
        if (data != null) {
          this.collectRentalHouseList = res.data.data.map(item => {
            item.direct = this.directList.filter(direct => item.direct === direct.value)[0].label
            return item
          })
          // 将用户收藏房源存进vuex
          this.$store.dispatch('insertHouseCollection', res.data.data)
          console.log(this.$store.state.userRentalHouseCollection, this.collectRentalHouseList)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消收藏该房源
    deleteCollection (record) {
      let data = {
        id: record.c_id
      }
      req({
        method: "post",
        url: "/api/collection/deleteCollection",
        data: data
      }).then(res => {
        if (res.data.code === 200) {
          message.success(res.data.msg)
          this.getCollection()
        }
        else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        message.error(err)
      })
    }
  },
  created () {
    this.getCollection()
  },
  mounted () {

  }
}
</script>

<style scoped>
.collection {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.collectRentalHouseTable ::v-deep .ant-table-tbody > tr > td {
  /* padding: 6px 16px; */
  padding: 2px;
  overflow-wrap: break-word;
}
.collectRentalHouseTable ::v-deep .ant-table-thead > tr > th {
  /* padding: 6px 16px; */
  padding: 2px;
  overflow-wrap: break-word;
}
</style>