<template>
  <div class="entire-rent">
    <select-house></select-house>
  </div>
</template>

<script>
import SelectHouse from '@/components/SelectHouse.vue'
export default {
  name: "EntireRent",
  components: {
    SelectHouse
  }
};
</script>

<style>
.entire-rent {
  background: #fff;
  padding: 8px;
}
</style>
