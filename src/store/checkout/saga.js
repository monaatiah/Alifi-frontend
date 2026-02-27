import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getCheckoutFormSchemaApi,
  getPaymentMethodsApi,
  getShippingMethodsApi,
  getCountriesApi,
  getCountryCitiesApi,
  getCountryStatesApi,
  getRegionCitiesApi,
  processCheckoutApi,
} from "@/api/checkout";
import {
  getCheckoutFormSchemaSuccess,
  getCheckoutFormSchemaFailure,
  getPaymentMethodsSuccess,
  getPaymentMethodsFailure,
  getShippingMethodsSuccess,
  getShippingMethodsFailure,
  getCountriesSuccess,
  getCountriesFailure,
  getCountryCitiesSuccess,
  getCountryCitiesFailure,
  getCountryStatesSuccess,
  getCountryStatesFailure,
  getRegionCitiesSuccess,
  getRegionCitiesFailure,
  processCheckoutFailure,
  processCheckoutSuccess,
} from "./actions";
import {
  GET_CHECKOUT_FORM_SCHEMA,
  GET_PAYMENT_METHODS,
  GET_SHIPPING_METHODS,
  GET_COUNTRIES,
  GET_COUNTRY_CITIES,
  GET_COUNTRY_STATES,
  GET_REGION_CITIES,
  PROCESS_CHECKOUT,
} from "./actionTypes";
import toast from "react-hot-toast";

// ==================================================
// ==================================================

function* getCheckoutFormSchemaSaga({ payload }) {
  try {
    const { data } = yield call(getCheckoutFormSchemaApi, payload);
    yield put(getCheckoutFormSchemaSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCheckoutFormSchemaFailure(error));
  }
}

// ==================================================
// ==================================================
function* getPaymentMethodsSaga({ payload }) {
  try {
    const { data } = yield call(getPaymentMethodsApi, payload);
    yield put(getPaymentMethodsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getPaymentMethodsFailure(error));
  }
}
// ==================================================
// ==================================================

function* getShippingMethodsSaga({ payload }) {
  try {
    const { data } = yield call(getShippingMethodsApi, payload);
    yield put(getShippingMethodsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getShippingMethodsFailure(error));
  }
}

// ==================================================
// ==================================================

function* getCountriesSaga({ payload }) {
  try {
    const { data } = yield call(getCountriesApi, payload);
    yield put(getCountriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCountriesFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getCountryCitiesSaga({ payload }) {
  try {
    const { data } = yield call(getCountryCitiesApi, payload);
    yield put(getCountryCitiesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCountryCitiesFailure(error));
  }
}

// ==================================================
// ==================================================
function* getCountryStatesSaga({ payload }) {
  try {
    const { data } = yield call(getCountryStatesApi, payload);
    yield put(getCountryStatesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCountryStatesFailure(error));
  }
}

// ==================================================
// ==================================================
function* getRegionCitiesSaga({ payload }) {
  try {
    const { data } = yield call(getRegionCitiesApi, payload);
    yield put(getRegionCitiesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getRegionCitiesFailure(error));
  }
}

// ==================================================
// ==================================================

function* processCheckoutSaga({ payload }) {
  try {
    const { data } = yield call(processCheckoutApi, payload);
    yield put(processCheckoutSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(processCheckoutFailure(error?.message || "An error occurred"));
    toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المنتج");
  }
}

// ==================================================
// ==================================================

export function* watchGetCheckoutFormSchema() {
  yield takeEvery(GET_CHECKOUT_FORM_SCHEMA, getCheckoutFormSchemaSaga);
}

export function* watchGetPaymentMethods() {
  yield takeEvery(GET_PAYMENT_METHODS, getPaymentMethodsSaga);
}

export function* watchGetShippingMethods() {
  yield takeEvery(GET_SHIPPING_METHODS, getShippingMethodsSaga);
}

export function* watchGetCountries() {
  yield takeEvery(GET_COUNTRIES, getCountriesSaga);
}

export function* watchGetCountryCities() {
  yield takeEvery(GET_COUNTRY_CITIES, getCountryCitiesSaga);
}

export function* watchGetCountryStates() {
  yield takeEvery(GET_COUNTRY_STATES, getCountryStatesSaga);
}

export function* watchGetRegionCities() {
  yield takeEvery(GET_REGION_CITIES, getRegionCitiesSaga);
}

export function* watchProcessCheckout() {
  yield takeEvery(PROCESS_CHECKOUT, processCheckoutSaga);
}

// ==================================================
// ==================================================

function* checkoutSaga() {
  yield all([fork(watchGetCheckoutFormSchema)]);
  yield all([fork(watchGetPaymentMethods)]);
  yield all([fork(watchGetShippingMethods)]);
  yield all([fork(watchGetCountries)]);
  yield all([fork(watchGetCountryCities)]);
  yield all([fork(watchGetCountryStates)]);
  yield all([fork(watchGetRegionCities)]);
  yield all([fork(watchProcessCheckout)]);
}

export default checkoutSaga;
