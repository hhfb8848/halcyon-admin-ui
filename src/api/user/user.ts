import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 获取用户列表 */
export const getUserList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/user/list"), { params });
};
/** 用户基本修改 */
export const updateUser = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/user/update"), {
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
