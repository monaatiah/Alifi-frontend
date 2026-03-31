import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getContentFailure,
  getContentSuccess,
  getContentBySlugFailure,
  getContentBySlugSuccess,
  getContentCategoriesSuccess,
  getContentCategoriesFailure,
} from "./actions";
import {
  getContentApi,
  getContentBySlugApi,
  getContentCategoriesApi,
} from "@/api/content";
import {
  GET_CONTENT,
  GET_CONTENT_BY_SLUG,
  GET_CONTENT_CATEGORIES,
} from "./actionTypes";

function* getContentSaga({ payload }) {
  try {
    const { data } = yield call(getContentApi, payload);
    yield put(getContentSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getContentFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getContentBySlugSaga({ payload }) {
  try {
    const { data } = yield call(getContentBySlugApi, payload);
    yield put(getContentBySlugSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getContentBySlugFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getContentCategoriesSaga({ payload }) {
  try {
    const { data } = yield call(getContentCategoriesApi, payload);
    yield put(getContentCategoriesSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(
      getContentCategoriesFailure(error?.message || "An error occurred"),
    );
  }
}

//=================================================
//=================================================

export function* watchGetContent() {
  yield takeEvery(GET_CONTENT, getContentSaga);
}
export function* watchGetContentBySlug() {
  yield takeEvery(GET_CONTENT_BY_SLUG, getContentBySlugSaga);
}
export function* watchGetContentCategories() {
  yield takeEvery(GET_CONTENT_CATEGORIES, getContentCategoriesSaga);
}

// ==================================================
// ==================================================

function* contentSaga() {
  yield all([
    fork(watchGetContent),
    fork(watchGetContentBySlug),
    fork(watchGetContentCategories),
  ]);
}

export default contentSaga;
