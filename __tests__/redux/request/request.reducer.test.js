import {
  sendRequest,
  cancelRequest,
  requestError,
  requestComplete,
  dismissResult,
} from '../../../app/redux/request/request.action';
import { LOGIN } from '../../../app/redux/request/request.constants';
import reducer from '../../../app/redux/request/request.reducer';

describe('request reducer tests', () => {
  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: true,
          error: false,
          response: null,
          message: 'Signing In...',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, sendRequest(LOGIN, '', {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          response: null,
          message: '',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, cancelRequest(LOGIN, '', {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: true,
          response: null,
          message: 'Failed to Sign In',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, requestError(LOGIN, '', null, {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: true,
          response: null,
          message: 'Failed to Sign In',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, requestError(LOGIN, '', null, {})));
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          response: { success: true },
          message: 'Logged In',
          success: true,
        },
      },
    }).toEqual(
      reducer(undefined, requestComplete(LOGIN, '', { success: true })),
    );
  });

  it('should ', () => {
    expect({
      LOGIN: {
        '': {
          sending: false,
          error: false,
          response: null,
          message: '',
          success: false,
        },
      },
    }).toEqual(reducer(undefined, dismissResult(LOGIN, '', {})));
  });
});
