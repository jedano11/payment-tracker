import React, { PureComponent } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Alert } from '../../components/modal';
import { Screen } from '../../components/screen';
import {
  cancel1,
  cancel2,
  cancel3,
  cancelLogin,
  dismissLoginError,
  login,
  request1,
  request2,
  request3,
  startDummySubscription,
  stopDummySubscription,
} from '../../redux/dummy/dummy.action';
import {
  loginRequestState,
  request1State,
  request2State,
  request3State,
} from '../../redux/dummy/dummy.selector';
import type {
  ActionDispatcher,
  RequestObject,
  GlobalState,
} from '../../redux/util/types';
import styles from './styles';

type StateProps = {
  count: number,
  listening: boolean,
  loginRequestState: RequestObject,
  request1State: RequestObject,
  request2State: RequestObject,
  request3State: RequestObject,
};

type DispatchProps = {
  cancel1: () => ActionDispatcher,
  cancel2: () => ActionDispatcher,
  cancel3: () => ActionDispatcher,
  cancelLogin: () => ActionDispatcher,
  dismissLoginError: () => ActionDispatcher,
  login: () => ActionDispatcher,
  request1: () => ActionDispatcher,
  request2: () => ActionDispatcher,
  request3: () => ActionDispatcher,
  startDummySubscription: () => ActionDispatcher,
  stopDummySubscription: () => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

class Home extends PureComponent<Props> {
  subscribeToService = () => {
    this.props.startDummySubscription();
  };

  unsubscribeFromService = () => {
    this.props.stopDummySubscription();
  };

  row = (data: {
    text: string,
    onPress: Function,
    onCancel: Function,
    shouldShowLoader: boolean,
    message: string,
    error: boolean,
  }) => (
    <View style={styles.row}>
      {data.shouldShowLoader && <ActivityIndicator />}
      <Text
        style={{
          color: data.error ? 'red' : 'black',
        }}
      >
        {data.message}
      </Text>
      <TouchableOpacity onPress={data.onPress}>
        <Text>{data.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={data.onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  serviceButton = (listening: boolean) => {
    let text = 'Start Service';
    let onPress = this.subscribeToService;

    if (listening) {
      text = 'Stop Service';
      onPress = this.unsubscribeFromService;
    }

    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Screen style={styles.container}>
        {this.serviceButton(this.props.listening)}
        <Text style={styles.dots}>
          {[...Array(this.props.count)].map(() => `.`)}
        </Text>
        <TouchableOpacity onPress={this.props.login}>
          <Text>Login</Text>
        </TouchableOpacity>
        {this.row({
          error: this.props.request1State.error,
          message: this.props.request1State.message,
          onCancel: this.props.cancel1,
          onPress: this.props.request1,
          shouldShowLoader: this.props.request1State.sending,
          text: 'Request 1',
        })}
        {this.row({
          error: this.props.request2State.error,
          message: this.props.request2State.message,
          onCancel: this.props.cancel2,
          onPress: this.props.request2,
          shouldShowLoader: this.props.request2State.sending,
          text: 'Request 2',
        })}
        {this.row({
          error: this.props.request3State.error,
          message: this.props.request3State.message,
          onCancel: this.props.cancel3,
          onPress: this.props.request3,
          shouldShowLoader: this.props.request3State.sending,
          text: 'Request 3',
        })}

        <Alert
          showActivityIndicator={this.props.loginRequestState.sending}
          visible={
            this.props.loginRequestState.sending ||
            this.props.loginRequestState.error
          }
          labelText={this.props.loginRequestState.message}
          buttons={[
            {
              onPress: this.props.loginRequestState.sending
                ? this.props.cancelLogin
                : this.props.dismissLoginError,
              title: this.props.loginRequestState.sending ? 'Cancel' : 'Ok',
            },
          ]}
        />
      </Screen>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  count: state.dummyStore.count,
  listening: state.dummyStore.listening,
  loginRequestState: loginRequestState(state),
  request1State: request1State(state),
  request2State: request2State(state),
  request3State: request3State(state),
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  cancel1: () => dispatch(cancel1()),
  cancel2: () => dispatch(cancel2()),
  cancel3: () => dispatch(cancel3()),
  cancelLogin: () => dispatch(cancelLogin()),
  dismissLoginError: () => dispatch(dismissLoginError()),
  login: () => dispatch(login()),
  request1: () => dispatch(request1()),
  request2: () => dispatch(request2()),
  request3: () => dispatch(request3()),
  startDummySubscription: () => dispatch(startDummySubscription()),
  stopDummySubscription: () => dispatch(stopDummySubscription()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
