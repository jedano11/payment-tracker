import type { Action } from '../util/types';

export const DEBOUNCE_REQUEST = 'DEBOUNCE_REQUEST';
export const SEND_REQUEST = 'SEND_REQUEST';
export const SEND_REQUEST_AWAIT = 'SEND_REQUEST_AWAIT';
export const SEND_REQUEST_LATEST = 'SEND_REQUEST_LATEST';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const OVERRIDE_LATEST = 'OVERRIDE_LATEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const DISMISS_RESULT = 'DISMISS_RESULT';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const CANCEL_FILE_UPLOAD = 'CANCEL_FILE_UPLOAD';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';

export const fileUpload = (
  key: string,
  id: string | number,
  request: {
    directory: string,
    file: any,
    fileName: string,
  },
  options?: {
    successAction?: Action | Action[],
    failureAction?: Action | Action[],
    responseActionName?: string,
  },
) => ({
  payload: {
    id,
    key,
    options,
    request,
  },
  type: FILE_UPLOAD,
});

export const updatefileUploadProgress = (
  key: string,
  id: string | number,
  progress: number,
) => ({
  payload: {
    id,
    key,
    progress,
  },
  type: FILE_UPLOAD_PROGRESS,
});

export const cancelFileUpload = (key: string, id: string | number) => ({
  payload: {
    id,
    key,
  },
  type: CANCEL_FILE_UPLOAD,
});

export const fileUploadError = (
  key: string,
  id: string | number,
  error: any,
) => ({
  payload: {
    error,
    id,
    key,
  },
  type: FILE_UPLOAD_ERROR,
});

/*
 * Does not fetch the request right away after being dispatched;
 * uniqueness is based on `key` and `id` parameters;
 *
 * The most common use of this action is if a user types in the search bar,
 * the search request will not be executed while the user is still typing.
 *
 * The time interval between key presses can be changed in `debounceTimeoutSeconds` src/config/settings.js
 */
export const debounceRequest = (
  key: string,
  id: string | number,
  request?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route?: string,
    params?: any,
  },
  options?: {
    successAction?: Action | Action[],
    failureAction?: Action | Action[],
    responseActionName?: string,
  },
) => ({
  payload: {
    id,
    key,
    options,
    request,
  },
  type: DEBOUNCE_REQUEST,
});

/*
 * Executes the request on every dispatch;
 * uniqueness is based on `key` and `id` parameters;
 */
export const sendRequest = (
  key: string,
  id: string | number,
  request?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route?: string,
    params?: any,
  },
  options?: {
    successAction?: Action | Action[],
    failureAction?: Action | Action[],
    responseActionName?: string,
  },
) => ({
  payload: {
    id,
    key,
    options,
    request,
  },
  type: SEND_REQUEST,
});

/*
 * Executes the request on every dispatch;
 * uniqueness is based on `key` and `id` parameters;
 * For every dispatch, all previous requests will be cancelled.
 *
 * ex: sendRequestLatest is dispatch twice, the first will be cancelled if it is not yet done.
 */
export const sendRequestLatest = (
  key: string,
  id: string | number,
  request?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route?: string,
    params?: any,
  },
  options?: {
    successAction?: Action | Action[],
    failureAction?: Action | Action[],
    responseActionName?: string,
  },
) => ({
  payload: {
    id,
    key,
    options,
    request,
  },
  type: SEND_REQUEST_LATEST,
});

/*
 * does not fetch the request if the same request is still being fetched;
 * uniqueness is based on `key` and `id` parameters;
 * in case of dispatching sendRequestAwait('SOME_KEY', 'some_id') multiple times,
 * while the first is executed, the next ones will be ignored
 *
 * The most common use for this action is if the user presses the login button multiple times,
 * the request will only be called once or until it is done.
 */
export const sendRequestAwait = (
  key: string,
  id: string | number,
  request?: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    route?: string,
    params?: any,
  },
  options?: {
    successAction?: Action | Action[],
    failureAction?: Action | Action[],
    responseActionName?: string,
  },
) => ({
  payload: {
    id,
    key,
    options,
    request,
  },
  type: SEND_REQUEST_AWAIT,
});

/*
 * use this to cancel a request with the same key and id
 */
export const cancelRequest = (key: string, id: string) => ({
  payload: {
    id,
    key,
  },
  type: CANCEL_REQUEST,
});

/*
 * used by sendRequestLatest; DON'T USE
 */
export const overrideLatest = (key: string, id: string) => ({
  payload: {
    id,
    key,
  },
  type: OVERRIDE_LATEST,
});

/*
 * use this to dispatch an error
 */
export const requestError = (key: string, id: string | number, error: any) => ({
  payload: {
    error,
    id,
    key,
  },
  type: REQUEST_ERROR,
});

/*
 * call this when the request is done
 */
export const requestComplete = (
  key: string,
  id: string | number,
  response: any,
) => ({
  payload: {
    id,
    key,
    response,
  },
  type: REQUEST_COMPLETE,
});

/*
 * use this to dismiss a request's result and/or error
 */
export const dismissResult = (key: string, id: string) => ({
  payload: {
    id,
    key,
  },
  type: DISMISS_RESULT,
});
