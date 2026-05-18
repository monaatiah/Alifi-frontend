/**
 * Page Store Actions
 * Actions for managing page-level state, configuration, and metadata
 */

export const GET_PAGE_CONFIG = "GET_PAGE_CONFIG";
export const GET_PAGE_CONFIG_SUCCESS = "GET_PAGE_CONFIG_SUCCESS";
export const GET_PAGE_CONFIG_FAILURE = "GET_PAGE_CONFIG_FAILURE";

export const GET_PAGE_DATA = "GET_PAGE_DATA";
export const GET_PAGE_DATA_SUCCESS = "GET_PAGE_DATA_SUCCESS";
export const GET_PAGE_DATA_FAILURE = "GET_PAGE_DATA_FAILURE";

export const SET_PAGE_META = "SET_PAGE_META";
export const SET_PAGE_LAYOUT = "SET_PAGE_LAYOUT";
export const CLEAR_PAGE_STATE = "CLEAR_PAGE_STATE";

// Action creators

export const getPageConfig = (payload) => ({
  type: GET_PAGE_CONFIG,
  payload,
});

export const getPageConfigSuccess = (payload) => ({
  type: GET_PAGE_CONFIG_SUCCESS,
  payload,
});

export const getPageConfigFailure = (payload) => ({
  type: GET_PAGE_CONFIG_FAILURE,
  payload,
});

export const getPageData = (payload) => ({
  type: GET_PAGE_DATA,
  payload,
});

export const getPageDataSuccess = (payload) => ({
  type: GET_PAGE_DATA_SUCCESS,
  payload,
});

export const getPageDataFailure = (payload) => ({
  type: GET_PAGE_DATA_FAILURE,
  payload,
});

export const setPageMeta = (payload) => ({
  type: SET_PAGE_META,
  payload,
});

export const setPageLayout = (payload) => ({
  type: SET_PAGE_LAYOUT,
  payload,
});

export const clearPageState = () => ({
  type: CLEAR_PAGE_STATE,
});
