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
  Alert,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  I18nManager,
  AsyncStorage,
  ToastAndroid,
  Platform,
  Dimensions
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import * as NB from 'native-base';
import {ListItem, Button, Left, Right} from 'native-base';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../component/Colors'

import AppConstant from '../component/AppConstant'
import Loading from '../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import EmptyMessage from '../component/EmptyMessage';
var jwt_token = ''

import ImageLoad from 'react-native-image-placeholder';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      dataSource: [],
      offset: 0,
      error: null,
      refreshing: false,
      title: 'Home',
      isLoading: false,
      isConnected: false,
      onEndReachedCalledDuringMomentum: false
    };
  }


      componentDidMount(){

        console.log("uri: ----------- " + this.props.uri)
        
          AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
            console.log("####################user_id: " + values)
            jwt_token = values

            if(values != null && values !=''){
              this.setState({
                dataSource:[]
              })  
            }
            this.getApiResponse()
          })

          AsyncStorage.getItem(AppConstant.user_email, (error, values) => {
            console.log("####################user_name: " + values)
          })

          AsyncStorage.getItem(AppConstant.user_password, (error, values) => {
            console.log("-------- ------  :::::: user_password: " + values)
          })

          AsyncStorage.getItem(AppConstant.user_id, (error, value) => {
            console.log("-----------user_id: " + value)
            if (value != '' && value != null) {
              console.log("----Not Null-------user_id: " + value)
              
            } else {
              console.log("---- Null-------user_id: " + value)
            }
            // this.GetParam();
            this.saveDeviceInfo();

          })

          console.log("####################: " )
          // Toast.show('This is a default toast')
      }

            //  ---------------------------Api Calling------------------------------
            saveDeviceInfo() {
              var URL = AppConstant.BASE_URL + "user/saveDeviceInfo";
              var formData = this.GetParam()

              NetInfo.fetch().then(state => {
                if (state.isConnected) {
                  console.log(" state.isConnected:" + state.isConnected + " URL: " + URL)

                  return fetch(URL, {
                      method: 'POST',
                      body: formData,
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log(responseJson);

                      // if (responseJson.response.type === "success") {
                      //   console.log(" Success:" +
                      //     " Message :" + responseJson.response.message
                      //   );

                      // } else if (responseJson.response.type === "error") {
                      //   console.log(" Success:" + responseJson.response.message);
                      // }

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

            GetParam() {
              let api_key = 'cp/W?^,([{,O_+T';
              let device_type = Platform.OS === 'ios' ? '2' : '1';
              let resolution_width = Dimensions.get('window').width
              let resolution_height = Dimensions.get('window').height
              let device_uuid = DeviceInfo.getUniqueId();

              let device_manufacturer = DeviceInfo.getManufacturer()
              let device_brand = DeviceInfo.getBrand()
              let device_product = Platform.OS === 'ios' ? '' : DeviceInfo.getProduct();
              let device_model = DeviceInfo.getModel()
              let device_os_version = DeviceInfo.getSystemName()
              let device_sdk_version = DeviceInfo.getSystemVersion()

              var utm_campaign = ''
              var utm_content = ''
              var utm_source = ''
              var utm_medium = ''
              var utm_term = ''

              let app_version_name = Platform.OS === 'ios' ? '' : DeviceInfo.getCodename()
              let app_version_code = DeviceInfo.getBuildNumber();

              console.log('============Param:==========::: ' +
                ' device_type: ', device_type,
                ' resolution_height: ', resolution_height,
                ' resolution_width: ', resolution_width,
                ' device_uuid: ', device_uuid,
                ' device_sdk_version: ', device_sdk_version,
                ' device_os_version: ', device_os_version,
                ' device_model: ', device_model,
                ' device_product: ', device_product,
                ' device_brand: ', device_brand,
                ' device_manufacturer: ', device_manufacturer,
                ' app_version_name: ', app_version_name,
                ' app_version_code: ', app_version_code);

              var formData = new FormData();
              formData.append('api_key', api_key);
              formData.append('device_type', device_type);
              formData.append('device_width', resolution_width);
              formData.append('device_height', resolution_height);
              formData.append('package_name', api_key);
              // formData.append('app_version_name', app_version_name);
              formData.append('app_version_code', app_version_code);
              formData.append('device_uuid', device_uuid);

              // formData.append('device_manufacturer', device_manufacturer);
              formData.append('device_brand', device_brand);
              // formData.append('device_product', device_product);
              formData.append('device_model', device_model);
              formData.append('device_os_version', device_os_version);
              formData.append('device_sdk_version', device_sdk_version);

              formData.append('utm_campaign', utm_campaign);
              formData.append('utm_content', utm_content);
              formData.append('utm_source', utm_source);
              formData.append('utm_medium', utm_medium);
              formData.append('utm_term', utm_term);

              console.log(" formData :  " + formData);
              return formData;
            }

      notifyMessage(msg) {
        // if (Platform.OS === 'android') {
        //   ToastAndroid.show(msg, ToastAndroid.SHORT)
        // } else {
        //   // AlertIOS.alert(msg);
          
        // }
      }


        getApiResponse() {
          this.setState({
            isLoading: true
          })

          console.log(" type:" + jwt_token);

          var Authorization = 'Bearer ' + jwt_token

          var URL = AppConstant.BASE_URL + "patient/getPatientList";
          var formData = new FormData()
          formData.append('api_key', this.state.api_key);
          let device_uuid = DeviceInfo.getUniqueId();
          formData.append('device_type', this.state.device_type);
          formData.append('device_uuid', device_uuid);
          formData.append('offset', '0');


          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              console.log(" state.isConnected:" + state.isConnected + " URL: " + URL);


              console.log(" GetParam device_uuid:" + device_uuid);

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

                  this.setState({
                    isLoading: false,
                    dataSource:  responseJson.response.data ,
                    dataSource: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataSource, ...responseJson.response.data],
                    loading: false,
                    refreshing: false,
                    onEndReachedCalledDuringMomentum: false,
                  });

                    
                  this.setState({
                    isLoading: false,
                  });

                  console.log(" GetParam device_uuid:" + this.state.dataSource.length);

                  } else if (responseJson.response.type === "error") {
                    this.setState({
                      isLoading: false,
                    });
                    if (responseJson.response.message  === 'Session has been expired. Please login again.'){
                        // this.createThreeButtonAlert()
                        this.clearAsyncStorage();
                    }
                    this.notifyMessage(responseJson.response.message)

                    // alert(responseJson.response.message);
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

  Item({ id, title }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

createThreeButtonAlert = () =>
  Alert.alert(
    "Might be you are not logged in!",
    '',
    [{
        text: "Login",
        onPress: () => {

          Actions.HomeLogin();

        }
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ], {
      cancelable: false
    }
  );




// ----------------------------------------------------------------------------
  itemClicked(item) {
    console.log('######## ???' + item.name + ' item.dob ' + item.dob)
    Actions.PatientProfileScreen({
      patient_id: item.patient_id,
      blood_group: item.blood_group,
      gender: item.gender,
      age: item.age,
      photo: item.photo,
      p_name: item.name,
      p_dob: item.dob,
    })
  }



  renderItem = ({ item, index }) => (
            <View  style={{  backgroundColor:'#fff', marginLeft:2, marginRight:2,marginTop:4 , marginBottom:4, height:160, width:'32.3%', borderBottomColor:'#e2e2e2', borderBottomWidth:2}}>
            <TouchableOpacity 
            onPress = {
              () => {this.itemClicked(item)}
            }
            style={{ flex:1 }}>
              <ImageLoad 
              source={{ uri: item.photo } }
              loadingStyle={{ size: 'large', color: Color.color_theme }}
              style={{flex:1,  height: 130,width:'100%', justifyContent:'center', marginRight:2}}/>

              <Text 
              numberOfLines={1}
              style={{ color: Color.color_theme , fontSize:16,  width:'100%', padding:10}}>{item.name}</Text>  
            
            </TouchableOpacity>
    </View>
  )

  

  ListEmpty = () => {
    if(!this.state.isLoading ){
      return (
        <EmptyMessage message={'Press plus icon to add Patient.'}></EmptyMessage>
      );
    }else{
      return (
        null
      );
    }      
  };



//Load More
handleRefresh = () => {
  this.setState(
    {
      dataSource: [],
      offset: 0,
      refreshing: true,
      isLoading: true,
      onEndReachedCalledDuringMomentum: false,      
    },
    () => {
      NetInfo.fetch().then(state => {
              

        if(state.isConnected){
          this.getApiResponse();
        }else{
          alert(StringValuesEn.internet_error);
          return;
        }
      });
    }
  );
};

onEndReached = ({ distanceFromEnd }) => {
  if(!this.onEndReachedCalledDuringMomentum ){
    if( this.state.dataSource.length % 10 === 0){
      this.setState(
        {
          offset: this.state.dataSource.length,
          isLoading : true ,
        },
        () => {
          NetInfo.fetch().then(state => {            
    
            if(state.isConnected){
              this.getApiResponse();
            }else{
              alert(StringValuesEn.internet_error);
              return;
            }
          });         
        }
      );
    }     

    this.onEndReachedCalledDuringMomentum = true;
  }
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "94%",
        backgroundColor: "#CED0CE",
        marginLeft: "3%",
        marginRight: '3%'
      }}
    />
  );
};



// ===============================================================================
addPatient(){
  if(jwt_token==='' || jwt_token==null){
    this.createThreeButtonAlert()
  }else{
    Actions.AddPatientScreen({
      action_type: 'add',
      patient_id: '',
      blood_group: '',
      gender: '',
      age: '',
      p_dob: '',
      photo: '',
      p_name: '',
    });
  }

  console.log('Add')
}


  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  render(){
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name = "bars" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

        </Button>
      </Left>
    );

    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => this.searchButtonClicked()} transparent>
          {/* <Icon name = "search" style = {{fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}
        
        </Button>        
      </Right>
    );

    // this.props.navigation.addListener(
    //   'didFocus',
    //   payload => {
    //     console.log("Payload is called .....................Prescription details: " + AppConstant.home_refresh)

    //     if (AppConstant.home_refresh) {
    //       this.timeoutHandle = setTimeout(() => {
    //         // this.setState({
    //         //   dataSource: [],
    //         //   offset: 0,
    //         //   refreshing: false,
    //         //   isLoading: true,
    //         //   onEndReachedCalledDuringMomentum: false,
    //         // })

    //         if (AppConstant.home_refresh) {
    //           console.log("Payload is called .........####............Prescription details: " + AppConstant.home_refresh)

    //           AppConstant.home_refresh = false;
    //           this.timeoutHandle = setTimeout(() => {
    //             this.getApiResponse()
    //           }, 2000);
              
    //         }
    //       }, 200);
          
    //     }
        
        
    //   }
    // );

  return (
    <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}> 
      <Navbar left={left} right={right} title={'Patients(s)'} />

      <NB.View style={{ backgroundColor: '#f3f7fa', flex:1 }}>

      <FlatList
        style={{  paddingLeft:5,paddingRight:5 , marginTop:12}}
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        keyExtractor={({id}, index) => id}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.onEndReached.bind(this)}
        numColumns={3}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        ListEmptyComponent={this.ListEmpty}    
      />
        <TouchableOpacity
          onPress={()=>{
            this.addPatient()
            // Actions.AppScan();
          }}
          style={{
            borderWidth: 1,
            borderColor: Color.color_theme,
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            position: 'absolute',
            bottom:Platform.OS === 'ios' ? 40 : 10,
            right: 10,
            height: 75,
            backgroundColor: Color.color_theme,
            borderRadius: 100,
          }}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>


        {this.state.isLoading ? <Loading / > : null }

        </NB.View>
    </SideMenuDrawer>
  );
};
}
