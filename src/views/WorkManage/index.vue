<template>
  <el-button @click="showDialog = true">Open Dialog</el-button>

  <el-dialog
    
    title="Notice"
    width="500"
    @close="showDialog = false"
    :visible.sync="showDialog"
    center
  >
    <!-- 对话框内容 -->
    <span>This is a dialog content.</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">Cancel</el-button>
      <el-button type="primary" @click="confirmDialog">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const showDialog = ref(false);

const confirmDialog = () => {
  // 处理确认逻辑
  console.log("Dialog confirmed");
  showDialog.value = false; // 也可以在这里关闭对话框
};
// 使用 watch 监听 showDialog 的变化  
watch(showDialog, (newVal, oldVal) => {  
  if (newVal) {  
    // 当对话框打开时执行的逻辑  
    console.log('Dialog is now open');  
  } else {  
    // 当对话框关闭时执行的逻辑  
    console.log('Dialog is now closed');  
  }  
});  
</script>

<style scoped>
/* 样式 */
</style>
