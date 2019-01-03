import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Main } from '../containers/main';
import { green } from '../config/colors';

const starImgSrc = require('../assets/demo/star.png');

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
};

const Left = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Left</Text>
  </View>
);

const Right = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Right</Text>
  </View>
);

/*
 SAMPLE CODE STARTS HERE
*/

const noHeaderStyle = {
  backgroundColor: 'black',
  height: 0,
  borderBottomWidth: 0,
};

const renderImage = (focused: boolean) => {
  if (focused) {
    return (
      <Image resizeMode="contain" source={starImgSrc} style={styles.tabIcon} />
    );
  }

  return null;
};

const tabNavigatorScreens = {
  Left: {
    screen: Left,
    navigationOptions: {
      title: 'Left',
      tabBarIcon: ({ focused }) => renderImage(focused),
    },
  },
  Middle: {
    screen: Main,
    headerStyle: noHeaderStyle,
    navigationOptions: {
      title: 'Main',
      tabBarIcon: ({ focused }) => renderImage(focused),
    },
  },
  Right: {
    screen: Right,
    navigationOptions: {
      title: 'Right',
      tabBarIcon: ({ focused }) => renderImage(focused),
    },
  },
};

const SampleTabNavigator = createBottomTabNavigator(tabNavigatorScreens, {
  initialRouteName: 'Middle',
  swipeEnabled: false,
  tabBarOptions: {
    initialLayout: {
      height: 50,
    },
    activeTintColor: green,
    activeBackgroundColor: 'white',
    inactiveTintColor: 'black',
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: 'blue',
    },
    showIcon: true,
    showLabel: true,
  },
});

export default SampleTabNavigator;
