import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class BookFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      book: null,
      searchText: '',
    };
  }

  componentDidMount = async () => {
    const query = await db.collection('Books').get();
    query.docs.map((doc) => {
      this.setState({
        allBooks: [...this.state.allBooks, doc.data()],
      });
    });
  };

  searchBook = async(book) => {
    this.setState({allBooks: []})
    const transaction = await db.collection("Books").where("BookDetails.BookName", "==", book).get()
    transaction.docs.map((doc) => {
      this.setState({allBooks: [...this.state.allBooks, doc.data()]})
    })
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.searchBar}>
          <TextInput style = {styles.bar}
            placeholder="Enter Book Name"
            onChangeText={(text) => {
              this.setState({ searchText: text });
            }}
            value={this.state.searchText}></TextInput>
          <TouchableOpacity style = {styles.searchButton}
          onPress = {() => {this.searchBook(this.state.searchText)}}>
          <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
        <FlatList data = {this.state.allBooks}
        renderItem = {({item}) => (
          <View style = {{borderBottomWidth: 2, padding: 10}}>
          <Text>{'Book ID: ' + item.BookID}</Text>
          <Text>{'Book Name: ' + item.BookDetails.BookName}</Text>
          <Text>{'Book Author: ' + item.BookDetails.BookAuthor}</Text>
          <Text>{item.BookAvailability?"Book Availability: Available":"Book Availalability: Not Available"}</Text>
          </View>
        )}></FlatList>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 20
    },
    searchBar: {
      flexDirection: "row",
      height: 40,
      width: 'auto',
      borderWidth: 0.5,
      alignItems: 'center'
    },
    bar: {
      borderWidth: 2,
      height: 30, 
      width: 300,
      paddingLeft: 10
    },
    searchButton: {
      borderWidth: 1,
      height: 30,
      width: 50,
      alighnItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green'
    }
});
