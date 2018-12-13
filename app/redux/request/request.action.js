export const SEND_REQUEST = 'SEND_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const DISMISS_ALERT = 'DISMISS_ALERT';

export const sendRequest = (key: string, id: string, params: Object) => ({
  type: SEND_REQUEST,
  payload: {
    key,
    id,
    params,
  },
});

export const requestError = (key: string, id: string, error: any) => ({
  type: REQUEST_ERROR,
  payload: {
    key,
    id,
    error,
  },
});

export const requestComplete = (key: string, id: string) => ({
  type: REQUEST_COMPLETE,
  payload: {
    key,
    id,
  },
});

export const dismissAlert = (key: string, id: string) => ({
  type: DISMISS_ALERT,
  payload: {
    key,
    id,
  },
});
