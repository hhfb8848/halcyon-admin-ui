<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null,
    configName: "",
    configKey: "",
    configValue: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="120px"
  >
    <el-form-item label="配置名称：" prop="configName">
      <el-input
        v-model="newFormInline.configName"
        placeholder="请输入配置名称"
      />
    </el-form-item>
    <el-form-item label="参数键名：" prop="configKey">
      <el-input
        v-model="newFormInline.configKey"
        placeholder="参数键名"
        :disabled="newFormInline.id !== null"
      />
    </el-form-item>
    <el-form-item label="参数键值：" prop="configValue">
      <el-input
        v-model="newFormInline.configValue"
        type="textarea"
        autosize
        placeholder="请输入参数键值"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        type="textarea"
        placeholder="请输入内容"
      />
    </el-form-item>
  </el-form>
</template>
