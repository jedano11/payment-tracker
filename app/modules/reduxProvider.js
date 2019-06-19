import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rehydrateComplete } from '../redux/app/app.action';
import rootReducer from '../redux/combinedReducers';
import rootSaga from '../redux/rootSaga';
// import { LOG_OUT } from '../redux/auth/auth.action';

const rootConfigKey = 'root';

const logger = createLogger({
  // predicate, // if specified this function will be called before each action is processed with this middleware.
  collapsed: (getState, action, logEntry) => !logEntry.error,
  // should the logger catch, log, and re-throw errors?
  diff: true, // (alpha) show diff between states?
  // diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
  duration: false,
  // print the timestamp with each action?
  // level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
  // colors: ColorsObject/, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
  // titleFormatter, // Format the title used when logging actions.
  // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
  // actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
  // errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.
  // logger = console: LoggerObject, // implementation of the `console` API.
  logErrors: true,
  // print the duration of each action?
  timestamp: true,
});

const persistConfig = {
  debug: true,
  key: rootConfigKey,
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = persistCombineReducers(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let middleware = null;

// eslint-disable-next-line no-undef
// if (__DEV__) {
//   middleware = applyMiddleware(...[sagaMiddleware, logger]);
// } else {
//   middleware = applyMiddleware(...[sagaMiddleware]);
// }

middleware = applyMiddleware(...[sagaMiddleware, logger]);

const store = createStore(
  (state, action) =>
    // if (action.type === LOG_OUT) {
    //   storage.removeItem('persist:primary');
    //   storage.removeItem('persist:authStore');
    //   return reducers({}, action);
    // }
    reducers(state, action),
  middleware,
);

const persistor = persistStore(store, null, () => {
  store.dispatch(rehydrateComplete());
});

sagaMiddleware.run(rootSaga);

export { store, persistor };
