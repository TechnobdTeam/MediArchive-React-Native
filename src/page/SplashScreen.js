import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import Image from 'react-native-remote-svg';
import AppConstant from '../component/AppConstant';

import String from '../component/String';
import Color from '../component/Colors'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_name: '',
      base_url: '',
      device_type: Platform.OS === 'ios' ? '2' : '1',
    };
    this.tobBottomViewColor();
  }

  tobBottomViewColor() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    console.log("---------#####--------: "+String.developed_by)
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      console.log('contact_screen');
        Actions.HomeScreen();
    }, 6000);
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor={Color.white}
          barStyle="light-content"
        />
        <NB.Container style={{backgroundColor: Color.white, alignContent: 'center',justifyContent: 'center',}}>
          <NB.View
            style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Image
                source={require('./svgicons/logo.svg')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center', height: 165, weidth:165 }}
              />

          </NB.View>
          
          <NB.Text style={{color: Color.color_app, fontSize: 16, justifyContent: 'center',
              alignItems: 'center', textAlign:'center',marginBottom:50}}>
          {String.developed_by}
        </NB.Text>
        </NB.Container>

        
      </Fragment>
    );
  }
}

