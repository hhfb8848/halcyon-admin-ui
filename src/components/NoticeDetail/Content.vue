<template>
  <div class="notice-content" v-html="content" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  content: string;
}>();
</script>

<style scoped>
.notice-content {
  /* max-width: 99%;
  overflow-y: scroll;
  max-height: 70vh; */
}

.notice-content img,
.notice-content video {
  max-width: 90%;
  max-height: 90%;
}

.notice-content table {
  width: 90%;
  border-collapse: collapse;
}

.notice-content table,
.notice-content th,
.notice-content td {
  border: 1px solid #ddd;
}

.notice-content th,
.notice-content td {
  padding: 8px;
  text-align: left;
}
</style>
