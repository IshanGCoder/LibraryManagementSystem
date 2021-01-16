import * as React from 'react';
import {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import LogInScreen from './LogInScreen'
import HomeScreen from './HomeScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs';

  export default class BufferApp extends Component {
    render() {
      return(
        <View>
          <AppContainer/>
        </View>
      )
    }
  }

var switchNavigator = createSwitchNavigator ({
  LogInScreen: LogInScreen,
  HomeScreen: HomeScreen
})

const AppContainer = createAppContainer(switchNavigator)