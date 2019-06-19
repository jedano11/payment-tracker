import { LOGIN, SAMPLE, SAMPLE_DEBOUNCE } from '../request/request.constants';
import { selectRequestObject } from '../request/request.selector';
import type { GlobalState } from '../util/types';

export const loginRequestState = (state: GlobalState) =>
  selectRequestObject(state, LOGIN, 'login');

export const request1State = (state: GlobalState) =>
  selectRequestObject(state, SAMPLE, 'request1');

export const request2State = (state: GlobalState) =>
  selectRequestObject(state, SAMPLE, 'request2');

export const request3State = (state: GlobalState) =>
  selectRequestObject(state, SAMPLE, 'request3');

export const sampleDebouceRequest3State = (state: GlobalState) =>
  selectRequestObject(state, SAMPLE_DEBOUNCE, '');
