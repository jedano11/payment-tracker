import React, { PureComponent } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { appEnv } from './config/env';
import theme from './config/theme';
import Listeners from './modules/listeners/listeners';
import NavigationService from './modules/navigation/navigationService';
import { persistor, store } from './modules/reduxProvider';
import RootStackNavigator from './navigators/rootStackNavigator';

// import { ComponentLayoutViewer } from './containers/componentLayoutViewer';

const AppContainer = createAppContainer(RootStackNavigator);

EStyleSheet.build(theme);

class App extends PureComponent<*> {
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
      // <ComponentLayoutViewer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Listeners>
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Listeners>
        </PersistGate>
      </Provider>
      // </ComponentLayoutViewer>
    );
  }
}

export default App;
