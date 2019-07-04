import { reducerErrorToString } from '../util/common';
import {
  CANCEL_FILE_UPLOAD,
  CANCEL_REQUEST,
  DISMISS_RESULT,
  FILE_UPLOAD,
  FILE_UPLOAD_ERROR,
  FILE_UPLOAD_PROGRESS,
  REQUEST_COMPLETE,
  REQUEST_ERROR,
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
} from './request.action';
import messages from './request.constants';

const initialState = {};

export default (state: any = initialState, action: Object) => {
  switch (action.type) {
    case SEND_REQUEST:
    case SEND_REQUEST_AWAIT:
    case SEND_REQUEST_LATEST:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: messages[action.payload.key].loaderMessage,
            response: null,
            sending: true,
            success: false,
          },
        },
      };
    case FILE_UPLOAD:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: messages[action.payload.key].loaderMessage,
            progress: 0,
            response: null,
            sending: true,
            success: false,
          },
        },
      };
    case CANCEL_FILE_UPLOAD:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: '',
            progress: 0,
            response: null,
            sending: false,
            success: false,
          },
        },
      };
    case FILE_UPLOAD_ERROR:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: true,
            message: reducerErrorToString(
              action.payload.error,
              messages[action.payload.key].defaultErrorMessage,
            ),
            progress: 0,
            response: null,
            sending: false,
            success: false,
          },
        },
      };
    case FILE_UPLOAD_PROGRESS:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: state[action.payload.key][action.payload.id].message,
            progress: action.payload.progress,
            response: null,
            sending: true,
            success: false,
          },
        },
      };
    case REQUEST_COMPLETE:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: messages[action.payload.key].successMessage,
            response: action.payload.response,
            sending: false,
            success: true,
          },
        },
      };
    case REQUEST_ERROR:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: true,
            message: reducerErrorToString(
              action.payload.error,
              messages[action.payload.key].defaultErrorMessage,
            ),
            response: null,
            sending: false,
            success: false,
          },
        },
      };
    case CANCEL_REQUEST:
    case DISMISS_RESULT:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.id]: {
            error: false,
            message: '',
            response: null,
            sending: false,
            success: false,
          },
        },
      };
    default:
      return state;
  }
};
