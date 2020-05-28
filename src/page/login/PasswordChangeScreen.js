import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import {Image} from 'react-native';
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from '../../component/AppConstant';
// import Toast from 'react-native-simple-toast';
import Loading from '../../component/Loading'

  var calling_code = '';
  var mobile_number = '';
  var forgot_pass_type = '';
  var forgot_verification_code = '';

export default class PasswordChangeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      name: '',
      email:'',
      password: '',
      re_password:'',
      check_box:false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(AppConstant.forgot_pass_type, (error, values) => {
      console.log("user_id: " + values)
      forgot_pass_type: values
    })

    AsyncStorage.getItem(AppConstant.user_mobile_number, (error, value) => {
      console.log("user_mobile_number: " + value)
      mobile_number: value

    })

    AsyncStorage.getItem(AppConstant.user_calling_code, (error, value) => {
      console.log("user_calling_code: " + value)
      calling_code: value

    })
    AsyncStorage.getItem(AppConstant.forgot_verification_code, (error, value) => {
      console.log("user_calling_code: " + value)
      forgot_verification_code= value

    })
  }

  handleClick = () => {
    this.registrationApi()
    // this.props.updateState();
  }


  updateValue(text, field) {
    if (field == 'name') {
      this.setState({
        name: text,
      })
    } else if (field == 'email') {
      this.setState({ email: text })
    } else if (field == 'password') {
      this.setState({
        password: text,
      })
    } else if (field == 're_password') {
      this.setState({
        re_password: text,
      })
    }

  }

  //  ---------------------------Api Calling------------------------------
  registrationApi() {

    if (this.state.password === '') {
      console.log("Password field can not be empty.");
      alert('Password field can not be empty.');
    } else if (this.state.re_password === '') {
      console.log("Re-Password field can not be empty.");
      alert('Re-Password field can not be empty.');
    } else if (this.state.password != this.state.re_password){
      alert('Password not match.');
    } else {
      // AppConstant.name = this.state.name;
      // AppConstant.email = this.state.email;
      // AppConstant.password = this.state.password;

      console.log( 
        '------------->>>>>   Name: ' + this.state.name 
      + " email: " + this.state.email 
      + " password:" + this.state.password 
      + " re_password: " + this.state.re_password 
      )

      this.getApiResponse();

      // this.props.updateState();

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
        
        formData.append('verification_code', forgot_verification_code);
        formData.append('new_password', this.state.password);
        
        formData.append('step', '3');
        formData.append('username', phone_number);
        if (forgot_pass_type === 'mobile_number') {
          formData.append('calling_code', calling_code);
        }

        console.log('AppConstant : Name: ' + phone_number + " : " +
          " code:" + calling_code +
          " verification_code: " + forgot_verification_code)

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

              
                  this.setState({
                    isLoading: false,
                  });

                  if (responseJson.response.status === "success") {
                    // AppConstant.forgot_verification_code = this.state.verification_code;

                    // this._storeData(AppConstant.jwt_token, responseJson.response.data.jwt_token)
                    // Actions.HomeScreen()

                    this._storeData(AppConstant.user_password, AppConstant.password)
                    this._storeData(AppConstant.user_email, this.state.email)
                    
                    alert(responseJson.response.message);
                    console.log('updateState');
                    // this.props.updateState();
                    Actions.HomeLogin();

                  } else if (responseJson.response.type === "error") {

                    alert(responseJson.response.message);
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

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    return (
      <Fragment >
        <NB.View style={{ backgroundColor:'white', height:500, width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30,paddingBottom:40 }}>
          

          <NB.Content>
            
              
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Password" 
                secureTextEntry={true}
                onChangeText={(text)=>this.updateValue(text,'password')}
                
                blurOnSubmit={ false } 
                returnKeyType='next'
                ref={(input) => this._password = input}
                onSubmitEditing={() => this._re_password._root.focus()}
                / >
              </NB.Item>
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}          
                placeholder = "Retype Password" 
                secureTextEntry={true}
                onChangeText={(text)=>this.updateValue(text,'re_password')}
                
                blurOnSubmit={ true }
                returnKeyType={ "done" }
                ref={(input) => this._re_password = input}
                / >
              </NB.Item>

            <NB.View style={LoginHomeStyle.login_submit}>
              <NB.Text 
              onPress={
                ()=>{

                  this.handleClick()
                }
              }
              style={{ fontSize:18, marginBottom:20, marginTop:20, color:'white' }}>{String.continue}</NB.Text>
            </NB.View>

          </NB.Content>
        {this.state.isLoading ? <Loading / > : null }
        </NB.View>
      </Fragment>
    );
  }
}
