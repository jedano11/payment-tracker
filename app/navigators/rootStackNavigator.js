import { createStackNavigator } from 'react-navigation';

import Home from '../containers/home/home';

const RootStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
});

export default RootStackNavigator;
