import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getCategoriesFailure,
  getCategoriesSuccess,
  getSingleCategoryFailure,
  getSingleCategorySuccess,
} from "./actions";
import { getCategoriesApi, getSingleCategoryApi } from "@/api/categories";
import { GET_CATEGORIES, GET_SINGLE_CATEGORY } from "./actionTypes";

function* getCategoriesSaga({ payload }) {
  try {
    const { data } = yield call(getCategoriesApi, payload);
    yield put(getCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getCategoriesFailure(error));
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
    yield put(getSingleCategoryFailure(error));
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

// ==================================================
// ==================================================

function* categoriesSaga() {
  yield all([fork(watchGetCategories)]);
  yield all([fork(watchGetSingleCategory)]);
}

export default categoriesSaga;
