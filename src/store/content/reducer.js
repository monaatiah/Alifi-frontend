import { HYDRATE } from "next-redux-wrapper";
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

const initialState = {
  content: {},
  contentBySlug: {},
  contentCategories: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const content = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.content) {
        if (Object.hasOwnProperty.call(action.payload?.content, key)) {
          const element = action.payload?.content[key];
          element === "init" && delete action.payload?.content[key];
        }
      }
      return { ...state, ...action.payload.content };

    case GET_CONTENT:
      return {
        ...state,
        loading: true,
      };

    case GET_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload,
        loading: false,
        error: "",
      };

    case GET_CONTENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_CONTENT_BY_SLUG:
      return {
        ...state,
        loading: true,
      };

    case GET_CONTENT_BY_SLUG_SUCCESS:
      return {
        ...state,
        contentBySlug: action.payload.data,
        loading: false,
        error: "",
      };

    case GET_CONTENT_BY_SLUG_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case GET_CONTENT_CATEGORIES:
      return {
        ...state,
        loading: true,
      };

    case GET_CONTENT_CATEGORIES_SUCCESS:
      return {
        ...state,
        contentCategories: action.payload,
        loading: false,
        error: "",
      };

    case GET_CONTENT_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    default:
      return state;
  }
};

export default content;
