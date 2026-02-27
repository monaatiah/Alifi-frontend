import { getPageDataApi, getSettingsApi, joinUsApi } from "@/api/settings";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import {
  getPageDataFailure,
  getPageDataSuccess,
  getSettingsFailure,
  getSettingsSuccess,
  joinUsFailure,
  joinUsSuccess,
} from "./actions";
import { GET_PAGE_DATA, GET_SETTINGS, JOIN_US } from "./actionTypes";
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

export function* watchGetPageData() {
  yield takeEvery(GET_PAGE_DATA, getPageDataSaga);
}

export function* watchGetSettings() {
  yield takeEvery(GET_SETTINGS, getSettingsSaga);
}

export function* watchJoinUs() {
  yield takeEvery(JOIN_US, joinUsSaga);
}
// ==================================================
// ==================================================

function* settingsSaga() {
  yield all([fork(watchGetPageData)]);
  yield all([fork(watchGetSettings)]);
  yield all([fork(watchJoinUs)]);
}

export default settingsSaga;
