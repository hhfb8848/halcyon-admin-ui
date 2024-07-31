<script setup lang="ts">
import { computed, PropType } from "vue";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import { FormItemProps } from "../utils/types";
defineOptions({
  name: "ReCard"
});

const props = defineProps({
  fileConfig: {
    type: Object as PropType<FormItemProps>
  }
});

const emit = defineEmits([
  "manage-fileConfig",
  "delete-fileConfig",
  "set-master"
]);
const handleClickMaster = (fileConfig: FormItemProps) => {
  emit("set-master", fileConfig);
};
const handleClickManage = (fileConfig: FormItemProps) => {
  emit("manage-fileConfig", fileConfig);
};
const handleClickDelete = (fileConfig: FormItemProps) => {
  emit("delete-fileConfig", fileConfig);
};

const cardClass = computed(() => [
  "list-card-item",
  { "list-card-item__disabled": props.fileConfig.master == 0 }
]);

const cardLogoClass = computed(() => [
  "list-card-item_detail--logo",
  { "list-card-item_detail--logo__disabled": props.fileConfig.master == 0 }
]);
const labelClass = computed(() => [
  "list-card-item_detail--label",
  { "list-card-item_detail--label__disabled": props.fileConfig.master == 0 }
]);
</script>

<template>
  <div :class="cardClass">
    <div class="list-card-item_detail bg-bg_color">
      <el-row justify="space-between">
        <div :class="cardLogoClass">
          <IconifyIconOnline v-if="fileConfig.storage == 1" icon="token:dbr" />
          <IconifyIconOnline
            v-if="fileConfig.storage == 10"
            icon="clarity:hard-disk-solid-badged"
          />
          <IconifyIconOnline
            v-if="fileConfig.storage == 11"
            icon="arcticons:ftp-server"
          />
          <IconifyIconOnline
            v-if="fileConfig.storage == 12"
            icon="arcticons:totalcmd-ftp"
          />
          <IconifyIconOnline
            v-if="fileConfig.storage == 20"
            icon="ant-design:cloud-server-outlined"
          />
        </div>
        <div class="list-card-item_detail--operation">
          <el-tag
            :color="fileConfig.master == 1 ? '#00a870' : '#eee'"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            {{ fileConfig.master == 1 ? "主配置" : "已停用" }}
          </el-tag>
          <el-dropdown trigger="click">
            <IconifyIconOffline :icon="More2Fill" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :disabled="fileConfig.master == 1"
                  @click="handleClickMaster(fileConfig)"
                >
                  设为主配置
                </el-dropdown-item>
                <el-dropdown-item @click="handleClickManage(fileConfig)">
                  管理
                </el-dropdown-item>
                <el-dropdown-item
                  :disabled="fileConfig.master == 1"
                  @click="handleClickDelete(fileConfig)"
                >
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ fileConfig.name }}
      </p>
      <p class="list-card-item_detail--desc text-text_color_regular">
        {{ fileConfig.remark }}
      </p>

      <div style="display: flex; justify-content: right">
        <el-tag effect="light" round :class="labelClass">
          <span v-if="fileConfig.storage == 1"> 数据库 </span>
          <span v-if="fileConfig.storage == 10"> 本地磁盘 </span>
          <span v-if="fileConfig.storage == 11"> FTP服务器 </span>
          <span v-if="fileConfig.storage == 12"> SFTP服务器 </span>
          <span v-if="fileConfig.storage == 20"> S3对象存储 </span>
        </el-tag>
      </div>
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
