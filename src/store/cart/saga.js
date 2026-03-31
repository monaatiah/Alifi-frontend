import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";
import toast from "react-hot-toast";
import { setCookie, parseCookies } from "nookies";
import {
  getUserCartSuccess,
  getUserCartFailure,
  addToCartSuccess,
  addToCartFailure,
  updateCartItemSuccess,
  updateCartItemFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearCartSuccess,
  clearCartFailure,
  applyCouponSuccess,
  applyCouponFailure,
  removeCouponSuccess,
  removeCouponFailure,
  mergeCartSuccess,
  mergeCartFailure,
  getWishlistSuccess,
  getWishlistFailure,
  getWishlist,
  toggleToWishlistSuccess,
  toggleToWishlistFailure,
} from "./actions";
import {
  getUserCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
  applyCouponApi,
  removeCouponApi,
  mergeCartApi,
  toggleToWishlistApi,
  getWishlistApi,
} from "@/api/cart";
import {
  GET_USER_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  APPLY_COUPON,
  REMOVE_COUPON,
  MERGE_CART,
  TOGGLE_TO_WISHLIST,
  GET_WISHLIST,
} from "./actionTypes";

function* getUserCartSaga({ payload }) {
  try {
    const { data } = yield call(getUserCartApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    yield put(getUserCartSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getUserCartFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* addToCartSaga({ payload }) {
  try {
    const cookies = parseCookies();
    const isGuest = !cookies.token; // Check if user is not logged in

    const { data } = yield call(addToCartApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    // Mark as guest cart if user is not logged in
    if (isGuest) {
      setCookie(null, "isGuest", "true", {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    yield put(addToCartSuccess(data?.cart));
    toast.success(data?.message || "تمت الإضافة إلى السلة بنجاح");
  } catch (error) {
    console.log(error);
    yield put(addToCartFailure(error?.message || "An error occurred"));
    toast.error(
      error?.response?.data?.message || "حدث خطأ أثناء الإضافة إلى السلة",
    );
  }
}

// ==================================================
// ==================================================

function* updateCartItemSaga({ payload }) {
  try {
    const { data } = yield call(updateCartItemApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    yield put(updateCartItemSuccess(data?.cart));
    toast.success(data?.message || "تم تحديث السلة بنجاح");
  } catch (error) {
    console.log(error);
    yield put(updateCartItemFailure(error?.message || "An error occurred"));
    toast.error(error?.response?.data?.message || "حدث خطأ أثناء تحديث السلة");
  }
}

// ==================================================
// ==================================================

function* removeFromCartSaga({ payload }) {
  try {
    const { data } = yield call(removeCartItemApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    yield put(removeFromCartSuccess(data?.cart));
    toast.success(data?.message || "تم حذف المنتج من السلة");
  } catch (error) {
    console.log(error);
    yield put(removeFromCartFailure(error?.message || "An error occurred"));
    toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف المنتج");
  }
}

// ==================================================
// ==================================================

function* clearCartSaga({ payload }) {
  try {
    const { data } = yield call(clearCartApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    yield put(clearCartSuccess(data?.cart));
    toast.success(data?.message || "تم إفراغ السلة");
  } catch (error) {
    console.log(error);
    yield put(clearCartFailure(error?.message || "An error occurred"));
    toast.error(error?.response?.data?.message || "حدث خطأ أثناء إفراغ السلة");
  }
}

// ==================================================
// ==================================================

function* applyCouponSaga({ payload }) {
  try {
    const { data } = yield call(applyCouponApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    yield put(applyCouponSuccess(data?.cart));
    toast.success(data?.message || "تم تطبيق القسيمة بنجاح");
  } catch (error) {
    console.log(error);
    yield put(applyCouponFailure(error?.message || "An error occurred"));
    toast.error(
      error?.response?.data?.message || "حدث خطأ أثناء تطبيق القسيمة",
    );
  }
}

// ==================================================
// ==================================================

function* removeCouponSaga({ payload }) {
  try {
    const { data } = yield call(removeCouponApi, payload);

    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    yield put(removeCouponSuccess(data?.cart));
    toast.success(data?.message || "تم إزالة القسيمة");
  } catch (error) {
    console.log(error);
    yield put(removeCouponFailure(error?.message || "An error occurred"));
    toast.error(
      error?.response?.data?.message || "حدث خطأ أثناء إزالة القسيمة",
    );
  }
}

// ==================================================
// ==================================================

function* mergeCartSaga({ payload }) {
  try {
    const { data } = yield call(mergeCartApi, payload);
    // Save cart token to cookies if provided
    if (data?.cart_token) {
      setCookie(null, "cart_token", data.cart_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
    yield put(mergeCartSuccess(data?.cart));
  } catch (error) {
    console.log(error);
    yield put(mergeCartFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* toggleToWishlistSaga({ payload }) {
  try {
    const { data } = yield call(toggleToWishlistApi, payload);
    toast.success(data?.message || "تمت الإضافة إلى قائمة الرغبات");
    yield put(getWishlist({ cookies: {} }));
    yield put(toggleToWishlistSuccess(data?.wishlist));
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message ||
        "حدث خطأ أثناء الإضافة إلى قائمة الرغبات",
    );
    yield put(toggleToWishlistFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

function* getWishlistSaga({ payload }) {
  try {
    const { data } = yield call(getWishlistApi, payload);
    yield put(getWishlistSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getWishlistFailure(error?.message || "An error occurred"));
  }
}

// ==================================================
// ==================================================

export function* watchGetUserCart() {
  yield takeEvery(GET_USER_CART, getUserCartSaga);
}
export function* watchAddToCart() {
  yield takeLatest(ADD_TO_CART, addToCartSaga);
}
export function* watchUpdateCartItem() {
  yield takeLatest(UPDATE_CART_ITEM, updateCartItemSaga);
}
export function* watchRemoveFromCart() {
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga);
}
export function* watchClearCart() {
  yield takeLatest(CLEAR_CART, clearCartSaga);
}
export function* watchApplyCoupon() {
  yield takeLatest(APPLY_COUPON, applyCouponSaga);
}
export function* watchRemoveCoupon() {
  yield takeLatest(REMOVE_COUPON, removeCouponSaga);
}
export function* watchMergeCart() {
  yield takeEvery(MERGE_CART, mergeCartSaga);
}
export function* watchToggleToWishlist() {
  yield takeLatest(TOGGLE_TO_WISHLIST, toggleToWishlistSaga);
}
export function* watchGetWishlist() {
  yield takeLatest(GET_WISHLIST, getWishlistSaga);
}

// ==================================================
// ==================================================

function* cartSaga() {
  yield all([
    fork(watchGetUserCart),
    fork(watchAddToCart),
    fork(watchUpdateCartItem),
    fork(watchRemoveFromCart),
    fork(watchClearCart),
    fork(watchApplyCoupon),
    fork(watchRemoveCoupon),
    fork(watchMergeCart),
    fork(watchToggleToWishlist),
    fork(watchGetWishlist),
  ]);
}

export default cartSaga;
