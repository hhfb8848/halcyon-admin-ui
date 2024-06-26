import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  dictName: [{ required: true, message: "字典名称为必填项", trigger: "blur" }],
  dictCode: [{ required: true, message: "字段编码为必填项", trigger: "blur" }],
  status: [{ required: true, message: "状态为必填项", trigger: "blur" }]
});
