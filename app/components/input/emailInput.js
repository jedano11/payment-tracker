import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

export default class EmailInput extends PureComponent<*> {
  render() {
    return <TextInput keyboardType="email-address" {...this.props} />;
  }
}
