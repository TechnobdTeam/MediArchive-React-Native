import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import {Image} from 'react-native';
import AppConstant from '../component/AppConstant';

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
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(() => {
      console.log('contact_screen');
      Actions.HomeScreen();
    }, 3000);
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor={AppConstant.THEME_COLOR}
          barStyle="light-content"
        />
        <NB.Container style={{backgroundColor: AppConstant.THEME_COLOR}}>
          <NB.View
            style={{justifyContent: 'center', alignItems: 'center', top: 150}}>
            <NB.CardItem
              style={{
                backgroundColor: 'transparent',
                width: 255,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('./images/placeholder.png')}
                fadeDuration={0}
                style={{width: 80, height: 80}}
              />
            </NB.CardItem>
            <NB.View>
              <NB.Text
                style={{
                  color: '#fff',
                  fontSize: 23,
                  marginTop: 10,
                  width: 200,
                  textAlign: 'center',
                  padding: 10,
                  shadowOpacity: 0,
                }}>
                Newsello
              </NB.Text>
            </NB.View>
          </NB.View>
          <NB.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              bottom: -100,
            }}>
            <NB.View>
              <NB.Text style={{color: '#fff', fontSize: 20}}>
                Developed By
              </NB.Text>
            </NB.View>
            <NB.View>
              <NB.Text style={{color: '#fff', fontSize: 20}}>
                Newsello Limited
              </NB.Text>
            </NB.View>
            <NB.View>
              <NB.Text style={{color: '#fff', fontSize: 20, marginTop: 15}}>
                Version- 1.0.0
              </NB.Text>
            </NB.View>
          </NB.View>
        </NB.Container>
      </Fragment>
    );
  }
}
