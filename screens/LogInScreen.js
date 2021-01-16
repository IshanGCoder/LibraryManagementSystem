import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

export default class logInScreen extends Component {
  constructor() {
    super();
    this.state = { text: '' };
  }
  loadHomeScreen = () => {
    this.props.navigation.navigate('Check Out');
  };
  render() {
    return (
      <View>
        <TextInput
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
          style={styles.inputBox}
          placeholder="Enter Password Here"
        />
        <TouchableOpacity
          onPress={() => {
            var password = '1234';
            if (this.state.text == password) {
              this.loadHomeScreen();
            } else {
              Alert.alert('Incorrect Password');
            }
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    border: 'solid',
    borderWidth: 4,
    marginTop: 195,
    height: 50,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    fontSize: 25,
  },
  button: {
    alignSelf: 'center',
    padding: 20,
    border: 'solid',
    borderRadius: 100,
    backgroundColor: '#00FF00',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
