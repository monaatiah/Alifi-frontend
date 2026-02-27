import { HYDRATE } from "next-redux-wrapper";
import {
  GET_CHECKOUT_FORM_SCHEMA,
  GET_CHECKOUT_FORM_SCHEMA_FAILURE,
  GET_CHECKOUT_FORM_SCHEMA_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_FAILURE,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_SHIPPING_METHODS,
  GET_SHIPPING_METHODS_FAILURE,
  GET_SHIPPING_METHODS_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRY_CITIES,
  GET_COUNTRY_CITIES_FAILURE,
  GET_COUNTRY_CITIES_SUCCESS,
  GET_COUNTRY_STATES,
  GET_COUNTRY_STATES_FAILURE,
  GET_COUNTRY_STATES_SUCCESS,
  GET_REGION_CITIES,
  GET_REGION_CITIES_SUCCESS,
  GET_REGION_CITIES_FAILURE,
  PROCESS_CHECKOUT,
  PROCESS_CHECKOUT_SUCCESS,
  PROCESS_CHECKOUT_FAILURE,
} from "./actionTypes";

const initialState = {
  checkoutFields: [],
  paymentMethods: [],
  shippingMethods: [],
  countries: [],
  countryCities: [],
  countryStates: [],
  regionCities: [],
  isLoggedIn: false,
  loading: false,
  error: "",
};

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      for (const key in action.payload?.checkout) {
        if (Object.hasOwnProperty.call(action.payload?.checkout, key)) {
          const element = action.payload?.checkout[key];
          element === "init" && delete action.payload?.checkout[key];
        }
      }
      return { ...state, ...action.payload.checkout };

    //=================================================
    //=================================================
    case GET_CHECKOUT_FORM_SCHEMA:
      return {
        ...state,
        loading: true,
      };

    case GET_CHECKOUT_FORM_SCHEMA_SUCCESS:
      return {
        ...state,
        checkoutFields: action.payload,
        loading: false,
      };

    case GET_CHECKOUT_FORM_SCHEMA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================
    case GET_PAYMENT_METHODS:
      return {
        ...state,
        loading: true,
      };

    case GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethods: action.payload,
        loading: false,
      };

    case GET_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================
    case GET_SHIPPING_METHODS:
      return {
        ...state,
        loading: true,
      };

    case GET_SHIPPING_METHODS_SUCCESS:
      return {
        ...state,
        shippingMethods: action.payload,
        loading: false,
      };

    case GET_SHIPPING_METHODS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================
    case GET_COUNTRIES:
      return {
        ...state,
        loading: true,
      };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };

    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_COUNTRY_CITIES:
      return {
        ...state,
        loading: true,
      };

    case GET_COUNTRY_CITIES_SUCCESS:
      return {
        ...state,
        countryCities: action.payload,
        loading: false,
      };

    case GET_COUNTRY_CITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================
    case GET_COUNTRY_STATES:
      return {
        ...state,
        loading: true,
      };

    case GET_COUNTRY_STATES_SUCCESS:
      return {
        ...state,
        countryStates: action.payload,
        loading: false,
      };

    case GET_COUNTRY_STATES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case GET_REGION_CITIES:
      return {
        ...state,
        loading: true,
      };

    case GET_REGION_CITIES_SUCCESS:
      return {
        ...state,
        regionCities: action.payload,
        loading: false,
      };

    case GET_REGION_CITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // ==================================================
    // ==================================================

    case PROCESS_CHECKOUT:
      return {
        ...state,
        loading: true,
      };

    case PROCESS_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PROCESS_CHECKOUT_FAILURE:
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

export default checkout;
