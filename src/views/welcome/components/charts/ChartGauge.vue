<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

const { isDark } = useDark();
const props = defineProps({
  offlineDeviceCount: {
    type: Number,
    default: 0
  }
});
const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});

setOptions({
  container: ".gauge-card",
  animationDuration: 2000,
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      center: ["50%", "85%"],
      radius: "90%",
      min: 0,
      max: 100,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, "#7CFFB2"], // 低故障率
            [0.5, "#58D9F9"], // 中等故障率
            [0.75, "#FDDD60"], // 高故障率
            [1, "#FF6E76"] // 极高故障率
          ]
        }
      },
      pointer: {
        icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
        length: "12%",
        width: 20,
        offsetCenter: [0, "-60%"],
        itemStyle: {
          color: "auto"
        }
      },
      axisTick: {
        length: 10, // 缩小刻度长度
        lineStyle: {
          color: "auto",
          width: 2
        }
      },
      splitLine: {
        length: 15, // 缩小分割线长度
        lineStyle: {
          color: "auto",
          width: 3 // 缩小分割线宽度
        }
      },
      axisLabel: {
        color: "#464646",
        fontSize: 14, // 缩小字体
        distance: -50,
        rotate: "tangential",
        formatter: function (value) {
          if (value === 87.5) {
            return "差劲";
          } else if (value === 62.5) {
            return "一般";
          } else if (value === 37.5) {
            return "良好";
          } else if (value === 12.5) {
            return "健康";
          }
          return "";
        }
      },
      title: {
        offsetCenter: [0, "-10%"],
        fontSize: 16 // 缩小标题字体
      },
      detail: {
        fontSize: 24, // 缩小详细信息字体
        offsetCenter: [0, "5%"], // 下移详细信息
        valueAnimation: true,
        color: "inherit"
      },
      data: [
        {
          value: props.offlineDeviceCount, // 设置具体的数值
          name: ""
        }
      ]
    }
  ]
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 180px" />
</template>
