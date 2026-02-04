import { fork, put, all, call, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { authApi, fetchUserApi } from "@/api/authentication";
import {
  fetchUserFailure,
  fetchUserSuccess,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  resendVerificationEmailFailure,
  resendVerificationEmailSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
  signUpFailure,
  signUpSuccess,
  verifyEmailFailure,
  verifyEmailSuccess,
} from "./actions";
import {
  FETCH_USER,
  FORGOT_PASSWORD,
  LOGIN,
  LOGOUT,
  RESEND_VERIFICATION_EMAIL,
  RESET_PASSWORD,
  SIGNUP,
  VERIFY_EMAIL,
} from "./actionTypes";

import router from "next/router";
import { setCookie } from "nookies";

function* loginSaga({ payload }) {
  try {
    const { data, status } = yield call(authApi, payload);
    if (status === 200) {
      toast.success(data?.message || "Login successful");
      yield put(loginSuccess(data));
    }

    if (data?.customer?.email_verified) {
      router.push("/");
    } else {
      router.push("/verify");
    }
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* signUpSaga({ payload }) {
  try {
    const { data, status } = yield call(authApi, payload);
    if (status === 200) {
      toast.success(data?.message || "Registration successful");
      yield put(signUpSuccess(data));
    }

    if (data?.customer?.email_verified) {
      router.push("/");
    } else {
      router.push("/verify");
    }
  } catch (error) {
    console.log(error);
    yield put(signUpFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* logoutSaga({ payload }) {
  try {
    yield put(logoutSuccess(payload));
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* fetchUserSaga({ payload }) {
  try {
    const { data } = yield call(fetchUserApi, payload);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchUserFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* verifyEmailSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(verifyEmailSuccess(data));
    toast.success(data?.message || "Email verified successfully");
    setCookie(null, "token", data.token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    router.push("/");
  } catch (error) {
    console.log(error);
    yield put(verifyEmailFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* resendVerificationEmailSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(resendVerificationEmailSuccess(data));
    toast.success(data?.message || "Verification email resent successfully");
  } catch (error) {
    console.log(error);
    yield put(resendVerificationEmailFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* resetPasswordSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(resetPasswordSuccess(data));
    toast.success(data?.message || "Password reset successfully");
    router.push("/login");
  } catch (error) {
    console.log(error);
    yield put(resetPasswordFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
}

// ==================================================
// ==================================================

function* forgotPasswordSaga({ payload }) {
  try {
    const { data } = yield call(authApi, payload);
    yield put(forgotPasswordSuccess(data));
    toast.success(data?.message || "Password reset link sent to your email");
    router.push("/login");
  } catch (error) {
    console.log(error);
    yield put(forgotPasswordFailure(error.response.data.message));
    toast.error(error.response.data.message);
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

export function* watchFetchUser() {
  yield takeLatest(FETCH_USER, fetchUserSaga);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutSaga);
}

export function* watchVerifyEmail() {
  yield takeLatest(VERIFY_EMAIL, verifyEmailSaga);
}

export function* watchResendVerificationEmail() {
  yield takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmailSaga);
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga);
}

// ==================================================
// ==================================================

function* authSaga() {
  yield all([fork(watchLogin)]);
  yield all([fork(watchSignUp)]);
  yield all([fork(watchFetchUser)]);
  yield all([fork(watchLogout)]);
  yield all([fork(watchVerifyEmail)]);
  yield all([fork(watchResendVerificationEmail)]);
  yield all([fork(watchResetPassword)]);
  yield all([fork(watchForgotPassword)]);
}

export default authSaga;
