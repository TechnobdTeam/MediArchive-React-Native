/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  I18nManager,
  AsyncStorage,
  Platform,
  Image,
  Dimensions,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import ImageZoom from 'react-native-image-pan-zoom';

import {ListItem, Button, Left, Right} from 'native-base';
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

import ImageLoad from 'react-native-image-placeholder';


export default class FullImageScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      offset: 0,
      report_id: '',
      title: this.props.title,
      photo: this.props.photo,
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
    <Fragment style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title={this.state.title} />
      <NB.View
        style={{
          borderColor: '#0099cb',
          borderRadius: 2,
          padding:10,
          width: '100%',
          height: '89%',
          backgroundColor: Color.chrome_grey
        }}>

        <ImageLoad
          source={{ uri:this.state.photo }}
          loadingStyle={{ size: 'large', color: Color.color_theme}}
          style={{height: '100%', width: '100%'}}
        />
      </NB.View>
    </Fragment>
  );
};
}

