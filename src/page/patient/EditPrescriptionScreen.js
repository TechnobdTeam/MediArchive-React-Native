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
  FlatList,
  I18nManager,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  AsyncStorage,
  Dimensions,
  Image, 
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {Actions} from 'react-native-router-flux';



import {ListItem, Button, Left, Right} from 'native-base';
// import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import AppConstant from '../../component/AppConstant';
import EmptyMessage from '../../component/EmptyMessage';
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import ImageLoad from 'react-native-image-placeholder';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

var day = []
var month = [
  {
    label: 'Month',
    value: 'Month'
  },
  {
    label: 'January',
    value: '01'
  },
  {
    label: 'February',
    value: '02'
  },
  {
    label: 'March',
    value: '03'
  },
  {
    label: 'April',
    value: '04'
  },
  {
    label: 'May',
    value: '05'
  },
  {
    label: 'June',
    value: '06'
  },
  {
    label: 'July',
    value: '07'
  },
  {
    label: 'August',
    value: '08'
  },
  {
    label: 'September',
    value: '09'
  },
  {
    label: 'October',
    value: '10'
  },
  {
    label: 'November',
    value: '11'
  },
  {
    label: 'December',
    value: '12'
  }
]

var year = []

var jwt_token = ''

// var image_list = []

export default class EditPrescriptionScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
    device_type: Platform.OS === 'ios' ? '2' : '1',
    api_key: 'cp/W?^,([{,O_+T',
    dataSource: [],
    offset: '0',
    error: null,
    refreshing: false,
    isLoading: false,
    isConnected: false,
    onEndReachedCalledDuringMomentum: false,
    patient_id: this.props.patient_id,
    day: this.props.day,
    month: this.props.month,
    year: this.props.year,
    description: this.props.description,
    imagePickOptionDialog: false,
    change_photo_url: '',
    image_uri: '',
    image_type: '',
    image_name: '',
    load_more_height: 10,
    name: this.props.prescribe_by,
    action_type: this.props.action_type,
    image_list: this.props.image_list,
    prescription_photo: this.props.prescription_photo,
    prescription_id: this.props.prescription_id,
    delete_image_item:{},
    patient_name: this.props.patient_name,
    screen_form: this.props.screen_form,
    doctor_profile_image: this.props.doctor_profile_image
    }
  }
  componentDidMount() {

    if (this.props.month===''){
      this.setState({month:'Month'})
    }

    // Add Image Place holder
    var image = {
      id: Date.now(),
      image_uri: '../images/add_prescription.png',
      image_type: 'png',
      image_name: 'add_prescription',
    }

    
    
    console.log(" ------image_list------: ", this.state.image_list.length, " time: " + Date.now());
    
    this.timeoutHandle = setTimeout(() => {
    var imageArray = []
    imageArray.push(image)

    // this.setState({
    //   image_list: this.state.image_list.length === 0 ? imageArray : [...this.state.image_list, ...imageArray],
    // })

    }, 2000);
    


    if (this.state.action_type === 'edit') {
        // patient_id: this.state.patient_id,
        // action_type: 'add',

        // prescribe_by: '',
        // medicine: '',
        // description: '',
        // id: '',
        // added: '',
        // doctor_profile_image: '',

        console.log('this.props.added: ' + this.props.added 
        +' prescribe_by: ' + this.props.prescribe_by
        +' doctor_profile_image: ' + this.props.doctor_profile_image);

        this.setState({
          name: this.props.prescribe_by,
          description: this.props.description,
          change_photo_url: this.props.doctor_profile_image
        })

    }

    console.log('-----------1---------' + this.state.action_type +
      ' ? this.state.patient_id: ' + this.state.patient_id)


    //   this.setState({
    //     name: this.state.p_name,
    //     gender: this.state.p_gender,
    //     blood_group: this.state.p_blood_group,
    //     change_photo_url: this.state.p_photo
    //   })
    //   //
    // }
    
    console.log("####################user_id: " + this.state.patient_id)
    AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
      console.log("$$$$-----####################image_list: " + this.state.image_list.length)
      jwt_token = values

      if (this.state.image_list.length === 0){
        this.getApiResponse('getPrescriptionInfo');
      }

    })
    this.getDays()
    this.getYears()

    
  }

  getMonthId(month_name){
    for (let i = 0; i < month.length; i++) {
      console.log('........' + month[i].label +' ? '+month_name)
      if (month[i].label.substring(0, 3) === month_name) {
        console.log('........' + month_name+ ' ? '+ month[i].value)
        return month[i].value;
        break;
      }
    }
  }

  getDays() {
    for (let i = 0; i < 32; i++) {
      var value = ''
      if (i < 10) {
        value = '0' + i;
      } else {
        value = '' + i;
      }
      var day_obj = {
        label: "" + value,
        value: "" + value
      }

      if(i==0){
      var day_obj = {
        label: "Day" ,
        value: "Day"
      }
        day.push(day_obj)

        if(this.props.day===''){
          this.setState({
            day: 'Day'
          })
        }
      }else{
        day.push(day_obj)
      }

      
    }

    console.log('*******day :' + day.length)

  }

  getYears() {
    for (let i = 1959; i < 2040; i++) {
      var year_obj = {
        label: "" + i,
        value: "" + i
      }

      if (i === 1959) {
        var day_obj = {
          label: "Year",
          value: "Year"
        }
        year.push(day_obj)

        if(this.props.year===''){
          this.setState({
          year: 'Year'
          })
        } 
      }else{
        year.push(year_obj)
      }
      
    }
    console.log('*******day :' + day.length)
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
              change_photo_url: response.uri
            });
            console.log('Image selected: ' + response.uri);

            var image = {
              id: Date.now(),
              image_uri: response.uri,
              image_type: response.type,
              image_name: name,
            }

            var imageArray = []
            imageArray.push(image)


            var custom_image= {
              "id": Date.now(),
              "file_id": "8ac372a3-41aa-485b-94e8-d2fa505ade2a",
              "type": "prescription",
              "file_name": "1588749791.jpg",
              "created_date": "2020-05-06 13:23:11",
              "updated_date": "2020-05-06 13:23:11",
              photo: response.uri
            }

            var customImageArray = []
            customImageArray.push(custom_image)

            this.setState({
              image_list: this.state.image_list.length === 0 ? imageArray : [...this.state.image_list, ...imageArray],
              prescription_photo: this.state.prescription_photo.length === 0 ? customImageArray : [...this.state.prescription_photo, ...customImageArray],
              
            })


            console.log('----FromGallery image_list: ' + this.state.image_list.length)

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
              image_name: response.fileName,
              change_photo_url: response.uri
            });
            console.log('Image selected: ' + response.uri);
            console.log('Image clicked: ' + response.uri);

            var image ={
                id: Date.now(),
                image_uri: response.uri,
                image_type: response.type,
                image_name: response.fileName,
            }

            var imageArray = []
            imageArray.push(image)

            // this.setState({
            //   image_list: this.state.image_list.length === 0 ? imageArray : [...this.state.image_list, ...imageArray],
            // })

        var custom_image = {
          "id": Date.now(),
          "file_id": "8ac372a3-41aa-485b-94e8-d2fa505ade2a",
          "type": response.type,
          "file_name": response.fileName,
          "created_date": "2020-05-06 13:23:11",
          "updated_date": '',
          photo: response.uri
        }
        var customImageArray = []
        customImageArray.push(custom_image)

        this.setState({
          image_list: this.state.image_list.length === 0 ? imageArray : [...this.state.image_list, ...imageArray],
          prescription_photo: this.state.prescription_photo.length === 0 ? customImageArray : [...this.state.prescription_photo, ...customImageArray],
        })

        console.log(' image_list: ' + this.state.image_list.length)

            // this.requestImage();
          }
        });
      }, 500)
    }

    fileScanning() {
      AppConstant.p_patient_id = this.state.patient_id;
      AppConstant.p_action_type = this.state.action_type;
      AppConstant.p_prescribe_by = this.state.name;
      AppConstant.p_description = this.state.description;
      AppConstant.p_day = this.state.day;
      AppConstant.p_month = this.state.month;
      AppConstant.p_year = this.state.year;
      AppConstant.p_image_list = this.state.image_list;

      AppConstant.p_prescription_photo = this.state.prescription_photo;
      AppConstant.p_prescription_id = this.state.prescription_id;


      this.setState({
        imagePickOptionDialog: false
      })
      Actions.AppScan()
    }

    requestImage = () => {
      this.setState({
        isLoading: true
      });

      var URL = AppConstant.BASE_URL + "prescription/addPrescription";

      var formData = new FormData();
      formData.append('api_key', this.state.api_key);
      let device_uuid = DeviceInfo.getUniqueId();
      formData.append('device_type', this.state.device_type);
      formData.append('device_uuid', device_uuid);

      var dob_obj = this.state.year + '-' + this.state.month + '-' + this.state.day
      formData.append('doctor_id', this.state.name);
      formData.append('prescription_date', dob_obj);
      formData.append('description', this.state.description);
      formData.append('action_type', this.state.action_type);

      formData.append('patient_id', this.state.patient_id);
      formData.append('action_type', this.state.action_type);
      formData.append('id', this.state.prescription_id);
      

      console.log('--------------------' 
      + this.state.action_type +
        ' ? this.state.patient_id: ' + this.state.patient_id 
        +' id: ' + this.state.prescription_id)
      console.log('---------1 device_uuid: ' + device_uuid 
      + " Name: " + this.state.name 
      + ' dob_obj : ' + dob_obj ,
      +' ********ImageLength: ' + this.state.image_list.length)


      //  = 1988 - 12 - 02
      // gender = m / f
      // blood_group: o +
      // profile_image_name =
      // action_type

      // formData.append('photo', {
      //   uri: this.state.image_uri,
      //   type: this.state.image_type, // or photo.type
      //   name: this.state.image_name
      // });


        for (let i = 0; i < this.state.image_list.length; i++) {
          formData.append('photo[]', {
            uri: this.state.image_list[i].image_uri,
            type: this.state.image_list[i].image_type, // or photo.type
            name: this.state.image_list[i].image_name
          });
          
        console.log('', ' uri: ', this.state.image_list[i].image_uri,
            ' type: ', this.state.image_list[i].image_type, // or photo.type
            ' name: ', this.state.image_list[i].image_name)
        }
        
      

      fetch(URL, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + jwt_token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        })
        .then((response) => response.json())
          .then((responseJson) => {

          console.log(responseJson.response);
          console.log(responseJson.response.message);

          this.setState({
            isLoading: false
          });

          
          if (responseJson.response.type === "success") {
            console.log("able to save photo: " + responseJson.response.data.prescription.image);
            // console.log("able to save change_photo_id: " + responseJson.response.data.change_photo_id);
            // alert(responseJson.response.message);
            this.showToast(responseJson.response.message, 'success')
            
            this.setState({
              isLoading: false
            });

            this.timeoutHandle = setTimeout(() => {
              Actions.pop()
              Actions.pop()
              if (this.state.screen_form === 'prescription_details') {
                this.itemClicked()
              }else{
                Actions.PrescriptionListScreen({
                  patient_id: this.state.patient_id,
                  patient_name: this.state.patient_name
                })
              } 
            }, 1000);

          } else if (responseJson.response.type === "error") {
            console.log(responseJson.response.message);
            alert(responseJson.response.message);
            this.setState({
              isLoading: false
            });
          } else {
            console.log("unable to save photo");
          }

        })
        .catch((err) => {
          console.log("err >>>>> ", err);
        });
    }

    itemClicked() {
      Actions.PrescriptionDetailsScreen({
        prescription_id: this.state.prescription_id,
        patient_name: this.state.patient_name,
        doctor_profile_image: this.state.doctor_profile_image
      })
    }

    checkAllValues() {
      var dob_obj = this.state.year + ' - ' + this.state.month + ' - ' + this.state.day
      console.log('---------1: ' + this.state.name + ' dob_obj : ' +
        dob_obj + 
        ' this.state.description: ' + this.state.description+
        ' Image: size- > ' + this.state.image_list.length)

      if (this.state.name === '') {
        alert('Name can not be empty.');
      } else if (this.state.description === '') {
        alert('Description can not be empty.');
      } else if (this.state.year === '' || this.state.month === '' || this.state.day === '') {
        alert('Select date of birth.');
      } else if (this.state.year === 'Year')  {
        alert('Select date of year.');
      } else if (this.state.month === 'Month') {
        alert('Select date of month.');
      } else if (this.state.day === 'Day') {
        alert('Select date of birth.');
      } else if (this.checkDate()) {
        alert('Prescribed date can not be future date.');
      } else {
        this.requestImage()
      }

    }
  // -------------------------------------------------

  deletePhotoApi(){
  this.setState({
    isLoading: true
  })

  console.log(" type:" + jwt_token + '  delete_image_item: ',
    this.state.delete_image_item.id);

  var Authorization = 'Bearer ' + jwt_token

  var URL = ''
  var formData = new FormData()

  formData.append('file_id', this.state.delete_image_item.id);
  // formData.append('file_id', '6935a250-40cb-4777-91a3-9516ad013612');
  
  URL = AppConstant.BASE_URL + "prescription/deletePhoto";

  formData.append('api_key', this.state.api_key);
  let device_uuid = DeviceInfo.getUniqueId();
  formData.append('device_type', this.state.device_type);
  formData.append('device_uuid', device_uuid);

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

              // if(this.state.image_list.length>0){
              //   this.setState({
              //     image_list: this.removeFromArray(this.state.image_list, item)
              //   })
              // }
              this.showToast(responseJson.response.message, 'success')
              // alert(responseJson.response.message);
              // this.setState({
              //   isLoading: false,
              //   prescription_photo: this.removeFromArray(this.state.prescription_photo, this.state.delete_image_item)
              // });
              console.log(" GetParam device_uuid:" + this.state.dataSource.length);
              this.setState({
                isLoading: false,
                prescription_photo: [],
              });

              this.timeoutHandle = setTimeout(() => {
                this.getApiResponse('getPrescriptionInfo');
              }, 200);

              

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


  getApiResponse(api_type, search) {
  this.setState({
    isLoading: true
  })

  console.log(" type:" + jwt_token + '  prescription_id: ',
  this.state.prescription_id);

  var Authorization = 'Bearer ' + jwt_token

  var URL = ''
  var formData = new FormData()

  if(api_type==='doctor_list'){
    URL = AppConstant.BASE_URL + "prescription/getdoctorList";
    formData.append('search', search);
    formData.append('offset', this.state.offset);

  } else if (api_type === 'addPrescription') {
    URL = AppConstant.BASE_URL + "prescription/addPrescription";
  } else if (api_type === 'getPrescriptionInfo') {
    formData.append('prescription_id', this.state.prescription_id);
    URL = AppConstant.BASE_URL + "prescription/getPrescriptionInfo";
  } else if (api_type === 'deletePhoto') {
    formData.append('file_id', this.state.delete_image_item.id);
    URL = AppConstant.BASE_URL + "prescription/deletePhoto";
  }

  formData.append('api_key', this.state.api_key);
  let device_uuid = DeviceInfo.getUniqueId();
  formData.append('device_type', this.state.device_type);
  formData.append('device_uuid', device_uuid);
  // formData.append('offset', '0');


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

            // this.setState({
            //   dataSource: [],
            // })

            if (api_type === 'doctor_list') {
              if (responseJson.response.type === "success") {
                
                this.setState({
                  load_more_height: responseJson.response.data.length % 20 === 0 ? 100 : 10,
                  isLoading: false,
                  dataSource: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataSource, ...responseJson.response.data],
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                });

                this.timeoutHandle = setTimeout(() => {
                  if (responseJson.response.data.length % 20 === 0) {
                    this.setState({
                      load_more_height: 100,
                    })
                  }
                }, 100);


                console.log(" GetParam device_uuid:" + this.state.dataSource.length);

              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
                // alert(responseJson.response.message);
              }
            } else if (api_type === 'getPrescriptionInfo') {
              if (responseJson.response.type === "success") {

                // prescription_info.description
                // doctor_info.doctor_name
                // created_date
                // prescription_photo

                if (responseJson.response.data.prescription_info.added != '') {
                  const str = responseJson.response.data.prescription_info.added;
                  const res = str.split(' ');
                  console.log(responseJson.response.data.doctor_info.created_date,' ? ',
                    'Year: ', res[0] + ' ' + 'Month:', res[1] + ' Day:' + res[2]);
                  // 02 Feb 2020
                  // 2020 - 05 - 06 13: 23: 11
                  var monthId = this.getMonthId(res[1])

                  this.setState({
                    year: res[2],
                    month: monthId,
                    day: res[0],
                  })
                }

                this.setState({
                  isLoading: false,
                  description: ""+responseJson.response.data.prescription_info.description,
                  name: responseJson.response.data.doctor_info.doctor_name,
                  prescription_photo: responseJson.response.data.prescription_photo
                });

                console.log(" -------->>>>>>>>>:" + responseJson.response.data.prescription_info.description);

              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
                // alert(responseJson.response.message);
              }
            } else if (api_type === 'deletePhoto') {
              if (responseJson.response.type === "success") {
                  // if(this.state.image_list.length>0){
                  //   this.setState({
                  //     image_list: this.removeFromArray(this.state.image_list, item)
                  //   })
                  // }

                
                alert(responseJson.response.message);
                // this.setState({
                //   isLoading: false,
                //   prescription_photo: this.removeFromArray(this.state.prescription_photo, this.state.delete_image_item)
                // });
                console.log(" GetParam device_uuid:" + this.state.dataSource.length);
                this.setState({
                  isLoading: false,
                });
              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
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

  // updateValue(text, field) {
  //   if (field === 'name') {
  //     this.setState({
  //       name: text,
  //     })
  //     this.getApiResponse('doctor_list', text)
  //   }

  // }
  updateValue(text, field) {
    if (field === 'name') {
      this.setState({
        name: text,
        dataSource: [],
        offset: '0',
      })

      this.timeoutHandle = setTimeout(() => {
        this.getApiResponse('doctor_list', text)
      }, 100);
      
    } else if (field === 'description') {
      this.setState({
        description: text,
      })
    }

    console.log(' this.state.description: ' + this.state.description + ' text: ' + text + ' field : ' + field)
  }


renderItem = ({ item, index }) => (
    <View  style={{  backgroundColor:'#fff', marginLeft:2, marginRight:2,marginTop:4 ,  borderBottomColor:'#e2e2e2', borderBottomWidth:2}}>
    <TouchableOpacity 
    onPress = {
      () => {
        this.setState({
          name: item.name,
          dataSource: []
        })
        }
    }
    style={{  flexDirection:'row', }}>
      <ImageLoad 
      source={ { uri:item.photo }}
      loadingStyle={{ size: 'large', color: Color.color_theme}}
      style={{ height: 30,width:30, justifyContent:'center', marginRight:2, margin:10}}/>

      <Text 
      numberOfLines={1}
      style={{ color: Color.color_theme , fontSize:16,   padding:10, textAlign:'center',margin:5}}>{item.name}</Text>  
    
    </TouchableOpacity>

    {
      (this.state.dataSource.length === index + 1) && (this.state.dataSource.length % 20 === 0) ? (
    <TouchableOpacity
      onPress={() => {
        this.setState({
          offset: this.state.dataSource.length,
        });

        this.timeoutHandle = setTimeout(() => {
          // if(!this.state.isLoading ){
          console.log(" --------- Load More: ",
            this.state.dataSource.length,
            this.state.offset,
            this.state.name
          );
          this.getApiResponse('doctor_list', this.state.name)
          // this.getApiResponse('doctor_list', this.state.name )
          // }
        }, 200);
      }}>
      <Text
        style={{
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: '#cbcbcb',
          color: 'white',
        }}>
        Load more
      </Text>
      {/* {this.state.isLoading ? <Loading /> : null} */}
    </TouchableOpacity>
  ) : null}


    </View>
  )

  // ---------------------------------------------------------------------
  ListEmpty = () => {
    if(!this.state.isLoading ){
      return (
        <EmptyMessage message={'Patient not found!'}></EmptyMessage>
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
          this.makeApiCall();
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
              this.makeApiCall();
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

renderImageItem = ({ item }) => (
<NB.View>
  
  <NB.View style = {{ borderColor: '#0099cb', borderWidth:2, borderRadius:5, marginRight:10}} >
  
  { console.log('------- : ',item.photo.includes('https'))}
  {
    item.photo.includes('https') == true ? <Image  style={{ width: 175, height:202}} source={{uri:item.photo} }/> 
    :
    <Image  style={{ width: 175, height:202}} source={{uri:item.photo} }/> 
  }
  
  {/* <Image  style={{ width: 175, height:205}} source={{uri:item.image_uri} }/> */}
    
    <NB.View style={{position: 'absolute', top: 0, right: 5}}>
    <Button Button onPress = {() => { 
      this.deleteImage(item) }} transparent >
      <Icon
        name = "times-circle"
        style={{fontSize: 30,color: '#0099cb',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
      />
    </Button>
    </NB.View>
  </NB.View>
</NB.View> 
)

deleteImage(item){
  console.log(' before ', this.state.image_list.length, ' ::: ', this.state.prescription_photo.length)
    var image_item = {
        id: item.id,
        image_uri: item.photo,
        image_type: item.type,
        image_name: item.file_name,
      }

  if (!item.photo.includes('https')){
      if(this.state.image_list.length>0){
        this.setState({
          image_list: this.removeFromArray(this.state.image_list, image_item),
          prescription_photo: this.removeFromArray(this.state.prescription_photo, item)
        })
      }
  }else{
    this.createDeleteAlert(item)

      
  }

  // if(this.state.image_list.length>0){
  //   this.setState({
  //     image_list: this.removeFromArray(this.state.image_list, item)
  //   })
  // }


  
  
  console.log(' @@@@@@@@-------- After -----: ', item.id)
}
removeFromArray(array, value) {
  var idx = array.indexOf(value);
  if (idx !== -1) {
    array.splice(idx, 1);
  }
  return array;
}

createDeleteAlert = (item) =>
  Alert.alert(
    "Do you want to Delete?",
    'Prescription Image',
    [{
        text: "Delete",
        onPress: () => {
          this.setState({
            delete_image_item: item
          })

          this.timeoutHandle = setTimeout(() => {
            console.log(' After ', this.state.image_list.length, ' ::: ', this.state.prescription_photo.length)
            this.deletePhotoApi()
          }, 200);

          console.log("Delete " + item.type)
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

      checkDate() {
        var birth_date = this.state.month + '/' + this.state.day + '/' + this.state.year
        var date_r = new Date(birth_date); // some mock date

        var milliseconds_reminder = date_r.getTime();
        var current_time = Date.now()

        console.log(milliseconds_reminder,
          current_time,
          (current_time - milliseconds_reminder))

        if (milliseconds_reminder > current_time) {
          console.log('Not a valid time---------')
          return true;
        } else {
          console.log('Is a valid time----------')
          return false;
        }

      }

  showToast(message, type) {
    NB.Toast.show({
      text: message,
      position: 'bottom',
      // type: type,
      duration: 1000,
      textStyle: {
        textAlign: 'center'
      }
    })
  }

  render(){
    const {width, height} = Dimensions.get('window');
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );
      
      var right = (
      <Right style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
          onPress = {() => { this.checkAllValues()}}>
          <NB.Text style={{color: 'white', textAlign:'center' }}>SAVE</NB.Text>
        </TouchableOpacity>
      </Right>
    );

  return (
    <SafeAreaView style = {
      {
        backgroundColor: Color.color_theme,
        height: '100%'
      }
    } >
      <Navbar left={left} right={right} title="Edit Prescription" />
      

    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{backgroundColor: Color.chrome_grey, height: '92%'}}>
        <NB.View>
          {/* Middle Section */}
          <NB.View style={{marginLeft: 10, marginRight: 10, marginTop: 10}}>

            <ScrollView
            horizontal={true}>
            

            <NB.View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    imagePickOptionDialog: true,
                  });
                  console.log('clicked.......');
                }}
                style={{width: 175, height: 205, marginRight: 10, backgroundColor:'white'}}>
                <Image
                  style={{width: 175, height: 205}}
                  source={require('../images/add_prescription.png')}
                />
              </TouchableOpacity>

              

              <FlatList
                style={{width: '100%', height: 205}}
                data={this.state.prescription_photo}
                horizontal={true}
                renderItem={this.renderImageItem}
                keyExtractor={({id}, index) => id}
                keyExtractor={item => item.id}
              />
            </NB.View>

            </ScrollView>
          </NB.View>
        </NB.View>

        <NB.View>{/* compress - arrows - alt */}</NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft:10,
            paddingRight:10,
            marginBottom: 5,
          }}>
          <NB.Text
            style={{
              color: Color.color_app,
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 5,
              fontSize: 20,
            }}>
            Date
          </NB.Text>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-around',
              marginBottom: 34,
            }}>
            <NB.View
              style={{
                width: 100,
                marginRight:5,
                borderBottomColor: '#858585',
                borderBottomWidth: 1,
                paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <NB.View style = {
                  {
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? -15 : 0,
                    right: 0
                  }
                } >
                  <Button  transparent>
                    <Icon
                      name="caret-down"
                      style={{
                        marginLeft: Platform.OS === 'ios' ? 0 : 0,
                        fontSize: 20,
                        color: Color.readmore,
                        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                      }}
                    />
                  </Button>
                </NB.View>
              <RNPickerSelect
                style={pickerDateStyle}
                value={this.state.day}
                onValueChange={value => {
                  this.setState({
                    day: value,
                  });
                  console.log(value);
                }}
                items={day}
              />

              
            </NB.View>

            <NB.View
              style={{
                width: 100,
                marginRight:5,
                marginLeft:5,
                borderBottomColor: '#858585',
                borderBottomWidth: 1,
                paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <NB.View style = {
                  {
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? -15 : 0,
                    right: 0
                  }
                } >
                  <Button  transparent>
                    <Icon
                      name="caret-down"
                      style={{
                        marginLeft: Platform.OS === 'ios' ? 0 : 0,
                        fontSize: 20,
                        color: Color.readmore,
                        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                      }}
                    />
                  </Button>
                </NB.View>
              <RNPickerSelect
                style={pickerDateStyle}
                value={this.state.month}
                onValueChange={value => {
                  this.setState({
                    month: value,
                  });
                  console.log(value);
                }}
                items={month}
              />

              
            </NB.View>

            <NB.View
              style={{
                width: 100,
                marginLeft:10,
                borderBottomColor: '#858585',
                borderBottomWidth: 1,
                paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <NB.View style = {
                  {
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? -15 : 0,
                    right: 0
                  }
                } >
                  <Button  transparent>
                    <Icon
                      name="caret-down"
                      style={{
                        marginLeft: Platform.OS === 'ios' ? 0 : 0,
                        fontSize: 20,
                        color: Color.readmore,
                        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                      }}
                    />
                  </Button>
                </NB.View>
              <RNPickerSelect
              style={pickerDateStyle}
                value={this.state.year}
                onValueChange={value => {
                  this.setState({
                    year: value,
                  });
                  console.log(value);
                }}
                items={year}
              />

              
            </NB.View>
          </NB.View>
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
            marginTop: 10,
          }}>
          <NB.Text
            style={{
              color: Color.color_app,
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 15,
              fontSize: 20,
            }}>
            Prescribe by
          </NB.Text>

          <NB.Item
            style={{marginBottom: 10, marginLeft: 20, marginRight: 20}}>
            <NB.Input
              placeholderTextColor={'#bfbfbf'}
              placeholder="Doctor Name"
              value={this.state.name}
              onChangeText={text => this.updateValue(text, 'name')}
              style={{flex: 1, fontSize: 18, color: '#5a5a5a'}}
              blurOnSubmit={ false } 
              returnKeyType='next'
              ref={(input) => this._name = input}
              onSubmitEditing={() => this._description._root.focus()}
            />
          </NB.Item>

          <FlatList
            style = {
              {
                paddingLeft: 5,
                paddingRight: 5,
                marginBottom: 10,
                height: this.state.dataSource.length > 0 ? (this.state.dataSource.length * 50) + this.state.load_more_height : 0
              }
            }
            contentContainerStyle={{flexGrow: 1}}
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={({id}, index) => id}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            
          />
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            height: 150,
            marginTop: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 15,
            marginTop: 10,
          }}>
          <NB.Text
            style={{
              color: Color.color_app,
              marginTop: 25,
              marginBottom: 20,
              marginLeft: 15,
              fontSize: 20,
            }}>
            Description
          </NB.Text>

          <NB.Item
            style={{marginBottom: 30, marginLeft: 20, marginRight: 20}}>
            <NB.Input
              style={{ color: '#5a5a5a' }}
              placeholderTextColor={'#bfbfbf'}
              placeholder="Description note"
              value={this.state.description}
              onChangeText={text => this.updateValue(text, 'description')}
              style={{flex: 1, fontSize: 18, color: '#85858'}}

              blurOnSubmit={ true }
              returnKeyType={ "done" }
              ref={(input) => this._description = input}
            />
          </NB.Item>
        </NB.View>

        {this.state.isLoading ? <Loading /> : null}

        <Dialog
          dialogStyle={{
            borderRadius: 7,
            width: 300,
            marginLeft: '3%',
          }}
          titleStyle={{
            textAlign: 'center',
          }}
          visible={this.state.imagePickOptionDialog}
          title="Choose Photo"
          onTouchOutside={() =>
            this.setState({imagePickOptionDialog: false})
          }>
          <NB.View style={{height: 180}}>
            <NB.View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NB.Button
                onPress={this.onPressOpenCamera}
                iconLeft
                style={{
                  width: 225,
                  backgroundColor: '#d0d0d0',
                  paddingLeft: 25,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <NB.Icon
                  name="camera"
                  style={{fontSize: width * 0.07, color: '#000'}}
                />
                <NB.Text
                  style={{
                    fontSize: width * 0.035,
                    color: '#000',
                    textTransform: 'capitalize',
                  }}>
                  Capture Photo
                </NB.Text>
              </NB.Button>

              <NB.Button
                onPress={this.onPressFromGallery}
                iconLeft
                style={{
                  width: 225,
                  backgroundColor: '#d0d0d0',
                  marginTop: 20,
                  paddingLeft: 25,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <NB.Icon
                  name="image"
                  style={{fontSize: width * 0.07, color: '#000'}}
                />
                <NB.Text
                  style={{
                    fontSize: width * 0.035,
                    color: '#000',
                    textTransform: 'capitalize',
                  }}>
                  {' '}
                  Browse Gallery
                </NB.Text>
              </NB.Button>

              <NB.Button
                onPress={()=>{
                  this.fileScanning();
                  }}
                iconLeft
                style={{
                  width: 225,
                  backgroundColor: '#d0d0d0',
                  marginTop: 20,
                  paddingLeft: 25,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <NB.Icon
                  name="image"
                  style={{fontSize: width * 0.07, color: '#000'}}
                /> */}
                <Image
                source={require('../images/scan_icon.png')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center', height:30,width:30 }}
              />
                <NB.Text
                  style={{
                    fontSize: width * 0.035,
                    color: '#000',
                    textTransform: 'capitalize',
                  }}>
                  {' '}
                  File Scan
                </NB.Text>
              </NB.Button>

            </NB.View>
          </NB.View>
        </Dialog>

        {/* </NB.View> */}
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileImgContainer: {
    height: 210,
    width: 210,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
  },
  profileImg: {
    height: 210,
    width: 210,
    borderRadius: 150,
  },
});
const pickerDateStyle = {
  inputIOS: {
    color: '#5a5a5a',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
  placeholder: {
    color: '#bfbfbf',
  },
  inputAndroid: {
    color: '#5a5a5a',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
};