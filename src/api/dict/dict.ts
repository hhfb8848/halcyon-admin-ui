import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 新增字典 */
export const addDict = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysDict"), { data });
};
/** 字典列表 */
export const listDict = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysDict/list"), { params });
};

/** 修改字典 */
export const updateDict = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysDict"), { data });
};

/** 删除字典 */
export const deleteDict = (id: number) => {
  return http.request<any>("delete", baseUrlApi(`/sysDict/${id}`));
};
