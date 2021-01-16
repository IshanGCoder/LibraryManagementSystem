import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from '../config';
import { firebase } from '@firebase/app';

export default class CheckOut extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
      scannedBookID: '',
      scannedStudentID: '',
      transactionMessage: '',
    };
  }

  getCameraPermissions = async (ID) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: ID,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    if (this.state.buttonState == 'bookID') {
      this.setState({
        scanned: true,
        scannedBookID: data,
        buttonState: 'normal',
      });
    } else if (this.state.buttonState == 'studentID') {
      this.setState({
        scanned: true,
        scannedStudentID: data,
        buttonState: 'normal',
      });
    }
  };

  initiateBookIssue = async () => {
    db.collection('Transactions').add({
      StudentID: this.state.scannedStudentID,
      BookID: this.state.scannedBookID,
      Date: firebase.firestore.Timestamp.now().toDate(),
      TransactionType: 'Issue',
    });
    db.collection('Books').doc(this.state.scannedBookID).update({
      BookAvailability: false,
    });
    db.collection('Students')
      .doc(this.state.scannedStudentID)
      .update({
        BooksIssued: firebase.firestore.FieldValue.increment(+1),
      });
    this.setState({
      scannedStudentID: '',
      scannedBookID: '',
    });
  };

  handleTranaction = async () => {
    var transactionMessage = null;
    db.collection('Books')
      .doc(this.state.scannedBookID)
      .get()
      .then((doc) => {
        {
          var book = doc.data();
          if (!book) {
            transactionMessage = 'Book not Found';
            Alert.alert(transactionMessage);
          } else {
            if (book.BookAvailability) {
              this.initiateBookIssue();
              transactionMessage = 'Book Issued';
              Alert.alert(transactionMessage);
            }
            this.setState({ transactionMessage: transactionMessage });
          }
        }
      });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState != 'normal' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <View style={styles.container}>
            <View>
              <TextInput
                style={styles.inputBox}
                placeholder="Book ID"
                value={this.state.scannedBookID}
                onChangeText={(text) =>
                  this.setState({ scannedBookID: text })
                }></TextInput>
              <TouchableOpacity
                onPress={() => this.getCameraPermissions('bookID')}
                style={styles.scanButton}>
                <Text style={styles.buttonText}>Scan Book Barcode</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                style={styles.inputBox}
                placeholder="Student ID"
                value={this.state.scannedStudentID}
                onChangeText={(text) =>
                  this.setState({ scannedStudentID: text })
                }></TextInput>
              <TouchableOpacity
                onPress={() => this.getCameraPermissions('studentID')}
                style={styles.scanButton}>
                <Text style={styles.buttonText}>Scan Student ID</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={async () => {
                var transactionMessage = await this.handleTranaction();
              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  inputBox: {
    textAlign: 'center',
    border: 'solid',
    fontSize: 20,
    padding: 10,
  },
});
