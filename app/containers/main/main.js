import React, { PureComponent } from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { Screen } from '../../components/screen';
import { StopWatch, CountDown } from '../../components/timer';
import { logOut } from '../../redux/auth/auth.action';
import NavigationService from '../../modules/navigation/navigationService';
import styles from './styles';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  authenticated: boolean,
  logOut: Function,
};

class Main extends PureComponent<Props> {
  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated) {
      NavigationService.replace('Home');
    }
  }

  logOut = () => {
    this.props.logOut();
  };

  render() {
    return (
      <Screen style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={this.logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        <CountDown deadline={new Date()} />
        <CountDown deadline={moment().hour(20)} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
