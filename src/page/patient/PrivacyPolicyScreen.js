/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  I18nManager,
  TouchableOpacity, 
  TouchableHighlight,
  AsyncStorage,
  Alert, Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'


import AppConstant from '../../component/AppConstant'
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import EmptyMessage from '../../component/EmptyMessage';
var jwt_token = ''

import { WebView } from 'react-native-webview';


export default class PrivacyPolicyScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      offset: 0,
      report_id: '',
    };
  }


  componentDidMount(){
    console.log(" GetParam patient_id:" + this.state.patient_id );
    
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################user_id: " + values)
        jwt_token = values
      })
  }


  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} />;

  return (
    <Fragment style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="Privacy Policy" />
      
      <WebView
        source={{ uri: 'https://mediarchive.technobd.com/app_api/api_public/privacy_policy' }}
        style={{ }}
      />




      
    </Fragment>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Color.lighter,

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Color.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Color.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Color.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  profileImgContainer: {
      marginLeft: 5,
      height: 70,
      width: 70,
      borderRadius: 40,
      marginTop: 0
    },
    profileImg: {
      height: 70,
      width: 70,
      borderRadius: 40,
    },
});

