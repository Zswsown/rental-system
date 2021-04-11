<template>
  <div class="house-info">
    <a-row
      v-for="(house, index) in rentalHouseList"
      :key="index"
      @click.native="goRentalHouseDetail(house)"
    >
      <a-row type="flex" style="position: relative">
        <!-- 照片 -->
        <a-row>
          <a-col>
            <img
              src="https://img95.699pic.com/photo/50042/0407.jpg_wh300.jpg"
              alt="房间照片"
              style="width: 160px; height: 120px; border-radius: 8px"
            />
          </a-col>
        </a-row>
        <!-- 简介 -->
        <a-row style="padding-left: 30px">
          <!-- 标题 -->
          <a-row style="margin-bottom: 18px">
            <a style="font-size: 20px; font-weight: 700; color: #000">
              <span>{{ house.typeName }}·</span>
              <span style="margin-right: 8px">{{ house.area_name }}</span>
              <span style="margin-right: 8px">{{ house.desc }}</span>
              <span>{{ house.directName }}</span>
            </a>
          </a-row>
          <!-- 详细信息 -->
          <a-row style="margin-bottom: 16px">
            <span style="font-size: 14px; line-height: 28px; font-weight: 700">
              <span>
                {{ house.city_name }}-{{ house.country_name }}-{{
                  house.area_name
                }}
              </span>
              <span style="padding: 0 8px">/</span>
              <span>{{ house.area }}㎡</span>
              <span style="padding: 0 8px">/</span>
              <span>{{ house.directName }}</span>
              <span style="padding: 0 8px">/</span>
              <span>{{ house.desc }}</span>
            </span>
          </a-row>
          <!-- 房屋标签信息 -->
          <a-row style="margin-bottom: 16px">
            <a-tag color="cyan" v-for="tag in house.tag" :key="tag">{{
              tag
            }}</a-tag>
          </a-row>
        </a-row>
        <!-- 租金  -->
        <a-row style="position: absolute; right: 0; padding-right: 20px">
          <a-col
            ><span style="font-size: 24px; font-weight: 700; color: #fa5741"
              >{{ house.price }}元/月</span
            ></a-col
          >
        </a-row>
      </a-row>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "house-info",
  props: {
    // 出租房屋数据源
    rentalHouseList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 跳转到房源详情
    goRentalHouseDetail (house) {
      let { type, id } = house
      this.$router.push(`/houseDetail/${type}/${id}`, house)
    },
  },
}
</script>

<style scoped>
</style>