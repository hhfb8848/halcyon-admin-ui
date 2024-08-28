<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import { type PropType, ref, computed, watch, nextTick } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  curData: {
    type: Array as PropType<Array<Object>>,
    default: () => []
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const lineAnalyseRef = ref();
const { setOptions } = useECharts(lineAnalyseRef, {
  theme
});

watch(
  () => props,
  async () => {
    await nextTick(); // 确保DOM更新完成后再执行
    const names = props.curData.map((item: any) => item.name);
    const lineData = props.curData.map((item: any) => {
      item.type = "line";
      item.smooth = true;
      return item;
    });
    setOptions({
      container: ".line-analyse-card",
      animationDuration: 2000,
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: names
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
      yAxis: {
        type: "value"
      },
      series: props.curData.map((item: any) => ({
        name: item.name,
        type: "line",
        smooth: true,
        data: item.data,
        color: item.itemStyle.color,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: `${item.itemStyle.color}10` }, // 起始颜色更淡
            { offset: 1, color: `${item.itemStyle.color}03` } // 渐变到几乎透明
          ])
        },
        emphasis: {
          focus: "series"
        }
      }))
    });
  },
  {
    deep: true,
    immediate: true
  }
);

// 将十六进制颜色转为RGB
function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
</script>

<template>
  <div ref="lineAnalyseRef" style="width: 100%; height: 565px" />
</template>
