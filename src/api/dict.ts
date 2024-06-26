import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** 新增字典 */
export const addDict = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysDict"), { data });
};
/** 字典列表 */
export const listDict = (data?: object) => {
  return http.request<any>("get", baseUrlApi("/sysDict/list"), { data });
};

/** 修改字典 */
export const updateDict = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysDict"), { data });
};
