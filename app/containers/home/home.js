import React, { PureComponent } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

import { Screen } from '../../components/screen';
import styles from './styles';
import NavigationService from '../../navigation/navigationService';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Home extends PureComponent<*> {
  navigateToMain = () => {
    NavigationService.navigate('Main');
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <TouchableOpacity onPress={this.navigateToMain}>
            <Text>Go to Main</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

export default Home;
