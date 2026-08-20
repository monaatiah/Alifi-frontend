import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_FAILURE,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "./actionTypes";

export const getProducts = (payload) => {
  return {
    type: GET_PRODUCTS,
    payload: payload,
  };
};

export const getProductsSuccess = (payload) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: payload,
  };
};

export const getProductsFailure = (payload) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSingleProduct = (payload) => {
  return {
    type: GET_SINGLE_PRODUCT,
    payload: payload,
  };
};

export const getSingleProductSuccess = (payload) => {
  return {
    type: GET_SINGLE_PRODUCT_SUCCESS,
    payload: payload,
  };
};

export const getSingleProductFailure = (payload) => {
  return {
    type: GET_SINGLE_PRODUCT_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
