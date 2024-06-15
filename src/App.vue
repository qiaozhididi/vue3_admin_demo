<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <RouterView />
</template>

<style>
/* 公共样式 */
body,html,#app{
  height: 100%;
}
</style>
