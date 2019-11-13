import React, { PureComponent } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Screen } from '../../components/screen';
import {
  sampleDebounceRequest,
  sampleSendRequest,
  sampleSendRequestLatest,
} from '../../redux/dummy/dummy.action';
import { sampleDebouceRequest3State } from '../../redux/dummy/dummy.selector';
import type {
  ActionDispatcher,
  RequestObject,
  GlobalState,
} from '../../redux/util/types';
import styles from './styles';

type StateProps = {
  sampleDebouceRequest3State: RequestObject,
  searchKeys: string[],
  clicksByReqest: number,
  clicksByReqestLatest: number,
};

type DispatchProps = {
  sampleDebounceRequest: (text: string) => ActionDispatcher,
  sampleSendRequest: () => ActionDispatcher,
  sampleSendRequestLatest: () => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

type State = {
  clicksByReqest: number,
  clicksByReqestLatest: number,
};

class Left extends PureComponent<Props, State> {
  state = {
    clicksByReqest: 0,
    clicksByReqestLatest: 0,
  };

  stringSearch = (text: string) => {
    this.props.sampleDebounceRequest(text);
  };

  press = () => {
    this.setState(prevState => ({
      clicksByReqest: prevState.clicksByReqest + 1,
    }));

    this.props.sampleSendRequest();
  };

  pressLatest = () => {
    this.setState(prevState => ({
      clicksByReqestLatest: prevState.clicksByReqestLatest + 1,
    }));

    this.props.sampleSendRequestLatest();
  };

  render() {
    return (
      <Screen style={styles.container}>
        <Text>debounceRequest sample</Text>
        <TextInput
          onChangeText={this.stringSearch}
          style={{
            width: '100%',
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
          }}
        />
        {this.props.sampleDebouceRequest3State.sending && (
          <Text>Fetching...</Text>
        )}
        <Text>{JSON.stringify(this.props.searchKeys)}</Text>
        <Text>sendRequest sample</Text>
        <TouchableOpacity
          style={{ width: 100, height: 50 }}
          onPress={this.press}
        >
          <View
            style={{ alignSelf: 'center', padding: 5, backgroundColor: 'red' }}
          >
            <Text>increment</Text>
          </View>
        </TouchableOpacity>
        <Text>
          {`${this.state.clicksByReqest}:${this.props.clicksByReqest}`}
        </Text>
        <Text>sendRequestLatest sample</Text>
        <TouchableOpacity
          style={{ width: 100, height: 50 }}
          onPress={this.pressLatest}
        >
          <View
            style={{ alignSelf: 'center', padding: 5, backgroundColor: 'red' }}
          >
            <Text>increment</Text>
          </View>
        </TouchableOpacity>
        <Text>
          {`${this.state.clicksByReqestLatest}:${this.props.clicksByReqestLatest}`}
        </Text>
      </Screen>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  sampleDebouceRequest3State: sampleDebouceRequest3State(state),
  searchKeys: state.dummyStore.searchKeys,
  clicksByReqest: state.dummyStore.clicksByReqest,
  clicksByReqestLatest: state.dummyStore.clicksByReqestLatest,
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  sampleDebounceRequest: text => dispatch(sampleDebounceRequest(text)),
  sampleSendRequest: () => dispatch(sampleSendRequest()),
  sampleSendRequestLatest: () => dispatch(sampleSendRequestLatest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Left);
