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

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from '../../component/AppConstant';
import Loading from '../../component/Loading'
// import Toast from 'react-native-simple-toast';
  var calling_code = '';
  var mobile_number ='';
  var forgot_pass_type= '';

  var verification_code = ''

export default class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      
      user_id:'',
      verification_code:'',
      resend_action:false,
      
  }
}

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({
        resend_action: true
      })
      
    }, (1000*30) );

    AsyncStorage.getItem(AppConstant.forgot_pass_type, (error, values) => {
      console.log("user_id: " + values)
      orgot_pass_type: values
      // this.setState({
      //   forgot_pass_type: values
      // })
    })

    AsyncStorage.getItem(AppConstant.user_mobile_number, (error, value) => {
      console.log("user_mobile_number: " + value)
      mobile_number: value
      // this.setState({
      //   mobile_number: user_mobile_number
      // })
    })

    AsyncStorage.getItem(AppConstant.user_calling_code, (error, value) => {
      console.log("user_calling_code: " + value)
      calling_code: value
      // this.setState({
      //   calling_code: user_calling_code
      // })
    })
    
  }

  callApi(type){
    if(type === 'verify'){
      if (this.state.verification_code === ''){
          alert('Enter Verification Code.');   
      }else{      
        this.getApiResponse(type)       
      }

    } else if (type === 'resend') {     
      if (this.state.resend_action) {
        this.getApiResponse(type)
      } else {
        alert('Wait at least 30 seconds to get verification code. ');
      }

    }

  }

    getApiResponse(type) {
      console.log(" type:" + type);

      var URL = AppConstant.BASE_URL + "user/forgotPassword";
      var formData = new FormData()
      formData.append('api_key', this.state.api_key);
      let device_uuid = DeviceInfo.getUniqueId();
      formData.append('device_type', this.state.device_type);
      formData.append('device_uuid', device_uuid);

// AppConstant.phone_number = this.state.phone_number
// AppConstant.dial_code = this.state.calling_code

      formData.append('step', '2');
      formData.append('username', phone_number);
      if (forgot_pass_type === 'mobile_number'){
          formData.append('calling_code', calling_code);
      }
      

      if (type === 'verify') {
        verification_code = this.state.verification_code
        formData.append('verification_code', this.state.verification_code);
      } else if (type === 'resend') {
      }

      console.log('AppConstant : Name: ' + phone_number + " : "
      +" code:" + calling_code
      + " verification_code: " + this.state.verification_code)

      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          console.log(" state.isConnected:" + state.isConnected + " URL: " + URL);

          this.setState({
            isLoading: true,
          })

          console.log(" GetParam device_uuid:" + device_uuid);

          return fetch(URL, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
              },
              body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {

              console.log(responseJson);

              if (type === 'verify') {
                this.setState({
                    isLoading: false,
                  });

                if (responseJson.response.status === "success") {
                  this._storeData(AppConstant.forgot_verification_code, verification_code)
                  // AppConstant.forgot_verification_code = this.state.verification_code;
              
                  // this._storeData(AppConstant.jwt_token, responseJson.response.data.jwt_token)
                  // Actions.HomeScreen()
                  this.props.updateState();

                } else if (responseJson.response.status === "error") {
                  
                  alert(responseJson.response.message);
                }   

                // formData.append('verification_code', this.state.verification_code);
              } else if (type === 'resend') {
                if (responseJson.response.status === "success") {
                this.setState({
                  isLoading: false,
                });

                } else if (responseJson.response.status === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);
                }     
              }

              

            })
            .catch((error) => {
              console.error(error);
              alert(error);
            });
        } else {
          alert('Please connect to internet and try again. ');
          return;
        }
      });
    }

  updateValue(text, field) {
      if (field == 'code') {
        this.setState({
          verification_code: text,
        })
      }
    }

    _storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        // Error saving data
      }
    };

    _retrieveData = (key) => {
      AsyncStorage.getItem(key, (error, result) => {
        console.log(" ****country_name: " + result)
        return result;
      })
    }

  render() {
    return (
      <Fragment >
        <NB.View style={{ backgroundColor:'white', height:'100%',width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30,paddingBottom:40 }}>
          
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

                <NB.Input 
                style={{ color: '#8e9093' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "xxxx" 
                onChangeText = {
                  (text) => this.updateValue(text, 'code')
                }
                / >
              </NB.Item>
              <NB.View style={{  backgroundColor: 'black', height:1, width:'100%' }}></NB.View>

              <NB.Text style={LoginHomeStyle.verification_message}>{String.verification_message}</NB.Text>
            
            <NB.View style={{ flexDirection:'row' , flex:1}}>
                <NB.View style={LoginHomeStyle.verification_submit}>
                  <NB.Text 
                  onPress={()=>{
                    this.callApi("verify");
                    // Actions.HomeScreen()
                  }}
                  style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.continue}</NB.Text>
                </NB.View>

                <NB.View style={LoginHomeStyle.resend_submit}>
                  <NB.Text 
                  onPress = {
                    () => {
                      this.callApi("resend");
                      // Actions.HomeScreen()
                    }
                  }
                  style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.resend}</NB.Text>
                </NB.View>

            </NB.View>

          </NB.Content>

          
        {this.state.isLoading ? <Loading / > : null }
    

        </NB.View>
        {/* {this.state.isLoading ? <Loading / > : null } */}
      </Fragment>
    );
  }
}
