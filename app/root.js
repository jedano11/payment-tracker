import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import EStyleSheet from 'react-native-extended-stylesheet';

import { appEnv } from './config/env';
import theme from './config/theme';
import Listeners from './modules/listeners/listeners';
import RootStackNavigator from './navigators/rootStackNavigator';
import NavigationService from './modules/navigation/navigationService';
import combinedReducers from './redux/combinedReducers';
import rootSaga from './redux/rootSaga';

const AppContainer = createAppContainer(RootStackNavigator);

type Props = {};

EStyleSheet.build(theme);

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    // console.log('#####')
    // const { combineReducers } = props;

    // const persistConfig = {
    //   key: rootConfigKey,
    //   // stateReconciler: autoMergeLevel2Immutable,
    //   storage: AsyncStorage,
    //   whitelist: props.persistedList,
    //   debug: true,
    // };

    // const reducer = persistCombineReducers(persistConfig, combineReducers);

    const sagaMiddleware = createSagaMiddleware();

    // let middleware = null;

    // // eslint-disable-next-line no-undef
    // if (__DEV__) {
    //   middleware = debugWrapper(
    //     applyMiddleware(...[logger, sagaMiddleware, ...this.props.middlewares]),
    //   );
    // } else {
    //   middleware = debugWrapper(
    //     applyMiddleware(...[sagaMiddleware, ...this.props.middlewares]),
    //   );
    // }

    // const customMiddleWare = store => next => action => {
    //   console.log("Middleware triggered:", action);
    //   next(action);
    // };

    // this should be the last middleware to add
    const logger = createLogger({
      // predicate, // if specified this function will be called before each action is processed with this middleware.
      collapsed: (getState, action, logEntry) => !logEntry.error,
      duration: false, // print the duration of each action?
      timestamp: true, // print the timestamp with each action?

      // level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
      // colors: ColorsObject/, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
      // titleFormatter, // Format the title used when logging actions.

      // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
      // actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
      // errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.

      // logger = console: LoggerObject, // implementation of the `console` API.
      logErrors: true, // should the logger catch, log, and re-throw errors?

      diff: true, // (alpha) show diff between states?
      // diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
    });

    this.store = createStore(
      combinedReducers,
      applyMiddleware(...[sagaMiddleware, logger]),
    );

    // this.persistor = persistStore(this.store, {}, () => {
    //   this.store.dispatch(rehydrateComplete());
    // });

    sagaMiddleware.run(rootSaga);
  }

  store: Object;

  render() {
    if (!appEnv) {
      console.error(
        new Error(
          'Environment is not selected. You need to type "source appcenter-post-clone.sh <ENV>" on project root before build.',
        ),
      );

      return null;
    }
    return (
      <Provider store={this.store}>
        <Listeners>
          <AppContainer
            ref={(navigatorRef: ?Object) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Listeners>
      </Provider>
    );
  }
}

export default App;
