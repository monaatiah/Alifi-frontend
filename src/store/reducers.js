import { combineReducers } from "redux";

import meta from "./meta/reducer";
import settings from "./settings/reducer";

const rootReducer = combineReducers({
  meta,
  settings,
});

export default rootReducer;
