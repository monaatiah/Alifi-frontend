import { HYDRATE } from "next-redux-wrapper";
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

const initialState = {
  pageData: {},
  sectionData: {},
  settings: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.settings) {
        if (Object.hasOwnProperty.call(action.payload?.settings, key)) {
          const element = action.payload?.settings[key];
          element === "init" && delete action.payload?.settings[key];
        }
      }
      return { ...state, ...action.payload.settings };

    case GET_PAGE_DATA:
      return {
        ...state,
        loading: true,
      };

    case GET_PAGE_DATA_SUCCESS:
      return {
        ...state,
        pageData: action.payload?.page,
        loading: false,
      };

    case GET_PAGE_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_SETTINGS:
      return {
        ...state,
        loading: true,
      };

    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: action.payload.siteInfos,
        loading: false,
      };

    case GET_SETTINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case CONTACT_US:
      return {
        ...state,
        loading: true,
      };

    case CONTACT_US_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CONTACT_US_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case START_OBJECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case START_OBJECTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case START_OBJECTION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case DEVELOPER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DEVELOPER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DEVELOPER_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_SECTION_DATA:
      return {
        ...state,
        loading: true,
      };

    case GET_SECTION_DATA_SUCCESS:
      return {
        ...state,
        sectionData: action.payload?.section,
        loading: false,
      };

    case GET_SECTION_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    default:
      return state;
  }
};

export default settings;
