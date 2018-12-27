import { fork, takeEvery } from 'redux-saga/effects';
import { takeLeading, takeLeadingByPayload } from './util/effects';
import { SEND_REQUEST } from './request/request.action';
import { START_DUMMY_SUBSCRIPTION } from './dummy/dummy.action';
import { watchSubscription } from './dummy/dummy.saga';
import defaultRequestSaga, { sample } from './request/request.saga';
import { REHYDRATE_COMPLETE } from './app/app.action';
import { SAMPLE } from './request/request.constants';
import NavigationService from '../modules/navigation/navigationService';

/*
 * called after redux persist has rehydrated its saved data to the redux store
 */
function* afterRehydrate() {
  // do stuff
}

function* sendRequest(action: Object) {
  switch (action.payload.key) {
    case SAMPLE:
      yield fork(sample, action);
      break;
    default:
      yield fork(defaultRequestSaga, action);
  }
}

const navigate = (action: Object) => {
  NavigationService.dispatchNavigationAction(action);
};

export default function* rootSaga(): Generator<void, void, void> {
  yield takeLeadingByPayload(SEND_REQUEST, sendRequest);
  yield takeEvery(START_DUMMY_SUBSCRIPTION, watchSubscription);

  yield takeEvery(REHYDRATE_COMPLETE, afterRehydrate);
  yield takeEvery('Navigation/NAVIGATE', navigate);
}
