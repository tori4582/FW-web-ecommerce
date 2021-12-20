import * as cartApi from "../../apis/cart";
import * as cartConst from "../constrants/cartConst";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get('token');
const refreshtoken = cookie.get('refreshtoken');

export const addToCart = (history) => {
  return {
    type: cartConst.ADD_TO_CART,
    history: history,
  };
};

export const addToCartSuccess = (data) => {
  return {
    type: cartConst.ADD_TO_CART_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addToCartFailed = (error) => {
  return {
    type: cartConst.ADD_TO_CART_FAILED,
    payload: {
      error,
    },
  };
};


export const addToCartReport = (req) => {
    return (dispatch) => {
      cartApi
        .addToCart(req, token, refreshtoken)
        .then((success) => {
          if (success.status === 200) dispatch(addToCartSuccess(success.data));
          else dispatch(addToCartFailed(success));
        })
        .catch((error) => {
          dispatch(addToCartFailed(error));
        });
    };
  
};

/* Xem gio hang */
export const loadCart = () => {
  return {
    type: cartConst.LOAD_CART
  };
};

export const loadCartSuccess = (data) => {
  return {
    type: cartConst.LOAD_CART_SUCCESS,
    payload: {
      data: data
    },
  };
};

export const loadCartFailed = (error) => {
  return {
    type: cartConst.LOAD_CART_FAILED,
    payload: {
      error,
    },
  };
};

export const loadCartReport = (customerid) => {

  let request = { makhachhang:customerid };
  return (dispatch) => {
    cartApi
      .loadCart(request, token, refreshtoken)
      .then((success) => {
        if (success.status === 200) {
          dispatch(loadCartSuccess(success.data));
        }
        else if (success.status===404) {
          dispatch(loadCart(success));
        } 
        else {dispatch(loadCartFailed(success));
        }
      })
      .catch((error) => {
        dispatch(loadCartFailed(error));
      });
  };
};

/* Xoá sản phẩm trong giỏ hàng */
export const deleteProduct = () => {
  return {
    type: cartConst.DELETE_PRODUCT
  };
};

export const deleteProductSuccess = (success) => {
  return {
    type: cartConst.DELETE_PRODUCT_SUCCESS,
    payload: {
      data: success.data
    },
  };
};

export const deleteProductFailed = (error) => {
  return {
    type: cartConst.DELETE_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteProductReport = (makhachhang, masanpham) => {
  return (dispatch) => {
    cartApi
      .deleteProduct(makhachhang, masanpham, token, refreshtoken)
      .then((res) => {
        if (res.status === 200) 
        {
          dispatch(deleteProductSuccess(res));
        }
        else if (res.status===404) dispatch(deleteProduct(res));
        else 
        {
          dispatch(deleteProductFailed(res));
        }
      })
      .catch((error) => {
        console.log("error"+JSON.stringify(error));
        dispatch(deleteProductFailed(error));
      });
  };
};
