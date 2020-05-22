/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { Image, SafeAreaView,StyleSheet,View,Text,I18nManager,TouchableHighlight,ImageBackground, PermissionsAndroid, Dimensions, AsyncStorage, Platform , TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ListItem, Button, Left, Right} from 'native-base';
// import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/PataintStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';

import AppConstant from '../../component/AppConstant';
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

import CommonValues from '../../component/CommonValues'

var jwt_token = ''
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

  var blood_groups = []
  var gender = []
  var day =[]
  var month = []

  var year = []

  var jwt_token = ''

export default class AddPatientScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      p_patient_id: this.props.patient_id,
      p_name: this.props.p_name,
      p_gender: this.props.gender,
      p_age: this.props.age,
      p_dob: this.props.p_dob,
      p_photo: this.props.photo,
      p_blood_group: this.props.blood_group,

      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      name:'',
      gender:'',
      blood_group:'',
      birth_day:'',
      birth_month: '',
      birth_year:'',
      imagePickOptionDialog:false,
      change_photo_url:'',
      image_uri: '',
      image_type: '',
      image_name: '',
      action_type: this.props.action_type,
      jwt_token:''

    }
  }

  componentDidMount(){
    console.log("#################### action_type: " + this.state.action_type 
    +' DOB: '+this.state.p_dob
    +' p_name: '+ this.state.p_name
    +' blood_group:' + this.state.p_blood_group
    +' p_patient_id: ' + this.state.p_patient_id)
    if(this.state.action_type === 'edit'){
      if (this.state.p_dob !=''){
        const str = this.state.p_dob;
        const res = str.split('-');
        console.log(res[0] +' '+ res[1]+' '+ res[2]);

        this.setState({
          year: res[0],
          month: res[1],
          day: res[2],
        })
      }
      

      this.setState({
        name: this.state.p_name,
        gender: this.state.p_gender,
        blood_group: this.state.p_blood_group,
        change_photo_url: this.state.p_photo
      })
//
    }
    
    AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
      console.log("#################### jwt_token: " + values)
      jwt_token = values

      this.setState({
        jwt_token: values
      })
    })

    if (this.state.action_type != 'edit'){
        this.setState({
          month: '',
          gender: '',
          blood_group: ''
        })
    }

    gender = CommonValues.getGender()
    blood_groups = CommonValues.getBloodGroup()
    month = CommonValues.getMonth()
    this.getDays()
    this.getYears()

    
  }

  getDays(){
    for (let i = 0; i < 32; i++){
      var value=''
      if(i<10){
        value= '0'+i;
      }else{
        value =''+ i;
      }
      var day_obj = {
        label: "" + value,
        value: "" + value,
        key: "" + value,
        color: 'black'
      }
      
      if (i == 0) {
        var day_obj = {
          label: "Day",
          value: "",
          key: "Day" ,
          color: 'black'
        }
        day.push(day_obj)
        if (this.state.action_type != 'edit') {
        this.setState({
          day: ''
        })
      }
      } else {
        day.push(day_obj)
      }
    }

    console.log('*******day :'+day.length)

  }

  getYears() {
    for (let i = 1959; i < 2025; i++) {
      var year_obj = {
        label: "" + i,
        value: "" + i,
        key: "" + i,
        color: 'black'
      }
      if (i === 1959) {
        var day_obj = {
          label: "Year",
          value: "",
          key: "Year",
          color: 'black'
        }
        year.push(day_obj)
        if (this.state.action_type != 'edit') {
        this.setState({
          year: ''
        })
      }
      } else {
        year.push(year_obj)
      }
    }

    console.log('*******day :' + day.length)
    // this.timeoutHandle = setTimeout(() => {
      
    // }, 3000);
    

  }

    checkForIOSPermission() {
      console.log("method called")

      //  this.onPressFromGallery()

      request(PERMISSIONS.IOS.CAMERA).then(result => {
        // …
        console.log("result: " + result)

        if (result == 'granted') {
          //user accepted camera permission
          this.setState({
            permissionsGranted: true,
            imagePickOptionDialog: true
          });
        } else {
          this.onPressFromGallery()
        }
      });
    }

    onPressFromGallery = () => {
      this.setState({
        imagePickOptionDialog: false
      })
      console.log("gallery will open to select image");

      this.timeoutHandle = setTimeout(() => {

        ImagePicker.launchImageLibrary(options, (response) => {

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {

            console.log("image_type: " + response.type);

            console.log("image_name: " + response);
            console.log("image_size: " + response.fileSize);

            var name = ''

            if (response.fileName == null) {

              var getFilename = response.uri.split("/");
              name = getFilename[getFilename.length - 1];
            } else {
              name = response.fileName

            }

            
            this.setState({
              image_uri: response.uri,
              image_type: response.type,
              image_name: name,
            });

            this.setState({change_photo_url: response.uri,});

            console.log('$$$$$$$$ Image selected: ' + response.uri,
            ' origURL: ', response.origURL,
            ' path: ', response.path,
            
            );

            // this.requestImage();
          }

        });
      }, 150)

    };

    onPressOpenCamera = () => {
      this.setState({
        imagePickOptionDialog: false
      })
      console.log("camera will open to pick image");

      this.timeoutHandle = setTimeout(() => {

        ImagePicker.launchCamera(options, (response) => {
          // Same code as in above section!
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            this.setState({
              image_uri: response.uri,
              image_type: response.type,
              image_name: response.fileName
            });

            this.setState({change_photo_url: response.uri,});
            console.log('Image selected: ' + response.uri);
            console.log('Image clicked: ' + response.uri);

            // this.requestImage();
          }
        });
      }, 500)
    }

    requestImage = () => {

      console.log('--------------------')

      this.setState({
        isLoading: true
      });

      var URL = AppConstant.BASE_URL + "patient/addPatient";

      console.log("user_token: -------- " );
      console.log("image_uri: " + this.state.image_uri);
      console.log("image_name: " + this.state.image_name);
      console.log("image_type: " + this.state.image_type);

      var formData = new FormData();
      formData.append('api_key', this.state.api_key);
      let device_uuid = DeviceInfo.getUniqueId();
      formData.append('device_type', this.state.device_type);
      formData.append('device_uuid', device_uuid);

      var dob_obj = this.state.year + '-' + this.state.month + '-' + this.state.day
      formData.append('name', this.state.name);
      formData.append('dob', dob_obj);
      formData.append('blood_group', this.state.blood_group);
      formData.append('action_type', this.state.action_type);
      formData.append('gender', this.state.gender);

      if (this.state.action_type ==='edit'){
        formData.append('patient_id', this.state.p_patient_id);
      }

      console.log('---------1 device_uuid: ' + device_uuid 
      +" name: " + this.state.name
      + ' dob_obj : ' + dob_obj 
      + ' blood_group: ' + this.state.blood_group 
      + ' gender: ' + this.state.gender 
      + ' formData:' + formData+
      ' URL: '+ URL
      +' jwt: '+ this.state.jwt_token )
      
      //  = 1988 - 12 - 02
      // gender = m / f
      // blood_group: o +
      // profile_image_name =
      // action_type

      console.log('file://' + this.state.image_uri)

      if (this.state.image_uri !=''){
        formData.append('photo', {
          uri: this.state.image_uri,
          type: this.state.image_type, // or photo.type
          name: this.state.image_name
        });
      }



      fetch(URL , {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.state.jwt_token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        }).then((response) => response.json())
        .then((responseJson) => {

          console.log(responseJson.response);
          console.log(responseJson.response.message);

          if (responseJson.response.type === "success") {
            console.log("able to save photo: " + responseJson.response.data.photo);
            // console.log("able to save change_photo_id: " + responseJson.response.data.change_photo_id);

            this.setState({
              isLoading: false,
            });

            alert(responseJson.response.message);

            this.timeoutHandle = setTimeout(() => {
                if (this.state.action_type === 'edit') {
                  Actions.pop()
                  Actions.pop()

                  Actions.PatientProfileScreen({
                    patient_id: this.state.p_patient_id,
                    blood_group: '',
                    gender: '',
                    age: '',
                    photo: '',
                    p_name: '',
                    p_dob: '',
                  })

                } else {
                  Actions.HomeScreen();
                }
            }, 1000);

          } else if (responseJson.response.type === "error") {
              console.log(responseJson.response.message);
              this.setState({
                isLoading: false
              });
              alert(responseJson.response.message);
            
          } else {
            console.log("unable to save photo");
            this.setState({
              isLoading: false
            });
          }

        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
        });
    }

  updateValue(text, field) {
    if (field == 'name') {
      this.setState({
        name: text,
      })
    }

  }

  checkAllValues(){
    var dob_obj = this.state.year + ' - ' + this.state.month + ' - ' + this.state.day
    console.log('---------1: ' + this.state.name + ' dob_obj : ' +
      dob_obj + ' blood_group: ' +
      this.state.blood_group +
      ' gender: ' + this.state.gender)
    if (this.state.image_uri === '' && this.state.action_type != 'edit') {
      alert('Select profile image.');
    }else if(this.state.name === ''){
      alert('Name can not be empty.');
    }else if (this.state.gender=== ''){
      alert('Gender not selected.');
    } else if (this.state.blood_group === ''){
      alert('Blood group not selected.');      
    } else if (this.state.day === '') {
      alert('Select date.');
    } else if (this.state.month === '') {
      alert('Select month.');
    } else if (this.state.year === '') {
      alert('Select year.');
    } else{
      NetInfo.fetch().then(state => {
      if (state.isConnected) {
      this.requestImage()
      } else {
        alert('Please connect to internet and try again. ');
        return;
      }
      });
    }
    
  }

  render(){
    const {width, height} = Dimensions.get('window');
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => {
                AppConstant.home_refresh= true;
                // Actions.pop()
                if(this.state.action_type ==='edit'){
                  Actions.pop()
                }else{
                  Actions.HomeScreen();
                }
                
                }} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} > 
                    <TouchableOpacity
                      onPress={() => {this.checkAllValues()}}>
                      <NB.Text style={{ color:'white' }}>SAVE</NB.Text>
                    </TouchableOpacity>  
                  </Right>


  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title={String.nav_profile} />
      
      <NB.View style={{ backgroundColor: '#f3f7fa', width:'100%', height:'100%', }}>
        


        <NB.View style={{ justifyContent:'center',alignItems:'center' ,marginTop:20,marginBottom:40}}>
            <TouchableHighlight
                          style={[styles.profileImgContainer, {  }]}
                        >

                    <NB.View>


                    {/* <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} /> */}
                    {this.state.change_photo_url == '' ? 
                    <Image  style={styles.profileImg}   source={require('../images/person_background.png')} />
                    :
                    <Image  style={styles.profileImg}   source={{uri:this.state.change_photo_url} }/>
                    }
                    
                    <NB.View style={{ position: 'absolute', bottom: 0, right: 0 }}>

                      
                      <NB.View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                            backgroundColor: Color.color_theme,
                            borderColor: Color.color_theme,
                            borderWidth: 3,
                            alignItems: 'center', 
                            justifyContent:'center',
                          }}>

                          <Icon
                          onPress={()=>{
                            this.setState({
                              imagePickOptionDialog: true,
                            })
                            console.log('-----------imagePickOptionDialog------')
                          }}
                          name = "camera" style = {{fontSize: 25,color: Color.white ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

                      </NB.View>

                    </NB.View>
                    </NB.View>    
                    
            </TouchableHighlight>

            

        </NB.View>
        


        <NB.View style={{ backgroundColor: 'white',   marginTop:0, marginLeft:10, marginRight:10,  alignItems: 'center', borderRadius:5, borderBottomColor:'#e2e2e2', borderBottomWidth:2 }}>
            
              <NB.Item style={{ marginBottom:8, marginTop:20, marginLeft:20, marginRight:20 }}>
                <NB.Input 
                value={this.state.name}
                style={{ fontSize: 18 }}
                placeholder = "Patient Name Goes here" 
                onChangeText={(text)=>this.updateValue(text,'name')}/ >
              </NB.Item>
            {/* <NB.Text style={{ color : Color.color_theme, fontSize:18, marginTop:10 }}>Jane Alam</NB.Text> */}
            <NB.View style={{ flexDirection:'row' ,marginTop:15 , justifyContent:'space-around', marginBottom:30}}>
                <NB.View style={{width: 130,  padding:5, marginRight:20,borderBottomColor:'#858585', borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0 }}>

                <RNPickerSelect
                    value={this.state.gender}
                    onValueChange={(value) => {
                      this.setState({
                        gender: value
                      })
                      console.log(value)}}
                    style={{ alignItems:'center', justifyContent:'center', width: 130 }}
                    items={gender}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -10, right: 10 }}>
                        <Button onPress={() => this.editPatient()} transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }

                    
                </NB.View>

                <NB.View  style={{width: 130,  padding:5,marginLeft:20, borderBottomColor:'#858585', borderBottomWidth:1, paddingBottom: Platform.OS === 'ios' ? 10 :0}}>
                  {/* <NB.Text style={{ color: '#858585', fontSize: 16, marginLeft: 5,marginLeft:10 }}>Blood Group</NB.Text> */}
                <RNPickerSelect
                    value={this.state.blood_group}
                    onValueChange={(value) => {
                      this.setState({
                        blood_group: value
                      })
                      console.log(value)}}
                    items={blood_groups}/>
                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -10, right: 10 }}>
                        <Button onPress={() => this.editPatient()} transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
                </NB.View>

            </NB.View>

        </NB.View>

        <NB.View style = {
          {
            backgroundColor: 'white',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 34,
            marginTop: 10,
            borderRadius: 5,
            borderBottomColor: '#e2e2e2',
            borderBottomWidth: 2
          }
        } >
          <NB.Text style={{ color: Color.color_theme, marginTop:20, marginBottom:24, marginLeft:15,fontSize:18 }}>Date Of Birth</NB.Text>
            
            <NB.View style={{ flexDirection:'row' ,marginTop:5 , justifyContent:'space-around', marginBottom:34}}>
                <NB.View  style={{width: 110,  padding:5, borderBottomColor:'#858585', borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0  }}>
                  {/* <NB.Text style={{ color: '#858585 ', fontSize: 16, marginRight:30, marginLeft:10}}>Day</NB.Text> */}
                
                <RNPickerSelect
                    value={this.state.day}
                    onValueChange={(value) => {
                      this.setState({
                        day: value
                      })
                      console.log(value)}}
                    items={day}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -10, right: 10 }}>
                        <Button onPress={() => this.editPatient()} transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
                </NB.View>

                <NB.View  style={{width: 110,  borderBottomColor:'#858585', borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0 }}>
                  {/* <NB.Text style={{ color: '#858585 ', fontSize: 16, marginLeft: 5,marginLeft:10 }}>Month</NB.Text> */}
                <RNPickerSelect
                    value={this.state.month}
                    onValueChange={(value) => {
                      this.setState({
                        month: value
                      })
                      console.log(value)}}
                    items={month}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -10, right: 10 }}>
                        <Button onPress={() => this.editPatient()} transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
                </NB.View>

                <NB.View  style={{width: 110, borderBottomColor:'#858585', borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0   }}>
                  {/* <NB.Text style={{ color: '#858585 ', fontSize: 16, marginLeft:20 }}>Year</NB.Text> */}
                
                <RNPickerSelect
                    value={this.state.year}
                    onValueChange={(value) => {
                      this.setState({
                        year: value
                      })
                      console.log(value)}}
                    items={year}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -10, right: 10 }}>
                        <Button onPress={() => this.editPatient()} transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
                </NB.View>

            </NB.View>

                    
        </NB.View>


          <Dialog
              dialogStyle={{
                borderRadius:7,
                
                  }}
                  titleStyle={{
                    textAlign: 'center',

                  }}
                    visible={this.state.imagePickOptionDialog}
                    title="Choose Photo"
                    onTouchOutside={() => this.setState({imagePickOptionDialog: false})} >

                      <NB.View style={{height:120,}}>
                          
                          <NB.View style={{flex:1,  justifyContent:"center",alignItems:"center"}}> 

                        

                        <NB.Button  onPress={this.onPressOpenCamera} iconLeft style={{width:225,backgroundColor:"#d0d0d0",paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}}>
                            <NB.Icon name='camera'  style={{fontSize: width * 0.07, color:"#000", }} />
                            <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  >Capture Photo</NB.Text>
                          </NB.Button>

                          <NB.Button onPress={this.onPressFromGallery} iconLeft style={{width:225,backgroundColor:"#d0d0d0",marginTop:20,paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}} >
                            <NB.Icon name='image'  style={{fontSize: width * 0.07, color:"#000", }} />
                            <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  > Browse  Gallery</NB.Text>
                        </NB.Button>


                                
                            
                      </NB.View> 
                </NB.View>

                </Dialog>

    {this.state.isLoading ? <Loading / > : null }



      </NB.View>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 210,
    width: 210,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 150,
  },
  profileImg: {
    height: 210,
    width: 210,
    borderRadius: 150,
  },
});


