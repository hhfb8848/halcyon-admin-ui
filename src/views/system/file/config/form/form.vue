<script setup lang="ts">
import { ref, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { formRules } from "../utils/rule";
import { FormProps } from "../utils/types";
import { FileStorageOptions } from "../../enums";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null,
    name: "",
    storage: null,
    remark: "",
    master: 0,
    config: {
      basePath: "",
      host: "",
      port: null,
      username: "",
      password: "",
      mode: "",
      endpoint: "",
      bucket: "",
      accessKey: "",
      accessSecret: "",
      domain: ""
    }
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
    <el-form-item label="配置名称：" prop="name">
      <el-input v-model="newFormInline.name" placeholder="请输入配置名称" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        type="textarea"
        placeholder="请输入内容"
      />
    </el-form-item>
    <el-form-item label="存储器类型：" prop="storage">
      <el-select
        v-model="newFormInline.storage"
        clearable
        :disabled="newFormInline.id !== null"
      >
        <el-option
          v-for="(item, index) in FileStorageOptions"
          :key="index"
          :value="item.value"
          :label="item.label"
        >
          {{ item.label }}
        </el-option>
      </el-select>
    </el-form-item>
    <!--DB / Local / FTP / SFTP /S3 -->
    <el-form-item
      v-if="newFormInline.storage >= 10 && newFormInline.storage <= 12"
      label="基础路径："
      prop="config.basePath"
    >
      <el-input
        v-model="newFormInline.config.basePath"
        placeholder="请输入基础路径"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage >= 11 && newFormInline.storage <= 12"
      label="主机地址："
      prop="config.host"
    >
      <el-input
        v-model="newFormInline.config.host"
        placeholder="请输入主机地址"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage >= 11 && newFormInline.storage <= 12"
      label="主机端口："
      prop="config.port"
    >
      <el-input-number
        v-model="newFormInline.config.port"
        :min="0"
        placeholder="请输入主机端口"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage >= 11 && newFormInline.storage <= 12"
      label="用户名："
      prop="config.username"
    >
      <el-input
        v-model="newFormInline.config.username"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage >= 11 && newFormInline.storage <= 12"
      label="密码："
      prop="config.password"
    >
      <el-input
        v-model="newFormInline.config.password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage === 11"
      label="连接模式："
      prop="config.mode"
    >
      <el-radio-group v-model="newFormInline.config.mode">
        <el-radio key="Active" label="Active">主动模式</el-radio>
        <el-radio key="Passive" label="Passive">被动模式</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- S3 -->
    <el-form-item
      v-if="newFormInline.storage === 20"
      label="节点地址："
      prop="config.endpoint"
    >
      <el-input
        v-model="newFormInline.config.endpoint"
        placeholder="请输入节点地址"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage === 20"
      label="存储 bucket："
      prop="config.bucket"
    >
      <el-input
        v-model="newFormInline.config.bucket"
        placeholder="请输入 bucket"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage === 20"
      label="accessKey："
      prop="config.accessKey"
    >
      <el-input
        v-model="newFormInline.config.accessKey"
        placeholder="请输入 accessKey"
      />
    </el-form-item>
    <el-form-item
      v-if="newFormInline.storage === 20"
      label="accessSecret："
      prop="config.accessSecret"
    >
      <el-input
        v-model="newFormInline.config.accessSecret"
        placeholder="请输入 accessSecret"
      />
    </el-form-item>
    <!-- 通用 -->
    <el-form-item v-if="newFormInline.storage === 20" label="自定义域名">
      <!-- 无需参数校验，所以去掉 prop -->
      <el-input
        v-model="newFormInline.config.domain"
        placeholder="请输入自定义域名"
      />
    </el-form-item>
    <el-form-item
      v-else-if="newFormInline.storage"
      label="自定义域名："
      prop="config.domain"
    >
      <el-input
        v-model="newFormInline.config.domain"
        placeholder="请输入自定义域名"
      />
    </el-form-item>
  </el-form>
</template>
