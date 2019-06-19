import { eventChannel } from 'redux-saga';
import { race, take, put, delay, call } from 'redux-saga/effects';

import {
  pong,
  subscriptionError,
  STOP_DUMMY_SUBSCRIPTION,
} from './dummy.action';
import {
  CANCEL_REQUEST,
  OVERRIDE_LATEST,
  requestError,
  requestComplete,
} from '../request/request.action';
import { shouldCancel, handleOptions } from '../request/request.saga';
import {
  SAMPLE_DEBOUNCE,
  SAMPLE_REQUEST,
  SAMPLE_REQUEST_LATEST,
} from '../request/request.constants';
import { timeoutSeconds } from '../../config/settings';

const startDummySubscriptionChannel = () =>
  eventChannel((emitter: Function) => {
    const timer = setInterval(() => {
      emitter(pong());
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  });

function* dummyApiRequest(action: Object) {
  if (action.payload.key === SAMPLE_DEBOUNCE) {
    yield delay(2000);
    return { q: action.payload.request.params.q };
  }

  if (
    action.payload.key === SAMPLE_REQUEST_LATEST ||
    action.payload.key === SAMPLE_REQUEST
  ) {
    yield delay(2000);
    return { success: true };
  }

  const shouldTimeout = Math.random() >= 0.5;
  const shouldNotFail = Math.random() >= 0.5;

  if (shouldTimeout) {
    yield delay(4000);
  } else {
    yield delay(2000);
    return { success: shouldNotFail };
  }

  return { success: true };
}

export function* fakeSendRequest(action: Object): Generator<*, *, *> {
  const { response, timeout, cancelled, overridden } = yield race({
    cancelled: call(shouldCancel, action, CANCEL_REQUEST),
    overridden: call(shouldCancel, action, OVERRIDE_LATEST),
    response: call(dummyApiRequest, action),
    timeout: delay(timeoutSeconds * 1000),
  });

  if (cancelled || overridden) {
    return;
  }

  if (timeout) {
    yield put(
      requestError(action.payload.key, action.payload.id, 'Request timeout'),
    );

    return;
  }

  yield put(requestComplete(action.payload.key, action.payload.id, response));
  yield handleOptions(action, response);
}

export function* watchSubscription(): Generator<*, *, *> {
  const channel = startDummySubscriptionChannel();

  while (true) {
    try {
      const { action, stopSubscription } = yield race({
        action: take(channel),
        stopSubscription: take(STOP_DUMMY_SUBSCRIPTION),
      });

      if (stopSubscription) {
        channel.close();
        return;
      }

      yield put(action);
    } catch (err) {
      yield put(subscriptionError(err));
    }
  }
}
