import { HYDRATE } from "next-redux-wrapper";
import {
  GET_USER_CART,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAILURE,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
  CLEAR_CART,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
  APPLY_COUPON,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAILURE,
  REMOVE_COUPON,
  REMOVE_COUPON_SUCCESS,
  REMOVE_COUPON_FAILURE,
  MERGE_CART,
  MERGE_CART_SUCCESS,
  MERGE_CART_FAILURE,
  OPEN_CART_SIDEBAR,
  CLEAR_OPEN_CART_SIDEBAR,
  ADD_PRODUCT_TO_WISHLIST,
  ADD_PRODUCT_TO_WISHLIST_SUCCESS,
  ADD_PRODUCT_TO_WISHLIST_FAILURE,
} from "./actionTypes";

const initialState = {
  cart: {},
  wishlist: [],
  openCartSidebar: false,
  loading: false,
  error: "",
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.cart) {
        if (Object.hasOwnProperty.call(action.payload?.cart, key)) {
          const element = action.payload?.cart[key];
          element === "init" && delete action.payload?.cart[key];
        }
      }
      return { ...state, ...action.payload.cart };

    case GET_USER_CART:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case GET_USER_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case ADD_TO_CART:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        openCartSidebar: true,
        loading: false,
        error: "",
      };

    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case UPDATE_CART_ITEM:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case UPDATE_CART_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case REMOVE_FROM_CART:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case CLEAR_CART:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case CLEAR_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case APPLY_COUPON:
      return {
        ...state,
        loading: true,
      };

    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case APPLY_COUPON_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case REMOVE_COUPON:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_COUPON_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case REMOVE_COUPON_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case MERGE_CART:
      return {
        ...state,
        loading: true,
      };

    case MERGE_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: "",
      };

    case MERGE_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case OPEN_CART_SIDEBAR:
      return {
        ...state,
        openCartSidebar: true,
      };

    case CLEAR_OPEN_CART_SIDEBAR:
      return {
        ...state,
        openCartSidebar: false,
      };

    // ==================================================
    // ==================================================

    case ADD_PRODUCT_TO_WISHLIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PRODUCT_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        loading: false,
        error: "",
      };

    case ADD_PRODUCT_TO_WISHLIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    default:
      return state;
  }
};

export default cart;
