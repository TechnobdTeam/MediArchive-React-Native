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
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen'
import NumberRegScreen from './NumberRegScreen';
import VerificationScreen from './VerificationScreen';

export default class ContractScreen extends Component {

  constructor(props){
    super(props)


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
    <SafeAreaView>
      <Navbar left={left} right={right} title={String.nav_app_name} />

      <ScrollView style={{ height:'100%' }}>


      <NB.View style={{ backgroundColor: Color.color_theme, }}>
        <NB.View style={{ marginTop:30, marginBottom:60  }}>
          <Image
                source={require('../svgicons/logo_login.svg')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center', height: 170, weidth:170,  }}
              />
        </NB.View>
        
      </NB.View>

      <NB.View style={LoginHomeStyle.top_back}>
        
        <NB.View style={{  width:'50%',justifyContent: 'center',alignItems: 'center',}}>
            <Text style={LoginHomeStyle.top_text}>{String.login}</Text>
              {/* <Image
              source={require('../svgicons/indicator.svg')}
              fadeDuration={0}
              style={{width: 20, height: 20,bottom:0}}
            /> */}
        </NB.View>

        <NB.View style={{ width:'50%',justifyContent: 'center',alignItems: 'center',}}>
            <Text style={LoginHomeStyle.top_text}>{String.registration}</Text>
          
        </NB.View>
        

        
      </NB.View>

      

      {/* <NB.View style={{ flex:1, backgroundColor:'red',height:24 }}>
        <Image
              source={require('../svgicons/indicator.svg')}
              fadeDuration={0}
              style={{width: 20, height: 20}}
            />
        <Image
              source={require('../svgicons/indicator.svg')}
              fadeDuration={0}
              style={LoginHomeStyle.top_indicator}
            />
      </NB.View> */}




      <LoginScreen ></LoginScreen>

      {/* <RegistrationScreen></RegistrationScreen> */}

      {/* <NumberRegScreen></NumberRegScreen> */}

      {/* <VerificationScreen></VerificationScreen> */}


      

      </ScrollView>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

