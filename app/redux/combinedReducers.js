import { combineReducers } from 'redux';

import appStore from './app/app.reducer';
import requestStore from './request/request.reducer';

export default combineReducers({
  appStore,
  requestStore,
});
