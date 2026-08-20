import {
  GET_CONTENT,
  GET_CONTENT_BY_SLUG,
  GET_CONTENT_BY_SLUG_FAILURE,
  GET_CONTENT_BY_SLUG_SUCCESS,
  GET_CONTENT_CATEGORIES,
  GET_CONTENT_CATEGORIES_FAILURE,
  GET_CONTENT_CATEGORIES_SUCCESS,
  GET_CONTENT_FAILURE,
  GET_CONTENT_SUCCESS,
} from "./actionTypes";

export const getContent = (payload) => {
  return {
    type: GET_CONTENT,
    payload: payload,
  };
};

export const getContentSuccess = (payload) => {
  return {
    type: GET_CONTENT_SUCCESS,
    payload: payload,
  };
};

export const getContentFailure = (payload) => {
  return {
    type: GET_CONTENT_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getContentBySlug = (payload) => {
  return {
    type: GET_CONTENT_BY_SLUG,
    payload: payload,
  };
};

export const getContentBySlugSuccess = (payload) => {
  return {
    type: GET_CONTENT_BY_SLUG_SUCCESS,
    payload: payload,
  };
};

export const getContentBySlugFailure = (payload) => {
  return {
    type: GET_CONTENT_BY_SLUG_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getContentCategories = (payload) => {
  return {
    type: GET_CONTENT_CATEGORIES,
    payload: payload,
  };
};

export const getContentCategoriesSuccess = (payload) => {
  return {
    type: GET_CONTENT_CATEGORIES_SUCCESS,
    payload: payload,
  };
};

export const getContentCategoriesFailure = (payload) => {
  return {
    type: GET_CONTENT_CATEGORIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
