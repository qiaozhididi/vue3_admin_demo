<template>
  <div class="slider-navs">
    <div class="logo">工程管理系统</div>
    <el-menu
      class="el-menu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :default-active="active"
      router
    >
      <el-menu-item index="/"><span>首页</span></el-menu-item>
      <el-menu-item index="/project"><span>项目基础信息</span></el-menu-item>
      <el-menu-item index="/tunnel"><span>隧道设计信息</span></el-menu-item>
      <el-menu-item index="/work"><span>工作监督案例</span></el-menu-item>
      <el-menu-item index="/build"><span>施工情况监督</span></el-menu-item>
      <el-menu-item index="/geological"><span>超前地质预报</span></el-menu-item>
      <el-menu-item index="/system"><span>系统信息管理</span></el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { ref } from "vue";
const active = ref("/");
</script>
<style scoped>
.slider-navs {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
  background-color: #304156;
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
</style>
