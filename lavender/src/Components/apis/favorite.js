import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";

export const favorite = () => {
  return axiosServices.get(`${API_ENDPOINT}/danhsachyeuthich`);
};

export const checklike = (makhachhang, masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/kiemtrayeuthich?makhachhang=${makhachhang}&masanpham=${masanpham}`
  );
};

export const like = (makhachhang, masanpham) => {
    return axiosServices.get(
      `${API_ENDPOINT}/yeuthich?makhachhang=${makhachhang}&masanpham=${masanpham}`
    );
  };

export const unlike = (makhachhang, masanpham) => {
    return axiosServices.get(
      `${API_ENDPOINT}/boyeuthich?makhachhang=${makhachhang}&masanpham=${masanpham}`
    );
  };
