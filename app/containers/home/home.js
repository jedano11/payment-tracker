import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { Screen } from '../../components/screen';
import styles from './styles';
import { sendRequest, cancelRequest } from '../../redux/request/request.action';
import { SAMPLE } from '../../redux/request/request.constants';
import { selectRequestObject } from '../../redux/request/request.selector';
import NavigationService from '../../modules/navigation/navigationService';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  sendRequest: Function,
  cancelRequest: Function,

  login: Object,
  request1: Object,
  request2: Object,
  request3: Object,
};

class Home extends PureComponent<Props> {
  login = () => {
    this.props.sendRequest(
      SAMPLE,
      'login',
      {},
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    );
  };

  cancel = () => {
    this.props.cancelRequest(SAMPLE, 'login', {});
  };

  request1 = () => {
    this.props.sendRequest(SAMPLE, 'request1', {});
  };

  request2 = () => {
    this.props.sendRequest(SAMPLE, 'request2', {});
  };

  request3 = () => {
    this.props.sendRequest(SAMPLE, 'request3', {});
  };

  cancel1 = () => {
    this.props.cancelRequest(SAMPLE, 'request1', {});
  };

  cancel2 = () => {
    this.props.cancelRequest(SAMPLE, 'request2', {});
  };

  cancel3 = () => {
    this.props.cancelRequest(SAMPLE, 'request3', {});
  };

  row = (
    text: string,
    onPress: Function,
    onCancel: Function,
    shouldShowLoader: boolean,
    message: string,
    error: boolean,
  ) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {shouldShowLoader && <ActivityIndicator />}
      <Text
        style={{
          color: error ? 'red' : 'black',
        }}
      >
        {message}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          {this.row(
            'Login',
            this.login,
            this.cancel,
            this.props.login.sending,
            this.props.login.message,
            this.props.login.error,
          )}
          {this.row(
            'Request 1',
            this.request1,
            this.cancel1,
            this.props.request1.sending,
            this.props.request1.message,
            this.props.request1.error,
          )}
          {this.row(
            'Request 2',
            this.request2,
            this.cancel2,
            this.props.request2.sending,
            this.props.request2.message,
            this.props.request2.error,
          )}
          {this.row(
            'Request 3',
            this.request3,
            this.cancel3,
            this.props.request3.sending,
            this.props.request3.message,
            this.props.request3.error,
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  login: selectRequestObject(state, SAMPLE, 'login'),
  request1: selectRequestObject(state, SAMPLE, 'request1'),
  request2: selectRequestObject(state, SAMPLE, 'request2'),
  request3: selectRequestObject(state, SAMPLE, 'request3'),
});

const mapDispatchToProps = dispatch => ({
  sendRequest: (
    key: string,
    id: string,
    params: Object,
    successAction?: Object,
  ) => dispatch(sendRequest(key, id, params, successAction)),
  cancelRequest: (key: string, id: string) => dispatch(cancelRequest(key, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
