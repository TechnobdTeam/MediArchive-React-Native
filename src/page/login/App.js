/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  I18nManager,
  Image,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

import {
  Actions
} from 'react-native-router-flux';


import {
  ListItem,
  Button,
  Left,
  Right
} from 'native-base';
import ImageSVG from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import AppConstant from '../../component/AppConstant'
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen'
import NumberRegScreen from './NumberRegScreen';
import VerificationScreen from './VerificationScreen';
import ForgotPassword from './ForgotPasswordScreen'
import ForgotVerificationScreen from './ForgotVerificationScreen'
import PasswordChangeScreen from './PasswordChangeScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.HomeScreen()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} />;

          
    return (
      <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title={String.nav_app_name} />

      <ScrollView style={{ height:'85%' }}>
      
      
      <View style={{ backgroundColor:'red', height:400, width:'100%' }}></View>

      <KeyboardAvoidingView
      style={{  }}
      behavior="padding">

    
    <RegistrationScreen/>
      
      
      {/* <TextInput
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />

      <NB.Item>
      <NB.Input 
        style={{ color: '#5a5a5a' }}
        placeholder = "Name" 
        onChangeText={(text)=>{}}/ >
      </NB.Item> */}

      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
    </ScrollView>

    </SafeAreaView>
    );
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
});