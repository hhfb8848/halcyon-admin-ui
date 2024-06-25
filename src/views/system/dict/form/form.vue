<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { statusOptions } from "../utils/enums";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    code: "",
    status: 0,
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
    label-width="100px"
  >
    <el-form-item label="角色名称：" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入字典名称"
      />
    </el-form-item>

    <el-form-item label="字典编码：" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入字典编码"
      />
    </el-form-item>
    <el-form-item label="字典编码：" prop="code">
      <el-radio-group v-model="newFormInline.status">
        <el-radio
          v-for="item in statusOptions"
          :key="item.value"
          :value="item.value"
          border
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注：">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
