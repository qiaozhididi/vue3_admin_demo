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
        <el-button size="small" @click="userEditHandle(scope.$index, scope.row)"
          >修改权限</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="delUserHandle(scope.$index, scope.row)"
          >删除用户</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 新增用户 -->
  <el-dialog
    center
    v-model="dialogFormAddUserVisible"
    title="添加用户信息"
    width="40%"
  >
    <el-form
      :inline="true"
      :model="userInfoForm"
      status-icon
      label-width="180px"
    >
      <el-form-item label="用户名：" width="120px" prop="username">
        <el-input v-model="userInfoForm.username" />
      </el-form-item>
      <el-form-item label="密码：" width="120px" prop="password">
        <el-input v-model="userInfoForm.password" />
      </el-form-item>
      <el-form-item label="用户权限：" width="120px" prop="permission">
        <el-select
          v-model="permission"
          placeholder="选择权限"
          style="width: 120px"
          size="large"
          @change="permissionAddHandle"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话：" width="120px">
        <el-input v-model="userInfoForm.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormAddUserVisible = false">取消</el-button>
        <el-button type="primary" @click="sureUserAddHandle"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑用户 -->
  <el-dialog
    center
    v-model="dialogFormUpdateUserVisible"
    title="添加用户信息"
    width="40%"
  >
    <el-form
      :inline="true"
      :model="userUpdateInfoForm"
      status-icon
      label-width="180px"
    >
      <el-form-item label="用户名：" width="120px">
        <el-input v-model="userUpdateInfoForm.username" disabled />
      </el-form-item>
      <el-form-item label="密码：" width="120px" prop="password">
        <el-input v-model="userUpdateInfoForm.password" type="password" />
      </el-form-item>
      <el-form-item label="用户权限：" width="120px" prop="permission">
        <el-select
          v-model="permission"
          placeholder="选择权限"
          style="width: 120px"
          size="large"
          @change="permissionUpdateHandle"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话：" width="120px">
        <el-input v-model="userUpdateInfoForm.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormUpdateUserVisible = false">取消</el-button>
        <el-button type="primary" @click="sureUserUpdateHandle">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import api from "@/api/index";

const userList = reactive({
  list: [],
});

const userInfoForm = reactive({
  username: "",
  password: "",
  permission: "",
  phone: "",
});

const permission = ref("");

const EditorID = ref(0);

const options = [
  { value: "admin", label: "管理员" },
  { value: "vip", label: "普通用户" },
];

//搜索初始化
const searchUserInfo = ref("");
const dialogFormAddUserVisible = ref(false);
const dialogFormUpdateUserVisible = ref(false);

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
  //每次新增先清空信息
  Object.keys(userInfoForm).forEach((key) => (userInfoForm[key] = ""));
};

//添加用户的权限选择
const permissionHandle = (data) => {
  userInfoForm.permission = data;
};

const userUpdateInfoForm = reactive({
  username: "",
  password: "",
  permission: "",
  phone: "",
});
//修改用户
const userEditHandle = (index, row) => {
  dialogFormUpdateUserVisible.value = true;
  EditorID.value = row.id;
  api
    .getPreUpdateUser({
      id: row.id,
    })
    .then((res) => {
      if (res.data.status === 200) {
        userUpdateInfoForm.username = res.data.result[0].username;
        userUpdateInfoForm.password = res.data.result[0].password;
        userUpdateInfoForm.phone = res.data.result[0].phone;
        permission.value = res.data.result[0].permission;
      }
    });
};
//修改用户的权限选择
const permissionUpdateHandle = (data) => {
  userUpdateInfoForm.permission = data;
};

//确认修改
const sureUserUpdateHandle = () => {
  api
    .getUpdateUser({
      id: EditorID.value,
      password: userUpdateInfoForm.password,
      permission: userUpdateInfoForm.permission,
      phone: userUpdateInfoForm.phone,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        dialogFormUpdateUserVisible.value = false;
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        getUserList();
      } else {
        dialogFormUpdateUserVisible.value = false;
        ElMessage({
          type: "error",
          message: res.data.msg,
        });
        getUserList();
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

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

//确认新增用户
const sureUserAddHandle = () => {
  api
    .getAddUser({
      username: userInfoForm.username,
      password: userInfoForm.password,
      permission: userInfoForm.permission,
      phone: userInfoForm.phone,
    })
    .then((res) => {
      if (res.data.status === 200) {
        dialogFormAddUserVisible.value = false;
        ElMessage({
          type: "success",
          message: res.data.msg,
        });
        getUserList();
      } else {
        dialogFormAddUserVisible.value = false;
        ElMessage({
          type: "error",
          message: res.data.msg,
        });
        getUserList();
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

//用户信息预更新
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
