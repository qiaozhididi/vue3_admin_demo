<template>
  <div
    class="slider-navs"
    :style="{ width: menuStore.isCollapse ? '64px' : '210px' }"
  >
    <div class="logo" v-show="systemStore.toggleStore">
      {{ menuStore.isCollapse ? "工程" : "工程管理系统" }}
    </div>
    <el-menu
      class="el-menu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :default-active="active"
      :collapse="menuStore.isCollapse"
      router
    >
      <!-- template循环生成视图，不会增加页面结构 -->
      <template v-for="(item, index) in menuStore.menus" :key="index">
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <component class="icon" :is="item.icon"></component>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              :index="childItem.path"
            >
              <span>{{ childItem.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <component class="icon" :is="item.icon"></component>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMenuStore } from "@/stores/menuStore";
import { useSystemStore } from "@/stores/systemStore";

const menuStore = useMenuStore();
const systemStore = useSystemStore();

//组件传值
// const props = defineProps({
//   myToggle: {
//     type: Boolean,
//     default: false,
//   },
// });

//修复刷新页面的菜单字体高亮
const active = ref("/");
if (localStorage.getItem("active")) {
  active.value = localStorage.getItem("active");
}
</script>
<style scoped>
.slider-navs {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
  background-color: #304156;
  transition: 0.3s ease-in;
}
.logo {
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 25px;
  background-color: #3041b6;
}
.el-menu {
  border-right: none;
}
.icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
