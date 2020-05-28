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
  AsyncStorage,
  TouchableOpacity,
  Image, Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {ListItem, Button, Left, Right} from 'native-base';
// import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/PataintStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

import AppConstant from '../../component/AppConstant';
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

import RNPickerSelect from 'react-native-picker-select';
// import Pdf from 'react-native-pdf';

var jwt_token =''
import ImageLoad from 'react-native-image-placeholder';

export default class PatientProfileScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      patient_id: this.props.patient_id,
      p_name: this.props.p_name,
      gender: this.props.gender,
      age: this.props.age,
      p_dob: this.props.p_dob,
      photo: this.props.photo,
      blood_group: this.props.blood_group,
      prescription: '',
      report: '',
      medicine: '',
      reminder: '',
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      dataSource: [],
      offset: 0,
      error: null,
      refreshing: false,
      title: 'Order History',
      isLoading: true,
      isConnected: false,
      onEndReachedCalledDuringMomentum: false
    }


  }

  componentDidMount() {
    console.log("####################user_id: " + this.props.patient_id+ ' '+
    this.props.p_name + ' ' +
    this.props.photo+' '+
    this.state.p_dob
    )
    AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
      // console.log("####################user_id: " + values)
      jwt_token = values

      this.getApiResponse();

      
    })


  }

  getApiResponse() {
    this.setState({
      isLoading: true
    })

    console.log(" patient_id:" + this.state.patient_id);

    var Authorization = 'Bearer ' + jwt_token

    var URL = AppConstant.BASE_URL + "patient/getPatientInfo";
    var formData = new FormData()
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();
    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    formData.append('offset', '0');
    formData.append('patient_id', this.state.patient_id);


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
              
              var data = responseJson.response.data

              console.log("------------:"+data.age);
              
              this.setState({
                isLoading: false,
                dataSource: responseJson.response.data,
                p_name: data.name,
                gender: data.gender,
                age: ""+data.age,
                p_dob: data.dob,
                photo: data.profile_image_name,
                blood_group: data.blood_group,
                prescription: data.prescription,
                report: data.report,
                medicine: data.medicine,
                reminder: data.reminder,
              });


              this.setState({
                isLoading: false,
              });

              console.log(" GetParam profile_image_name:" + data.profile_image_name);

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

  editPatient(){
    console.log('editPatient' + 'action_type'+ 'edit',
      'patient_id:' +this.state.patient_id,
      'blood_group: '+ this.state.blood_group,
      'gender:'+ this.state.gender,
      'age:'+ this.state.age,
      'p_dob:' + this.state.p_dob,
      'photo:'+ this.state.photo,
      'p_name:'+ this.state.name, )

    Actions.AddPatientScreen({
      action_type: 'edit',
      patient_id: this.state.patient_id,
      blood_group: this.state.blood_group,
      gender: this.state.gender,
      age: this.state.age,
      p_dob: this.state.p_dob,
      photo: this.state.photo,
      p_name: this.state.p_name,
    });
  }

  getBloodGroup(blood_group) {
    var blood_group = blood_group.replace("+", "(Positive)");
    blood_group = blood_group.replace("-", "(Negative)");

    return blood_group;

  }

  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress = {
                () => Actions.HomeScreen()
              }
              transparent >
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} />;

  return (
    <SafeAreaView style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title={'Patient Profile'} />
      
      <NB.View style={{ backgroundColor: '#f3f7fa', width:'100%', height:'100%', }}>
        
        <NB.View style={{ backgroundColor: 'white',  height:150, marginTop:38, marginLeft:10, marginRight:10,  alignItems: 'center', borderRadius:5 }}>
            
          <TouchableOpacity 
          onPress={() => this.editPatient()}
          style={{ position: 'absolute', top: 0, right: 0, width:40, padding:10 , justifyContent:'center',alignItems:'center' }}>
              <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 15,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          </TouchableOpacity>
            <TouchableHighlight
                      style={[styles.profileImgContainer, { borderColor: '#dae4ed', borderWidth:2,  }]}
                    >
                    {this.state.photo == '' ? 
                    <Image  style={styles.profileImg}  source={require('../images/person_background.png')} />
                    :
                    <Image  
                    style={styles.profileImg}   
                    source={{uri:this.state.photo} }/>
                    }
                {/* <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} /> */}
            </TouchableHighlight>

            <NB.Text style={{ color : Color.color_theme, fontSize:18, marginTop:10 }}>{this.state.p_name}</NB.Text>
            <NB.View style={{ flexDirection:'row' ,marginTop:5}}>

            <NB.Text style={{ color: Color.readmore, fontSize: 14,}}>Gender:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>{ this.state.gender.slice(0,1).toUpperCase() + this.state.gender.slice(1, this.state.gender.length)}</NB.Text>

            <NB.Text style={{ color: Color.readmore, fontSize: 14, marginLeft: 5}}>Age:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>{this.state.age}</NB.Text>

            <NB.Text style={{ color: Color.readmore, fontSize: 14, marginLeft: 5 }}>Blood Group:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>{this.getBloodGroup(this.state.blood_group)}</NB.Text>


            </NB.View>
        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5,    marginTop:10,justifyContent:'center'}}>
          <TouchableOpacity 
            onPress = {
              () => {
                Actions.PrescriptionListScreen({
                  patient_id: this.state.patient_id,
                  patient_name: this.state.p_name,
                })
              }
            }
            style={{ flex:1 }}>

            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 15,backgroundColor:'#eef7f2' ,  }}>
                <Image
                source={require('../images/prescription_logo.png')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center',  }}
              />
              

              {/* <Icon name = "file-prescription" style = {{fontSize: 50,color: Color.color_four,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}
              </NB.View>

              <NB.View style={{  height:'100%' , justifyContent:'center'}}>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Prescriptions</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>{this.state.prescription}</NB.Text>
              </NB.View>
            </NB.View>

            </TouchableOpacity>

          
        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5,}}>
          <TouchableOpacity 
            onPress = {() => {Actions.ReportListScreen({ patient_id : this.state.patient_id, patient_name: this.state.p_name,})}}
            style={{ flex:1 }}>
            
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 15,  backgroundColor:'#eef7f2' , }}>
                <Image
                source={require('../images/reports_logo.png')}
                fadeDuration={0}
                style={{   height: 70, weidth:70  }}
              />
              {/* <Icon name = "file-medical-alt" style = {{fontSize: 50,color: Color.color_two,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Medical Reports</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>{this.state.report}</NB.Text>
              </NB.View>
            </NB.View>  

            </TouchableOpacity>


        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5,    }}>
            <TouchableOpacity 
            onPress = {() => {
              Actions.MedicineListScreen({ 
                patient_id : this.state.patient_id,
                patient_name: this.state.p_name,
            })}}
            style={{ flex:1 }}>
            

            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 15, backgroundColor:'#eef7f2' ,}}>
                <Image
                source={require('../images/medicine_logo.png')}
                fadeDuration={0}
                style={{   height: 70, weidth:70  }}
              />
              {/* <Icon name = "pills" style = {{fontSize: 50,color: Color.color_theme,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Medicine Lists</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>{this.state.medicine}</NB.Text>
              </NB.View>
            </NB.View>  

            </TouchableOpacity>        
        </NB.View>

        {/* <NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5,    }}>
            
            <TouchableOpacity 
            onPress = {() => {Actions.PrescriptionListScreen({ patient_id : this.state.patient_id})}}
            style={{ flex:1 }}>
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 15,backgroundColor:'#eef7f2' , }}>
                <Image
                source={require('../images/reminders_logo.png')}
                fadeDuration={0}
                style={{   height: 70, weidth:70  }}
              />
      
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Reminder(s)</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>{this.state.reminder}</NB.Text>
              </NB.View>
            </NB.View>

            </TouchableOpacity>          
        </NB.View> */}

        {this.state.isLoading ? <Loading / > : null }

        

      </NB.View>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 104,
    width: 104,
    borderRadius: 55,
    marginTop:-30
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 55,
  },
});
