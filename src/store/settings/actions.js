import {
  CONTACT_US,
  CONTACT_US_FAILURE,
  CONTACT_US_SUCCESS,
  DEVELOPER_REQUEST,
  DEVELOPER_REQUEST_FAILURE,
  DEVELOPER_REQUEST_SUCCESS,
  GET_PAGE_DATA,
  GET_PAGE_DATA_FAILURE,
  GET_PAGE_DATA_SUCCESS,
  GET_SECTION_DATA,
  GET_SECTION_DATA_FAILURE,
  GET_SECTION_DATA_SUCCESS,
  GET_SETTINGS,
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_SUCCESS,
  START_OBJECTION_FAILURE,
  START_OBJECTION_REQUEST,
  START_OBJECTION_SUCCESS,
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

// ==================================================
// ==================================================

export const contactUs = (payload) => {
  return {
    type: CONTACT_US,
    payload: payload,
  };
};

export const contactUsSuccess = (payload) => {
  return {
    type: CONTACT_US_SUCCESS,
    payload: payload,
  };
};

export const contactUsFailure = (payload) => {
  return {
    type: CONTACT_US_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const startObjectionRequest = (payload) => {
  return {
    type: START_OBJECTION_REQUEST,
    payload: payload,
  };
};

export const startObjectionSuccess = (payload) => {
  return {
    type: START_OBJECTION_SUCCESS,
    payload: payload,
  };
};

export const startObjectionFailure = (payload) => {
  return {
    type: START_OBJECTION_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const developerRequest = (payload) => {
  return {
    type: DEVELOPER_REQUEST,
    payload: payload,
  };
};

export const developerRequestSuccess = (payload) => {
  return {
    type: DEVELOPER_REQUEST_SUCCESS,
    payload: payload,
  };
};

export const developerRequestFailure = (payload) => {
  return {
    type: DEVELOPER_REQUEST_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSectionData = (payload) => {
  return {
    type: GET_SECTION_DATA,
    payload: payload,
  };
};

export const getSectionDataSuccess = (payload) => {
  return {
    type: GET_SECTION_DATA_SUCCESS,
    payload: payload,
  };
};

export const getSectionDataFailure = (payload) => {
  return {
    type: GET_SECTION_DATA_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
