import type { Action } from '../util/types';
import { LOG_IN_SUCCESS, LOG_OUT } from './auth.action';

const initialState = {
  authenticated: false,
};

export default (state: Object = initialState, action: Action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case LOG_OUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};
