import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getProductsFailure,
  getProductsSuccess,
  getSingleProductFailure,
  getSingleProductSuccess,
} from "./actions";
import { getProductsApi, getSingleProductApi } from "@/api/products";
import { GET_PRODUCTS, GET_SINGLE_PRODUCT } from "./actionTypes";

function* getProductsSaga({ payload }) {
  try {
    const { data } = yield call(getProductsApi, payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getProductsFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getSingleProductSaga({ payload }) {
  try {
    const { data } = yield call(getSingleProductApi, payload);
    yield put(getSingleProductSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getSingleProductFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getProductsSaga);
}
export function* watchGetSingleProduct() {
  yield takeEvery(GET_SINGLE_PRODUCT, getSingleProductSaga);
}

// ==================================================
// ==================================================

function* productsSaga() {
  yield all([fork(watchGetProducts)]);
  yield all([fork(watchGetSingleProduct)]);
}

export default productsSaga;
