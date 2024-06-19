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
    <div class="tunnel-content"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/api/index";
const handleNodeClick = (data) => {
  console.log(data);
};

// 懒加载
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    api.getTunnelList().then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.result);
      } else {
        console.log(res.data.msg);
        resolve([]);
      }
    });
  }
  if (node.level === 1) {
    api.getTunnelListChild({ cid: node.data.cid }).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.result);
      } else {
        console.log(res.data.msg);
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
