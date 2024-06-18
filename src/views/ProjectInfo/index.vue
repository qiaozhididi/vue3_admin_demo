<template>
  <!-- 搜索与添加 -->
  <div class="search">
    <span>项目状态 </span>
    <el-input
      class="input"
      size="large"
      placeholder="请输入搜索信息"
      v-model="searchInfo"
      @keyup.enter.native="searchHandle"
    ></el-input>
    <el-button
      class="search-btn"
      type="primary"
      size="large"
      @click="searchHandle"
      plain
      >搜索</el-button
    >
    <el-button
      class="add-btn"
      type="primary"
      size="large"
      @click="addHandle"
      plain
      >添加</el-button
    >
  </div>
  <!-- 表格展示 -->
  <el-table
    :data="projectInfo.list"
    :header-cell-style="headerClass"
    style="width: 100%"
    class="table-box"
  >
    <el-table-column prop="name" label="项目名称" width="150" />
    <el-table-column prop="number" label="项目编码" width="100" />
    <el-table-column prop="money" label="项目金额" width="100" />
    <el-table-column prop="address" label="项目地址" width="120" />
    <el-table-column prop="duration" label="项目工期(月)" width="100" />
    <el-table-column
      prop="startTime"
      label="开工时间"
      :formatter="(value) => dateFormat(Number(value.startTime))"
      width="120"
    />
    <el-table-column
      prop="endTime"
      label="结束时间"
      :formatter="(value) => dateFormat(Number(value.endTime))"
      width="120"
    />
    <el-table-column prop="quantity" label="隧道数量" width="80" />
    <el-table-column prop="status" label="项目状态" width="80">
      <template #default="scope">
        <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
          <!-- {{ scope.row.status === "1" ? "已完成" : "施工中" }} -->
          {{ statusHandle(scope.row.status) }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="remark" label="备注">
      <template #default="scope">
        <div v-html="scope.row.remark"></div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="page">
    <el-pagination
      @current-change="currentChangeHandle"
      background
      layout="prev, pager, next,jumper"
      :default-page-size="defaultPageSize"
      :total="total"
    />
  </div>
  <!-- 添加对话框 -->
  <el-dialog
    center
    v-model="dialogFormAddVisible"
    title="添加项目信息"
    width="40%"
  >
    <el-form :inline="true" :model="projectInfoFrom">
      <el-form-item label="项目名称">
        <el-input v-model="projectInfoFrom.name" />
      </el-form-item>
      <el-form-item label="项目编码">
        <el-input v-model="projectInfoFrom.number" />
      </el-form-item>
      <el-form-item label="项目金额">
        <el-input v-model="projectInfoFrom.money" />
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="projectInfoFrom.address" />
      </el-form-item>
      <el-form-item label="项目工期">
        <el-input v-model="projectInfoFrom.duration" />
      </el-form-item>
      <el-form-item label="开工时间">
        <el-date-picker
          v-model="projectInfoFrom.startTime"
          value-format="x"
          type="date"
          placeholder="请选择开工日期"
        ></el-date-picker>
        <!-- <el-input type="date" v-model="projectInfoFrom.startTime" /> -->
      </el-form-item>
      <el-form-item label="完工时间">
        <el-date-picker
          v-model="projectInfoFrom.endTime"
          value-format="x"
          type="date"
          placeholder="请选择完工日期"
        ></el-date-picker>
        <!-- <el-input v-model="projectInfoFrom.endTime" /> -->
      </el-form-item>
      <el-form-item label="隧道数量">
        <el-input v-model="projectInfoFrom.quantity" />
      </el-form-item>
      <el-form-item label="项目状态">
        <el-input
          v-model="projectInfoFrom.status"
          placeholder="'1' 施工中 - '0' 已完成"
        />
      </el-form-item>
      <el-form-item label="项目备注" width="80%">
        <!-- <el-input v-model="projectInfoFrom.remark" /> -->
        <TinymceEditor :options="options" @onDataEvent="getInfoEditorEvent" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHandle"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑对话框 -->
  <el-dialog
    center
    v-model="dialogFormEditVisible"
    title="编辑项目信息"
    width="40%"
  >
    <el-form :inline="true" :model="projectInfoFrom">
      <el-form-item label="项目名称">
        <el-input v-model="projectInfoFrom.name" />
      </el-form-item>
      <el-form-item label="项目编码">
        <el-input v-model="projectInfoFrom.number" />
      </el-form-item>
      <el-form-item label="项目金额">
        <el-input v-model="projectInfoFrom.money" />
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="projectInfoFrom.address" />
      </el-form-item>
      <el-form-item label="项目工期">
        <el-input v-model="projectInfoFrom.duration" />
      </el-form-item>
      <el-form-item label="开工时间">
        <el-date-picker
          v-model="projectInfoFrom.startTime"
          type="date"
          placeholder="请选择开工日期"
        ></el-date-picker>
        <!-- <el-input type="date" v-model="projectInfoFrom.startTime" /> -->
      </el-form-item>
      <el-form-item label="完工时间">
        <el-date-picker
          v-model="projectInfoFrom.endTime"
          type="date"
          placeholder="请选择完工日期"
        ></el-date-picker>
        <!-- <el-input v-model="projectInfoFrom.endTime" /> -->
      </el-form-item>
      <el-form-item label="隧道数量">
        <el-input v-model="projectInfoFrom.quantity" />
      </el-form-item>
      <el-form-item label="项目状态">
        <el-input
          v-model="projectInfoFrom.status"
          placeholder="'1' 施工中 - '0' 已完成"
        />
      </el-form-item>
      <el-form-item label="项目备注" width="80%">
        <TinymceEditor :options="options" @onDataEvent="getInfoEditorEvent" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取消</el-button>
        <el-button type="primary" @click="sureEditHandle"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import api from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { dateFormat } from "@/utils/utils.js";
import { ElMessage } from "element-plus";
import TinymceEditor from "@/components/TinymceEditor/index.vue";

const projectInfo = reactive({
  list: [],
});

//初始获取表格数据
onMounted(() => {
  http(1);
});

//初始化总条数
const total = ref(0);
//初始分页数量
const defaultPageSize = ref(15);

//添加对话框控制器
const dialogFormAddVisible = ref(false);
//编辑对话框控制器
const dialogFormEditVisible = ref(false);

//初始获取页面信息条数
onMounted(() => {
  api.getTotal().then((res) => {
    if (res.data.status === 200) {
      total.value = res.data.result[0]["COUNT(*)"];
    } else {
      total.value = 0;
    }
  });
});

//搜索状态初始化
const searchInfo = ref("");

// 网络请求数据
const http = (page) => {
  api
    .getProjectInfo({ page })
    .then((res) => {
      if (res.data.status === 200) {
        projectInfo.list = res.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// 表格头部样式
const headerClass = () => {
  return {
    background: "#404a5c",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bolder",
    textAlign: "center",
    padding: "10px 0",
  };
};

// 项目状态
const statusHandle = (status) => {
  switch (status) {
    case "0":
      return "施工中";
    case "1":
      return "已完成";
    default:
      return "未知";
  }
};

//表格删除按钮
const handleDelete = (index, row) => {
  ElMessageBox.confirm("确定删除当前数据？", "删除数据", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.getDeleteProject({ id: row.id }).then((res) => {
        if (res.data.status === 200) {
          ElMessage({
            type: "success",
            message: res.data.msg,
          }),
            http(1);
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

//搜索按钮
const searchHandle = () => {
  api.getSearch({ search: searchInfo.value }).then((res) => {
    if (res.data.status === 200) {
      projectInfo.list = res.data.result;
    } else {
      projectInfo.list = [];
    }
  });
};

//初始化添加对话框状态
let projectInfoFrom = reactive({
  name: "",
  number: "",
  money: "",
  address: "",
  duration: "",
  startTime: "",
  endTime: "",
  quantity: "",
  status: "",
  remark: "",
});
//添加按钮对话框弹出
const addHandle = () => {
  projectInfoFrom = {};
  dialogFormAddVisible.value = true;
};

//添加对话框确定事件
const sureHandle = () => {
  api
    .getAddProject({
      name: projectInfoFrom.name,
      number: projectInfoFrom.number,
      money: projectInfoFrom.money,
      address: projectInfoFrom.address,
      duration: projectInfoFrom.duration,
      startTime: projectInfoFrom.startTime,
      endTime: projectInfoFrom.endTime,
      quantity: projectInfoFrom.quantity,
      status: projectInfoFrom.status,
      remark: projectInfoFrom.remark,
    })
    .then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        dialogFormAddVisible.value = false;
        //刷新页面 重新请求数据
        http(1);
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
    });
};

//表格编辑按钮
const handleEdit = (index, row) => {
  api
    .getPreProjectUpdate({ id: row.id })
    .then((res) => {
      if (res.data.status === 200) {
        projectInfoFrom = res.data.result;
        dialogFormEditVisible.value = true;
      } else {
        ElMessage.error(res.data.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
//确认编辑修改事件
const sureEditHandle = () => {};

//分页事件
const currentChangeHandle = (val) => {
  http(val);
};

//添加富文本编辑器
const getInfoEditorEvent = (data) => {
  projectInfoFrom.remark = data;
};

//定义富文本编辑器宽高
const options = {
  width: "100%",
  height: "300px",
};
</script>
<style scoped>
.search {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  background-color: #fff;
}

.search span {
  font-weight: 700;
}
.search .input {
  width: 300px;
  margin-right: 10px;
}
.table-box {
  height: 70vh;
  width: 100%;
  margin-bottom: 10px;
}
.page {
  position: fixed;
  right: 10px;
  bottom: 30px;
}
</style>
