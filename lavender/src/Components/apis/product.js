import axiosServices from "./axiosServices";
import { API_ENDPOINT } from "../../Common/constants/index";
import { refreshToken } from "../service/refreshtoken";

export const findProductByBillId = async (sohoadon, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tim-sanpham-theo-sohoadon?sohoadon=${sohoadon}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(
      `${API_ENDPOINT}/tim-sanpham-theo-sohoadon?sohoadon=${sohoadon}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const findProductById = async (masanpham, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/tim-sanpham-theo-masanpham?masanpham=${masanpham}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(
      `${API_ENDPOINT}/tim-sanpham-theo-masanpham?masanpham=${masanpham}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const addProduct = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-sanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/them-sanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    });
  }
  return connect;
};

export const addSpecification = async (
  masanpham,
  thongsokithuat,
  token,
  refreshtoken
) => {
  var newtoken = undefined;
  var fd = { masanpham, thongsokithuat };
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/them-thongsokithuat`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/them-thongsokithuat`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  return connect;
};

export const editProduct = async (fd, progress, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .post(`${API_ENDPOINT}/sua-sanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.post(`${API_ENDPOINT}/sua-sanpham`, fd, {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (progressEvent) => {
        progress((progressEvent.loaded / progressEvent.total) * 100);
      },
    });
  }
  return connect;
};

export const allMobileProduct = () => {
  return axiosServices.get(`${API_ENDPOINT}/tatca-dienthoai`);
};

export const allLaptopProduct = () => {
  return axiosServices.get(`${API_ENDPOINT}/tatca-laptop`);
};

export const deleteProduct = async (masanpham, token, refreshtoken) => {
  var newtoken = undefined;
  var connect = await axiosServices
    .get(`${API_ENDPOINT}/xoa-sanpham?masanpham=${masanpham}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        newtoken = refreshToken(refreshtoken);
        return error;
      }
    });
  if (newtoken !== undefined) {
    return await axiosServices.get(
      `${API_ENDPOINT}/xoa-sanpham?masanpham=${masanpham}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  return connect;
};

export const findProduct = (timkiem) => {
  return axiosServices.get(`${API_ENDPOINT}/tim-sanpham?timkiem=${timkiem}`);
};
export const tenNewProduct = () => {
  return axiosServices.get(`${API_ENDPOINT}/muoi-sanpham-moinhat`);
};
export const timkiem6Sanpham = (timkiem) => {
  return axiosServices.get(
    `${API_ENDPOINT}/timkiem-6-sanpham?timkiem=${timkiem}`
  );
};
export const timCacsanphamTheoSohoadon = (sohoadon) => {
  return axiosServices.get(
    `${API_ENDPOINT}/tim-cacsanpham-theo-sohoadon?sohoadon=${sohoadon}`
  );
};

export const thongsokithuatBangMasanpham = (masanpham) => {
  return axiosServices.get(
    `${API_ENDPOINT}/thongsokithuat-bang-masanpham?masanpham=${masanpham}`
  );
};
