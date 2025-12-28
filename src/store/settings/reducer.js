import { HYDRATE } from "next-redux-wrapper";
import {
  GET_PAGE_DATA,
  GET_PAGE_DATA_FAILURE,
  GET_PAGE_DATA_SUCCESS,
  GET_SETTINGS,
  GET_SETTINGS_FAILURE,
  GET_SETTINGS_SUCCESS,
} from "./actionTypes";

const initialState = {
  pageData: {},
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
        pageData: action.payload,
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
        settings: action.payload,
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

    default:
      return state;
  }
};

export default settings;
