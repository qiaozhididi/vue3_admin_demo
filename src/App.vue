<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <RouterView />
</template>

<style>
/* 公共样式 */
body,html,#app{
  height: 100%;
}
/* 修改弹窗对话框header样式 */
.el-dialog__header {
  width: 100%;
  height: 100%;
  background-color: #304156;
  padding: 15px 32px 15px 0 !important;
  margin: -16px 0 16px -16px;
}
.el-dialog__header span{
  color: #fff;
}

/* tree 选中样式 */
.is-current .el-tree-node__content{
  background-color: #409EFF !important;
  color: #fff !important;
}

</style>
