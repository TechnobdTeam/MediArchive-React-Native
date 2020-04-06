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
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';

export default class LoginScreen extends Component {
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
        <NB.View style={{ backgroundColor:'white', height:'100%',width:'100%',paddingLeft:20, paddingRight:20,paddingTop:40,paddingBottom:20 }}>
          

          <NB.Content>
            
              <NB.Item>
                <NB.Input placeholder = "Email/Mobile" / >
              </NB.Item>
              <NB.Item style={{ marginTop:15 }}>
                <NB.Input placeholder = "Password" / >
              </NB.Item>


            <NB.Button style={LoginHomeStyle.login_submit}>
              <NB.Text>{String.login}</NB.Text>
            </NB.Button>

            <NB.Text style={LoginHomeStyle.forgot_password}>{String.forgot_password}</NB.Text>

            


          </NB.Content>

          

         

        </NB.View>
      </Fragment>
    );
  }
}
