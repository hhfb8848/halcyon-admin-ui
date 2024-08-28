<script setup lang="ts">
import autofit from "autofit.js";
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Header from "./component/Header.vue";
defineOptions({
  name: "BigScreen"
});
autofit.init();
onUnmounted(() => {
  autofit.off();
});
const router = useRouter();
</script>

<template>
  <div class="big-screen-wrapper">
    <Header />
  </div>
</template>

<style lang="scss" scoped>
.big-screen-wrapper {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/big-screen/pageBg.png");
  background-size: cover;
  background-position: center center;
  padding: 20px;
}
</style>
