/**
 * Page Store Reducer
 * Manages page configuration, layout, metadata, and loading states
 */

import {
  GET_PAGE_CONFIG,
  GET_PAGE_CONFIG_SUCCESS,
  GET_PAGE_CONFIG_FAILURE,
  GET_PAGE_DATA,
  GET_PAGE_DATA_SUCCESS,
  GET_PAGE_DATA_FAILURE,
  SET_PAGE_META,
  SET_PAGE_LAYOUT,
  CLEAR_PAGE_STATE,
} from "./actionTypes";

const initialState = {
  // Page configuration and layout
  config: null,
  layout: null,
  slug: null,

  // Page metadata
  meta: {
    title: "",
    description: "",
    image: "",
    seo: {},
  },

  // Page data
  data: {},
  components: [],

  // Loading and error states
  loading: false,
  configLoading: false,
  dataLoading: false,
  error: null,
  configError: null,
  dataError: null,
};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Config fetching
    case GET_PAGE_CONFIG:
      return {
        ...state,
        configLoading: true,
        configError: null,
      };

    case GET_PAGE_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.payload.config,
        layout: action.payload.layout,
        slug: action.payload.slug,
        meta: action.payload.meta || state.meta,
        configLoading: false,
        configError: null,
      };

    case GET_PAGE_CONFIG_FAILURE:
      return {
        ...state,
        configLoading: false,
        configError: action.payload,
      };

    // Data fetching
    case GET_PAGE_DATA:
      return {
        ...state,
        dataLoading: true,
        dataError: null,
      };

    case GET_PAGE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        components: action.payload.components || [],
        dataLoading: false,
        dataError: null,
      };

    case GET_PAGE_DATA_FAILURE:
      return {
        ...state,
        dataLoading: false,
        dataError: action.payload,
      };

    // Set metadata
    case SET_PAGE_META:
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      };

    // Set layout
    case SET_PAGE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };

    // Clear state
    case CLEAR_PAGE_STATE:
      return initialState;

    default:
      return state;
  }
};

export default pageReducer;
