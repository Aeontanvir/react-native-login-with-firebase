import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './common';
import LoginForm from './LoginForm';


export default class App extends Component {

  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBjJsS2JUNmHcq9zvMWh7LAOlNW-voiAC0',
      authDomain: 'authentication-999.firebaseapp.com',
      databaseURL: 'https://authentication-999.firebaseio.com',
      projectId: 'authentication-999',
      storageBucket: 'authentication-999.appspot.com',
      messagingSenderId: '878404108788'
    });

    firebase.auth().onAuthStateChanged((user) => { 
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

