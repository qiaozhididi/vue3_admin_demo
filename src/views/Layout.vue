<template>
  <div class="layout-container">
    <slider-navs></slider-navs>
    <div class="right-container">
      <top-navs></top-navs>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SliderNavs from "@/components/SliderNavs/index.vue";
import TopNavs from "@/components/TopNavs/index.vue";
</script>
<style>
.right-container {
  margin-left: 210px;
}
</style>
