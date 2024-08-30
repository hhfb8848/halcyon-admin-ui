<script setup lang="ts">
import ItemWrapper from "../ItemWrapper.vue";
import { useDark, useECharts } from "@pureadmin/utils";
import { ref, computed, PropType } from "vue";
const props = defineProps({
  data: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  color: {
    type: String,
    default: "#41b6ff"
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});

var list = [
  {
    name: "在线",
    value: 3
  },
  {
    name: "异常",
    value: 2
  },
  {
    name: "锁定",
    value: 3
  },
  {
    name: "离线",
    value: 4
  }
];
var sum = 0;
list.forEach((item, index) => {
  sum += item.value;
});
var seri = [];
function coup(i) {
  console.log(i);
  if (i === 0) {
    return 0;
  } else {
    var sum2 = 0;
    list.forEach((item, index) => {
      if (index >= i) return;
      sum2 += item.value;
    });

    console.log(i, sum2, sum, (sum2 / sum) * 360);
    return (sum2 / sum) * 360;
  }
}
list.forEach((item, index) => {
  seri.push({
    name: item.name,
    type: "pie",
    radius: [(index + 1) * "6" + "%", (index + 1) * "6" + 2.5 + "%"],
    label: false,
    startAngle: coup(index),
    clockWise: false, //顺时加载
    hoverAnimation: true,
    hoverOffset: 3,
    itemStyle: {
      normal: {
        label: {
          show: true,
          color: "#65D5FF",
          fontSize: 18
        },
        labelLine: {
          //smooth: 0.2,
          length: 80,
          length2: 80
        }
      }
    },
    data: [
      {
        value: item.value,
        name: item.name,
        itemStyle: {
          color: "#0DDCFB",
          shadowColor: "rgba(0, 224, 255, 0.4)",
          shadowBlur: 24
        },
        label: {
          show: true,
          color: "#65D5FF",
          fontSize: 16,
          formatter: ["{b| {b} }", "{c| {c}}人", "{d| {d}% }"].join(" "),
          rich: {
            d: {},
            b: {}
          }
        }
      },
      {
        value: sum,
        hoverAnimation: false, //鼠标移入变大
        itemStyle: {
          normal: {
            color: "rgba(0, 151, 251, 0.19)",
            shadowColor: "rgba(0, 224, 255, 0.4)",
            shadowBlur: 24,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: "rgba(0, 151, 251, 0.09)"
          }
        },
        labelLine: {
          show: false
        },
        label: {
          show: false
        }
      }
    ]
  });
});
setOptions({
  container: ".user-pie",
  textStyle: {
    fontSize: 16,
    color: "#40E7F4 "
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} : {c} ({d}%)"
  },

  series: seri
});
</script>

<template>
  <ItemWrapper title="用户总览" class="user-pie">
    <div ref="chartRef" style="width: 100%; height: 90%"></div>
  </ItemWrapper>
</template>

<style lang="scss" scoped></style>
