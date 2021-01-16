import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ReturnScreen from "./CheckOutScreen";
import CheckIn from './CheckInScreen'
import BookFinder from "./BookFinder";

export default class HomeScreen extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigator({
  'Return': { screen: ReturnScreen },
  'Book Finder': { screen: BookFinder },
  'Check In': {screen: CheckIn}
});

const AppContainer = createAppContainer(TabNavigator);