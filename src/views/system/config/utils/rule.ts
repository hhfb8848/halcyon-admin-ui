import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 配置校验 */
export const formRules = reactive(<FormRules>{
  configName: [{ required: true, message: "配置名不能为空", trigger: "blur" }],
  configKey: [{ required: true, message: "参数键名不能为空", trigger: "blur" }],
  configValue: [
    { required: true, message: "参数键值不能为空", trigger: "blur" }
  ]
});
