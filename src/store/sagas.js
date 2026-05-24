import { all } from "redux-saga/effects";

import metaSaga from "./meta/saga";
import settingsSaga from "./settings/saga";
import authSaga from "./auth/saga";
import categoriesSaga from "./categories/saga";
import productsSaga from "./products/saga";
import cartSaga from "./cart/saga";
import checkoutSaga from "./checkout/saga";
import contentSaga from "./content/saga";
import pageSaga from "./page/saga";
import servicesSaga from "./services/saga";

export default function* rootSaga() {
  yield all([
    metaSaga(),
    settingsSaga(),
    authSaga(),
    categoriesSaga(),
    productsSaga(),
    cartSaga(),
    checkoutSaga(),
    contentSaga(),
    pageSaga(),
    servicesSaga(),
  ]);
}
