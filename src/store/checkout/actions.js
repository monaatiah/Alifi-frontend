import {
  GET_CHECKOUT_FORM_SCHEMA,
  GET_CHECKOUT_FORM_SCHEMA_FAILURE,
  GET_CHECKOUT_FORM_SCHEMA_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRY_CITIES,
  GET_COUNTRY_CITIES_FAILURE,
  GET_COUNTRY_CITIES_SUCCESS,
  GET_COUNTRY_STATES,
  GET_COUNTRY_STATES_FAILURE,
  GET_COUNTRY_STATES_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_FAILURE,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_REGION_CITIES,
  GET_REGION_CITIES_FAILURE,
  GET_REGION_CITIES_SUCCESS,
  GET_SHIPPING_METHODS,
  GET_SHIPPING_METHODS_FAILURE,
  GET_SHIPPING_METHODS_SUCCESS,
  PROCESS_CHECKOUT,
  PROCESS_CHECKOUT_FAILURE,
  PROCESS_CHECKOUT_SUCCESS,
} from "./actionTypes";

// ==================================================
// ==================================================

export const getCheckoutFormSchema = (payload) => {
  return {
    type: GET_CHECKOUT_FORM_SCHEMA,
    payload: payload,
  };
};

export const getCheckoutFormSchemaSuccess = (payload) => {
  return {
    type: GET_CHECKOUT_FORM_SCHEMA_SUCCESS,
    payload: payload,
  };
};

export const getCheckoutFormSchemaFailure = (payload) => {
  return {
    type: GET_CHECKOUT_FORM_SCHEMA_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getPaymentMethods = (payload) => {
  return {
    type: GET_PAYMENT_METHODS,
    payload: payload,
  };
};

export const getPaymentMethodsSuccess = (payload) => {
  return {
    type: GET_PAYMENT_METHODS_SUCCESS,
    payload: payload,
  };
};

export const getPaymentMethodsFailure = (payload) => {
  return {
    type: GET_PAYMENT_METHODS_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getShippingMethods = (payload) => {
  return {
    type: GET_SHIPPING_METHODS,
    payload: payload,
  };
};

export const getShippingMethodsSuccess = (payload) => {
  return {
    type: GET_SHIPPING_METHODS_SUCCESS,
    payload: payload,
  };
};

export const getShippingMethodsFailure = (payload) => {
  return {
    type: GET_SHIPPING_METHODS_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getCountries = (payload) => {
  return {
    type: GET_COUNTRIES,
    payload: payload,
  };
};

export const getCountriesSuccess = (payload) => {
  return {
    type: GET_COUNTRIES_SUCCESS,
    payload: payload,
  };
};

export const getCountriesFailure = (payload) => {
  return {
    type: GET_COUNTRIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getCountryCities = (payload) => {
  return {
    type: GET_COUNTRY_CITIES,
    payload: payload,
  };
};

export const getCountryCitiesSuccess = (payload) => {
  return {
    type: GET_COUNTRY_CITIES_SUCCESS,
    payload: payload,
  };
};

export const getCountryCitiesFailure = (payload) => {
  return {
    type: GET_COUNTRY_CITIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getCountryStates = (payload) => {
  return {
    type: GET_COUNTRY_STATES,
    payload: payload,
  };
};

export const getCountryStatesSuccess = (payload) => {
  return {
    type: GET_COUNTRY_STATES_SUCCESS,
    payload: payload,
  };
};

export const getCountryStatesFailure = (payload) => {
  return {
    type: GET_COUNTRY_STATES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const getRegionCities = (payload) => {
  return {
    type: GET_REGION_CITIES,
    payload: payload,
  };
};

export const getRegionCitiesSuccess = (payload) => {
  return {
    type: GET_REGION_CITIES_SUCCESS,
    payload: payload,
  };
};

export const getRegionCitiesFailure = (payload) => {
  return {
    type: GET_REGION_CITIES_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const processCheckout = (payload) => {
  return {
    type: PROCESS_CHECKOUT,
    payload: payload,
  };
};

export const processCheckoutSuccess = (payload) => {
  return {
    type: PROCESS_CHECKOUT_SUCCESS,
    payload: payload,
  };
};

export const processCheckoutFailure = (payload) => {
  return {
    type: PROCESS_CHECKOUT_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================
