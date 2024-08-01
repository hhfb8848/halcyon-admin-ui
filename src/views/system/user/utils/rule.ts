import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 用户名正则（用户名格式必须为4至16位的字母、数字、下划线组成） */
const REGEXP_USERNAME = /^[a-zA-Z0-9_]{4,16}$/;

/** 密码正则（密码格式必须在6至20个字符之间） */
export const REGEXP_PWD = /^[^\u4e00-\u9fa5]{6,20}$/;

/** 邮箱正则 */
const REGEXP_EMAIL =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

/** 手机号正则 */
const REGEXP_PHONE = /^\+?\d{1,4}?\d{6,11}$/;

/** 用户校验 */
export const formRules = reactive(<FormRules>{
  username: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else if (!REGEXP_USERNAME.test(value)) {
          callback(
            new Error("用户名格式必须为4至16位的字母、数字、下划线组成")
          );
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error("密码格式必须在6至20个字符之间且不能包含中文"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  nickname: [{ required: true, message: "用户昵称为必填项", trigger: "blur" }],
  status: [{ required: true, message: "状态为必填项", trigger: "blur" }],
  gender: [{ required: true, message: "性别为必填项", trigger: "blur" }],
  email: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入邮箱"));
        } else if (!REGEXP_EMAIL.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (!REGEXP_PHONE.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});
