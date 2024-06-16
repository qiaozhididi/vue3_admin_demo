<template>
  <div class="layout-container">
    <slider-navs></slider-navs>
    <div
      class="right-container"
      :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }"
    >
      <top-navs></top-navs>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import SliderNavs from "@/components/SliderNavs/index.vue";
import TopNavs from "@/components/TopNavs/index.vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>
<style>
.right-container {
  margin-left: 210px;
  transition: 0.3s ease-in;
}
.content {
  padding: 10px;
}
</style>
