/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback, 
  Button, 
  Keyboard
} from 'react-native';
import NotificationService from './NotificationService';
import appConfig from './app.json';
import * as NB from 'native-base';

import RegistrationScreen from './src/page/login/RegistrationScreen'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
    };

    this.notif = new NotificationService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
          
    return (


    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView> 
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <View style={{ backgroundColor:'red', height:300, width:'100%' }}></View> 
          
          {/* <TextInput placeholder="Username" style={styles.textInput} />
          <TextInput placeholder="Username2" style={styles.textInput} />
          <TextInput placeholder="Username3" style={styles.textInput} />
          <TextInput placeholder="Username4" style={styles.textInput} />
          <TextInput placeholder="Username5" style={styles.textInput} />
          <TextInput placeholder="Username6" style={styles.textInput} />
          <TextInput placeholder="Username7" style={styles.textInput} />
          <TextInput placeholder="Username8" style={styles.textInput} /> */}

          <RegistrationScreen/>

          
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </ScrollView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

    );
  }

  onRegister(token) {
    console.log('------------onRegister', token, );
    Alert.alert('Registered !', JSON.stringify(token));
    console.log(token);
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    console.log('-------------notif', notif, );
    // console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    console.log('-------------handlePerm', perms, );
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
    marginTop:10,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});