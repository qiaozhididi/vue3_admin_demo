<template>
  <div class="add-user">
    <span>用户状态：</span>
    <el-input
      class="input-user"
      size="large"
      placeholder="请输入用户信息"
      v-model="searchUserInfo"
      @keyup.enter.native="searchUserHandle"
    ></el-input>
    <el-button
      class="search-btn"
      type="primary"
      size="large"
      @click="searchUserHandle"
      plain
      >搜索</el-button
    >
    <el-button
      class="add-btn"
      type="primary"
      size="large"
      @click="addUserHandle"
      plain
      >添加</el-button
    >
  </div>
  <el-table :data="userList.list" width="100%">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="username" label="姓名" width="120" />
    <el-table-column label="权限" width="150">
      <template #default="scope">
        <div class="">
          {{ scope.row.permission === "admin" ? "管理员" : "普通用户" }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="联系电话" width="150" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="permissionHandle">修改权限</el-button>
        <el-button
          type="danger"
          size="small"
          @click="delUserHandle(scope.$index, scope.row)"
          >删除用户</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    center
    v-model="dialogFormAddUserVisible"
    title="添加用户信息"
    width="40%"
  >
    
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import api from "@/api/index";

const userList = reactive({
  list: [],
});

//搜索初始化
const searchUserInfo = ref("");
const dialogFormAddUserVisible = ref(false);

onMounted(() => {
  getUserList();
});

//用户信息列表渲染
const getUserList = () => {
  api.getUserList().then((res) => {
    if (res.data.status == 200) {
      userList.list = res.data.result;
    } else {
      console.log(res);
    }
  });
};

//搜索用户
const searchUserHandle = () => {
  if (searchUserInfo.value === "管理员") {
    searchUserInfo.value = "admin";
  } else if (searchUserInfo.value === "普通用户") {
    searchUserInfo.value = "vip";
  }
  api.getSearchUser({ userinfo: searchUserInfo.value }).then((res) => {
    console.log(res.data);
    if (res.data.status === 200) {
      userList.list = res.data.result;
    } else {
      userList.list = [];
    }
  });
};

//添加用户按钮对话框弹出
const addUserHandle = () => {
  dialogFormAddUserVisible.value = true;
};

//修改用户权限
const permissionHandle = () => {};

//删除用户
const delUserHandle = (index, row) => {
  ElMessageBox.confirm("确定删除改用户？", "删除数据", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.getDeleteUser({ id: row.id }).then((res) => {
        if (res.data.status === 200) {
          ElMessage({
            type: "success",
            message: res.data.msg,
          }),
            getUserList();
        } else {
          ElMessage({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>
<style scoped>
.add-user {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  background-color: #fff;
}

.add-user span {
  font-weight: 700;
}
.add-user .input-user {
  width: 300px;
  margin-right: 10px;
}
</style>
