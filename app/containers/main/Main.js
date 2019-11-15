import moment from 'moment';
import React, { PureComponent } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/screen';
import { CountDown, StopWatch } from '../../components/timer';
import NavigationService from '../../modules/navigation/navigationService';
import { logOut } from '../../redux/auth/auth.action';
import styles from './styles';

const instructions = Platform.select({
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
});

type Props = {
  authenticated: boolean,
  logOut: () => void,
};

class Main extends PureComponent<Props> {
  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated) {
      NavigationService.replace('Home');
    }
  }

  render() {
    return (
      <Screen style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={this.props.logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        <CountDown deadline={new Date()} />
        <CountDown
          deadline={moment()
            .hour(20)
            .toDate()}
        />
        <StopWatch />
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authStore.authenticated,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
