/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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

import Navbar from '../../component/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

import AppConstant from '../../component/AppConstant'
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
var jwt_token = ''

export default class MyProfileScreen extends Component {
  
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
    };
  }

  componentDidMount(){ 
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################--user_id: " + values)
        jwt_token = values
        this.getApiResponse();
      })


  }

  itemClicked(type){
    console.log(type)

    this.setState({
      dose_edit_dialog: true,
      dose_type: type,
      custom_value:'',
    })

  }

  addEditItem(name) {
    console.log(name)

  }


  getApiResponse() {
    this.setState({
      isLoading: true
    })

    console.log(" type:" + jwt_token);

    var Authorization = 'Bearer ' + jwt_token

    var URL = AppConstant.BASE_URL + "user/getUserProfile";
    var formData = new FormData()
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

            if (responseJson.response.type === "success") {
              var dataSource= responseJson.response.data;
              
              this.setState({
                isLoading: false,
                name: dataSource.name,
                email: dataSource.email,
                mobile_number: dataSource.mobile_number
              })
              
            } else if (responseJson.response.type === "error") {
              this.setState({
                isLoading: false,
              });
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



  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = (
                  <Right style={{flex: 1}} >   
                    <TouchableOpacity
                      onPress={() => {Actions.EditProfileScreen()}} >
                      <NB.Text style={{ color:'white', fontSize:14 }}>EDIT</NB.Text>
                    </TouchableOpacity> 
                  </Right>
                  )

    // medicine text size: 16 px
    // top margin: 25 px
    // tab napa text size: 21 px
    // left margin: 25 px
    // dose top margin: 40 px

    this.props.navigation.addListener(
      'didFocus',
      payload => {

        if (!this.state.isLoading) {
          AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
            console.log("####################--user_id: " + values)
            jwt_token = values
            this.getApiResponse();
          })
        }

        console.log("Payload is called .....................Prescription details: ", (!this.state.isLoading))
      }
    );


  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="My Profile" />
      <ScrollView
        style={styles.mainContainer}>

        <NB.View style={styles.container_main}>
    
        <NB.View style={{ borderRadius:5, backgroundColor:'white', paddingLeft:25, borderBottomColor: '#dae4ed',borderBottomWidth:2, paddingBottom:25 }}>

            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16 }}>Name</NB.Text>
            <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:20 }}>{this.state.name}</NB.Text>

            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16 }}>Phone</NB.Text>
            <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:20 }}>{this.state.mobile_number}</NB.Text>

            <NB.Text style={{ marginTop:45, color: '#858585', fontSize:16 }}>Email</NB.Text>
            <NB.Text style={{ marginTop:5, color: '#5a5a5a', fontSize:20 , marginBottom:20}}>{this.state.email}</NB.Text>

            

            
        </NB.View>

    { this.state.isLoading ? <Loading / > : null }



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
