import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import theme from './config/theme';
import Listeners from './listeners/listeners';
import RootStackNavigator from './navigators/rootStackNavigator';
import NavigationService from './navigation/navigationService';

const AppContainer = createAppContainer(RootStackNavigator);

type Props = {};

EStyleSheet.build(theme);

class App extends PureComponent<Props> {
  render() {
    return (
      <Listeners>
        <AppContainer
          ref={(navigatorRef: ?Object) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Listeners>
    );
  }
}

export default App;
