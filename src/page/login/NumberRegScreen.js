import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
// import {Image} from 'react-native';
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';


export default class NumberRegScreen extends Component {
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

              <ImageBackground  style={{width: '100%', borderBottomColor: Color.readmore, borderBottomWidth:1, padding:10  }}>
                  <RNPickerSelect
                    onValueChange={value => console.log(value)}
                    items={[
                      {label: 'Bangladesh (+880)', value: 'Bangladesh (+880)'},
                      {label: 'Bangladesh (+880)', value: 'Bangladesh (+880)'},
                      {label: 'Bangladesh (+880)', value: 'Bangladesh (+880)'},
                    ]}
                  />
              </ImageBackground>
            
              {/* <NB.Item>
                <NB.Input placeholder = "Bangladesh +880 " / >
              </NB.Item> */}

              {/* <NB.View style={LoginHomeStyle.SectionStyle}>
                  <Image
                      source={require('../images/dateback.png')} //Change your icon image here
                      style={LoginHomeStyle.ImageStyle}
                  />

                  <NB.Input
                      style={{ flex: 1 }}
                      placeholder = "Bangladesh +880 "
                      underlineColorAndroid="transparent"
                  />
              </NB.View> */}

              {/* <NB.View style={LoginHomeStyle.searchSection}>
                  <Icon style={LoginHomeStyle.searchIcon} name="search" size={20} color="#000"/>
                  
                  <NB.Input placeholder = "Bangladesh +880 " 
                  style={LoginHomeStyle.input}/ >
                  
              </NB.View> */}

              <NB.Item style={{ marginTop:20, marginBottom:20 }}>
                <NB.Input 
                style={{ color: '#8e9093 ' }}
                placeholder = "Mobile Number" / >
              </NB.Item>


            <NB.View style={LoginHomeStyle.login_submit}>
              <NB.Text style={{ marginTop:20, marginBottom:20, color:'white', fontSize:18 }}>{String.continue}</NB.Text>
            </NB.View>

          </NB.Content>

          

    

        </NB.View>
      </Fragment>
    );
  }
}
