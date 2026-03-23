import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getContentFailure,
  getContentSuccess,
  getContentBySlugFailure,
  getContentBySlugSuccess,
} from "./actions";
import { getContentApi, getContentBySlugApi } from "@/api/content";
import { GET_CONTENT, GET_CONTENT_BY_SLUG } from "./actionTypes";

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

export function* watchGetContent() {
  yield takeEvery(GET_CONTENT, getContentSaga);
}
export function* watchGetContentBySlug() {
  yield takeEvery(GET_CONTENT_BY_SLUG, getContentBySlugSaga);
}

// ==================================================
// ==================================================

function* contentSaga() {
  yield all([fork(watchGetContent), fork(watchGetContentBySlug)]);
}

export default contentSaga;
