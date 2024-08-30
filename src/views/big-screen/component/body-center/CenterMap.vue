<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { GETNOBASE } from "@/api/utils";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./centerMap";
import BorderBox13 from "@/components/DataV/border-box-13";
import { ElMessage } from "element-plus";
import type { MapdataType } from "./centerMap";
import { getMapData } from "@/api/big-screen";
const option = ref({});
//china 代表中国 其他地市是行政编码
const code = ref("china");

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图"
  }
);

const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] =
      element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value)
      });
    }
  });
  await nextTick();

  option.value = optionHandle(regionCode, [], mapData);
};

const getData = async (regionCode: string) => {
  const { code, data } = await getMapData({ regionCode: regionCode });
  console.log("data", data);
  dataSetHandle(regionCode, []);
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async resolve => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then(
        data => data
      );
      code.value = regionCode;
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {}
      });
      resolve(mapjson);
    }
  });
};
getData(code.value);

const mapClick = (params: any) => {
  console.log(params);
  let xzqData = regionCodes[params.name];
  if (xzqData) {
    getData(xzqData.adcode);
  } else {
    ElMessage.warning("该地区暂未开通");
  }
};
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
        <div v-if="code !== 'china'" class="china" @click="getData('china')">
          中国
        </div>
        <v-chart
          v-if="JSON.stringify(option) != '{}'"
          ref="centerMapRef"
          class="chart"
          :option="option"
          @click="mapClick"
        />
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
