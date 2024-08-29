<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./centerMap";
import BorderBox13 from "@/components/DataV/border-box-13";
import { ElMessage } from "element-plus";
import type { MapdataType } from "./centerMap";

const option = ref({});
const code = ref("china"); //china 代表中国 其他地市是行政编码

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图"
  }
);
</script>

<template>
  <div class="center-map">
    <div class="map-title">
      <div class="title-left" />
      <span class="title-text">{{ title }}</span>
      <div class="title-right" />
    </div>
    <div class="map-wrap">
      <BorderBox13>
        <div v-if="code !== 'china'" class="china">中国</div>
        <div ref="centerMapRef" class="chart" :option="option" />
      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center-map {
  margin-bottom: 30px;

  .map-title {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
    .title-text {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .title-left,
    .title-right {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .title-left {
      background: url("@/assets/big-screen/left.png") no-repeat;
    }

    .title-right {
      background: url("@/assets/big-screen/right.png") no-repeat;
    }
  }

  .map-wrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .china {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow:
        0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>
