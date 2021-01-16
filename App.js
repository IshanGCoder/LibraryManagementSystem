import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CheckOut from './screens/CheckOutScreen';
import CheckIn from './screens/CheckInScreen';
import BookFinder from './screens/BookFinder';
import LogInScreen from './screens/LogInScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator({
  'Check Out': { screen: CheckOut },
  'Book Finder': { screen: BookFinder },
  'Check In': { screen: CheckIn },
});

const SwitchNavigator = createSwitchNavigator({
  LogInScreen: { screen: LogInScreen },
  TabNavigator: { screen: TabNavigator },
});

const AppContainer = createAppContainer(SwitchNavigator);
