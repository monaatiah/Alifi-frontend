import {
  getFormSchemaApi,
  getPageDataApi,
  getSettingsApi,
  joinUsApi,
  postFormSubmissionApi,
} from "@/api/settings";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getFormSchemaFailure,
  getFormSchemaSuccess,
  getPageDataFailure,
  getPageDataSuccess,
  getSettingsFailure,
  getSettingsSuccess,
  joinUsFailure,
  joinUsSuccess,
  postFormSubmissionFailure,
  postFormSubmissionSuccess,
} from "./actions";
import {
  GET_FORM_SCHEMA,
  GET_PAGE_DATA,
  GET_SETTINGS,
  JOIN_US,
  POST_FORM_SUBMISSION,
} from "./actionTypes";
import toast from "react-hot-toast";

function* getPageDataSaga({ payload }) {
  try {
    const { data } = yield call(getPageDataApi, payload);
    yield put(getPageDataSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getPageDataFailure(error));
  }
}

// ==================================================
// ==================================================

function* getSettingsSaga({ payload }) {
  try {
    const { data } = yield call(getSettingsApi, payload);
    yield put(getSettingsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getSettingsFailure(error));
  }
}

// ==================================================
// ==================================================

function* joinUsSaga({ payload }) {
  try {
    const { data } = yield call(joinUsApi, payload);
    yield put(joinUsSuccess(data));
    if (payload.reset) {
      payload.reset();
    }
    toast.success("تم ارسال طلبك بنجاح");
  } catch (error) {
    console.log(error);
    yield put(joinUsFailure(error));
    toast.error("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
  }
}

// ==================================================
// ==================================================

function* getFormSchemaSaga({ payload }) {
  try {
    const { data } = yield call(getFormSchemaApi, payload);
    yield put(getFormSchemaSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getFormSchemaFailure(error));
  }
}

// ==================================================
// ==================================================

function* postFormSubmissionSaga({ payload }) {
  try {
    const { message } = yield call(postFormSubmissionApi, payload);
    yield put(postFormSubmissionSuccess(message));
    if (payload.reset) {
      payload.reset();
    }
    toast.success(message || "تم ارسال طلبك بنجاح");
  } catch (error) {
    console.log(error);
    yield put(postFormSubmissionFailure(error?.response?.message));
    toast.error("حدث خطأ ما. يرجى المحاولة مرة أخرى.");
  }
}

// ==================================================
// ==================================================

export function* watchGetPageData() {
  yield takeEvery(GET_PAGE_DATA, getPageDataSaga);
}

export function* watchGetSettings() {
  yield takeEvery(GET_SETTINGS, getSettingsSaga);
}

export function* watchJoinUs() {
  yield takeEvery(JOIN_US, joinUsSaga);
}

export function* watchGetFormSchema() {
  yield takeEvery(GET_FORM_SCHEMA, getFormSchemaSaga);
}

export function* watchPostFormSubmission() {
  yield takeEvery(POST_FORM_SUBMISSION, postFormSubmissionSaga);
}

// ==================================================
// ==================================================

function* settingsSaga() {
  yield all([
    fork(watchGetPageData),
    fork(watchGetSettings),
    fork(watchJoinUs),
    fork(watchGetFormSchema),
    fork(watchPostFormSubmission),
  ]);
}

export default settingsSaga;
