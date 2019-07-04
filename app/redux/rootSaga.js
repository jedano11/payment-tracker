import { fork, takeEvery, select, put, delay } from 'redux-saga/effects';
import { takeLeadingByPayload, takeLatestByPayload } from './util/effects';
import {
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
  DEBOUNCE_REQUEST,
  FILE_UPLOAD,
  sendRequestLatest,
} from './request/request.action';
import { START_DUMMY_SUBSCRIPTION } from './dummy/dummy.action';
import { watchSubscription, fakeSendRequest } from './dummy/dummy.saga';
import defaultRequestSaga, { fileUpload } from './request/request.saga';
import { REHYDRATE_COMPLETE } from './app/app.action';
import {
  SAMPLE,
  LOGIN,
  SAMPLE_DEBOUNCE,
  SAMPLE_REQUEST,
  SAMPLE_REQUEST_LATEST,
} from './request/request.constants';
import NavigationService from '../modules/navigation/navigationService';

import { debounceTimeoutSeconds } from '../config/settings';

/*
 * called after redux persist has rehydrated its saved data to the redux store
 */
function* afterRehydrate() {
  const state = yield select();

  if (state.authStore.authenticated === true) {
    NavigationService.replace('Main');
  } else {
    NavigationService.replace('Home');
  }
}

function* dispatchRequest(action: Object) {
  yield delay(debounceTimeoutSeconds * 1000);
  const { key, id, request, options } = action.payload;
  yield put(sendRequestLatest(key, id, request, options));
}

function* sendRequest(action: Object) {
  switch (action.payload.key) {
    case SAMPLE:
    case LOGIN:
    case SAMPLE_DEBOUNCE:
    case SAMPLE_REQUEST:
    case SAMPLE_REQUEST_LATEST:
      yield fork(fakeSendRequest, action);
      break;
    default:
      yield fork(defaultRequestSaga, action);
  }
}

const navigate = (action: Object) => {
  NavigationService.dispatchNavigationAction(action);
};

export default function* rootSaga(): Generator<void, void, void> {
  yield takeLeadingByPayload(SEND_REQUEST_AWAIT, sendRequest);
  yield takeEvery(SEND_REQUEST, sendRequest);
  yield takeLatestByPayload(DEBOUNCE_REQUEST, dispatchRequest);
  yield takeLatestByPayload(SEND_REQUEST_LATEST, sendRequest);
  yield takeLatestByPayload(FILE_UPLOAD, fileUpload);
  yield takeEvery(START_DUMMY_SUBSCRIPTION, watchSubscription);

  yield takeEvery(REHYDRATE_COMPLETE, afterRehydrate);
  yield takeEvery('Navigation/NAVIGATE', navigate);
  yield takeEvery('Navigation/REPLACE', navigate);
}
