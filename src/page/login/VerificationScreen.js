import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
// import {Image} from 'react-native';
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Image from 'react-native-remote-svg';

export default class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_name: '',
      base_url: '',
      device_type: Platform.OS === 'ios' ? '2' : '1',
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Fragment >
        <NB.View style={{ backgroundColor:'white', height:'100%',width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30,paddingBottom:20 }}>
          
          <NB.Text style={LoginHomeStyle.verification_title}>{String.verification_code}</NB.Text>

          <NB.Content>
            
              <NB.Item>
                <Image
                source = {
                  require('../svgicons/mobile-verification.svg')
                }
                fadeDuration={0}
                style={{width: 20, height: 20}}
              />
                <NB.Input placeholder = "8904" / >
              </NB.Item>
              <NB.View style={{  backgroundColor: 'black', height:1, width:'100%' }}></NB.View>

              <NB.Text style={LoginHomeStyle.verification_message}>{String.verification_message}</NB.Text>


            

            
            <NB.View style={{ flexDirection:'row' , flex:1}}>
                <NB.Button style={LoginHomeStyle.verification_submit}>
                  <NB.Text>{String.continue}</NB.Text>
                </NB.Button>

                <NB.Button style={LoginHomeStyle.resend_submit}>
                  <NB.Text>{String.resend}</NB.Text>
                </NB.Button>

            </NB.View>

          </NB.Content>

          

    

        </NB.View>
      </Fragment>
    );
  }
}
