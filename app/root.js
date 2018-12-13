import React, { PureComponent } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import theme from './config/theme';
import { Home } from './containers/home';

type Props = {};

EStyleSheet.build(theme);

export default class App extends PureComponent<Props> {
  render() {
    return <Home />;
  }
}
