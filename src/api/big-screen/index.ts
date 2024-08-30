import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
const path = "/mock/big-screen";

export const getMapData = (params?: object) => {
  return http.request<any>("get", `${path}/map-data`, { params });
};
