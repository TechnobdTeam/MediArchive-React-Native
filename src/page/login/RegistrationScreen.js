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

export default class RegistrationScreen extends Component {
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
                <NB.Input 
                style={{ color: '#8e9093 ' }}
                placeholder = "Name" / >
              </NB.Item>
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#8e9093 ' }}
                placeholder = "Email" / >
              </NB.Item>
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#8e9093 ' }}
                placeholder = "Password" / >
              </NB.Item>
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#8e9093 ' }}
                placeholder = "Retype Password" / >
              </NB.Item>

              <NB.View style={{ flexDirection:'row', marginTop:20}}>
                <NB.CheckBox checked={true} style={{ marginLeft:0, fontSize:14, color: Color.readmore }} />
                <NB.Body style={{ flexDirection:'row',marginLeft:15}}>
                  <NB.Text style={{  fontSize:14, color: Color.readmore, margin:0 }}>{String.accept_terms}</NB.Text>
                  <NB.Text style={{ fontSize:15, color: Color.color_theme,textDecorationLine: 'underline', }}>{String.terms_and_condition}</NB.Text>
                </NB.Body>

                {/* <NB.Body>
                  <NB.Text style={{ fontSize:14, color: Color.color_theme }}>{String.terms_and_condition}</NB.Text>
                </NB.Body> */}
                
              </NB.View>

              
            


            <NB.View style={LoginHomeStyle.login_submit}>
              <NB.Text style={{ fontSize:18, marginBottom:20, marginTop:20, color:'white' }}>{String.continue}</NB.Text>
            </NB.View>

            


          </NB.Content>

          

        </NB.View>
      </Fragment>
    );
  }
}
