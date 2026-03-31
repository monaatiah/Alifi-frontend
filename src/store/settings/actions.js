import {
  GET_FORM_SCHEMA,
  GET_FORM_SCHEMA_FAILURE,
  GET_FORM_SCHEMA_SUCCESS,
  GET_PAGE_DATA,
  GET_PAGE_DATA_FAILURE,
  GET_PAGE_DATA_SUCCESS,
  GET_SETTINGS,
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_SUCCESS,
  JOIN_US,
  JOIN_US_FAILURE,
  JOIN_US_SUCCESS,
  POST_FORM_SUBMISSION,
  POST_FORM_SUBMISSION_FAILURE,
  POST_FORM_SUBMISSION_SUCCESS,
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

export const joinUs = (payload) => {
  return {
    type: JOIN_US,
    payload: payload,
  };
};
export const joinUsSuccess = (payload) => {
  return {
    type: JOIN_US_SUCCESS,
    payload: payload,
  };
};
export const joinUsFailure = (payload) => {
  return {
    type: JOIN_US_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getFormSchema = (payload) => {
  return {
    type: GET_FORM_SCHEMA,
    payload: payload,
  };
};

export const getFormSchemaSuccess = (payload) => {
  return {
    type: GET_FORM_SCHEMA_SUCCESS,
    payload: payload,
  };
};

export const getFormSchemaFailure = (payload) => {
  return {
    type: GET_FORM_SCHEMA_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const postFormSubmission = (payload) => {
  return {
    type: POST_FORM_SUBMISSION,
    payload: payload,
  };
};

export const postFormSubmissionSuccess = (payload) => {
  return {
    type: POST_FORM_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const postFormSubmissionFailure = (payload) => {
  return {
    type: POST_FORM_SUBMISSION_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
