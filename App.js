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
  Picker
} from 'react-native';
import NotificationService from './src/NotificationService';
import appConfig from './app.json';
import * as NB from 'native-base';

import ImageLoad from 'react-native-image-placeholder';

import LoginScreen from './src/page/login/LoginScreen'


// import RegistrationScreen from './src/page/login/RegistrationScreen'

export default class App extends Component {
  state = {choosenLabel: '', choosenindex: ''}

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
    };

    this.notif = new NotificationService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  
  focusNextField(id) {
    this.inputs[id].focus();
  }
  componentDidMount(){
    console.log('componentDidMount: '+ Date.now())
  }

  render() {
          
    return (
      <SafeAreaView style={{flex: 1}}> 
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={false} /> 
      <View style={styles.outerContainer}>

      <Picker selectedValue={this.state.choosenLabel}
          onValueChange={
          (itemValue, itemIndex) => this.setState({
              choosenLabel: itemValue, 
              choosenindex:itemIndex})
        }>
            <Picker.Item label = "Hello" value = "word1" />
            <Picker.Item label = "React" value = "word2" />
            <Picker.Item label = "Native" value = "word3" />
            <Picker.Item label = "How" value = "word4" />
            <Picker.Item label = "are" value = "word5" />
            <Picker.Item label = "you" value = "word6" />
        </Picker>

            {/* <NB.Item>
        <NB.Input 
        placeholderTextColor={'#8e9093'}
        placeholder = "Email/Mobile" 
        autoCapitalize = 'none'
        returnKeyType={ "next" }
        
        ref={(input) => this._email = input}
        returnKeyType='next'
        onSubmitEditing={() => this._password._root.focus()}
        
        / >
      </NB.Item>

      <NB.Item style={{ marginTop:15 }}>
        <NB.Input 
        placeholderTextColor={'#8e9093'}
        placeholder = "Password" 
        secureTextEntry={true}

        returnKeyType={ "done" }
        ref={(input) => this._password = input}
        
        / >
      </NB.Item>

        <TextInput
          placeholder="one"
          style={styles.textInput}
          blurOnSubmit={ false }
          onSubmitEditing={() => {
            this.focusNextField('two');
          }}
          returnKeyType={ "next" }
          
          ref={ input => {
            this.inputs['one'] = input;
          }}
        /> */}

        <TextInput
          placeholder="two"
          blurOnSubmit={ false }
          onSubmitEditing={() => {
            this.focusNextField('three');
          }}
          returnKeyType={ "next" }
          style={styles.textInput}
          ref={ input => {
            this.inputs['two'] = input;
          }}
        />
        <TextInput
          placeholder="three"
          blurOnSubmit={ false }
          onSubmitEditing={() => {
            this.focusNextField('four');
          }}
          returnKeyType={ "next" }
          style={styles.textInput}
          ref={ input => {
            this.inputs['three'] = input;
          }}
        />
        <TextInput
          placeholder="four"
          blurOnSubmit={ true }
          returnKeyType={ "done" }
          style={styles.textInput}
          ref={ input => {
            this.inputs['four'] = input;
          }}
        />
      </View>
      <LoginScreen></LoginScreen>
      
        {/* <ImageLoad
            style={{ width: 320, height: 250 }}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: 'https://mediarchive.technobd.com/assets/media/report_photo/15900630101.jpg' }}
        /> */}
        {/* <Text style={styles.title}>
          Example app react-native-push-notification
        </Text>
        
        <View style={styles.spacer}></View>
        <TextInput
          style={styles.textField}
          value={this.state.registerToken}
          placeholder="Register token"
        />
        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            var value = Date.now() + 60*1000
            var title = 'Test Message'
            var message = 'No covic-19 Patient Found'
            this.notif.scheduleNotif(value, title, message);
          }}>
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelNotif();
          }}>
          <Text>Cancel last notification (if any)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.cancelAll();
          }}>
          <Text>Cancel all notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.checkPermission(this.handlePerm.bind(this));
          }}>
          <Text>Check Permission</Text>
        </TouchableOpacity>

        <View style={styles.spacer}></View>
        <TextInput
          style={styles.textField}
          value={this.state.senderId}
          onChangeText={(e) => {
            this.setState({senderId: e});
          }}
          placeholder="FCM ID"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.configure(
              this.onRegister.bind(this),
              this.onNotif.bind(this),
              this.state.senderId,
            );
          }}>
          <Text>Configure Sender ID</Text>
        </TouchableOpacity>
        {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

        <View style={styles.spacer}></View> */}

      </SafeAreaView>


    );
  }

  onRegister(token) {
    console.log('------------onRegister', token, );
    // Alert.alert('Registered !', JSON.stringify(token));
    console.log(token);
    // this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    // console.log('-------------notif', notif, );
    // console.log(notif);
    // Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    // console.log('-------------handlePerm', perms, );
    // Alert.alert('Permissions', JSON.stringify(perms));
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
  outerContainer: {
      flex: 1,
      paddingTop: 60,
      alignItems: 'center',
      flexDirection: 'column',
    },
    textInput: {
      alignSelf: 'stretch',
      borderRadius: 5,
      borderWidth: 1,
      height: 44,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginBottom: 20,
    },
});