import { HYDRATE } from "next-redux-wrapper";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "./actionTypes";

const initialState = {
  products: {},
  singleProduct: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.products) {
        if (Object.hasOwnProperty.call(action.payload?.products, key)) {
          const element = action.payload?.products[key];
          element === "init" && delete action.payload?.products[key];
        }
      }
      return { ...state, ...action.payload.products };

    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: "",
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: action.payload,
        loading: false,
        error: "",
      };

    case GET_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    default:
      return state;
  }
};

export default products;
