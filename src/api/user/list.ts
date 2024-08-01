import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 获取用户列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysUser/list"), { params });
};
/** 新增用户 */
export const addUser = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysUser"), { data });
};
/** 修改基本用户 */
export const updateUser = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysUser"), { data });
};

/** 删除用户 */
export const deleteUser = (data: object) => {
  return http.request<any>("delete", baseUrlApi(`/sysUser`), { data });
};
/** 重置密码 */
export const resetPassword = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysUser/resetPassword"), {
    data
  });
};
