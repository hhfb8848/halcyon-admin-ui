import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

const path = "/sysFileConfig";
/** 新增配置 */
export const addConfig = (data?: object) => {
  return http.request<any>("post", baseUrlApi(`${path}/create`), { data });
};
/** 配置列表 */
export const listConfig = (params?: object) => {
  return http.request<any>("get", baseUrlApi(`${path}/list`), {
    params
  });
};
/** 配置详情 */
export const getConfig = (id: number) => {
  return http.request<any>("get", baseUrlApi(`${path}/get/${id}`));
};
/** 修改配置 */
export const updateConfig = (data?: object) => {
  return http.request<any>("put", baseUrlApi(`${path}/update`), {
    data
  });
};
/** 修改配置为主配置 */
export const updateConfigMaster = (id: number) => {
  return http.request<any>("put", baseUrlApi(`${path}/updateMaster/${id}`));
};
/** 删除配置 */
export const deleteConfig = (id: number) => {
  return http.request<any>("delete", baseUrlApi(`${path}/delete/${id}`));
};
