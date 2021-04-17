<template>
  <div class="edit-house-info">
    <a-row type="flex">
      <a-col style="margin-right: 20px">
        <h2 style="font-weight: 700">更新房源</h2>
      </a-col>
      <a-col>
        <!-- 筛选数据源 ->根据出租方式获取数据源 -->
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
        class="rentalHouseTable"
        :bordered="true"
        :pagination="false"
        :row-key="
          (record) => {
            return record.type + record.id;
          }
        "
        :data-source="rentalHouseList"
        style="width: 100%"
        :columns="rentalHouseTableColumn"
      >
        <!-- 房间编号 -->
        <span slot="id" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">{{
            text
          }}</span>
        </span>
        <!-- 所在区域 -->
        <span slot="province_name" slot-scope="text, $item">
          <span
            >{{ $item.province_name }}/{{ $item.city_name }}/{{
              $item.country_name
            }}/{{ $item.area_name }}</span
          >
        </span>
        <!-- 房屋区域 -->
        <span slot="address" slot-scope="text">
          <span style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间面积 -->
        <span slot="area" slot-scope="text, record">
          <span v-if="record.editable">
            <a-input-number
              style="width: 50px"
              v-model="record.areaEdit"
            ></a-input-number>
          </span>
          <span v-else style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间租金 -->
        <span slot="price" slot-scope="text, record">
          <span v-if="record.editable">
            <a-input-number
              style="width: 60px"
              v-model="record.priceEdit"
            ></a-input-number>
          </span>
          <span v-else style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间朝向 -->
        <span slot="direct" slot-scope="text, record">
          <span v-if="record.editable">
            <a-select style="width: 60px" v-model="record.directEdit">
              <a-select-option v-for="item in directList" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </span>
          <span v-else style="vertical-align: middle; margin-left: 4px">
            {{ record.directName }}
          </span>
        </span>
        <!-- 房间描述 -->
        <span slot="desc" slot-scope="text, record">
          <span v-if="record.editable">
            <a-textarea
              style="width: 80px"
              v-model="record.descEdit"
            ></a-textarea>
          </span>
          <span v-else style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 房间标签 -->
        <span slot="tag" slot-scope="text, record">
          <span v-if="record.editable">
            <a-select
              v-model="record.tagEdit"
              mode="tags"
              style="width: 120px"
              placeholder="请输入房间的标签"
            >
            </a-select>
          </span>
          <span v-else style="vertical-align: middle; margin-left: 4px">
            {{ text }}
          </span>
        </span>
        <!-- 操作 -->
        <a-row slot="operation" slot-scope="text, record">
          <span v-if="record.editable">
            <a-button
              type="primary"
              style="margin-right: 6px"
              @click="() => updateRentalHouseById(record)"
              >保存</a-button
            >
            <a-popconfirm
              title="确定取消吗？"
              @confirm="record.editable = false"
            >
              <a-button>取消</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button type="primary" @click="record.editable = !record.editable"
              >编辑</a-button
            >
          </span>
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
import moment from "moment"
import root from "@/config/root.js"
import req from "@/api/req.js"
import message from "ant-design-vue/lib/message"
export default {
  name: "HouseState",
  data () {
    return {
      // 房屋出租方式
      type: null,
      // 出租房屋状态表格列
      rentalHouseTableColumn: [
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
          "title": "出租方式",
          "dataIndex": "type",
          "key": "type",
          // "width": 80,
          "align": "center",
          "scopedSlots": {
            "customRender": "type"
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
      rentalHouseList: []
    }
  },
  computed: {
    // 获取出租方式 选项列表
    typeList () {
      return root.typeList
    },
    // 房间朝向 选项列表
    directList () {
      return root.directList
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
    // 更新出租房屋状态信息
    updateRentalHouseById (record) {
      console.log(record, this.directList.filter(direct => record.directEdit === direct.label))
      let url = record.type === 'entire' ? '/api/house/updateEntireHouseById' : '/api/house/updateShareHouseById'
      let { id, areaEdit, priceEdit, directEdit, tagEdit, descEdit } = record
      let data = { id, area: areaEdit, price: priceEdit, direct: directEdit, tag: tagEdit, desc: descEdit }
      req({
        method: 'post',
        url: url,
        data: data
      }).then(res => {
        if (res.data.code === 200) {
          record.editable = false
          message.success(res.data.msg)
          console.log(res.data.data)
          this.getRentalHouseList(this.type)
        }
        else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
        message.error(err)
      })
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
        // console.log("获取到的出租房屋：", res)
        self.rentalHouseList = res.data.data.map(item => {
          item.type = this.typeList.filter(type => item.type === type.value)[0].label
          item.editable = false
          item.areaEdit = item.area
          item.priceEdit = item.price
          item.directName = self.directList.filter(direct => item.direct === direct.value)[0].label
          item.directEdit = item.direct
          item.tagEdit = item.tag.split(',')
          item.descEdit = item.desc
          return item
        })
        // console.log("获取到的出租房屋：", self.rentalHouseList)
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
.edit-house-info {
  background: #fff;
  padding: 8px;
  width: 100%;
  height: 100%;
}
.rentalHouseTable ::v-deep .ant-table-tbody > tr > td {
  /* padding: 6px 16px; */
  padding: 2px;
  overflow-wrap: break-word;
}
.rentalHouseTable ::v-deep .ant-table-thead > tr > th {
  /* padding: 6px 16px; */
  padding: 2px;
  overflow-wrap: break-word;
}
</style>