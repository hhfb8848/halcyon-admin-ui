<script setup lang="ts">
import { ref, markRaw } from "vue";
import ReCol from "@/components/ReCol";
import { useDark, randomGradient } from "./utils";
import { ReNormalCountTo } from "@/components/ReCountTo";
import { useRenderFlicker } from "@/components/ReFlicker";
import { ChartLineAnalyse, ChartLine, ChartGauge } from "./components/charts";
import { useWelcome } from "./hook";

defineOptions({
  name: "Welcome"
});

const { isDark } = useDark();
const {
  chartData,
  projectList,
  curProject,
  curProjectData,
  alarmData,
  onProjectChange
} = useWelcome();
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <!-- 项目总数，传感数据点，触发器数，接入设备数/设备离线数 -->
      <re-col
        v-for="(item, index) in chartData"
        :key="index"
        v-motion
        class="mb-[18px]"
        :value="6"
        :md="12"
        :sm="12"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 80 * (index + 1)
          }
        }"
      >
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              {{ item.name }}
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{
                backgroundColor: isDark ? 'transparent' : item.bgColor
              }"
            >
              <IconifyIconOffline
                :icon="item.icon"
                :color="item.color"
                width="18"
              />
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div class="w-1/2">
              <ReNormalCountTo
                :duration="item.duration"
                :fontSize="'1.6em'"
                :startVal="0"
                :endVal="item.value"
              />
              <span style="margin-left: 5px">{{ item.unit }}</span>
              <p class="font-medium text-green-500">{{ item.percent }}</p>
            </div>
            <ChartLine
              v-if="item.data.length > 1"
              class="!w-1/2"
              :color="item.color"
              :data="item.data"
            />
          </div>
        </el-card>
      </re-col>

      <!-- 分析概览 -->
      <re-col
        v-motion
        class="mb-[18px]"
        :value="18"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card class="line-analyse-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">分析概览</span>
            <el-select
              v-model="curProject"
              style="width: 240px"
              placement="right"
              @change="onProjectChange"
            >
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="flex justify-between items-start mt-3">
            <ChartLineAnalyse :curData="curProjectData" />
          </div>
        </el-card>
      </re-col>

      <re-col :value="6" :xs="24">
        <re-col
          v-motion
          class="mb-[18px]"
          style="padding: 0"
          :value="24"
          :xs="24"
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 480
            }
          }"
        >
          <el-card class="gauge-card" shadow="never">
            <div class="flex justify-between">
              <span class="text-md font-medium">当前设备离线数</span>
            </div>
            <div>
              <ChartGauge :offlineDeviceCount="100" />
            </div>
          </el-card>
        </re-col>
        <re-col
          v-motion
          class="mb-[18px]"
          style="padding: 0"
          :value="24"
          :xs="24"
          :initial="{
            opacity: 0,
            y: 100
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 640
            }
          }"
        >
          <el-card shadow="never">
            <div class="flex justify-between">
              <span class="text-md font-medium">今日报警</span>
            </div>
            <el-scrollbar max-height="310" class="mt-3">
              <el-timeline>
                <el-timeline-item
                  v-for="(item, index) in alarmData"
                  :key="index"
                  center
                  placement="top"
                  :icon="
                    markRaw(
                      useRenderFlicker({
                        background: randomGradient({
                          randomizeHue: true
                        })
                      })
                    )
                  "
                  :timestamp="item.alarmTime"
                >
                  <p class="text-text_color_regular text-sm">
                    {{ item.name }}
                  </p>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-card>
        </re-col>
      </re-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
