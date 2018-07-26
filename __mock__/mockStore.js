import configureStore from 'redux-mock-store';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistCombineReducers } from 'redux-persist';

import combineReducers, {
  immutableRecords,
  persistedList,
} from '../app/reducers/combine.reducers';
import autoMergeLevel2Immutable from '../app/modules/redux.with.immutable/utils/automergeLevel2-immutable';
import { rootConfigKey } from '../app/modules/redux.with.immutable/redux';

const persistConfig = {
  key: rootConfigKey,
  stateReconciler: autoMergeLevel2Immutable,
  transforms: [immutableTransform({ records: immutableRecords })],
  storage: AsyncStorage,
  whitelist: persistedList,
  debug: true,
};

const reducer = persistCombineReducers(persistConfig, combineReducers);
const middlewares = [thunk];

export const mockStore = configureStore(reducer, middlewares);
