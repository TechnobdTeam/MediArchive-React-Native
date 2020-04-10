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
              {/* <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: '#a6a7ab',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}

                <NB.Input placeholder = "8904" / >
              </NB.Item>
              <NB.View style={{  backgroundColor: 'black', height:1, width:'100%' }}></NB.View>

              <NB.Text style={LoginHomeStyle.verification_message}>{String.verification_message}</NB.Text>


            

            
            <NB.View style={{ flexDirection:'row' , flex:1}}>
                <NB.View style={LoginHomeStyle.verification_submit}>
                  <NB.Text style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.continue}</NB.Text>
                </NB.View>

                <NB.View style={LoginHomeStyle.resend_submit}>
                  <NB.Text style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.resend}</NB.Text>
                </NB.View>

            </NB.View>

          </NB.Content>

          

    

        </NB.View>
      </Fragment>
    );
  }
}
