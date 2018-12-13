import { createStackNavigator } from 'react-navigation';

import { Home } from '../containers/home';
import { Main } from '../containers/main';

const RootStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Main: {
    screen: Main,
  },
});

export default RootStackNavigator;
