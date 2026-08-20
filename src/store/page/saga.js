/**
 * Page Store Saga
 * Handles async page configuration and data fetching
 * Integrates with Redux-Saga workflow
 */

import { call, put, takeEvery } from "redux-saga/effects";
import { getPageDataBySlugApi } from "@/api/pageContent";
import {
  GET_PAGE_CONFIG,
  GET_PAGE_DATA,
  getPageConfigSuccess,
  getPageConfigFailure,
  getPageDataSuccess,
  getPageDataFailure,
} from "./actionTypes";
import {
  getPageLayout,
  determinePageType,
  buildRenderQueue,
} from "@/helpers/pageConfig";

/**
 * Saga to fetch and process page configuration
 */
function* fetchPageConfigSaga(action) {
  try {
    const { slug, cookies = {} } = action.payload;

    // Fetch all necessary data for this page
    const pageData = yield call(getPageDataBySlugApi, { slug, cookies });

    if (!pageData) {
      throw new Error(`Failed to fetch page: ${slug}`);
    }

    // Determine page type for layout selection
    const pageType = determinePageType(slug, pageData);

    // Get layout configuration
    const layout = yield call(
      () =>
        getPageLayout(
          pageType,
          pageData?.config?.components || []
        ),
      null
    );

    // Build render queue
    const renderQueue = buildRenderQueue(layout, pageData);

    yield put(
      getPageConfigSuccess({
        slug,
        config: pageData?.config,
        layout,
        meta: pageData?.meta || {},
      })
    );

    // Also dispatch data success
    yield put(
      getPageDataSuccess({
        data: pageData,
        components: renderQueue,
      })
    );
  } catch (error) {
    console.error("Page config saga error:", error);
    yield put(getPageConfigFailure(error.message));
  }
}

/**
 * Saga to fetch just page data (when config is already known)
 */
function* fetchPageDataSaga(action) {
  try {
    const { slug, cookies = {} } = action.payload;

    const pageData = yield call(getPageDataBySlugApi, { slug, cookies });

    if (!pageData) {
      throw new Error(`Failed to fetch page data: ${slug}`);
    }

    yield put(
      getPageDataSuccess({
        data: pageData,
      })
    );
  } catch (error) {
    console.error("Page data saga error:", error);
    yield put(getPageDataFailure(error.message));
  }
}

/**
 * Root saga for page store
 */
export function* pageSaga() {
  yield takeEvery(GET_PAGE_CONFIG, fetchPageConfigSaga);
  yield takeEvery(GET_PAGE_DATA, fetchPageDataSaga);
}

export default pageSaga;
