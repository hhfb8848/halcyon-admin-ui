import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 新增字典数据项 */
export const addDictData = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysDictData"), { data });
};
/** 字典数据项列表 */
export const listDictData = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysDictData/list"), { params });
};

/** 修改字典数据项 */
export const updateDictData = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysDictData"), { data });
};

/** 删除字典数据项 */
export const deleteDictData = (data?: object) => {
  return http.request<any>("delete", baseUrlApi("/sysDictData"), { data });
};
