import { combineReducers } from "redux";

import meta from "./meta/reducer";
import settings from "./settings/reducer";
import auth from "./auth/reducer";

const rootReducer = combineReducers({
  meta,
  settings,
  auth,
});

export default rootReducer;
