import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/login"), { data });
};
/** 注销 */
export const logOut = (data?: object) => {
  return http.request<any>("get", baseUrlApi("user/logout"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<any>("post", "user/refreshToken", { data });
};

/** 获取用户列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("user/list"), { params });
};
/** 用户·昵称角色修改 */
export const updateInfoAndRole = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/updateInfoAndRole"), {
    data
  });
};
/** 修改用户禁用状态 */
export const updateDisable = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/updateDisable"), {
    data
  });
};
/** 获取在线用户列表 */
export const getOnlineList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("user/listOnline"), { params });
};
/** 踢用户下线 */
export const kickOut = (data?: object) => {
  return http.request<any>("delete", baseUrlApi(`user/online/${data}`));
};
/** 用户·昵称头像修改 */
export const updateUserInfo = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/updateUserInfo"), {
    data
  });
};
/** 密码修改 */
export const updateUserPassword = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/password"), {
    data
  });
};
/** 获取在分布地区 */
export const getUserArea = () => {
  return http.request<any>("get", baseUrlApi("user/listArea"));
};
