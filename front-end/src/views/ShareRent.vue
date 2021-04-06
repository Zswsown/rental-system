<template>
  <div class="share-rent">
    <select-house></select-house>
  </div>
</template>

<script>
import SelectHouse from '@/components/SelectHouse.vue'
export default {
  name: "ShareRent",
  components: {
    SelectHouse
  }
};
</script>

<style>
.share-rent {
  background: #fff;
  padding: 8px;
}
</style>
