<script setup lang="ts">
import { computed, PropType } from "vue";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import Setting from "@iconify-icons/ep/setting";
import { FormItemProps } from "../utils/types";
defineOptions({
  name: "ReCard"
});

const props = defineProps({
  config: {
    type: Object as PropType<FormItemProps>
  }
});

const emit = defineEmits(["manage-config", "delete-config"]);
const handleClickManage = (config: FormItemProps) => {
  emit("manage-config", config);
};
const handleClickDelete = (config: FormItemProps) => {
  emit("delete-config", config);
};
</script>

<template>
  <div class="list-card-item">
    <div class="list-card-item_detail bg-bg_color">
      <el-row justify="space-between">
        <div class="list-card-item_detail--logo">
          <IconifyIconOffline :icon="Setting" />
        </div>
        <div class="list-card-item_detail--operation">
          <el-tag
            v-if="config.type == 1"
            color="#00a870"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            系统内置
          </el-tag>
          <el-tag
            v-else
            color="#606266"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            非内置
          </el-tag>
          <el-dropdown trigger="click">
            <IconifyIconOffline :icon="More2Fill" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleClickManage(config)">
                  编辑
                </el-dropdown-item>
                <el-dropdown-item
                  :disabled="config.type == 1"
                  @click="handleClickDelete(config)"
                >
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ config.configName }}
      </p>
      <p class="list-card-item_detail--desc text-text_color_regular">
        {{ config.remark }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-card-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 3px;

  &_detail {
    flex: 1;
    min-height: 140px;
    padding: 24px 32px;

    &--logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      font-size: 26px;
      color: #0052d9;
      background: #e0ebff;
      border-radius: 50%;

      &__disabled {
        color: #a1c4ff;
      }
    }

    &--label {
      color: #409eff;
      background: #e0ebff;
      &__disabled {
        color: #a1c4ff;
      }
    }

    &--operation {
      display: flex;
      height: 100%;

      &--tag {
        border: 0;
      }
    }

    &--name {
      margin: 24px 0 8px;
      font-size: 16px;
      font-weight: 400;
    }

    &--desc {
      display: -webkit-box;
      height: 40px;
      margin-bottom: 10px;
      overflow: hidden;
      font-size: 12px;
      line-height: 20px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__disabled {
    .list-card-item_detail--name,
    .list-card-item_detail--desc {
      color: var(--el-text-color-disabled);
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }
}
</style>
