el-dropdown
<template>
  <div class="nav">
    <div class="toggle-menu">
      <div class="toggle-menu-toggle">
        <el-icon
          class="icon"
          v-if="menuStore.isCollapse"
          @click="openMenu(false)"
          ><Expand
        /></el-icon>
        <el-icon
          class="icon"
          v-else="menuStore.isCollapse"
          @click="closeMenu(true)"
          ><Fold
        /></el-icon>
      </div>
      <div class="toggle-menu-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ $t("message.navs") }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ menuStore.breadcrumb }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="lang">
        <el-dropdown>
          <span class="el-dropdown-link"> 语言切换 </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLang('zh')"
                >中文</el-dropdown-item
              >
              <el-dropdown-item @click="changeLang('en')"
                >English</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="user">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{ loginStore.username }}
            <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">
                <router-link to="/info">个人中心</router-link>
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
import { useMenuStore } from "@/stores/menuStore";
import { useRouter } from "vue-router";
const loginStore = useLoginStore();
const router = useRouter();
const menuStore = useMenuStore();

//退出登录，清空存储数据
const logoutHandler = () => {
  loginStore.token = "";
  loginStore.permission = "";
  loginStore.username = "";
  router.push("/login");
};

//关闭菜单栏
const closeMenu = (flag) => {
  menuStore.isCollapse = flag;
};
//打开菜单栏
const openMenu = (flag) => {
  menuStore.isCollapse = flag;
};

//切换语言
const changeLang = (lang) => {
  localStorage.setItem("lang", lang);
  //切换刷新
  location.reload();
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
.lang {
  position: absolute;
  right: 120px;
  top: 20px;
}
.user {
  font-size: 15px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.el-dropdown-link {
  outline: unset !important;
}
</style>
