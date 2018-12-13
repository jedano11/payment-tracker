import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import { secondsToDigitalClockFormat } from '../../redux/util/common';

type Props = {
  startingSeconds?: number,
};

type State = {
  text: string,
  seconds: number,
};

export default class StopWatch extends PureComponent<Props, State> {
  static defaultProps = {
    startingSeconds: 0,
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      text: '00:00:00',
      seconds: props.startingSeconds || 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { seconds } = this.state;
      const current = seconds + 1;

      this.setState({
        seconds: current,
        text: secondsToDigitalClockFormat(current),
      });
    }, 1000);
  }

  render() {
    const { text } = this.state;

    return <Text {...this.props}>{text}</Text>;
  }
}
