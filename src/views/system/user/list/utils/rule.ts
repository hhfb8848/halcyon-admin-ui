import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 用户校验 */
export const formRules = reactive(<FormRules>{
  userName: [{ required: true, message: "用户名称为必填项", trigger: "blur" }],
  userCode: [{ required: true, message: "用户编码为必填项", trigger: "blur" }],
  status: [{ required: true, message: "状态为必填项", trigger: "blur" }]
});
