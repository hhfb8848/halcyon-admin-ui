import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 配置校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "配置名不能为空", trigger: "blur" }],
  storage: [{ required: true, message: "存储器不能为空", trigger: "change" }],
  config: {
    basePath: [
      { required: true, message: "基础路径不能为空", trigger: "blur" }
    ],
    host: [{ required: true, message: "主机地址不能为空", trigger: "blur" }],
    port: [{ required: true, message: "主机端口不能为空", trigger: "blur" }],
    username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    mode: [{ required: true, message: "连接模式不能为空", trigger: "change" }],
    endpoint: [
      { required: true, message: "节点地址不能为空", trigger: "blur" }
    ],
    bucket: [
      { required: true, message: "存储 bucket 不能为空", trigger: "blur" }
    ],
    accessKey: [
      { required: true, message: "accessKey 不能为空", trigger: "blur" }
    ],
    accessSecret: [
      { required: true, message: "accessSecret 不能为空", trigger: "blur" }
    ],
    domain: [{ required: true, message: "自定义域名不能为空", trigger: "blur" }]
  }
});
