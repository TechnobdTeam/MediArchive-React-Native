/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  I18nManager,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,  
  FlatList, 
  AsyncStorage, Platform, Image
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
// import Image from 'react-native-remote-svg';
import * as NB from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';

import { Dialog } from 'react-native-simple-dialogs';
import Navbar from '../../component/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'
import String from '../../component/String'
import AppConstant from '../../component/AppConstant'
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
var jwt_token = ''

var countries_list = []

export default class EditProfileScreen extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      medicine_name: this.props.medicine_name,
      medicine_id: this.props.medicine_id,
      name : '',
      email: '',
      mobile_number : '',
      dataCountry: [],
      calling_code:'',
      verify_code:'',
      verify_dialog: false,
      verification_send_time:0,
      verify_dialog_2: false
    };
  }

  componentDidMount(){ 
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################--user_id: " + values)
        jwt_token = values
        this.getApiResponse('getCountryList')
      })


  }

  // itemClicked(type){
  //   console.log(type)

  //   this.setState({
  //     verify_dialog: true,
  //     dose_type: type,
  //     custom_value:'',
  //   })

  // }

  // addEditItem(name) {
  //   console.log(name)
  // }


  getApiResponse(type) {
    this.setState({
      isLoading: true
    })

    console.log(" type:" );

    var Authorization = 'Bearer ' + jwt_token
    var URL = ''
    var formData = new FormData()
    if (type === 'getCountryList') {
      URL = AppConstant.BASE_URL + "user/getCountryList";
    } else if (type === 'getUserProfile') {
      URL = AppConstant.BASE_URL + "user/getUserProfile";
    } else if (type === 'updateUserProfile') {
      URL = AppConstant.BASE_URL + "user/updateUserProfile";
      formData.append('name', this.state.name);
      formData.append('email', this.state.email);
      formData.append('mobile_number', this.state.mobile_number);
      formData.append('calling_code', this.state.calling_code);

      // name: mehedi Hasan Shamim
      // email: mehedi @techno12bd.com
      // mobile_number: 01840239204
      // calling_code: +880
      
      
      console.log(" type:" + this.state.verify_code);

      if (this.state.verify_code !=''){
        formData.append('verify_code', this.state.verify_code)
      }
    }
    
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();
    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    formData.append('medicine_id', this.state.medicine_id);
    
    NetInfo.fetch().then(state => {
      if (state.isConnected) {

        return fetch(URL, {
            method: 'POST',
            headers: {
              'Authorization': Authorization
            },
            body: formData,
          })
          .then((response) => response.json())
          .then((responseJson) => {

            console.log(responseJson);

          if (type === 'getCountryList') {
            if (responseJson.response.type === "success") {

              this.setState({
                dataCountry: responseJson.response.data,
                verify_dialog_2: true
              });

              countries_list = [];

              for (let step = 0; step < responseJson.response.data.length; step++) {
                // var obj = {
                //   label: responseJson.response.data[step].name + ' (' + responseJson.response.data[step].d_code + ') ',
                //   value: responseJson.response.data[step].d_code
                // }

              var obj = {
                  label: responseJson.response.data[step].name + ' (' + responseJson.response.data[step].d_code + ') ',
                  value: responseJson.response.data[step].d_code,
                  key: responseJson.response.data[step].name + ' (' + responseJson.response.data[step].d_code + ') ',
                  color: 'black',
                  displayValue: true
                }

                // if (responseJson.response.data[step].d_code === '+880') {

                //   this.setState({
                //     calling_code: '' + responseJson.response.data[step].d_code
                //   })
                // }
                countries_list.push(obj)
              }

              this.setState({
                isLoading: false,
              });
              console.log("SIZE: " + responseJson.response.data.length + " : " + this.state.dataCountry.length);
            }

            this.getApiResponse("getUserProfile");

          } else if (type === 'getUserProfile') {
                if (responseJson.response.type === "success") {
                  var dataSource = responseJson.response.data;

                  this.setState({
                    isLoading: false,
                    name: dataSource.name,
                    email: dataSource.email,
                    calling_code: dataSource.calling_code,
                    mobile_number: dataSource.mobile_number
                  })

                } else if (responseJson.response.type === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);
                }
          } else if (type === 'updateUserProfile') {
            if (responseJson.response.type === "success") {
              // var dataSource = responseJson.response.data;

              this.setState({
                isLoading: false,
              })
              // alert(responseJson.response.message);

              if (responseJson.response.verify_mobile_required === 'yes') {
                console.log('Verify......');
              
                this.setState({
                  verify_dialog: true,
                  verification_send_time: Date.now(),
                })

                alert(responseJson.response.message);

              }else{
                this._storeData(AppConstant.user_email, this.state.email)
                this.setState({
                  verify_dialog: false,
                })
                alert(responseJson.response.message);
              }

            } else if (responseJson.response.type === "error") {
              this.setState({
                isLoading: false,
              });
              alert(responseJson.response.message);
            } else if (responseJson.response.type === "userError") {
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
    if (field == 'name') {
      this.setState({
        name: text,
      })
    } else if (field == 'email') {
      this.setState({
        email: text
      })
    } else if (field == 'mobile_number') {
      this.setState({
        mobile_number: text
      })
    } else if (field == 'verify_code') {
      this.setState({
        verify_code: text
      })
    }
  }

  updateUserProfile(){
    console.log("Clicked......");
    this.getApiResponse('updateUserProfile')
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() =>{ 
                Actions.pop()
                Actions.pop()
                Actions.MyProfileScreen();
                }} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} > 
                    <TouchableOpacity
                      onPress={() => {this.updateUserProfile()}}>
                      <NB.Text style={{ color:'white',fontSize:14 }}>SAVE</NB.Text>
                    </TouchableOpacity>  
                  </Right>

    // medicine text size: 16 px
    // top margin: 25 px
    // tab napa text size: 21 px
    // left margin: 25 px
    // dose top margin: 40 px


  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="My Profile" />
      <ScrollView
        style={styles.mainContainer}>

        <NB.View style={styles.container_main}>
    
        <NB.View style={{ borderRadius:5, backgroundColor:'white', paddingLeft:10, paddingRight:10, borderBottomColor: '#dae4ed',borderBottomWidth:2, paddingBottom:45 }}>

            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16, paddingLeft:10 }}>Name</NB.Text>
            {/* <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:25 }}>{this.state.name}</NB.Text> */}
              <NB.Item>
                <NB.Input 
                style={{ color: '#5a5a5a' , fontSize:20, paddingLeft:10}}
                placeholder = "Name" 
                value={this.state.name}
                onChangeText={(text)=>this.updateValue(text,'name')}/ >
              </NB.Item>

            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16 ,paddingLeft:10}}>Phone</NB.Text>
            {/* <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:25 }}>{this.state.mobile_number}</NB.Text> */}
            
            <ImageBackground ImageBackground style = {
              {
                width: '100%',
                borderBottomColor: Color.readmore,
                borderBottomWidth: 1,
                padding: Platform.OS === 'ios' ? 10:0,
                marginTop: Platform.OS === 'ios' ? 10:0
              }
            } >
                <RNPickerSelect
                  style={{ fontSize:25, paddingLeft:15 }}
                  value={this.state.calling_code}
                  onValueChange={value => {
                    this.setState({
                      calling_code: value
                    })
                    console.log(value)}}
                  items ={countries_list}
                />

            { Platform.OS === 'ios' ? 
            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View>
            : null
            }
            </ImageBackground>
            
            <NB.Item style={{ marginTop:15, paddingLeft:0 }}>
              <NB.Input 
              keyboardType='numeric'
              style={{ color: '#5a5a5a',fontSize:20 }}
              value={this.state.mobile_number}
              onChangeText={(text)=>this.updateValue(text,'mobile_number')}
              placeholder = "Mobile Number" / >
            </NB.Item>


            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16, paddingLeft:10 }}>Email</NB.Text>
            {/* <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:25 , marginBottom:20}}>{this.state.email}</NB.Text> */}
            <NB.Item>
              <NB.Input 
              style={{ color: '#5a5a5a', fontSize:20, paddingLeft:10}}
              placeholder = "Email" 
              value={this.state.email}
              onChangeText={(text)=>this.updateValue(text,'email')}/ >
            </NB.Item>

            

            
        </NB.View>

    { this.state.isLoading ? <Loading / > : null }


         {/*  Dialog 1   */}
      <Dialog
          visible={this.state.verify_dialog}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside={() => this.setState({verify_dialog: false})} >
            <Fragment >
        <NB.View style={{  height:250,width:'100%', }}>
          
          <NB.Text style={LoginHomeStyle.verification_title}>{String.verification_code}</NB.Text>

          <NB.Content>
            
              <NB.Item>
                <Image
                source = {
                  require('../images/mobile-verification.png')
                }
                fadeDuration={0}
                style={{width: 20, height: 20}}
              />
              {/* <Icon name = "check-circle" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20, color: '#2ecc71',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}

                <NB.Input placeholder = "xxxxxx" 
                onChangeText = {
                  (text) => this.updateValue(text, 'verify_code')
                }
                / >
              </NB.Item>
              <NB.View style={{  backgroundColor: 'black', height:1, width:'100%' }}></NB.View>

              <NB.Text style={LoginHomeStyle.verification_message}>{String.verification_message}</NB.Text>
            
            <NB.View style={{ flexDirection:'row' , flex:1}}>
                <TouchableOpacity 
                onPress={()=>{
                    console.log('clicked')
                    if(this.state.verify_code !=''){
                      this.getApiResponse('updateUserProfile')
                    }else{
                      alert('Verification code required.');
                    }
                    
                  }}
                style = {
                  LoginHomeStyle.verification_submit
                } >
                  <NB.Text 
                  style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.continue}</NB.Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress = {
                    () => {
                      var remainTime = Date.now() - this.state.verification_send_time
                      if(Date.now() - this.state.verification_send_time > (30*1000)){
                          this.getApiResponse('updateUserProfile')
                      }else{
                        alert('Please Wait ' + (30 - (remainTime / 1000)).toFixed() + ' second to resend verification code.');
                      }
  
                      // Actions.HomeScreen()
                    }
                  }
                style = {
                  LoginHomeStyle.resend_submit
                } >
                  <NB.Text 

                  style={{  fontSize:18, marginTop:20, marginBottom:20, color:'white' }}>{String.resend}</NB.Text>
                </TouchableOpacity>

            </NB.View>
          </NB.Content>

        </NB.View>
        {this.state.isLoading ? <Loading / > : null }
      </Fragment>
      </Dialog>


      </NB.View>
      </ScrollView>
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    flex:1,
    borderBottomColor: '#dae4ed',
    borderBottomWidth:2,
  },
  container_main: {
    paddingTop: 5,
    paddingBottom: 10,
    flex: 1,
  },
  mainContainer: {
    backgroundColor: Color.placeholder_bg,
    height: '92%',
    width: '100%',
    padding:10
  },
  noteText: {
    color: '#8e9093',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0,
    height: 80,
    marginTop: 30,
    marginLeft:5
  },
  itemText:{
    padding:10
  },
  file_background:{
    backgroundColor: Color.color_theme, 
    height: 30, 
    width: 36, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5,
    marginTop:0
    
  },
  selector_container: {
      flexDirection: 'row',
      marginTop: Platform.OS === 'ios' ? 20 : 10,
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selector_item: {
      flex: 1,
      marginRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#dae4ed',
      paddingLeft: 5,
      paddingBottom: Platform.OS === 'ios' ? 10 : 0
    },
    details: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flex: 1
    }

});
