import { HYDRATE } from "next-redux-wrapper";
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
  RESEND_VERIFICATION_EMAIL_FAILURE,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
} from "./actionTypes";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.auth) {
        if (Object.hasOwnProperty.call(action.payload?.auth, key)) {
          const element = action.payload?.auth[key];
          element === "init" && delete action.payload?.auth[key];
        }
      }
      return { ...state, ...action.payload.auth };

    //=================================================
    //=================================================

    case LOGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      console.log("====================================");
      console.log("action.payload", action.payload);
      console.log("====================================");
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.customer,
        error: "",
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case LOGOUT:
      return {
        ...state,
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: "",
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case SIGNUP:
      return {
        ...state,
        loading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        error: "",
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.customer,
        error: "",
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case VERIFY_EMAIL:
      return {
        ...state,
        loading: true,
      };

    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        user: {
          ...state.user,
          email_verified: true,
        },
      };

    case VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    case RESEND_VERIFICATION_EMAIL:
      return {
        ...state,
        loading: true,
      };

    case RESEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case RESEND_VERIFICATION_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //=================================================
    //=================================================

    default:
      return state;
  }
};

export default auth;
