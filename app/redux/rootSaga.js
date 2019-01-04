import { fork, takeEvery, select } from 'redux-saga/effects';
import { takeLeadingByPayload } from './util/effects';
import { SEND_REQUEST, SEND_REQUEST_AWAIT } from './request/request.action';
import { START_DUMMY_SUBSCRIPTION } from './dummy/dummy.action';
import { watchSubscription } from './dummy/dummy.saga';
import defaultRequestSaga from './request/request.saga';
import { REHYDRATE_COMPLETE } from './app/app.action';
import { SAMPLE, LOGIN } from './request/request.constants';
import NavigationService from '../modules/navigation/navigationService';

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

function* sendRequest(action: Object) {
  switch (action.payload.key) {
    case SAMPLE:
    case LOGIN:
      yield fork(defaultRequestSaga, action);
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
  yield takeEvery(START_DUMMY_SUBSCRIPTION, watchSubscription);

  yield takeEvery(REHYDRATE_COMPLETE, afterRehydrate);
  yield takeEvery('Navigation/NAVIGATE', navigate);
  yield takeEvery('Navigation/REPLACE', navigate);
}
