export const SEND_REQUEST = 'SEND_REQUEST';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const DISMISS_RESULT = 'DISMISS_RESULT';

export const sendRequest = (
  key: string,
  id: string,
  params: Object,
  successAction?: Object,
) => ({
  type: SEND_REQUEST,
  payload: {
    key,
    id,
    params,
    successAction,
  },
});

export const cancelRequest = (key: string, id: string) => ({
  type: CANCEL_REQUEST,
  payload: {
    key,
    id,
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

export const requestComplete = (key: string, id: string, response: any) => ({
  type: REQUEST_COMPLETE,
  payload: {
    key,
    id,
    response,
  },
});

export const dismissResult = (key: string, id: string) => ({
  type: DISMISS_RESULT,
  payload: {
    key,
    id,
  },
});
