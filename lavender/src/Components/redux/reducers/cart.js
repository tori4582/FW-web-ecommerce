import * as cartConst from "../constrants/cartConst";
import * as myToast from "../../../Common/helper/toastHelper";

const initialState = {
  cart: [],
};
const reducer = (state = initialState, action, history) => {
  switch (action.type) {
    case cartConst.ADD_TO_LOGIN: {
      history.push("/login");
      return { ...state };
    }
    case cartConst.ADD_TO_CART: {
      return { ...state };
    }
    case cartConst.ADD_TO_CART_SUCCESS: {
      const { data } = action.payload;
      const product = data.product;
      myToast.toastSucces("Thêm vào giỏ hàng thành công");
      return {
        cart: { ...state, product }
      };
    }
    case cartConst.ADD_TO_CART_FAILED: {
      myToast.toastError("Thêm vào giỏ hàng thất bại");
      return { ...state };
    }

    case cartConst.LOAD_CART: {
      return { ...state };
    }
    case cartConst.LOAD_CART_SUCCESS: {
      const { data } = action.payload;
      let cart=  data.value.$values ;
      return {
        cart: { ...state, cart:cart},
      };
    }
    case cartConst.LOAD_CART_FAILED: {
      myToast.toastError("Tải giỏ hàng thất bại");
      console.log("errorcart"+JSON.stringify(action));
      return { ...state };
    }

    /*Xoa san pham*/

    case cartConst.DELETE_PRODUCT: {
      return { ...state };
    }
    case cartConst.DELETE_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      let cart=  data.value.$values ;
      return {
        cart: { ...state, cart},
      };
    }
    case cartConst.DELETE_PRODUCT_FAILED: {
      myToast.toastError("Xoá sản phẩm hàng thất bại");
      console.error(action.payload.error);
      return { ...state };
    }
    default:
      return state;
  }
};
export default reducer;
