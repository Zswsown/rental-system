<template>
  <div class="house-info">
    <a-row type="flex" style="position: relative">
      <a-row>
        <!-- 照片 -->
        <a-col>
          <img
            src="https://img95.699pic.com/photo/50042/0407.jpg_wh300.jpg"
            alt="房间照片"
            style="width: 160px; height: 120px; border-radius: 8px"
          />
        </a-col>
      </a-row>
      <!-- 详细信息 -->
      <a-row style="padding-left: 40px">
        <a-row style="margin-bottom: 18px"
          ><a style="font-size: 20px; font-weight: 700; color: #000">{{
            item.header
          }}</a></a-row
        >
        <a-row style="margin-bottom: 16px"
          ><span style="font-size: 14px; line-height: 28px; font-weight: 700">{{
            item.detail
          }}</span></a-row
        >
        <a-row style="margin-bottom: 16px">
          <a-tag color="cyan"> 业主自荐 </a-tag>
          <a-tag color="blue"> 集中供暖 </a-tag>
        </a-row>
      </a-row>
      <!-- 租金  -->
      <a-row style="position: absolute; right: 0; padding-right: 20px">
        <a-col
          ><span style="font-size: 24px; font-weight: 700; color: #fa5741"
            >{{ item.price }}元/月</span
          ></a-col
        >
      </a-row>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "house-info",
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
</style>