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
import { useLoginStore } from "@/stores/loginStore";
import { onMounted } from "vue";
import api from "@/api/index";

const menuStore = useMenuStore();
const loginStore = useLoginStore();

// 用户权限的路由获取
onMounted(() => {
  api
    .getRouter({
      user: loginStore.permission,
    })
    .then((res) => {
      if (res.data.status === 200) {
        menuStore.menus = res.data.menuData.menus;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
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
