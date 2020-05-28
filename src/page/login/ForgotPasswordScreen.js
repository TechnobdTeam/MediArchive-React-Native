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


import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from '../../component/AppConstant';
// import Toast from 'react-native-simple-toast';
import Loading from '../../component/Loading'

var countries_list =[]

var mobile_number =''
var user_type = ''
var calling_code = ''


export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      name: '',
      email: '',
      password: '',
      calling_code: '+880',
      mobile_number: '',
      dataCountry: [],
      country_selected:'',
      user_type:'',
      submit_button: String.continue,

    };
  }

  componentDidMount() {
    // console.log('AppConstant : Name: ' + AppConstant.name + " email: " +
    //   AppConstant.email + " password:" +
    //   AppConstant.password )   

    
      // getCountryList
  }

  handleClick = () => {
    // this.props.updateState();
    // if (this.state.mobile_number === '') {
    //   console.log("Enter your phone number.");
    //   alert('Enter your phone number.');
    // } else if (this.state.d_code === '') {
    //   console.log("Select dial country");
    //   alert('Select country dial code.');
    // }else{
    //   this.getApiResponse('forgotPassword')
    // }

    console.log('-----: ' + this.state.mobile_number.includes("@"))

    if(this.state.mobile_number.includes("@")){
      user_type = 'email'
      phone_number = this.state.mobile_number;
      calling_code = ''
        this.setState({
          user_type: 'email',
        })
        this.getApiResponse('forgotPassword')
    }else{
      if (this.state.user_type === 'mobile_number'){
        if (this.state.calling_code === '') {
            alert('Select country dial code.');
        } else if ( this.state.phone_number === '' ){
            alert('Phone number can not empty.');
        }else{
          user_type = 'mobile_number'
          phone_number = this.state.mobile_number;
          calling_code = this.state.calling_code
          this.getApiResponse('forgotPassword')
        }
      }else{
        this.getApiResponse('getCountryList')
        this.setState({
          submit_button: 'SEND CODE',
          user_type: 'mobile_number',
        })
      }
    }
  
  }

  updateValue(text, field) {
    if (field == 'mobile_number') {
      this.setState({
        mobile_number: text,
      })
    } 

  }


  getApiResponse(type){
    console.log(" type:" + type);

    var URL = ''
    var formData = new FormData()
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();
    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);

    if (type === 'getCountryList'){
      URL = AppConstant.BASE_URL + "user/getCountryList";
    } else if (type === 'forgotPassword') {
      URL = AppConstant.BASE_URL + "user/forgotPassword";

      formData.append('username', this.state.mobile_number);
      formData.append('step', '1');
      if (this.state.user_type === 'mobile_number'){
        formData.append('calling_code', this.state.calling_code);
      }
      
      
    }

    console.log('AppConstant : Name: '
      +formData + " phone: " + this.state.mobile_number + " code:" + this.state.calling_code)

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
          
            if (type === 'getCountryList') {
              if (responseJson.response.type === "success") {

                this.setState({
                  dataCountry: responseJson.response.data,
                });

                countries_list = [];
                
                for (let step = 0; step < responseJson.response.data.length ; step++) {
                  var obj = {
                    label: responseJson.response.data[step].name + ' (' + responseJson.response.data[step].d_code + ') ',
                    value: responseJson.response.data[step].d_code 
                  }
                  countries_list.push(obj)
                }

                this.setState({
                  isLoading: false,
                });
                console.log("SIZE: " + responseJson.response.data.length + " : " + this.state.dataCountry.length);
              }
              
            } else if (type === 'forgotPassword') {
              console.log(responseJson);
              

              if (responseJson.response.status === "success") {

                console.log(" Success:" + " Message :" + responseJson.response.message);
              console.log(user_type, phone_number, calling_code);
                this._storeData(AppConstant.forgot_pass_type, user_type)
                this._storeData(AppConstant.user_mobile_number, phone_number)
                this._storeData(AppConstant.user_calling_code, calling_code)

                this.setState({
                  isLoading: false,
                });

                this.props.updateState();

              } else if (responseJson.response.status === "error") {
                this.props.updateState();

                // alert(responseJson.response.message);
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
  };

  render() {
    return (
      <Fragment >
        <NB.View style={{ backgroundColor:'white', height:500,width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30,paddingBottom:40 }}>
          

          <NB.Content>

              <NB.Item style={{ marginTop:0, marginBottom:20 }}>
                <NB.Input 
                keyboardType='numeric'
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                onChangeText={(text)=>this.updateValue(text,'mobile_number')}
                placeholder = 'User Name(phone/email)' 
                blurOnSubmit={ true }
                returnKeyType={ "done" }
                ref={(input) => this._password = input}/ >
              </NB.Item>

          { this.state.user_type === 'mobile_number' ? 
            <ImageBackground  style={{width: '100%', borderBottomColor: Color.readmore, borderBottomWidth:1, padding:10, marginBottom:20  }}>
                  <RNPickerSelect
                    style={pickerDateStyle}
                    value={this.state.calling_code}
                    onValueChange={value => {
                      this.setState({
                        calling_code: value
                      })
                      console.log(value)}}
                    items ={countries_list}
                    
                  />
              </ImageBackground>
        
          : null
          }


            <NB.View style={LoginHomeStyle.login_submit}>
              <NB.Text 
              onPress={
                ()=>{
                  this.handleClick();
                }
              }
              style={{ marginTop:20, marginBottom:20, color:'white', fontSize:18 }}>{this.state.submit_button}</NB.Text>
            </NB.View>

          </NB.Content>

          
          {this.state.isLoading ? <Loading / > : null }
    

        </NB.View>

        
      </Fragment>
    );
  }
}
const pickerDateStyle = {
  inputIOS: {
    color: '#5a5a5a',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: '#bfbfbf',
  },
  inputAndroid: {
    color: '#5a5a5a',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
};