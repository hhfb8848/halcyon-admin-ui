<script setup lang="ts">
import BorderBox13 from "@/components/DataV/border-box-13";
import CenterMap from "./body-center/CenterMap.vue";
</script>

<template>
  <div class="big-screen-body">
    <div class="left">
      <BorderBox13 />
    </div>
    <div class="center">
      <CenterMap title="设备分布图" />
    </div>
    <div class="right"><BorderBox13 /></div>
  </div>
</template>

<style lang="scss" scoped>
.big-screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 0;
  .left,
  .center,
  .right {
    margin-bottom: 50px;
  }
  .left {
    flex: 1;
  }
  .center {
    flex: 1.5;
  }
  .right {
    flex: 1;
  }
}
</style>
