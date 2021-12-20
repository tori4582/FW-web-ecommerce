import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";

const url = "/login";

export const login = (data, config) => {
  return axiosServices.post(API_ENDPOINT + url, data, config);
};
export const loginWithGoogle = (data) =>{
  return axiosServices.post(API_ENDPOINT + "/login-with-google", data)
}
export const logout = async (ma,loaitaikhoan, token, refreshtoken) => {
  
  var connect = await axiosServices
    .post(
      API_ENDPOINT + "/logout",
      { "ma":ma, loaitaikhoan, refreshtoken },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
  
  return connect;
};
export const test = () => {
  return axiosServices.get(API_ENDPOINT + "/test", {
    withCredentials: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};
export const refreshToken = (refreshtoken) => {
  return axiosServices.get(`${API_ENDPOINT}/refresh-token?refreshtoken=${refreshtoken}`);
};
