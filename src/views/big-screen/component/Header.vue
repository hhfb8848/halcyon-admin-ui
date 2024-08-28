<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import dayjs from "dayjs";
import { getWeather, WeatherData } from "@/utils/http/weatherHttp";

// 定义一个ref来存储天气数据
const weather = ref<WeatherData | null>(null);
const error = ref<string | null>(null);
const dateData = reactive({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing: null
});

const weekday = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六"
];
const timeFn = () => {
  dateData.timing = setInterval(() => {
    const now = dayjs();
    dateData.dateYear = now.format("YYYY-MM-DD");
    dateData.dateDay = now.format("HH:mm:ss");
    dateData.dateWeek = weekday[now.day()];
  }, 1000);
};
timeFn();

// 获取当前位置并调用天气API的方法
const fetchLocationAndWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          const location = `${longitude},${latitude}`; // 经纬度格式
          weather.value = await getWeather(location);
        } catch (err) {
          error.value = "无法获取天气数据，请稍后重试。";
          console.error("Failed to fetch weather data:", err);
        }
      },
      err => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            error.value = "用户拒绝了获取地理位置的请求。";
            break;
          case err.POSITION_UNAVAILABLE:
            error.value = "位置信息不可用。";
            break;
          case err.TIMEOUT:
            error.value = "获取位置信息超时。";
            break;
          default:
            error.value = "发生未知错误。";
            break;
        }
        console.error("Error getting location:", err);
      }
    );
  } else {
    error.value = "该浏览器不支持地理定位功能。";
  }
};
onMounted(() => {
  fetchLocationAndWeather();
});
</script>

<template>
  <div class="title_wrap">
    <div class="light" />
    <div class="title">
      <span class="title-text">互联网设备可视化平台</span>
    </div>
    <div class="top-left">
      <IconifyIconOnline icon="ph:key-return-fill" width="30px" height="40px" />
      <div class="date">
        <span>{{ dateData.dateYear }}</span>
        <span>{{ dateData.dateWeek }}</span>
        <span>{{ dateData.dateDay }}</span>
      </div>
    </div>
    <div v-if="weather" class="top-right">
      <div class="weather">
        <i :class="`qi-${weather?.icon}`" />
        <span style="margin-left: 10px"> {{ weather?.text }}</span>
        <span>{{ weather?.temp }} °C </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  height: 70px;
  background-image: url("@/assets/big-screen/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;
  .title {
    position: relative;
    text-align: center;
    background-size: cover;
    color: transparent;
    height: 60px;
    line-height: 46px;

    .title-text {
      font-size: 34px;
      font-weight: 900;
      letter-spacing: 6px;
      width: 100%;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .light {
    position: absolute;
    bottom: -26px;
    background-image: url("@/assets/big-screen/light.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }
  .top-left,
  .top-right {
    position: absolute;
    top: 25px;
    font-size: 20px;
    display: flex;
    align-items: center;
    color: #00aaff;
    .date {
      display: flex;
      align-items: center;
    }
    span {
      margin: 0 4px;
    }
  }
  .top-left {
    left: 0;
  }
  .top-right {
    right: 0;
  }
}
</style>
