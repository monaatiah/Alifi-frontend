import { getPageDataApi, getSettingsApi } from "@/api/settings";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getPageDataFailure,
  getPageDataSuccess,
  getSettingsFailure,
  getSettingsSuccess,
} from "./actions";
import { GET_PAGE_DATA, GET_SETTINGS } from "./actionTypes";

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

export function* watchGetPageData() {
  yield takeEvery(GET_PAGE_DATA, getPageDataSaga);
}

export function* watchGetSettings() {
  yield takeEvery(GET_SETTINGS, getSettingsSaga);
}

// ==================================================
// ==================================================

function* settingsSaga() {
  yield all([fork(watchGetPageData)]);
  yield all([fork(watchGetSettings)]);
}

export default settingsSaga;
