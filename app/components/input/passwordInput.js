import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

type Props = {
  showPassword: boolean,
};

export default class PasswordInput extends PureComponent<Props> {
  render() {
    const { showPassword } = this.props;

    return <TextInput secureTextEntry={showPassword} {...this.props} />;
  }
}
