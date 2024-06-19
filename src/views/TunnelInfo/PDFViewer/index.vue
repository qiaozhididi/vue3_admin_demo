<template>
  <!-- <embed :src="pdfUrl" type="application/pdf" width="100%" height="100%">  -->
  <!-- <iframe :src="pdfUrl" width="100%" height="100%"></iframe> -->
  <VuePdf v-for="page in numOfPages" :key="page" :src="pdfUrl"></VuePdf>
</template>

<script setup>
import api from "@/api/index";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { VuePdf,createLoadingTask } from "vue3-pdfjs/esm";

const route = useRoute();
const pdfUrl = ref("");
const numOfPages = ref(0);

onMounted(() => {
  api.getPDFView({ id: route.params.id }).then((res) => {
    if (res.data.status === 200) {
      pdfUrl.value = "http://localhost:3000/" + res.data.result[0].urlpath;
      const loadingTask = createLoadingTask(pdfUrl.value);
      loadingTask.promise.then((pdf) => {
        numOfPages.value = pdf.numPages;
      });
    }
  });
});
</script>
<style scoped></style>
