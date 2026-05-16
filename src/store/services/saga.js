import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  addServiceToFavoritesFailure,
  addServiceToFavoritesSuccess,
  getFavoritesServices,
  getFavoritesServicesFailure,
  getFavoritesServicesSuccess,
  getServicesCategoriesFailure,
  getServicesCategoriesSuccess,
  getServicesFailure,
  getServicesProvidersFailure,
  getServicesProvidersSuccess,
  getServicesSuccess,
  getSingleServiceFailure,
  getSingleServiceProviderFailure,
  getSingleServiceProviderSuccess,
  getSingleServiceSuccess,
  removeServiceFromFavoritesFailure,
  removeServiceFromFavoritesSuccess,
  submitServiceRequestFailure,
  submitServiceRequestSuccess,
} from "./actions";
import {
  addServiceToFavoritesApi,
  getFavoriteServicesApi,
  getServicesApi,
  getServicesCategoriesApi,
  getServicesProvidersApi,
  getSingleServiceApi,
  getSingleServiceProviderApi,
  removeServiceFromFavoritesApi,
  submitServiceRequestApi,
} from "@/api/services";
import {
  ADD_SERVICE_TO_FAVORITES,
  GET_FAVORITES_SERVICES,
  GET_SERVICES,
  GET_SERVICES_CATEGORIES,
  GET_SERVICES_PROVIDERS,
  GET_SINGLE_SERVICE,
  GET_SINGLE_SERVICE_PROVIDER,
  REMOVE_SERVICE_FROM_FAVORITES,
  SUBMIT_SERVICE_REQUEST,
} from "./actionTypes";

function* getServicesSaga({ payload }) {
  try {
    const { data } = yield call(getServicesApi, payload);
    yield put(getServicesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getServicesFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getSingleServiceaga({ payload }) {
  try {
    const { data } = yield call(getSingleServiceApi, payload);
    yield put(getSingleServiceSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getSingleServiceFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getServicesCategoriesSaga({ payload }) {
  try {
    const { data } = yield call(getServicesCategoriesApi, payload);
    yield put(getServicesCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      getServicesCategoriesFailure(error?.message || "An error occurred"),
    );
  }
}

// ==================================================
// ==================================================

function* submitServiceRequestSaga({ payload }) {
  try {
    const { data } = yield call(submitServiceRequestApi, payload);
    yield put(submitServiceRequestSuccess(data));
    if (payload?.reset) payload.reset();
  } catch (error) {
    console.log(error);
    yield put(
      submitServiceRequestFailure(error?.message || "An error occurred"),
    );
  }
}

// ==================================================
// ==================================================

function* addServiceToFavoritesSaga({ payload }) {
  try {
    const { data } = yield call(addServiceToFavoritesApi, payload);
    yield put(addServiceToFavoritesSuccess(data));
    yield put(getFavoritesServices({ cookies: payload?.cookies || {} }));
  } catch (error) {
    console.log(error);
    yield put(
      addServiceToFavoritesFailure(error?.message || "An error occurred"),
    );
  }
}

// ==================================================
// ==================================================

function* removeServiceFromFavoritesSaga({ payload }) {
  try {
    const { data } = yield call(removeServiceFromFavoritesApi, payload);
    yield put(removeServiceFromFavoritesSuccess(data));
    yield put(getFavoritesServices({ cookies: payload?.cookies || {} }));
  } catch (error) {
    console.log(error);
    yield put(
      removeServiceFromFavoritesFailure(error?.message || "An error occurred"),
    );
  }
}

//=================================================
//=================================================

function* getFavoritesServicesSaga({ payload }) {
  try {
    const { data } = yield call(getFavoriteServicesApi, payload);
    yield put(getFavoritesServicesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      getFavoritesServicesFailure(error?.message || "An error occurred"),
    );
  }
}

//=================================================
//=================================================

function* getServicesProvidersSaga({ payload }) {
  try {
    const { data } = yield call(getServicesProvidersApi, payload);
    yield put(getServicesProvidersSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      getServicesProvidersFailure(error?.message || "An error occurred"),
    );
  }
}

//=================================================
//=================================================

function* getSingleServiceProvidersSaga({ payload }) {
  try {
    const { data } = yield call(getSingleServiceProviderApi, payload);
    yield put(getSingleServiceProviderSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      getSingleServiceProviderFailure(error?.message || "An error occurred"),
    );
  }
}

//=================================================
//=================================================

export function* watchGetServices() {
  yield takeEvery(GET_SERVICES, getServicesSaga);
}
export function* watchGetSingleService() {
  yield takeEvery(GET_SINGLE_SERVICE, getSingleServiceaga);
}
export function* watchGetServicesCategories() {
  yield takeEvery(GET_SERVICES_CATEGORIES, getServicesCategoriesSaga);
}
export function* watchSubmitServiceRequest() {
  yield takeEvery(SUBMIT_SERVICE_REQUEST, submitServiceRequestSaga);
}
export function* watchAddServiceToFavorites() {
  yield takeEvery(ADD_SERVICE_TO_FAVORITES, addServiceToFavoritesSaga);
}
export function* watchRemoveServiceFromFavorites() {
  yield takeEvery(
    REMOVE_SERVICE_FROM_FAVORITES,
    removeServiceFromFavoritesSaga,
  );
}
export function* watchGetFavoritesServices() {
  yield takeEvery(GET_FAVORITES_SERVICES, getFavoritesServicesSaga);
}
export function* watchGetServicesProviders() {
  yield takeEvery(GET_SERVICES_PROVIDERS, getServicesProvidersSaga);
}
export function* watchGetSingleServiceProvider() {
  yield takeEvery(GET_SINGLE_SERVICE_PROVIDER, getSingleServiceProvidersSaga);
}

// ==================================================
// ==================================================

function* servicesSaga() {
  yield all([
    fork(watchGetServices),
    fork(watchGetSingleService),
    fork(watchGetServicesCategories),
    fork(watchSubmitServiceRequest),
    fork(watchAddServiceToFavorites),
    fork(watchRemoveServiceFromFavorites),
    fork(watchGetFavoritesServices),
    fork(watchGetServicesProviders),
    fork(watchGetSingleServiceProvider),
  ]);
}

export default servicesSaga;
