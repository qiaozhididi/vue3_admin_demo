el-dropdown
<template>
  <div class="nav">
    <div class="toggle-menu">
      <div class="toggle-menu-toggle">
        <el-icon class="icon"><Expand /></el-icon>
      </div>
      <div class="toggle-menu-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>当前</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">
            {{ item.meta.title }}
          </el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
      <div class="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ loginStore.username }}
            <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" >
               <router-link to="/info" >个人中心</router-link> 
            </el-dropdown-item>
              <el-dropdown-item command="logout" @click="logoutHandler"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useLoginStore } from "@/stores/loginStore";
import { useRouter } from "vue-router";
const loginStore = useLoginStore();
const router = useRouter();
//退出登录，清空存储数据
const logoutHandler = () => {
  loginStore.token = "";
  loginStore.permission = "";
  loginStore.username = "";
  router.push("/login");
};
</script>
<style scoped>
.nav {
  height: 60px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 12%), 0 0 3px 0 rgb(0, 0, 0, 4%);
}
.toggle-menu {
  padding-top: 17.5px;
  padding-left: 10px;
}

.icon {
  font-size: 25px;
}
.toggle-menu-toggle {
  float: left;
}
.toggle-menu-breadcrumb {
  float: left;
  line-height: 60px;
  margin-top: 6px;
  margin-left: 20px;
}
.user {
  /* float: right; */
  font-size: 15px;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
