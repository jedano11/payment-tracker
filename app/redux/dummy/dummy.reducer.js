import {
  PONG,
  START_DUMMY_SUBSCRIPTION,
  STOP_DUMMY_SUBSCRIPTION,
  SAMPLE_DEBOUNCE_RESPONSE,
  SAMPLE_REQUEST_RESPONSE,
  SAMPLE_REQUEST_LATEST_RESPONSE,
} from './dummy.action';

const initialState = {
  listening: false,
  count: 0,
  searchKeys: [],
  clicksByReqest: 0,
  clicksByReqestLatest: 0,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case PONG:
      return {
        ...state,
        count: state.count + 1,
      };
    case START_DUMMY_SUBSCRIPTION:
      return {
        ...state,
        listening: true,
      };
    case STOP_DUMMY_SUBSCRIPTION:
      return {
        ...state,
        listening: false,
        count: 0,
      };
    case SAMPLE_DEBOUNCE_RESPONSE:
      return {
        ...state,
        searchKeys: [...state.searchKeys, action.payload.response.q],
      };
    case SAMPLE_REQUEST_RESPONSE:
      return {
        ...state,
        clicksByReqest: state.clicksByReqest + 1,
      };
    case SAMPLE_REQUEST_LATEST_RESPONSE:
      return {
        ...state,
        clicksByReqestLatest: state.clicksByReqestLatest + 1,
      };
    default:
      return state;
  }
};
