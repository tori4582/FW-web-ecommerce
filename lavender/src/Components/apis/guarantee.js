import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";

export const tracuuLichsubaohanhBangImei = (imei) => {
  return axiosServices.get(`${API_ENDPOINT}/tracuu-lichsu-baohanh?imei=${imei}`);
};
