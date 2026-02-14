import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
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
