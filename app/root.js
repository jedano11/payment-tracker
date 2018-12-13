import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import theme from './config/theme';
import RootStackNavigator from './navigators/rootStackNavigator';

const AppContainer = createAppContainer(RootStackNavigator);

type Props = {};

EStyleSheet.build(theme);

export default class App extends PureComponent<Props> {
  render() {
    return <AppContainer />;
  }
}
