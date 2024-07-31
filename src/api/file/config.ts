import { http } from "@/utils/http";
import { baseUrlApi } from "../utils";

/** 新增配置 */
export const addConfig = (data?: object) => {
  return http.request<any>("post", baseUrlApi("/sysFileConfig"), { data });
};
/** 配置列表 */
export const listConfig = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysFileConfig/list"), {
    params
  });
};
/** 配置详情 */
export const getConfig = (params?: object) => {
  return http.request<any>("get", baseUrlApi("/sysFileConfig/get"), {
    params
  });
};
/** 修改配置 */
export const updateConfig = (data?: object) => {
  return http.request<any>("put", baseUrlApi("/sysFileConfig"), {
    data
  });
};
/** 修改配置为主配置 */
export const updateConfigMaster = (params?: object) => {
  return http.request<any>("put", baseUrlApi("/sysFileConfig/update-master"), {
    params
  });
};
/** 删除配置 */
export const deleteConfig = (params: object) => {
  return http.request<any>("delete", baseUrlApi(`/sysFileConfig/delete`), {
    params
  });
};
