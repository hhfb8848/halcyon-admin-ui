<script setup lang="ts">
import { PropType, inject } from "vue";
import { ListItem } from "./type";
import NoticeItem from "./noticeItem.vue";

const props = defineProps({
  list: {
    type: Array as PropType<Array<ListItem>>,
    default: () => []
  }
});
</script>

<template>
  <div v-if="props.list.length">
    <NoticeItem
      v-for="(item, index) in props.list"
      :key="index"
      :noticeItem="item"
    />
  </div>
  <el-empty v-else description="暂无消息" />
</template>
