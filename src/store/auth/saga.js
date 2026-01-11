import { fork, put, all, call, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { authApi } from "@/api/authentication";
import { loginFailure, loginSuccess } from "./actions";
import { LOGIN, SIGNUP } from "./actionTypes";

function* loginSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(loginSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error));
  }
}

// ==================================================
// ==================================================

function* signUpSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(signUpSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(signUpFailure(error));
  }
}

// ==================================================
// ==================================================

export function* watchLogin() {
  yield takeLatest(LOGIN, loginSaga);
}
export function* watchSignUp() {
  yield takeLatest(SIGNUP, signUpSaga);
}

// ==================================================
// ==================================================

function* authSaga() {
  yield all([fork(watchLogin)]);
  yield all([fork(watchSignUp)]);
}

export default authSaga;
