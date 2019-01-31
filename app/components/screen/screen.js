import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';

type Props = {
  style?: Object,
};

class Screen extends PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { style } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View {...this.props} style={style} />
      </SafeAreaView>
    );
  }
}

export default Screen;
