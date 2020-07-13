import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  View,
  Image,
  Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import AppConstant from '../component/AppConstant';
import String from '../component/String';
import Color from '../component/Colors';
import Loading from '../component/Loading';

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

var jwt_token = ''
var user_name = ''
var user_password =''

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_name: '',
      base_url: '',
      isLoading: false,
      api_key: 'cp/W?^,([{,O_+T',
      device_type: Platform.OS === 'ios' ? '2' : '1',
    };
    // this.tobBottomViewColor();
  }

  tobBottomViewColor() {
    // StatusBar.setHidden(true);
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.commonValues()
      } else {
        alert('Please connect to internet and try again. ');
        return;
      }
      });

  }

  commonValues(){
        AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
      console.log("####################jwt_token: " + values)
      jwt_token = values;
    })

    AsyncStorage.getItem(AppConstant.user_email, (error, values) => {
      console.log("####################user_name: " + values)
      user_name = values
    })

    AsyncStorage.getItem(AppConstant.user_password, (error, values) => {
      console.log("-------- ------  :::::: user_password: " + values,
      (user_password === null || user_name === null)
      )
      user_password = values

      if (user_password === null || user_name ===null ){
        console.log("--------switchingScreen ------ ")
        this.clearAsyncStorage()
        this.switchingScreen()
      }else{
        console.log("--------loginApi ------ ")
        this.loginApi()
      }
      

    })

  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  switchingScreen(){
    // NB.Toast.show({
    //   text: "Please put all info and try again!",
    //   textStyle: {
    //     color: "white"
    //   },
    //   buttonText: "Okay"
    // })
    // NB.Toast.show({
    //   text: 'Wrong password!',
    //   buttonText: 'Okay'
    // })

    // NB.Toast.show({
    //   text: 'Success',
    //   position: 'bottom',
    //   type: 'success',
    //   duration: 1000,
    //   textStyle: {
    //     textAlign: 'center'
    //   }
    // })


    this.timeoutHandle = setTimeout(() => {
      console.log('contact_screen', user_name, user_password);
      Actions.HomeScreen();
    }, 300);
  }

  // ------------------------------------------------------------
  // updateDeviceInfo(device_push_id) {
  //   var URL = '';
  //   var method_name = 'news/updateDeviceInfo';

  //   let device_uuid = DeviceInfo.getUniqueId();
  //   URL = AppConstant.BASE_URL + method_name + "?api_key=" + "^)@$!" + "&country_name=" + this.state.country_name + "&device_type=" + this.state.device_type + "&device_push_id=" + device_push_id + "&device_uuid=" + device_uuid;

  //   // console.log(URL );

  //   return fetch(URL)
  //     .then((response) => response.json())
  //     .then((responseJson) => {

  //       // console.log("updateDeviceInfo Success: ",responseJson);

  //       // Start counting when the page is loaded
  //       this.timeoutHandle = setTimeout(() => {
  //         // console.log("SplashScreen base_url: "+this.state.base_url + " : "+" country_name: "+this.state.country_name) 
  //         // Add your logic for the transition
  //         if (this.state.base_url != '') {
  //           // Actions.push_details()
  //           Actions.home_screen({ selected_tab: 0, source_news_id: '1' });
  //         } else {
  //           Actions.country_screen();
  //         }
  //       }, 2000);


  //     })
  //     .catch((error) => {
  //       // console.error(error);
  //       // console.log(URL +" error>>> " + error);
  //     });
  // }

    //  ---------------------------Api Calling------------------------------
    loginApi() {


        var URL = AppConstant.BASE_URL + "user/login";
        var formData = new FormData()

        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            console.log(" state.isConnected:" + state.isConnected + " URL: " + URL);

            this.setState({
              isLoading: true,
            })

            let device_uuid = DeviceInfo.getUniqueId();

            formData.append('api_key', this.state.api_key);
            formData.append('device_type', this.state.device_type);
            formData.append('device_uuid', device_uuid);

            formData.append('username', user_name);
            formData.append('password', user_password);

            console.log(" GetParam device_uuid:" + device_uuid, ' ', user_name, ' ', user_password);

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
                  console.log(" Success:" +
                    " Message :" + responseJson.response.message +
                    " : " + responseJson.response.data.jwt_token +
                    " : " + responseJson.response.data.user_id +
                    " : " + responseJson.response.data.name
                  );
                  if (responseJson.response.data.verify_status === '0') {
                    this._storeData(AppConstant.user_id, responseJson.response.data.user_id)
                    this._storeData(AppConstant.user_name, responseJson.response.data.name)
                    this._storeData(AppConstant.user_email, responseJson.response.data.email)
                    this._storeData(AppConstant.user_mobile_number, responseJson.response.data.mobile_number)
                    this._storeData(AppConstant.user_calling_code, responseJson.response.data.calling_code)

                    this.clearAsyncStorage()
                    this.switchingScreen();

                    // Alert.alert(
                    //   responseJson.response.message,
                    //   '',
                    //   [{
                    //     text: "Ok",
                    //     onPress: () => {
                    //       AppConstant.login_response_status = 'Your are Not Verified'
                    //       this.props.updateState({
                    //         action_type: 'Verification'
                    //       });
                    //       console.log("ok ")
                    //     }
                    //   }], {
                    //     cancelable: false
                    //   }
                    // );

                  } else {
                    this._storeData(AppConstant.jwt_token, responseJson.response.data.jwt_token)
                    this._storeData(AppConstant.user_id, responseJson.response.data.user_id)
                    this._storeData(AppConstant.user_name, responseJson.response.data.name)

                    this.switchingScreen();
                  }

                } else if (responseJson.response.type === "error") {
                  this.clearAsyncStorage()
                  this.switchingScreen();

                  // console.log(" error:" + " Message :" + responseJson.response.message)
                  // if (responseJson.response.message === "Your are Not Verified") {
                  //   AppConstant.login_response_status = 'Your are Not Verified'
                  //   this.props.updateState({
                  //     action_type: 'Verification'
                  //   });
                  // } else if (responseJson.response.message === "Password is incorrect try again") {
                  //   // alert(responseJson.response.message);
                  //   ToastAndroid.show(responseJson.response.message, ToastAndroid.SHORT);
                  // }
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

    

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }

  render() {
    return (
      <Fragment>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={false} /> 
        <NB.Container style={{backgroundColor: Color.white, alignContent: 'center',justifyContent: 'center',}}>
          <NB.View
            style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
          
            {/* <Image
                source={require('./svgicons/logo.svg')}
                style={{ justifyContent: 'center', alignItems: 'center', height: 220, weidth:220 }}
              /> */}

              <Image
              source={require('./images/medi_logo.png')}
              resizeMode={'cover'} 
              style = {{justifyContent: 'center',alignItems: 'center',alignSelf: 'center',height: 220, width:220}}
              />



          </NB.View>
          
          <NB.Text style={{color: Color.color_app, fontSize: 14, justifyContent: 'center',
              alignItems: 'center', textAlign:'center',marginBottom:50}}>
          {String.developed_by}
        </NB.Text>
        </NB.Container>

        {this.state.isLoading ? <Loading / > : null }

        
      </Fragment>

    );
  }
}

