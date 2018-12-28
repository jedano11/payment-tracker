import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Home } from '../containers/home';
import { Main } from '../containers/main';

class InitialScreen extends PureComponent<*> {
  render() {
    return <View />;
  }
}

const RootStackNavigator = createStackNavigator({
  Root: {
    screen: InitialScreen,
  },
  Home: {
    screen: Home,
  },
  Main: {
    screen: Main,
  },
});

export default RootStackNavigator;
