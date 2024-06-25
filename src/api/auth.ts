import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/login"), { data });
};
/** 注销 */
export const logOut = (data?: object) => {
  return http.request<any>("get", baseUrlApi("/logout"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<any>("post", "/refreshToken", { data });
};
