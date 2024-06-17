<template>
  <div class="china" id="china"></div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
onMounted(() => {
  proxy.$map("china");
});
</script>
<style scoped>
.china {
  width: 100%;
  height: 630px;
  background-color: #fff;
}
</style>
