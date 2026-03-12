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
} from "./actionTypes";

export const getUserCart = (payload) => {
  return {
    type: GET_USER_CART,
    payload: payload,
  };
};

export const getUserCartSuccess = (payload) => {
  return {
    type: GET_USER_CART_SUCCESS,
    payload: payload,
  };
};

export const getUserCartFailure = (payload) => {
  return {
    type: GET_USER_CART_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload: payload,
  };
};

export const addToCartSuccess = (payload) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: payload,
  };
};

export const addToCartFailure = (payload) => {
  return {
    type: ADD_TO_CART_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const updateCartItem = (payload) => {
  return {
    type: UPDATE_CART_ITEM,
    payload: payload,
  };
};

export const updateCartItemSuccess = (payload) => {
  return {
    type: UPDATE_CART_ITEM_SUCCESS,
    payload: payload,
  };
};

export const updateCartItemFailure = (payload) => {
  return {
    type: UPDATE_CART_ITEM_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload: payload,
  };
};

export const removeFromCartSuccess = (payload) => {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    payload: payload,
  };
};

export const removeFromCartFailure = (payload) => {
  return {
    type: REMOVE_FROM_CART_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const clearCart = (payload) => {
  return {
    type: CLEAR_CART,
    payload: payload,
  };
};

export const clearCartSuccess = (payload) => {
  return {
    type: CLEAR_CART_SUCCESS,
    payload: payload,
  };
};

export const clearCartFailure = (payload) => {
  return {
    type: CLEAR_CART_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const applyCoupon = (payload) => {
  return {
    type: APPLY_COUPON,
    payload: payload,
  };
};

export const applyCouponSuccess = (payload) => {
  return {
    type: APPLY_COUPON_SUCCESS,
    payload: payload,
  };
};

export const applyCouponFailure = (payload) => {
  return {
    type: APPLY_COUPON_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const removeCoupon = (payload) => {
  return {
    type: REMOVE_COUPON,
    payload: payload,
  };
};

export const removeCouponSuccess = (payload) => {
  return {
    type: REMOVE_COUPON_SUCCESS,
    payload: payload,
  };
};

export const removeCouponFailure = (payload) => {
  return {
    type: REMOVE_COUPON_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const mergeCart = (payload) => {
  return {
    type: MERGE_CART,
    payload: payload,
  };
};

export const mergeCartSuccess = (payload) => {
  return {
    type: MERGE_CART_SUCCESS,
    payload: payload,
  };
};

export const mergeCartFailure = (payload) => {
  return {
    type: MERGE_CART_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const openCartSidebar = () => {
  return {
    type: OPEN_CART_SIDEBAR,
  };
};

export const clearOpenCartSidebar = () => {
  return {
    type: CLEAR_OPEN_CART_SIDEBAR,
  };
};

// ==================================================
// ==================================================
