<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { statusOptions, genderOptions } from "../utils/enums";
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
        autocomplete="off"
        clearable
        placeholder="请输入用户名（登录名）"
      />
    </el-form-item>

    <el-form-item label="密码：" prop="password">
      <el-input
        v-model="newFormInline.password"
        clearable
        show-password
        placeholder="请输入密码"
        type="password"
      />
    </el-form-item>

    <el-form-item label="昵 称：" prop="nickname">
      <el-input
        v-model="newFormInline.nickname"
        clearable
        placeholder="请输入用户昵称"
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
    <el-form-item label="性别：" prop="gender">
      <el-radio-group v-model="newFormInline.gender">
        <el-radio
          v-for="item in genderOptions"
          :key="item.value"
          :value="item.value"
          border
        >
          <span class="flex justify-center items-center">
            <IconifyIconOnline :icon="item.icon" class="mr-1" />
            {{ item.label }}
          </span>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱：" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入用户邮箱"
      />
    </el-form-item>
    <el-form-item label="手机号：" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        clearable
        placeholder="请输入用户手机号"
      />
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
