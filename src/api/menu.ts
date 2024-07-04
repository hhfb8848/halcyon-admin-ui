import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 新增菜单 */
export const addMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysMenu"), { data });
};
/** 菜单列表 */
export const listMenu = (data?: object) => {
  return http.request<any>("get", baseUrlApi("/sysMenu/list"), { data });
};

/** 修改菜单 */
export const updateMenu = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysMenu"), { data });
};
/** 简单菜单列表 */
export const listSimpleMenu = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysMenu/listSimple"), {
    params
  });
};
