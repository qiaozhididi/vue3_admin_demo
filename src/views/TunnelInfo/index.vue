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
              @click="
                uploadHandle(scope.$index, scope.row);
                dialogUploadVisible = true;
              "
              ><span>上传</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 上传对话框 -->
  <el-dialog center title="上传文件" width="40%" v-model="dialogUploadVisible">
    <el-upload
      class="upload"
      v-model:file-list="fileList"
      action="http://localhost:3000/api/upload"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="handleFileSuccess"
    >
      <el-button type="primary" size="small">点击上传</el-button>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            dialogUploadVisible = false;
            fileList = [];
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogUploadVisible = false;
            fileList = [];
          "
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import api from "@/api/index";
import { useRouter } from "vue-router";

const router = useRouter();

//文件上传
const dialogUploadVisible = ref(false);
const fileList = ref([]);
const currentID = ref(0);

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

//默认加载第一条节点
onMounted(() => {
  handleNodeClick({ content: "zb" });
});

//表格操作 预览
const preViewHandle = (index, row) => {
  router.push("/pdf/" + row.id);
};

//表格操作 上传
const uploadHandle = (index, row) => {
  currentID.value = row.id;
  dialogUploadVisible.value = false;
};

//上传文件超出
const handleExceed = () => {
  console.log("上传文件超出");
};

//上传文件成功
const handleFileSuccess = (response, uploadFile) => {
  api
    .getTunnelUploadFilePath({
      id: currentID.value,
      urlpath: response.url.substr(7),
    })
    .then((res) => {
      console.log(currentID.value);
      if (res.data.status === 200) {
        console.log(res.data);
      } else {
        console.log(res.data.msg);
      }
    });
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
.upload {
  display: inline-block;
}
</style>
