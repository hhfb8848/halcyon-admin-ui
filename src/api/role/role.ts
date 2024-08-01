import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 新增角色 */
export const addRole = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysRole"), { data });
};
/** 角色列表 */
export const listRole = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysRole/list"), { params });
};

/** 修改角色 */
export const updateRole = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysRole"), { data });
};

/** 删除角色 */
export const deleteRole = (id: number) => {
  return http.request<any>("delete", baseUrlApi(`/sysRole/${id}`));
};

/** 获取所有角色 */
export const listAllSimpleRole = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysRole/listAll"), { params });
};
