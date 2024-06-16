<template>
  <div class="setting">
    <!-- 控制抽屉按钮 -->
    <el-button
      class="setting-btn"
      size="small"
      type="primary"
      icon="el-icon-setting"
      @click="drawer = true"
    >
      <el-icon class="setting-icon"><Setting /></el-icon>
    </el-button>
    <!-- 抽屉 -->
    <el-drawer title="设置" v-model="drawer" direction="rtl" size="20%">
      <div class="logo-show">
        <span>Logo显示与隐藏</span>
        <el-switch class="logo-switch" v-model="systemStore.toggleStore" />
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useSystemStore } from "@/stores/systemStore";

const drawer = ref(false);
const logoToggle = ref(false);
const emit = defineEmits(["onToggleEvent"]);
const systemStore = useSystemStore();

watch(logoToggle, (newValue, oldValue) => {
  emit("onToggleEvent", newValue);
});
</script>
<style scoped>
.setting {
  position: fixed;
  right: 0px;
  top: 300px;
  z-index: 100;
}
.setting-btn {
  width: 30px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.setting-icon {
  font-size: 25px;
}

.logo-show {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
