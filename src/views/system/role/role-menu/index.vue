<script setup lang="ts">
import { h, onMounted, ref, useSlots, watch } from "vue";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Refresh from "@iconify-icons/ep/refresh";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { PureTableBar } from "@/components/RePureTableBar";
import { deviceDetection } from "@pureadmin/utils";
import { statusOptions } from "../utils/enums";
import { computed } from "vue";
import { clone } from "@pureadmin/utils";
import ElTreeLine from "@/components/ReTreeLine";
import { extractPathList, deleteChildren } from "@/utils/tree";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
defineOptions({
  name: "SystemRoleMenu"
});
const isLinkage = ref(false);
const isExpandAll = ref(false);
const isSelectAll = ref(false);
const props = defineProps({
  // 控制值
  roleMenuDrawer: {
    type: Boolean,
    default: false
  },
  // 字典对象
  roleObj: {
    type: Object,
    default: null
  }
});

const ruleFormRef = ref();

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
const menusTree = clone(usePermissionStoreHook().wholeMenus, true);
const menusData = computed(() => {
  return deleteChildren(menusTree);
});
const expandedKeys = extractPathList(menusData.value);
const dataProps = {
  value: "uniqueId",
  children: "children"
};

const emit = defineEmits(["updateRoleMenuDrawer"]);
const localRoleMenuDrawer = ref(props.roleMenuDrawer);
watch(
  () => props.roleMenuDrawer,
  newVal => {
    console.log("props.roleMenuDrawer", newVal);
    localRoleMenuDrawer.value = newVal;
  }
);
// 监听本地值的变化
watch(localRoleMenuDrawer, newVal => {
  emit("updateRoleMenuDrawer", newVal);
});
function handleDrawerOpen(roleObj) {}
function handleDrawerClose() {}
function save() {}
</script>

<template>
  <el-drawer
    v-model="localRoleMenuDrawer"
    :title="props.roleObj.roleName"
    direction="rtl"
    size="40%"
    @open="handleDrawerOpen(props.roleObj)"
    @closed="handleDrawerClose"
    class="role-menu-drawer"
  >
    <div>
      <div class="header">
        <el-input
          placeholder="请输入菜单名称（为角色分配菜单后自动分配首页）"
          style="width: 70%"
        />
      </div>
      <div class="tree">
        <el-tree
          :data="menusData"
          :props="dataProps"
          show-checkbox
          default-expand-all
          node-key="uniqueId"
          :indent="30"
          ><template v-slot:default="{ node }">
            <el-tree-line :node="node" :showLabelLine="true">
              <template v-slot:node-label>
                <span class="text-sm">
                  {{ node.data.meta.title }}
                </span>
              </template>
              <template v-slot:after-node-label>
                <span class="text-sm">
                  {{ node.data.meta.title }}
                </span>
              </template>
            </el-tree-line>
          </template>
        </el-tree>
      </div>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button :icon="useRenderIcon(AddFill)" type="primary" @click="save()"
          >保存</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss">
.role-menu-drawer {
  .el-drawer__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
