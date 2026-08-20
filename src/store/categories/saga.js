import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getCategoriesFailure,
  getCategoriesSuccess,
  getCategoryProductsFailure,
  getCategoryProductsSuccess,
  getSingleCategoryFailure,
  getSingleCategorySuccess,
} from "./actions";
import {
  getCategoriesApi,
  getCategoryProductsApi,
  getSingleCategoryApi,
} from "@/api/categories";
import {
  GET_CATEGORIES,
  GET_CATEGORY_PRODUCTS,
  GET_SINGLE_CATEGORY,
} from "./actionTypes";

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message || error?.message || "An error occurred"
  );
};

function* getCategoriesSaga({ payload }) {
  try {
    const { data } = yield call(getCategoriesApi, payload);
    yield put(getCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCategoriesFailure(getErrorMessage(error)));
  }
}

// ==================================================
// ==================================================

function* getSingleCategorySaga({ payload }) {
  try {
    const { data } = yield call(getSingleCategoryApi, payload);
    yield put(getSingleCategorySuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getSingleCategoryFailure(getErrorMessage(error)));
  }
}

// ==================================================
// ==================================================

function* getCategoryProductsSaga({ payload }) {
  try {
    const { data } = yield call(getCategoryProductsApi, payload);
    yield put(getCategoryProductsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCategoryProductsFailure(getErrorMessage(error)));
  }
}

// ==================================================
// ==================================================

export function* watchGetCategories() {
  yield takeEvery(GET_CATEGORIES, getCategoriesSaga);
}
export function* watchGetSingleCategory() {
  yield takeEvery(GET_SINGLE_CATEGORY, getSingleCategorySaga);
}

export function* watchGetCategoryProducts() {
  yield takeEvery(GET_CATEGORY_PRODUCTS, getCategoryProductsSaga);
}

// ==================================================
// ==================================================

function* categoriesSaga() {
  yield all([fork(watchGetCategories)]);
  yield all([fork(watchGetSingleCategory)]);
  yield all([fork(watchGetCategoryProducts)]);
}

export default categoriesSaga;
