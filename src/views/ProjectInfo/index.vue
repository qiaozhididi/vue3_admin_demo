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
      layout="prev, pager, next"
      :total="100"
    />
  </div>
</template>
<script setup>
import api from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { dateFormat } from "@/utils/utils.js";

const projectInfo = reactive({
  list: [],
});

onMounted(() => {
  http(1);
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

//表格编辑按钮
const handleEdit = (index, row) => {
  console.log(index, row);
};

//表格删除按钮
const handleDelete = (index, row) => {
  console.log(index, row);
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
//添加按钮
const addHandle = () => {
  console.log("添加");
};

//分页事件
const currentChangeHandle = (val) => {
  console.log(val);
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
