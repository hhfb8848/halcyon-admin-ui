import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 角色所分配菜单ID */
export const listMenuIdByRoleId = (id: number) => {
  return http.request<any>(
    "get",
    baseUrlApi(`/sysRoleMenu/getMenuIdList/${id}`)
  );
};

/** 为角色分配菜单 */
export const assignForRole = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysRoleMenu/assignForRole"), {
    data
  });
};
