import { all } from "redux-saga/effects";

import metaSaga from "./meta/saga";
import settingsSaga from "./settings/saga";

export default function* rootSaga() {
  yield all([metaSaga(), settingsSaga()]);
}
