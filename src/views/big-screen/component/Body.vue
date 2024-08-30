<script setup lang="ts">
import BorderBox13 from "@/components/DataV/border-box-13";
import CenterMap from "./body-center/CenterMap.vue";
import LeftTop from "./body-left/LeftTop.vue";
import LeftCenter from "./body-left/LeftCenter.vue";
import LeftBottom from "./body-left/LeftBottom.vue";
import CenterBottom from "./body-center/CenterBottom.vue";
import RightTop from "./body-right/RightTop.vue";
import RightCenter from "./body-right/RightCenter.vue";
import RightBottom from "./body-right/RightBottom.vue";
</script>

<template>
  <div class="big-screen-body">
    <div class="left">
      <LeftTop />
      <LeftCenter />
      <LeftBottom />
    </div>
    <div class="center">
      <CenterMap title="设备分布图" />
      <CenterBottom />
    </div>
    <div class="right">
      <RightTop />
      <RightCenter />
      <RightBottom />
    </div>
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
    display: flex;
    flex-direction: column;
  }
  .left {
    flex: 1;
  }
  .center {
    flex: 1.5;
    margin-left: 50px;
    margin-right: 50px;
  }
  .right {
    flex: 1;
  }
}
</style>
