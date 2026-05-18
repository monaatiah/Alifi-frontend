import { HYDRATE } from "next-redux-wrapper";
import {
  GET_SERVICES,
  GET_SERVICES_FAILURE,
  GET_SERVICES_SUCCESS,
  GET_SINGLE_SERVICE,
  GET_SINGLE_SERVICE_FAILURE,
  GET_SINGLE_SERVICE_SUCCESS,
  GET_SERVICES_CATEGORIES,
  GET_SERVICES_CATEGORIES_FAILURE,
  GET_SERVICES_CATEGORIES_SUCCESS,
  SUBMIT_SERVICE_REQUEST,
  SUBMIT_SERVICE_REQUEST_FAILURE,
  SUBMIT_SERVICE_REQUEST_SUCCESS,
  ADD_SERVICE_TO_FAVORITES,
  ADD_SERVICE_TO_FAVORITES_SUCCESS,
  ADD_SERVICE_TO_FAVORITES_FAILURE,
  REMOVE_SERVICE_FROM_FAVORITES,
  REMOVE_SERVICE_FROM_FAVORITES_SUCCESS,
  REMOVE_SERVICE_FROM_FAVORITES_FAILURE,
  GET_FAVORITES_SERVICES,
  GET_FAVORITES_SERVICES_SUCCESS,
  GET_FAVORITES_SERVICES_FAILURE,
  GET_SINGLE_SERVICE_PROVIDER,
  GET_SINGLE_SERVICE_PROVIDER_SUCCESS,
  GET_SINGLE_SERVICE_PROVIDER_FAILURE,
  GET_SERVICES_PROVIDERS,
  GET_SERVICES_PROVIDERS_SUCCESS,
  GET_SERVICES_PROVIDERS_FAILURE,
} from "./actionTypes";

const normalizeFavouriteServices = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const initialState = {
  services: [],
  servicesPagination: {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
    from: 0,
    to: 0,
  },
  singleService: {},
  servicesCategories: [],
  favouriteServices: [],
  favouriteServicesLoaded: false,
  providers: [],
  singleProvider: {},
  isLoggedIn: false,
  loading: false,
  error: "",
};

const services = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.services) {
        if (Object.hasOwnProperty.call(action.payload?.services, key)) {
          const element = action.payload?.services[key];
          element === "init" && delete action.payload?.services[key];
        }
      }
      return { ...state, ...action.payload.services };

    case GET_SERVICES:
      return {
        ...state,
        loading: true,
      };

    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [],
        servicesPagination: {
          current_page: action.payload?.current_page || 1,
          last_page: action.payload?.last_page || 1,
          per_page: action.payload?.per_page || 20,
          total: action.payload?.total || 0,
          from: action.payload?.from || 0,
          to: action.payload?.to || 0,
        },
        loading: false,
        error: "",
      };

    case GET_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_SINGLE_SERVICE:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_SERVICE_SUCCESS:
      return {
        ...state,
        singleService: action.payload,
        loading: false,
        error: "",
      };

    case GET_SINGLE_SERVICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case GET_SERVICES_CATEGORIES:
      return {
        ...state,
        loading: true,
      };

    case GET_SERVICES_CATEGORIES_SUCCESS:
      return {
        ...state,
        servicesCategories: action.payload,
        loading: false,
        error: "",
      };

    case GET_SERVICES_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case SUBMIT_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SUBMIT_SERVICE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case SUBMIT_SERVICE_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case ADD_SERVICE_TO_FAVORITES:
      return {
        ...state,
        loading: true,
      };

    case ADD_SERVICE_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case ADD_SERVICE_TO_FAVORITES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case REMOVE_SERVICE_FROM_FAVORITES:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_SERVICE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };

    case REMOVE_SERVICE_FROM_FAVORITES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case GET_FAVORITES_SERVICES:
      return {
        ...state,
        loading: true,
      };

    case GET_FAVORITES_SERVICES_SUCCESS:
      return {
        ...state,
        favouriteServices: normalizeFavouriteServices(action.payload),
        favouriteServicesLoaded: true,
        loading: false,
        error: "",
      };

    case GET_FAVORITES_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
        favouriteServicesLoaded: true,
        loading: false,
      };

    //=================================================
    //=================================================

    case GET_SERVICES_PROVIDERS:
      return {
        ...state,
        loading: true,
      };

    case GET_SERVICES_PROVIDERS_SUCCESS:
      return {
        ...state,
        providers: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [],
        loading: false,
        error: "",
      };

    case GET_SERVICES_PROVIDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    //=================================================
    //=================================================

    case GET_SINGLE_SERVICE_PROVIDER:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_SERVICE_PROVIDER_SUCCESS:
      return {
        ...state,
        singleProvider: action.payload,
        loading: false,
        error: "",
      };

    case GET_SINGLE_SERVICE_PROVIDER_FAILURE:
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

export default services;
