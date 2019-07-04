import { StackActions } from 'react-navigation';
import { logInSuccess } from '../auth/auth.action';
import {
  cancelRequest,
  dismissResult,
  sendRequestAwait,
  sendRequest,
  sendRequestLatest,
  debounceRequest,
} from '../request/request.action';
import {
  LOGIN,
  SAMPLE,
  SAMPLE_DEBOUNCE,
  SAMPLE_REQUEST,
  SAMPLE_REQUEST_LATEST,
} from '../request/request.constants';

export const START_DUMMY_SUBSCRIPTION = 'START_DUMMY_SUBSCRIPTION';
export const STOP_DUMMY_SUBSCRIPTION = 'STOP_DUMMY_SUBSCRIPTION';
export const SUBSCRIPTION_ERROR = 'SUBSCRIPTION_ERROR';
export const SAMPLE_DEBOUNCE_RESPONSE = 'SAMPLE_DEBOUNCE_RESPONSE';
export const SAMPLE_REQUEST_RESPONSE = 'SAMPLE_REQUEST_RESPONSE';
export const SAMPLE_REQUEST_LATEST_RESPONSE = 'SAMPLE_REQUEST_LATEST_RESPONSE';
export const PONG = 'PONG';

export const startDummySubscription = () => ({
  type: START_DUMMY_SUBSCRIPTION,
});

export const stopDummySubscription = () => ({
  type: STOP_DUMMY_SUBSCRIPTION,
});

export const subscriptionError = (error: any) => ({
  payload: {
    error,
  },
  type: SUBSCRIPTION_ERROR,
});

export const pong = () => ({
  type: PONG,
});

export const login = () =>
  sendRequestAwait(
    LOGIN,
    'login',
    { method: 'POST', route: 'login', params: {} },
    {
      successAction: [
        logInSuccess(),
        StackActions.replace({
          routeName: 'Main',
        }),
      ],
    },
  );

export const cancelLogin = () => cancelRequest(LOGIN, 'login');

export const dismissLoginError = () => dismissResult(LOGIN, 'login');

export const request1 = () => sendRequestAwait(SAMPLE, 'request1');
export const request2 = () => sendRequestAwait(SAMPLE, 'request2');
export const request3 = () => sendRequestAwait(SAMPLE, 'request3');

export const cancel1 = () => cancelRequest(SAMPLE, 'request1');
export const cancel2 = () => cancelRequest(SAMPLE, 'request2');
export const cancel3 = () => cancelRequest(SAMPLE, 'request3');

export const sampleDebounceRequest = (text: string) =>
  debounceRequest(
    SAMPLE_DEBOUNCE,
    '',
    {
      method: 'GET',
      route: 'search',
      params: {
        q: text,
      },
    },
    {
      responseActionName: SAMPLE_DEBOUNCE_RESPONSE,
    },
  );

export const sampleSendRequest = () =>
  sendRequest(
    SAMPLE_REQUEST,
    '',
    {},
    {
      responseActionName: SAMPLE_REQUEST_RESPONSE,
    },
  );
export const sampleSendRequestLatest = () =>
  sendRequestLatest(
    SAMPLE_REQUEST_LATEST,
    '',
    {},
    {
      responseActionName: SAMPLE_REQUEST_LATEST_RESPONSE,
    },
  );
// export const sampleSendRequestAwait = () => sendRequestAwait();
