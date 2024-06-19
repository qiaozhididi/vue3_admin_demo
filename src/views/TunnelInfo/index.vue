<template>
  <div class="tunnel-container">
    <div class="tunnel-list">
      <h3>选择断面</h3>
      <el-tree
        style="max-width: 600px"
        :props="defaultProps"
        @node-click="handleNodeClick"
        lazy
        :load="loadNode"
      />
    </div>
    <div class="tunnel-content">
      <el-table :data="tunnelContent.data" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="tunnelname" label="隧道名称" width="180" />
        <el-table-column prop="imagename" label="图片名称" width="180" />
        <el-table-column prop="num" label="图片序号" width="80" />
        <el-table-column prop="content" label="隧道内容" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="preViewHandle(scope.$index, scope.row)"
              >预览</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="uploadHandle(scope.$index, scope.row)"
              >上传</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import api from "@/api/index";

const tunnelContent = reactive({
  data: [],
});
const handleNodeClick = (data) => {
  api.getTunnelContent({ content: data.content }).then((res) => {
    if (res.data.status === 200) {
      tunnelContent.data = res.data.result;
    } else {
      tunnelContent.data = [];
    }
  });
};

// 懒加载
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    api.getTunnelList().then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.result);
      } else {
        resolve([]);
      }
    });
  }
  if (node.level === 1) {
    api.getTunnelListChild({ cid: node.data.cid }).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.result);
      } else {
        resolve([]);
      }
    });
  }
  if (node.level > 1) return resolve([]);
};

const defaultProps = {
  children: "children",
  label: "name",
};

//表格操作 预览
const preViewHandle = (index, row) => {
  console.log(index, row);
};

//表格操作 上传
const uploadHandle = (index, row) => {
  console.log(index, row);
};
</script>
<style scoped>
.tunnel-container {
  display: flex;
}
.tunnel-list {
  width: 250px;
  height: 100%;
  background-color: #f5f5f5;
  padding: 10px;
  margin-right: 20px;
}
.tunnel-list h3 {
  font-size: 15px;
  font-weight: 800;
}
.tunnel-content {
  flex: 1;
}
</style>
