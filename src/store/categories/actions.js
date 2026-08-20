import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_PRODUCTS,
  GET_CATEGORY_PRODUCTS_FAILURE,
  GET_CATEGORY_PRODUCTS_SUCCESS,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_CATEGORY_FAILURE,
  GET_SINGLE_CATEGORY_SUCCESS,
} from "./actionTypes";

export const getCategories = (payload) => {
  return {
    type: GET_CATEGORIES,
    payload: payload,
  };
};

export const getCategoriesSuccess = (payload) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: payload,
  };
};

export const getCategoriesFailure = (payload) => {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSingleCategory = (payload) => {
  return {
    type: GET_SINGLE_CATEGORY,
    payload: payload,
  };
};

export const getSingleCategorySuccess = (payload) => {
  return {
    type: GET_SINGLE_CATEGORY_SUCCESS,
    payload: payload,
  };
};

export const getSingleCategoryFailure = (payload) => {
  return {
    type: GET_SINGLE_CATEGORY_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getCategoryProducts = (payload) => {
  return {
    type: GET_CATEGORY_PRODUCTS,
    payload: payload,
  };
};

export const getCategoryProductsSuccess = (payload) => {
  return {
    type: GET_CATEGORY_PRODUCTS_SUCCESS,
    payload: payload,
  };
};

export const getCategoryProductsFailure = (payload) => {
  return {
    type: GET_CATEGORY_PRODUCTS_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
