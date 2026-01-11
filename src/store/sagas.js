import { all } from "redux-saga/effects";

import metaSaga from "./meta/saga";
import settingsSaga from "./settings/saga";
import authSaga from "./auth/saga";

export default function* rootSaga() {
  yield all([metaSaga(), settingsSaga(), authSaga()]);
}
