import {
  GET_PAGE_DATA,
  GET_PAGE_DATA_FAILURE,
  GET_PAGE_DATA_SUCCESS,
  GET_SETTINGS,
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_SUCCESS,
} from "./actionTypes";

export const getPageData = (payload) => {
  return {
    type: GET_PAGE_DATA,
    payload: payload,
  };
};

export const getPageDataSuccess = (payload) => {
  return {
    type: GET_PAGE_DATA_SUCCESS,
    payload: payload,
  };
};

export const getPageDataFailure = (payload) => {
  return {
    type: GET_PAGE_DATA_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSettings = (payload) => {
  return {
    type: GET_SETTINGS,
    payload: payload,
  };
};

export const getSettingsSuccess = (payload) => {
  return {
    type: GET_SETTINGS_SUCCESS,
    payload: payload,
  };
};

export const getSettingsFailure = (payload) => {
  return {
    type: GET_SETTINGS_FAILURE,
    payload: payload,
  };
};
