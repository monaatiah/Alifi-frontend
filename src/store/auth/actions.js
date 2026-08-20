import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  RESEND_VERIFICATION_EMAIL,
  RESEND_VERIFICATION_EMAIL_FAILURE,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  VERIFY_EMAIL,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "./actionTypes";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

export const loginFailure = (payload) => {
  return {
    type: LOGIN_FAILURE,
    payload: payload,
  };
};

// ==================================================
// ==================================================

export const logout = (payload) => {
  return {
    type: LOGOUT,
    payload,
  };
};
export const logoutSuccess = (payload) => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};
export const logoutFailure = (payload) => {
  return {
    type: LOGOUT_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const signUp = (payload) => {
  return {
    type: SIGNUP,
    payload,
  };
};
export const signUpSuccess = (payload) => {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
};
export const signUpFailure = (payload) => {
  return {
    type: SIGNUP_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const fetchUser = (payload) => {
  return {
    type: FETCH_USER,
    payload,
  };
};
export const fetchUserSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};
export const fetchUserFailure = (payload) => {
  return {
    type: FETCH_USER_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
};
export const updateProfileSuccess = (payload) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload,
  };
};
export const updateProfileFailure = (payload) => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const changePassword = (payload) => {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
};
export const changePasswordSuccess = (payload) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload,
  };
};
export const changePasswordFailure = (payload) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const resetPassword = (payload) => {
  return {
    type: RESET_PASSWORD,
    payload,
  };
};
export const resetPasswordSuccess = (payload) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
};
export const resetPasswordFailure = (payload) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const verifyEmail = (payload) => {
  return {
    type: VERIFY_EMAIL,
    payload,
  };
};
export const verifyEmailSuccess = (payload) => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload,
  };
};
export const verifyEmailFailure = (payload) => {
  return {
    type: VERIFY_EMAIL_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const resendVerificationEmail = (payload) => {
  return {
    type: RESEND_VERIFICATION_EMAIL,
    payload,
  };
};
export const resendVerificationEmailSuccess = (payload) => {
  return {
    type: RESEND_VERIFICATION_EMAIL_SUCCESS,
    payload,
  };
};
export const resendVerificationEmailFailure = (payload) => {
  return {
    type: RESEND_VERIFICATION_EMAIL_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================

export const forgotPassword = (payload) => {
  return {
    type: FORGOT_PASSWORD,
    payload,
  };
};
export const forgotPasswordSuccess = (payload) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload,
  };
};
export const forgotPasswordFailure = (payload) => {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload,
  };
};

// ==================================================
// ==================================================
