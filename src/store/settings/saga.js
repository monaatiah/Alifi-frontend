import {
  contactUsApi,
  developerRequestApi,
  getPageDataApi,
  getSectionDataApi,
  getSettingsApi,
  startObjectionApi,
} from "@/api/settings";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  contactUsFailure,
  contactUsSuccess,
  developerRequestFailure,
  developerRequestSuccess,
  getPageDataFailure,
  getPageDataSuccess,
  getSectionDataFailure,
  getSectionDataSuccess,
  getSettingsFailure,
  getSettingsSuccess,
  startObjectionFailure,
  startObjectionSuccess,
} from "./actions";
import {
  CONTACT_US,
  DEVELOPER_REQUEST,
  GET_PAGE_DATA,
  GET_SECTION_DATA,
  GET_SETTINGS,
  START_OBJECTION_REQUEST,
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

function* contactUsSaga({ payload }) {
  try {
    const { data, success, message } = yield call(contactUsApi, payload);
    yield put(contactUsSuccess(data));
    if (success) {
      yield payload.toast.success(
        message || payload?.formatMessage({ id: "contactUsSuccess" })
      );
      yield payload.reset();
    }
  } catch (error) {
    console.log(error);
    yield put(contactUsFailure(error));
    yield payload.toast.error(error.response?.data?.message || error);
  }
}

// ==================================================
// ==================================================

function* startObjectionRequestSaga({ payload }) {
  try {
    const { data, success } = yield call(startObjectionApi, payload);
    if (success) {
      yield toast.success(
        payload?.formatMessage({ id: "requestObjectionSuccess" })
      );
      yield put(startObjectionSuccess(data));
      yield payload.setStep(1);
      yield payload.reset();
    }
  } catch (error) {
    console.log(error);
    yield put(startObjectionFailure(error));
    yield toast.error(
      JSON.stringify(error.response.data.errors?.map((err) => err.msg))
    );
  }
}

// ==================================================
// ==================================================

function* developerRequestSaga({ payload }) {
  try {
    const { data, success } = yield call(developerRequestApi, payload);
    if (success) {
      yield toast.success(
        payload?.formatMessage({ id: "developerRequestSuccess" })
      );
      yield put(developerRequestSuccess(data));
      yield payload.setStep(1);
      yield payload.reset();
    }
  } catch (error) {
    console.log(error);
    yield put(developerRequestFailure(error));
    yield toast.error(
      JSON.stringify(error.response.data.errors?.map((err) => err.msg))
    );
  }
}

// ==================================================
// ==================================================

function* getSectionDataSaga({ payload }) {
  try {
    const { data } = yield call(getSectionDataApi, payload);
    yield put(getSectionDataSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getSectionDataFailure(error));
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

export function* watchContactUs() {
  yield takeEvery(CONTACT_US, contactUsSaga);
}

export function* watchStartObjectionRequest() {
  yield takeEvery(START_OBJECTION_REQUEST, startObjectionRequestSaga);
}

export function* watchDeveloperRequest() {
  yield takeEvery(DEVELOPER_REQUEST, developerRequestSaga);
}

export function* watchGetSectionData() {
  yield takeEvery(GET_SECTION_DATA, getSectionDataSaga);
}

// ==================================================
// ==================================================

function* settingsSaga() {
  yield all([fork(watchGetPageData)]);
  yield all([fork(watchGetSettings)]);
  yield all([fork(watchContactUs)]);
  yield all([fork(watchStartObjectionRequest)]);
  yield all([fork(watchDeveloperRequest)]);
  yield all([fork(watchGetSectionData)]);
}

export default settingsSaga;
