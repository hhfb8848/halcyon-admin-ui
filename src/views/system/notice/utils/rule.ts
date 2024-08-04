import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 用户校验 */
export const formRules = reactive(<FormRules>{
  title: [{ required: true, message: "标题为必填项", trigger: "blur" }],
  status: [{ required: true, message: "状态为必填项", trigger: "blur" }],
  gender: [{ required: true, message: "性别为必填项", trigger: "blur" }],
  type: [{ required: true, message: "类型为必填项", trigger: "blur" }]
});
