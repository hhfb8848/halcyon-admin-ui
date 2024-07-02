<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { statusOptions } from "../utils/enums";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    username: "",
    password: "",
    nickname: "",
    email: "",
    phone: "",
    gender: 0,
    avatar: "",
    birthday: new Date(),
    status: 0,
    intro: ""
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
    <el-form-item label="用户名：" prop="username">
      <el-input
        v-model="newFormInline.username"
        clearable
        placeholder="请输入用户名称"
      />
    </el-form-item>

    <el-form-item label="邮箱：" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入用户编码"
        :disabled="newFormInline.id !== null"
      />
    </el-form-item>
    <el-form-item label="用户状态：" prop="status">
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

    <el-form-item label="简介：">
      <el-input
        v-model="newFormInline.intro"
        placeholder="请输入简介"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
