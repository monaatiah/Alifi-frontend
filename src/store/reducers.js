import { combineReducers } from "redux";

import meta from "./meta/reducer";
import settings from "./settings/reducer";
import auth from "./auth/reducer";
import categories from "./categories/reducer";
import products from "./products/reducer";
import cart from "./cart/reducer";

const rootReducer = combineReducers({
  meta,
  settings,
  auth,
  categories,
  products,
  cart,
});

export default rootReducer;
