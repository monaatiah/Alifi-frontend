import { HYDRATE } from "next-redux-wrapper";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_CATEGORY_FAILURE,
  GET_SINGLE_CATEGORY_SUCCESS,
} from "./actionTypes";

const initialState = {
  categories: {},
  singleCategory: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.categories) {
        if (Object.hasOwnProperty.call(action.payload?.categories, key)) {
          const element = action.payload?.categories[key];
          element === "init" && delete action.payload?.categories[key];
        }
      }
      return { ...state, ...action.payload.categories };

    case GET_CATEGORIES:
      return {
        ...state,
        loading: true,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_SINGLE_CATEGORY:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        singleCategory: action.payload,
        loading: false,
      };

    case GET_SINGLE_CATEGORY_FAILURE:
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

export default categories;
