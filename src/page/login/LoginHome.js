/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
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

import {Actions} from 'react-native-router-flux';


import {ListItem, Button, Left, Right} from 'native-base';
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


export default class ContractScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      selected_screen:'login'
    }
  }

  updateState = () => {

    console.log('updateState')
    this.setState({
      selected_screen: 'phone_number'
    });
  }

  updateState2 = () => {
    this.setState({
      selected_screen: 'verify_number'
    });
  }

  updateStateForgotPassword = () => {
    console.log('.........updateStateForgotVerify: ' 
    + 'forgot_verify_number' + this.props.action_type
    +" login_status: " + AppConstant.login_response_status )
    
    if (AppConstant.login_response_status === ''){
      this.setState({
        selected_screen: 'forgot_password'
      });
    }else{
      // this.setState({
      //   selected_screen: 'phone_number'
      // });

      this.setState({
        selected_screen: 'verify_number'
      });
      
    }
    
  }

  updateStateForgotVerify = () => {
    this.setState({
      selected_screen: 'forgot_verify_number'
    });
  }

  updateStateForgotChangePass = () => {
    this.setState({
      selected_screen: 'forgot_change_pass'
    });
  }

  updateStateForgotLogin = () => {
    console.log('.........: ' + 'login')
    this.setState({
      selected_screen: 'login'
    });
  }

  render(){
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

      <ScrollView style={{ height:'87%' }}>

      <NB.View style={{ backgroundColor: Color.color_theme, }}>
        <NB.View style = {
          {
            marginTop: 30,
            marginBottom:30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }
        } >
          {/* <ImageSVG
                source={require('../svgicons/logo_login.svg')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center', height: 170, weidth:170,  }}
              /> */}
          <Image
          source={require('../images/medi_logo_login.png')}
          resizeMode={'cover'} 
          style={{  height: 170, weidth:170,  }}
          />
        </NB.View>
        
      </NB.View>

      <NB.View style={LoginHomeStyle.top_back}>
        
        <NB.View style={{  width:'50%',justifyContent: 'center',alignItems: 'center',}}>
            <Text 
            onPress = {
              () => {
                this.setState({
                  selected_screen: 'login'
                })
              }
            }
            style={{flex:1,fontSize:18,color: this.state.selected_screen === 'login' ?  'white' : Color.readmore ,textAlign: 'center'}}>{String.login}</Text>
              
        </NB.View>

        <NB.View style={{ width:'50%',justifyContent: 'center',alignItems: 'center',}}>
            <Text 
            onPress={()=>{
              this.setState(
                {
                  selected_screen:'registration'
                }
              )
            }}
            style={{flex:1,fontSize:18,color: this.state.selected_screen != 'login' ?  'white' : Color.readmore ,textAlign: 'center'}}>{String.registration}</Text>
          
        </NB.View>
        

        
      </NB.View>


      <NB.View style = {
        {
          flexDirection: 'row',
          width: '100%',
          backgroundColor: 'white',
          
        }
      } >
          <NB.View style={{width:'50%',justifyContent: 'center',alignItems: 'center',}}>
              {(this.state.selected_screen === 'login' || 
                this.state.selected_screen === 'forgot_password'||
                this.state.selected_screen === 'forgot_verify_number'||
                this.state.selected_screen === 'forgot_change_pass' )
              ? 
              <Icon name="sort-up" style={{ marginTop: -12, fontSize: 30, color: '#fff',  }} />  : null }
          </NB.View>
          <NB.View style={{width:'50%',justifyContent: 'center',alignItems: 'center',}}>
              {(this.state.selected_screen === 'registration'||
              this.state.selected_screen === 'phone_number'||
              this.state.selected_screen === 'verify_number')
              ? 
              <Icon name="sort-up" style={{ marginTop: -12, fontSize: 30, color: '#fff', }} />  : null }            
          </NB.View> 

      </NB.View>

      <KeyboardAvoidingView  behavior = "padding" >

      {
        this.state.selected_screen === 'login' ?  <LoginScreen updateState={this.updateStateForgotPassword}></LoginScreen>: null
      }

      {
        this.state.selected_screen === 'registration' ? <RegistrationScreen updateState={this.updateState}></RegistrationScreen> : null
      }

      {
        this.state.selected_screen === 'phone_number' ? <NumberRegScreen updateState={this.updateState2}> </NumberRegScreen> : null
      }

      {
        this.state.selected_screen === 'verify_number' ? <VerificationScreen > </VerificationScreen> : null
      }

      {
        this.state.selected_screen === 'forgot_password' ? <ForgotPassword updateState={this.updateStateForgotVerify}> </ForgotPassword> : null
      }

      {
        this.state.selected_screen === 'forgot_verify_number' ? <ForgotVerificationScreen updateState={this.updateStateForgotChangePass}> </ForgotVerificationScreen> : null
      }

      {
        this.state.selected_screen === 'forgot_change_pass' ? <PasswordChangeScreen updateState={this.updateStateForgotLogin}> </PasswordChangeScreen> : null
      }

      <NB.View style={{ height: 60 }} />
      </KeyboardAvoidingView>


      

      </ScrollView>
      
    </SafeAreaView>
  );
};
}

