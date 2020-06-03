import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import {Image} from 'react-native';
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Loading from '../../component/Loading'

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from '../../component/AppConstant';
// import Toast from 'react-native-simple-toast';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key : 'cp/W?^,([{,O_+T',
      isLoading: false,
      username:'',
      password:'',
    };

  }

  componentDidMount() {
    
  }


  updateValue(text, field) {
    if (field == 'username') {
      this.setState({
        username: text,
      })
    } else if (field == 'password') {
      this.setState({
        password: text,
      })
    }

  }

  forgotPassword(){
    this.props.updateState({action_type: 'forgotPassword'});
  }

  //  ---------------------------Api Calling------------------------------
  loginApi() {

    if(this.state.username === ''){
      // Toast.show('User field can not be empty.')
      console.log("User field can not be empty." );
      alert('User field can not be empty.');
    } else if ( this.state.password === ''){
      // Toast.show('Password field can not be empty.')
      console.log(" Password field can not be empty." );
      alert('Password field can not be empty.');
    }else{
      this.setState({
        isLoading: true,
      })

      var URL = AppConstant.BASE_URL + "user/login";
      var formData = new FormData()

      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          console.log(" state.isConnected:" + state.isConnected + " URL: " + URL);

          let device_uuid = DeviceInfo.getUniqueId();

          formData.append('api_key', this.state.api_key);
          formData.append('device_type', this.state.device_type);
          formData.append('device_uuid', device_uuid);

          formData.append('username', this.state.username);
          formData.append('password', this.state.password);


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
              })

              if (responseJson.response.type === "success") {
                console.log(" Success:" 
                + " Message :" + responseJson.response.message
                +" : "+responseJson.response.data.jwt_token 
                +" : "+ responseJson.response.data.user_id
                +" : "+responseJson.response.data.name
                );

                // Toast.show(responseJson.response.message);
                // alert(responseJson.response.message);

                //  "data": {
                //    "user_id": "bff0fe90-7cc3-40bd-a33f-785433c6603e",
                //    "name": "Md Omar Faruk",
                //    "email": "mobarok@technobd.com",
                //    "mobile_number": "01679854125",
                //    "calling_code": "+880",
                //    “verify_status”: 1 / 0
                //  },
                
                
                if (responseJson.response.data.verify_status === '0') {
                  this._storeData(AppConstant.user_id, responseJson.response.data.user_id)
                  this._storeData(AppConstant.user_name, responseJson.response.data.name)
                  this._storeData(AppConstant.user_email, responseJson.response.data.email)
                  this._storeData(AppConstant.user_mobile_number, responseJson.response.data.mobile_number)
                  this._storeData(AppConstant.user_calling_code, responseJson.response.data.calling_code)

                      Alert.alert(
                        responseJson.response.message,
                        '',
                        [{
                            text: "Ok",
                            onPress: () => {
                              AppConstant.login_response_status = 'Your are Not Verified'
                                this.props.updateState({action_type: 'Verification'});
                              console.log("ok " )
                            }
                          }
                        ], {
                          cancelable: false
                        }
                      );

                }else{
                  alert(responseJson.response.message);

                  this._storeData(AppConstant.user_email, this.state.username)
                  this._storeData(AppConstant.user_password, this.state.password)

                  this._storeData(AppConstant.jwt_token, responseJson.response.data.jwt_token)
                  this._storeData(AppConstant.user_id, responseJson.response.data.user_id)
                  this._storeData(AppConstant.user_name, responseJson.response.data.name)

                  Actions.HomeScreen();
                }
                
                
              } else if (responseJson.response.type === "error") {
                console.log(" error:" + " Message :" + responseJson.response.message)
                if (responseJson.response.message === "Your are Not Verified"){
                  AppConstant.login_response_status = 'Your are Not Verified'
                  this.props.updateState({action_type: 'Verification'});
                } else if (responseJson.response.message === "Password is incorrect try again") {
                  alert(responseJson.response.message);
                  // ToastAndroid.show(responseJson.response.message, ToastAndroid.SHORT);
                } else if (responseJson.response.message === "Email or Mobile is incorrect try again" ) {
                  alert(responseJson.response.message);
                  // ToastAndroid.show(responseJson.response.message, ToastAndroid.SHORT);
                }

                
                // "response": {
                //   "code": 404,
                //   "type": "error",
                //   "message": "Your are Not Verified",
                //   "execution_time": "0.0018",
                //   "memory_usage": "0.84MB"
                // }
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
      <Fragment style={{ backgroundColor:'white', height:'100%' }} >
        <NB.View style={{ height:600, backgroundColor:'white',width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30, paddingBottom:60 }}>
          
          {this.state.isLoading ? <Loading 
          style={{ marginTop:-300 }}
          / > : null }

          {/* <NB.Text>hhh</NB.Text> */}

          <NB.Content>

            
              <NB.Item>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Email/Mobile" 
                autoCapitalize = 'none'
                onChangeText={(text)=>this.updateValue(text,'username')}
                
                blurOnSubmit={ false }
                
                returnKeyType='next'
                ref={(input) => this._email = input}
                onSubmitEditing={() => this._password._root.focus()}

                />
              </NB.Item>

              <NB.Item style={{ marginTop:15 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Password" 
                secureTextEntry={true}
                onChangeText={(text)=>this.updateValue(text,'password')}
                blurOnSubmit={ true }
                returnKeyType={ "done" }
                ref={(input) => this._password = input}
                / >
              </NB.Item>


            <TouchableOpacity 
            onPress={() => this.loginApi()}
            style={LoginHomeStyle.login_submit}>
              <NB.Text  style={{ fontSize:18, textAlign:'center', width:'100%', paddingBottom:20, paddingTop:20, color:'white' }}>{String.login}</NB.Text>
            </TouchableOpacity>

            <NB.Text 
            onPress={() => this.forgotPassword()}
            style={LoginHomeStyle.forgot_password}>{String.forgot_password}</NB.Text>

          </NB.Content>

      

        </NB.View>

      </Fragment>
    );
  }
}
