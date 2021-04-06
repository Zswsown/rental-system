<template>
  <div class="home">
    <select-house></select-house>
  </div>
</template>

<script>
import SelectHouse from '@/components/SelectHouse.vue'
export default {
  name: "Home",
  components: {
    SelectHouse
  }
};
</script>

<style>
.home {
  background: #fff;
  padding: 8px;
}
</style>
