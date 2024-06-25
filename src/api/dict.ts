import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 新增字典 */
export const addMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/dict"), { data });
};
/** 字典列表 */
export const listMenu = (data?: object) => {
  return http.request<any>("get", baseUrlApi("/dict/list"), { data });
};

/** 修改字典 */
export const updateMenu = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/dict"), { data });
};
