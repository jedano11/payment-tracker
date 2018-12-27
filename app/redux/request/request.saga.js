/* eslint-disable func-style */
import { delay } from 'redux-saga';
import { put, take, race, call } from 'redux-saga/effects';
import { timeoutSeconds } from '../../config/settings';
import {
  CANCEL_REQUEST,
  requestError,
  requestComplete,
} from './request.action';

export default function* sendRequest(action: Object): Generator<*, *, *> {
  yield console.log(action);
  yield console.log('YEAH!');
}

function* temp() {
  const shouldTimeout = Math.random() >= 0.5;
  const shouldNotFail = Math.random() >= 0.5;

  if (shouldTimeout) {
    yield call(delay, 4000);
  } else {
    yield call(delay, 2000);
    return { success: shouldNotFail };
  }

  return { success: true };
}

function* shouldCancel(actionParam: Object) {
  let notFound = true;

  while (notFound) {
    const action = yield take(CANCEL_REQUEST);
    if (
      action.payload.key === actionParam.payload.key &&
      action.payload.id === actionParam.payload.id
    ) {
      notFound = false;
    }
  }

  return true;
}

export function* sample(action: Object): Generator<*, *, *> {
  const { response, timeout, cancelled } = yield race({
    response: call(temp),
    timeout: call(delay, timeoutSeconds * 1000),
    cancelled: call(shouldCancel, action),
  });

  if (cancelled) {
    return;
  }

  if (timeout) {
    yield put(
      requestError(action.payload.key, action.payload.id, 'Request timeout'),
    );

    return;
  }
  yield put(requestComplete(action.payload.key, action.payload.id, response));

  if (action.payload.successAction) {
    yield put(action.payload.successAction);
  }
}
