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
  ADD_SERVICE_TO_FAVORITES_FAILURE,
  ADD_SERVICE_TO_FAVORITES_SUCCESS,
  REMOVE_SERVICE_FROM_FAVORITES,
  REMOVE_SERVICE_FROM_FAVORITES_FAILURE,
  REMOVE_SERVICE_FROM_FAVORITES_SUCCESS,
  GET_FAVORITES_SERVICES,
  GET_FAVORITES_SERVICES_SUCCESS,
  GET_FAVORITES_SERVICES_FAILURE,
  GET_SERVICES_PROVIDERS,
  GET_SERVICES_PROVIDERS_SUCCESS,
  GET_SERVICES_PROVIDERS_FAILURE,
  GET_SINGLE_SERVICE_PROVIDER,
  GET_SINGLE_SERVICE_PROVIDER_SUCCESS,
  GET_SINGLE_SERVICE_PROVIDER_FAILURE,
} from "./actionTypes";

export const getServices = (payload) => {
  return {
    type: GET_SERVICES,
    payload: payload,
  };
};

export const getServicesSuccess = (payload) => {
  return {
    type: GET_SERVICES_SUCCESS,
    payload: payload,
  };
};

export const getServicesFailure = (payload) => {
  return {
    type: GET_SERVICES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSingleService = (payload) => {
  return {
    type: GET_SINGLE_SERVICE,
    payload: payload,
  };
};

export const getSingleServiceSuccess = (payload) => {
  return {
    type: GET_SINGLE_SERVICE_SUCCESS,
    payload: payload,
  };
};

export const getSingleServiceFailure = (payload) => {
  return {
    type: GET_SINGLE_SERVICE_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getServicesCategories = (payload) => {
  return {
    type: GET_SERVICES_CATEGORIES,
    payload: payload,
  };
};

export const getServicesCategoriesSuccess = (payload) => {
  return {
    type: GET_SERVICES_CATEGORIES_SUCCESS,
    payload: payload,
  };
};

export const getServicesCategoriesFailure = (payload) => {
  return {
    type: GET_SERVICES_CATEGORIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const submitServiceRequest = (payload) => {
  return {
    type: SUBMIT_SERVICE_REQUEST,
    payload: payload,
  };
};

export const submitServiceRequestSuccess = (payload) => {
  return {
    type: SUBMIT_SERVICE_REQUEST_SUCCESS,
    payload: payload,
  };
};

export const submitServiceRequestFailure = (payload) => {
  return {
    type: SUBMIT_SERVICE_REQUEST_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const addServiceToFavorites = (payload) => {
  return {
    type: ADD_SERVICE_TO_FAVORITES,
    payload: payload,
  };
};

export const addServiceToFavoritesSuccess = (payload) => {
  return {
    type: ADD_SERVICE_TO_FAVORITES_SUCCESS,
    payload: payload,
  };
};

export const addServiceToFavoritesFailure = (payload) => {
  return {
    type: ADD_SERVICE_TO_FAVORITES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const removeServiceFromFavorites = (payload) => {
  return {
    type: REMOVE_SERVICE_FROM_FAVORITES,
    payload: payload,
  };
};

export const removeServiceFromFavoritesSuccess = (payload) => {
  return {
    type: REMOVE_SERVICE_FROM_FAVORITES_SUCCESS,
    payload: payload,
  };
};

export const removeServiceFromFavoritesFailure = (payload) => {
  return {
    type: REMOVE_SERVICE_FROM_FAVORITES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getFavoritesServices = (payload) => {
  return {
    type: GET_FAVORITES_SERVICES,
    payload: payload,
  };
};

export const getFavoritesServicesSuccess = (payload) => {
  return {
    type: GET_FAVORITES_SERVICES_SUCCESS,
    payload: payload,
  };
};

export const getFavoritesServicesFailure = (payload) => {
  return {
    type: GET_FAVORITES_SERVICES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getServicesProviders = (payload) => {
  return {
    type: GET_SERVICES_PROVIDERS,
    payload: payload,
  };
};

export const getServicesProvidersSuccess = (payload) => {
  return {
    type: GET_SERVICES_PROVIDERS_SUCCESS,
    payload: payload,
  };
};

export const getServicesProvidersFailure = (payload) => {
  return {
    type: GET_SERVICES_PROVIDERS_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getSingleServiceProvider = (payload) => {
  return {
    type: GET_SINGLE_SERVICE_PROVIDER,
    payload: payload,
  };
};

export const getSingleServiceProviderSuccess = (payload) => {
  return {
    type: GET_SINGLE_SERVICE_PROVIDER_SUCCESS,
    payload: payload,
  };
};

export const getSingleServiceProviderFailure = (payload) => {
  return {
    type: GET_SINGLE_SERVICE_PROVIDER_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
