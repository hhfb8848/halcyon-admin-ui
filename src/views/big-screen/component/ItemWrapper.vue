<script setup lang="ts">
import BorderBox13 from "@/components/DataV/border-box-13";
const props = withDefaults(
  defineProps<{
    // 标题
    title: number | string;
  }>(),
  {
    title: ""
  }
);
</script>

<template>
  <BorderBox13>
    <div v-if="title !== ''" class="big-screen-item-title">
      <div class="left-title" />
      <span class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </span>
      <div class="right-title" />
    </div>
    <div
      :class="title !== '' ? 'item-title-content' : 'item-title-content-def'"
    >
      <slot /></div
  ></BorderBox13>
</template>

<style scoped lang="scss">
$item-title-height: 38px;
$item_title_content-height: calc(100% - 38px);

.big-screen-item-title {
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  color: #31abe3;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .left-title,
  .right-title {
    width: 58px;
    height: 14px;
    background-image: url("@/assets/big-screen/item-title/item-left.png");
  }

  .right-title {
    transform: rotate(180deg);
  }
  .title-inner {
    font-weight: 900;
    letter-spacing: 2px;
    font-size: 1.2rem;
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

:deep(.dv-border-box-content) {
  box-sizing: border-box;
  padding: 6px 16px 0px;
}

.item-title-content {
  height: $item_title_content-height;
}

.item-title-content-def {
  width: 100%;
  height: 100%;
}
</style>
