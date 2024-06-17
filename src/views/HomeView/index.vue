<template>
  <div class="card">
    <div class="box">
      <el-icon class="box-icon" style="color: #40c9c6"
        ><Notification
      /></el-icon>
      <span class="box-title">隧道数量：1000条</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: #36a3f7"><Compass /></el-icon>
      <span class="box-title">检验合格：456个</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: #f4516c"><Bell /></el-icon>
      <span class="box-title">正在施工：343个</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: #34dfa4"><Odometer /></el-icon>
      <span class="box-title">地址预报：3000个</span>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.card {
  display: flex;
}
.card .box {
  flex: 1;
  height: 130px;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
}
.card .box .box-icon {
  display: block;
  font-size: 60px;
  color: #409eff;
  line-height: 130px;
  float: left;
  padding-left: 20px;
}
.card .box:nth-child(1) {
  margin-left: 0;
}
.card .box:nth-child(4) {
  margin-right: 0;
}
.box-title {
  display: block;
  font-size: 14px;
  color: #666;
  line-height: 130px;
}
</style>
