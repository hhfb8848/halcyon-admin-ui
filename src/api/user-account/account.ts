import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

const path = "/account";
/** 获取用户角色 */

export const getAccountRole = () => {
  return http.request<any>("get", baseUrlApi(`${path}/getRole`));
};
// 修改个人信息
export const updateInfo = (data?: object) => {
  return http.request<any>("put", baseUrlApi(`${path}/updateInfo`), {
    data
  });
};
