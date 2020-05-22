import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert
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


export default class NumberRegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      name: '',
      email: '',
      password: '',
      calling_code: '',
      mobile_number: '',
      dataCountry: [],
      country_selected:'',

    };
  }

  componentDidMount() {
    console.log('AppConstant : Name: ' + AppConstant.name 
    + " email: " +
      AppConstant.email + " password:" +
      AppConstant.password )   

      this.getApiResponse('getCountryList')

      // getCountryList
  }

  handleClick = () => {
    // this.props.updateState();
    console.log('AppConstant.login_response_status: ' + AppConstant.login_response_status)

    if (this.state.mobile_number === '') {
      console.log("Enter your phone number.");
      alert('Enter your phone number.');
    } else if (this.state.calling_code === '') {
      console.log("Select dial country");
      alert('Select country dial code.');
    } else if (AppConstant.login_response_status === 'Your are Not Verified'){
        AppConstant.phone_number = this.state.phone_number
        AppConstant.dial_code = this.state.calling_code
  
        this._storeData(AppConstant.user_mobile_number, this.state.mobile_number)
        this._storeData(AppConstant.user_calling_code, this.state.calling_code)

        this.props.updateState();
    } else {
      this.getApiResponse('registration')
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
    } else if (type === 'registration') {
      URL = AppConstant.BASE_URL + "user/registration";
      formData.append('name', AppConstant.name);
      formData.append('email', AppConstant.email);
      formData.append('password', AppConstant.password);
      formData.append('retype_password', AppConstant.password);
      formData.append('mobile_number', this.state.mobile_number);
      formData.append('calling_code', this.state.calling_code);
      
    }

    console.log('AppConstant : Name: ' + AppConstant.name + " email: " +
      AppConstant.email + " password:" +
      AppConstant.password + " phone: " + this.state.mobile_number + " code:" + this.state.calling_code)

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
            // console.log(responseJson)
          

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

                  if (responseJson.response.data[step].d_code === '+880') {
                    
                    this.setState({
                      calling_code: '' + responseJson.response.data[step].d_code
                    })
                  }
                  countries_list.push(obj)
                }

                this.setState({
                  isLoading: false,
                });
                console.log("SIZE: " + responseJson.response.data.length + " : " + this.state.dataCountry.length);
              }
              
            } else if (type === 'registration') {
              console.log(responseJson);

              if (responseJson.response.type === "success") {
                    // AppConstant.phone_number = this.state.phone_number
                    // AppConstant.dial_code = this.state.calling_code
                // console.log(" Success:" + responseJson.response.type, " Message :" + responseJson.response.message);
                // Toast.show(responseJson.response.message);
                // alert(responseJson.response.message);
                
                this._storeData(AppConstant.user_password, AppConstant.password)

                this._storeData(AppConstant.user_id, responseJson.response.data.user_id)
                this._storeData(AppConstant.user_name, responseJson.response.data.name)
                this._storeData(AppConstant.user_email, responseJson.response.data.email)
                this._storeData(AppConstant.user_mobile_number, responseJson.response.data.mobile_number)
                this._storeData(AppConstant.user_calling_code, responseJson.response.data.calling_code)

                this.setState({
                  isLoading: false,
                });

                // console.log('-------Start------' + responseJson.response.data.mobile_number, responseJson.response.data.calling_code)


                
                // console.log('-------End------' + responseJson.response.data.user_id)
                
                console.log("updateState ")

                alert(responseJson.response.message);
                this.timeoutHandle = setTimeout(() => {
                  this.props.updateState();
                }, 1000);



              } else if (responseJson.response.type === "error") {
                AppConstant.phone_number = this.state.phone_number
                AppConstant.dial_code = this.state.calling_code

                // this._storeData(AppConstant.user_id, 'adf3426f-870c-44ee-9451-7fbc06642914')
                // this._storeData(AppConstant.user_name, 'Jane Alam')
                // this._storeData(AppConstant.user_email, 'alam@technobd.com')
                // this._storeData(AppConstant.user_mobile_number, '01912519503')
                // this._storeData(AppConstant.user_calling_code, '+880')

                
                // this.timeoutHandle = setTimeout(() => {
                //   this.props.updateState();
                // }, 1000);
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

              <ImageBackground  style={{width: '100%', borderBottomColor: Color.readmore, borderBottomWidth:1, padding:10  }}>
                  <RNPickerSelect
                    value={this.state.calling_code}
                    onValueChange={value => {
                      this.setState({
                        calling_code: value
                      })
                      console.log(value)}}
                    items ={countries_list}
                    
                    // items={[
                    //   {label: 'Bangladesh (+880)', value: 'Bangladesh (+880)'},
                    //   {label: 'India (+444)', value: 'India (+444)'},
                    //   {label: 'Bangladesh (+880)', value: 'Bangladesh (+880)'},
                    // ]}
                  />
              </ImageBackground>
          

              <NB.Item style={{ marginTop:20, marginBottom:20 }}>
                <NB.Input 
                keyboardType='numeric'
                placeholderTextColor={'#8e9093'}
                onChangeText={(text)=>this.updateValue(text,'mobile_number')}
                placeholder = "Mobile Number" / >
              </NB.Item>


            <TouchableOpacity 
            onPress={()=>{ 
              console.log('clicked')
              this.handleClick();
              }}
            style = { LoginHomeStyle.login_submit } >
              <NB.Text 
              style={{ marginTop:20, marginBottom:20, color:'white', fontSize:18 }}>{String.continue}</NB.Text>
            </TouchableOpacity>

          </NB.Content>

          {this.state.isLoading ? <Loading / > : null }

    

        </NB.View>

        
      </Fragment>
    );
  }
}
