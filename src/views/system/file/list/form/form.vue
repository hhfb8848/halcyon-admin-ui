<script setup lang="ts">
import { ref } from "vue";
import { useUpload } from "@/utils/upload/upload";
import { FormProps } from "../utils/types";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import { message as toast } from "@/utils/message";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    fileList: []
  })
});
const emit = defineEmits(["uploadResult"]);
const { uploadUrl, uploadFileByBack } = useUpload();
const uploadRef = ref();
const newFormInline = ref(props.formInline);
const uploadLoading = ref(false);
const uploadLoadForm = ref({ path: "" });
function handleFileChange(file: any) {
  uploadLoadForm.value.path = file.name;
}
function submitFormError(error: any, uploadFile: any, uploadFiles: any) {
  toast("上传失败,请您重新上传！", { type: "error" });
  uploadLoading.value = false;
  emit("uploadResult", false);
}
function submitFormSuccess() {
  toast("上传成功！", { type: "success" });
  uploadLoading.value = false;
  emit("uploadResult", true);
}
function handleExceed() {
  toast("只允许上传一个文件", { type: "error" });
}
function getRef() {
  return uploadRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <div style="margin: 10px; height: 200px">
    <el-upload
      ref="uploadRef"
      v-model:file-list="newFormInline.fileList"
      :data="uploadLoadForm"
      drag
      :action="uploadUrl"
      :auto-upload="false"
      :limit="1"
      :http-request="uploadFileByBack"
      :disabled="uploadLoading"
      :on-change="handleFileChange"
      :on-error="submitFormError"
      :on-exceed="handleExceed"
      :before-upload="() => (uploadLoading = true)"
      :on-success="submitFormSuccess"
    >
      <div class="el-upload__text">
        <IconifyIconOffline :icon="UploadIcon" width="26" class="m-auto mb-2" />
        可点击或拖拽上传
      </div>
    </el-upload>
  </div>
</template>
