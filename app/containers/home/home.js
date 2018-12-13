import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';
import moment from 'moment';

import { Screen } from '../../components/screen';
import { StopWatch, CountDown } from '../../components/timer';
import styles from './styles';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Home extends PureComponent<*> {
  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <CountDown deadline={new Date()} />
          <CountDown deadline={moment().hour(20)} />
          <StopWatch />
        </View>
      </Screen>
    );
  }
}
