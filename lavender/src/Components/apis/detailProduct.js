import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";

export const dungluong = (url) => {
  return axiosServices.get(API_ENDPOINT + url);
};

export const mausac = (url) => {
  return axiosServices.get(API_ENDPOINT + url);
};

export const xemgiatheodungluongvamausac = (request) => {
  return axiosServices.get(
    `${API_ENDPOINT}/${request.loai}/${request.hang}/${request.dong}/${request.sanpham}/xemgia?dungluong=${request.dungluong}&mausac=${request.mausac}`
  );
};

export const xemgiatheodungluongmausacmasanpham = (
  masanpham,
  dungluong,
  mausac
) => {
  return axiosServices.get(
    `${API_ENDPOINT}/xemgia-theo-dungluong-mausac-masanpham?masanpham=${masanpham}&dungluong=${dungluong}&mausac=${mausac}`
  );
};
    
export const xemgiamoitheomasanpham = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/xem-gia-theo-masanpham?masanpham=${masanpham}`
  );
};

export const timkiemChitietsanphamImei = (imei)=>{
  return axiosServices.get(`${API_ENDPOINT}/tim-chitietsanpham-bang-imei?imei=${imei}`);
}