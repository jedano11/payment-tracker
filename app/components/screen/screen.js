import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  style?: Object,
};

export default class Screen extends PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { style } = this.props;

    return <View style={[styles.container, style]} {...this.props} />;
  }
}
