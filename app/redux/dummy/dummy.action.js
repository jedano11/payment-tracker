import { StackActions } from 'react-navigation';
import { logInSuccess } from '../auth/auth.action';
import {
  cancelRequest,
  dismissResult,
  sendRequestAwait,
} from '../request/request.action';
import { LOGIN, SAMPLE } from '../request/request.constants';

export const START_DUMMY_SUBSCRIPTION = 'START_DUMMY_SUBSCRIPTION';
export const STOP_DUMMY_SUBSCRIPTION = 'STOP_DUMMY_SUBSCRIPTION';
export const SUBSCRIPTION_ERROR = 'SUBSCRIPTION_ERROR';
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
