/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  I18nManager,
  TouchableOpacity,  
  FlatList, 
  AsyncStorage, 
  Platform,
  Alert
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Navbar from '../../component/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'
import { Dialog } from 'react-native-simple-dialogs';
import Autocomplete from 'react-native-autocomplete-input';
import RNPickerSelect from 'react-native-picker-select';


import AppConstant from '../../component/AppConstant'
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import EmptyMessage from '../../component/EmptyMessage';
var jwt_token = ''

import {
  ImageLoader
} from 'react-native-image-fallback';

const fallbacks = [
  require('../images/preloader_prescription.jpg'), // A locally require'd image
];

import DateTimePicker from '@react-native-community/datetimepicker';

import CommonValues from '../../component/CommonValues'
import NotificationService from '../../NotificationService';
import appConfig from '../../../app.json';


// var days_list = ""
var day = []
// var year = []

var hours_list = []
var minutes_list = []
var am_pm_list = []


export default class AddMedicineScreen extends Component {

  state = {
    checked: 'first',
  };

  constructor(props){
    super(props)

    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      medicine_name: false,
      medicine_reminder: false,
      start_from: '',
      medicine_id: this.props.medicine_id,
      action_type: this.props.action_type,
      prescription_id: this.props.prescription_id,
      patient_id: this.props.patient_id,
      before_meal: '',
      dose_times: '',
      days: '',
      morning_dose: '0',
      afternoon_dose: '0',
      night_dose: '0',

      sat_day: '',
      sun_day: '',
      mon_day: '',
      tue_day: '',
      wed_day: '',
      thu_day: '',
      fri_day: '',

      day: '',
      month: '',
      year: '',

      dataMedicine: [],
      medicine_name: '',
      item_click: false,
      offset: '0',
      isLoading: false,
      id: '',
      dialoge_search_date_type: false,
      date: new Date(Date.now()),
      mode: 'date',
      show: false,
      start_date:'Start Date',
      start_time:'Start Time',
      date_dialog:false,
      time_dialog:false,
      note:'',
      item_selected:{},
      reminder_status:'0',
      medicine_details:'',
      senderId: appConfig.senderID,
      reminder_settings_visible: false,
      reminder_start_time:'',
      reminder_start_date:'',
      
      am_pm : 'am',
      hours:'',
      minutes:'',
      time_picker_visible: false,
      load_more_height: 10
    };

    this.notif = new NotificationService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
    // console.log('--------this.state.medicine_name: ' + this.state.medicine_name)

  }

    onRegister(token) {
      console.log('------------onRegister', token, );
      // Alert.alert('Registered !', JSON.stringify(token));
      console.log(token);
      this.setState({
        registerToken: token.token,
        fcmRegistered: true
      });
    }

    onNotif(notif) {
      console.log('-------------notif', notif, );
      // console.log(notif);
      Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
      console.log('-------------handlePerm', perms, );
      Alert.alert('Permissions', JSON.stringify(perms));
    }


  componentDidMount(){
      if (this.props.prescription_id!=null){
        console.log("####################: " +
          'prescription_id:', this.props.prescription_id,
          'patient_id: ', this.props.patient_id)
        this.setState({
          prescription_id: this.props.prescription_id
        })
      }
      
      if (this.props.medicine_id != null) {
        console.log("####################: 3 " +
          'medicine_id:', this.props.medicine_id,
          )

        this.setState({
          medicine_id: this.props.medicine_id
        })
      }

      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################jwt_token: " + values)
        jwt_token = values

        if (this.props.action_type ==='edit'){
          this.getApiResponse('getMedicineInfo')
        }

      })
      this.getDays()
      // this.getYears()
      am_pm_list = CommonValues.getAmPm()
      hours_list = []
      minutes_list = []
      // var am_pm_list = []

      this.getHours();
      this.getMinutes();

      console.log('--------POPS medicine_id: ' + this.props.medicine_id, this.props.action_type)
  }

      getHours() {
        for (let i = 1; i <= 12; i++) {
          var value = ''
          if (i < 10) {
            value = '0' + i;
          } else {
            value = '' + i;
          }

          if(i===1){
            var day_obj1 = {
              label: "Hour",
              value: "",
              key: 'Hour',
              color: 'black'
            }
            hours_list.push(day_obj1)
            this.setState({hours: ''})
          }
          var day_obj = {
            label: "" + value,
            value: "" + value,
            key: ''+value,
            color: 'black'
          }
          hours_list.push(day_obj)
        }
        console.log('*******hours_list :' + hours_list.length)
      }

      getMinutes() {
        for (let i = 0; i < 60; i++) {
          var value = ''
          if (i < 10) {
            value = '0' + i;
          } else {
            value = '' + i;
          }

          if(i===0){
            var minutes_obj1 = {
              label: "Minute",
              value: "",
              key: 'Minute',
              color: 'black'
            }
            minutes_list.push(minutes_obj1)
            this.setState({minutes: ''})
          }

          var minutes_obj = {
            label: "" + value,
            value: "" + value,
            key: '' + value,
            color: 'black'
          }
          minutes_list.push(minutes_obj)
        }
        console.log('*******minutes_list :' + minutes_list.length)
      }



    getDays() {
      for (let i = 1; i < 365; i++) {
        var value = ''
        if (i < 10) {
          value = '0' + i;
        } else {
          value = '' + i;
        }
        var day_obj = {
          label: "" + value,
          value: "" + value,
          key: '' + value,
          color: 'black'
        }
        day.push(day_obj)
      }
      console.log('*******day :' + day.length)
    }

    getYears() {
      for (let i = 1960; i < 2040; i++) {
        var year_obj = {
          label: "" + i,
          value: "" + i,
          key: '' + i,
          color: 'black'
        }
        year.push(year_obj)
      }
      console.log('*******day :' + day.length)
    }



    // ----------------------------Date Time Start --------------------------
    setDate = (event, date) => {
    date = date || this.state.date;

    console.log("Date:" + date );

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });

    // 0    1   2   3   4
    // Mon Jun 01 2020 17: 22: 35 GMT + 0600(+06)
    // Sat Aug 01 2020 11: 22: 38 GMT + 0600(+06)

    var dateArray = date.toString().split(' ');
    var month =this.monthToNumber( dateArray[1])
    
    console.log("### Date: "+dateArray[3] +" "+month+" " +dateArray[2] )
    // start_date: '2020/1/28',
    // end_date:'2020/2/4',
    // start_from: 2020 - 03 - 25

    // "05/11/2020 16:00"   --- NOtification

    if(this.state.date_dialog == true){
      this.setState({
        start_date: dateArray[3] +"-"+month+"-"+dateArray[2],
        reminder_start_date: month + '/' + dateArray[2] + '/' + dateArray[3]
      })


    }else if(this.state.time_dialog == true){
          var SELECTED_TIME = dateArray[4]
          var timeArray = SELECTED_TIME.toString().split(':');
          var ACTUAL_TIME = timeArray[0]

          // (+06)
          var GMT_TIME = dateArray[dateArray.length - 1]
          var GMT_HOURS_FULL = this.getGMTTime(GMT_TIME)

          // -/+
          var GMT_PLUS_MINUS = GMT_HOURS_FULL.charAt(0);
          // 06
          var GMT_HOURS = GMT_HOURS_FULL.replace(GMT_PLUS_MINUS, "");

          var CURRENT_HOURS = Platform.OS === 'ios' ? (Number(ACTUAL_TIME) - Number(GMT_HOURS)) : (Number(ACTUAL_TIME))
          var CURRENT_MINUTES = timeArray[1]
          this.setState({
            reminder_start_time: CURRENT_HOURS + ':' + CURRENT_MINUTES,
          })

          console.log('---------------: ' + CURRENT_HOURS)

          var am_pm= 'AM'
          if (CURRENT_HOURS >11){
            if (CURRENT_HOURS>12){
                CURRENT_HOURS = CURRENT_HOURS - 12;
            }
            var am_pm = 'PM'
          }
          if (CURRENT_HOURS<1){
            var am_pm = 'AM'
            CURRENT_HOURS = CURRENT_HOURS = CURRENT_HOURS + 12;
          }

          var final_time = CURRENT_HOURS + ':' + CURRENT_MINUTES + ':' + am_pm

          // var length = dateArray.length
          console.log('GMT: ', GMT_TIME +
            " time : " + GMT_HOURS_FULL +
            " GMT_PLUS_MINUS: " + GMT_PLUS_MINUS +
            " GMT_HOURS: " + GMT_HOURS +
            ' Time: ' + dateArray[4] +
            ' actual_time: ' + timeArray[0] +
            ' CURRENT_HOURS : CURRENT_MINUTES-> ' + CURRENT_HOURS +
            ' : ' + CURRENT_MINUTES
          )
          // (Number(ACTUAL_TIME) - Number(GMT_HOURS))
          const count = parseInt('1234', 10) //1234
          console.log(' -> ' + count, (Number(ACTUAL_TIME) - Number(GMT_HOURS))
          +' Final: ' + final_time)


      this.setState({
        start_time: final_time,
      })
    }


    // start_time: 10: 30: AM
    

    // start_date: '2020/1/28',
    // end_date:'2020/2/4',

    
  };

  show = mode => {
    if (this.state.show){
      this.setState({
        show: false,
      });
    }else{
      this.setState({
        show: true,
        mode,
      });
    }
    
  };

  datepicker = () => {
    console.log('--datepicker---')
    this.setState({date_dialog:true, time_dialog:false})
    this.show('date');
  };

  timepicker = () => {
    console.log('--timepicker---')
    this.setState({date_dialog:false, time_dialog:true})
    this.show('time');
  };

  monthToNumber(month){
    // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
    month = month.replace("Jan", "01");
    month = month.replace("Feb", "02");
    month = month.replace("Mar", "03");
    month = month.replace("Apr", "04");
    month = month.replace("May", "05");
    month = month.replace("Jun", "06");
    month = month.replace("Jul", "07");
    month = month.replace("Aug", "08");
    month = month.replace("Sep", "09");
    month = month.replace("Oct", "10");
    month = month.replace("Nov", "11");
    month = month.replace("Dec", "12");    
    return month;
  }

  getGMTTime(time) {
    // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
    time = time.replace("(", "");
    time = time.replace(")", "");
    return time;
  }



  numberConvertName(month){
    // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
    month = month.replace("1", "Jan");
    month = month.replace("2", "Feb");
    month = month.replace("3", "Mar");
    month = month.replace("4", "Apr");
    month = month.replace("5", "Jun");
    month = month.replace("6", "Jul");
    month = month.replace("7", "Aug");
    month = month.replace("8", "Sep");
    month = month.replace("9", "Oct");
    month = month.replace("10", "Nov");
    month = month.replace("11", "Nov");
    month = month.replace("12", "Dec");   
    return month;
  }

  formateDate(date){
      var dateArray = date.split('/');
      var year = dateArray[0];
      var month = this.numberConvertName(""+dateArray[1]);
      var day =  dateArray[2];

      console.log(dateArray[1]+ ' '+ month)
      return day+' '+ month +' '+year;
    }

// =========================================================
    getApiResponse(action_type) {
      this.setState({
        isLoading: true
      })

      console.log("----------First Entry--------" + this.state.start_date , this.state.start_time);

      var Authorization = 'Bearer ' + jwt_token

      var URL = ''
      var formData = new FormData()
      formData.append('api_key', this.state.api_key);
      let device_uuid = DeviceInfo.getUniqueId();
      formData.append('device_type', this.state.device_type);
      formData.append('device_uuid', device_uuid);
      

      if(action_type==='search'){
        formData.append('search', this.state.medicine_name);
        URL = AppConstant.BASE_URL + "prescription/searchMedicineList";
        formData.append('offset', this.state.offset);
      } else if (action_type === 'add' || action_type === 'edit') {
        URL = AppConstant.BASE_URL + "prescription/addMedicine";
        formData.append('action_type', this.state.action_type);
        
        if (action_type === 'edit') {
          formData.append('medicine_id', this.state.medicine_id);
        } 
        if (this.props.prescription_id != null) {
          formData.append('prescription_id', this.state.prescription_id);
        }

        console.log(" type:" + this.state.action_type, this.props.prescription_id);

        // prescription_id: c4deb741 - 621e-495 f - adbf - 6 fd42bdc3b6f
        // medicine_id:
        //   medicine_name: NOP
        // reminder_status: 1
        // dose_category: regular
        // start_from: 2020 - 03 - 25
        // start_time: 10: 30: AM
        // action_type: add
        // api_key: 
        // device_uuid: uuid - 123451
        // reminder_status: 0
        // medicine_end_days: 15
        // medicine_note: this is medicine note

        // dose_form: tablet
        // dose_take_times: 1
        // dose_repeat_times: 1
        // dose_quantity: 3
        // dose_unit: mg


        console.log(' -------@@@@@@@------medicine_name:', this.state.medicine_name,
        ' start_date:', this.state.start_date,
        ' start_time: ', this.state.start_time,
        ' reminder_status: ', this.state.reminder_status,
        ' day: ', this.state.day,
        ' note: ', this.state.note,
        )

        formData.append('medicine_name', this.state.medicine_name);
        formData.append('start_from', this.state.start_date);
        formData.append('start_time', this.state.start_time);
        formData.append('reminder_status', this.state.reminder_status);
        formData.append('medicine_end_days', this.state.day);
        formData.append('medicine_note', this.state.note);

        console.log('--------------------:::::', AppConstant.custom_note,
          ' dose_form: ', AppConstant.dose_form,
          ' dose_take_times: ', AppConstant.dose_take_times,
          ' dose_repeat_times: ', AppConstant.dose_repeat_times,
          ' dose_quantity:', AppConstant.dose_quantity,
          ' dose_unit: ', AppConstant.dose_unit,
          ' prescription_id: ', this.state.prescription_id,
          ' action_type: ', this.state.action_type
        )

        if(AppConstant.custom_note ==='' ){
          console.log('---------Inside-----------:::::' + AppConstant.custom_note)
          formData.append('dose_form', AppConstant.dose_form);
          formData.append('dose_take_times', AppConstant.dose_take_times);
          formData.append('dose_repeat_times', AppConstant.dose_repeat_times);
          formData.append('dose_quantity', AppConstant.dose_quantity);
          formData.append('dose_unit', AppConstant.dose_unit);
          formData.append('dose_category', 'regular');
        } else if (AppConstant.custom_note != ''){
          console.log('---------Outside-----------:::::' + AppConstant.custom_note)
          formData.append('dose_category', 'custom');
          formData.append('custom_dose', AppConstant.custom_note);
        }

        // if (this.props.prescription_id != null) {
        //   formData.append('prescription_id', this.props.prescription_id);
        // }
        
      } else if (action_type === 'getMedicineInfo') {
        URL = AppConstant.BASE_URL + "prescription/getMedicineInfo";
        formData.append('medicine_id', this.state.medicine_id);
      }

      // // Log the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ' - ' + pair[1]);
      // }




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

              if (action_type === 'search') {
              if (responseJson.response.type === "success") {

                this.setState({
                  isLoading: false,
                  load_more_height: responseJson.response.data.length % 10 === 0 ? 140 : 10,
                  dataMedicine: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataMedicine, ...responseJson.response.data],
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                });

                this.setState({
                  isLoading: false,
                });

                console.log(" GetParam device_uuid:" + this.state.dataMedicine.length);

              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                  dataMedicine: this.state.offset === 0 ? [] : this.state.dataMedicine,
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                  item_click: true,
                  item_selected: {}
                });
                console.log(" GetParam device_uuid:" + this.state.dataMedicine.length);
              }
            } else if (action_type === 'add' || action_type === 'edit') {
                if (responseJson.response.type === "success") {
                  // if(action_type === 'add'){
                  //   this.setState({
                  //     isLoading: false,
                  //     note: '',
                  //     item_selected: {},
                  //     reminder_status: '0',
                  //     medicine_details: '',
                  //     reminder_settings_visible: false,
                  //     reminder_start_time: '',
                  //     reminder_start_date: '',
                  //     am_pm: 'am',
                  //     hours: '',
                  //     minutes: '',
                  //   });

                  // }

                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);

                  if (this.state.reminder_status === '1' && Platform.OS != 'ios') { // && Platform.OS != 'ios'
                      this.setReminderInformation();
                  }

                  this.timeoutHandle = setTimeout(() => {
                    
                    if (action_type === 'add'){
                      Actions.pop()
                      Actions.pop()
                      Actions.PrescriptionDetailsScreen({
                        prescription_id: this.state.prescription_id
                      })
                    } else if (action_type === 'edit'){
                      Actions.pop()
                      Actions.pop()
                      Actions.MedicineListScreen({ patient_id : this.state.patient_id})
                    }

                  }, 1000);
                  
                } else if (responseJson.response.type === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);
                }
            } else if (action_type === 'getMedicineInfo') {
              if (responseJson.response.type === "success") {
                var res = responseJson.response.data;

                AppConstant.dose_form = res.dosage_form;
                AppConstant.dose_take_times = res.take_times;
                AppConstant.dose_repeat_times = res.repeat_times;
                AppConstant.dose_quantity = res.quantity;
                AppConstant.dose_unit = res.unit;
                AppConstant.custom_note = res.custom_dose;

                var details = AppConstant.dose_quantity + ' ' + AppConstant.dose_form + ' X ' + AppConstant.dose_take_times + ' ' + AppConstant.dose_repeat_times

                console.log(
                  AppConstant.dose_form,
                  AppConstant.dose_take_times,
                  AppConstant.dose_repeat_times,
                  AppConstant.dose_quantity,
                  AppConstant.dose_unit,
                  AppConstant.custom_note,
                  details)

                // {
                //   "id": "3cad23bb-7abb-4aab-823a-ed432b859841",
                //   "prescription_id": "e013e3bf-7892-456d-bf2a-fa96a6f72758",
                //   "medicine_id": "2147483648",
                //   "dosage_form": "tablet",
                //   "unit": "mg",
                //   "patient_id": "f019b0c2-799b-4216-81f7-a40fac1a93f8",
                //   "does_category": "regular",
                //   "start_from": "2020-03-25",
                //   "start_time": "10:30:00",
                //   "medicine_end_days": "15",
                //   "take_times": "1",
                //   "repeat_times": "1",
                //   "quantity": "3",
                //   "custom_dose": "",
                //   "medicine_note": "this is medicine note",
                //   "doctor_name": "MD.Saidul Haque",
                //   "medicine_name": "NOP",
                //   "medicine_photo": "https://mediarchive.technobd.com/assets/media/medicine_photo/no-image.jpg",
                //   "remindar_staus": 0
                // }

                this.setState({
                  isLoading: false,
                  medicine_name: res.medicine_name,
                  start_date: res.start_from,
                  start_time: res.start_time,
                  reminder_status: res.remindar_staus,
                  prescription_id: res.prescription_id,
                  day: res.medicine_end_days,
                  note: res.medicine_note,
                  medicine_details: details,
                  item_click: true
                });
                console.log('prescription_id :!!!!!!!', this.state.prescription_id, ' ???? ', res.prescription_id)
              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
                console.error(error);
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

          // componentDidMount() {
          //   AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
          //     console.log("####################user_id: " + values)
          //     jwt_token = values

          //     if (values != null && values != '') {
          //       this.setState({
          //         dataMedicine: []
          //       })
          //     }
          //     this.getApiResponse()
          //   })
          // }



// ==========================================================


addMedicineInformation(){
  var details = AppConstant.dose_quantity + ' ' + AppConstant.dose_form + ' X ' + AppConstant.dose_take_times + ' ' + AppConstant.dose_repeat_times

  console.log(
      AppConstant.dose_form ,
      AppConstant.dose_take_times ,
      AppConstant.dose_repeat_times ,
      AppConstant.dose_quantity ,
      AppConstant.dose_unit ,
      AppConstant.custom_note,
      details )

    //   medicine_name: NOP
    // reminder_status: 1
    // dose_category: regular
    // start_from: 2020 - 03 - 25
    // start_time: 10: 30: AM
    // action_type: add
    // api_key: 
    // device_uuid: uuid - 123451
    // reminder_status: 0
    // medicine_end_days: 15
    // medicine_note: this is medicine note

  if (AppConstant.dose_form === '' && AppConstant.custom_note===''){
    alert('Dose setting required.')
  }else if (this.state.medicine_name === ''){
    alert('Medicine name field is empty.')
  } else if (this.state.note === '') {
    alert('Medicine note field is empty.')
  } else if (this.state.start_date === '') {
    alert('Start date not selected')
  } else if (this.state.start_time === '') {
    alert('Start time not selected')
  } else if (this.state.day === '') {
    alert('Days not selected.')
  } else {
    this.getApiResponse(this.state.action_type)
  }

}






  // renderItem = ({ item }) => (
  //   <TouchableOpacity >
  //     <ListItem
  //       style={HeaderStyle.CardItemBorder}
  //       key={item.id}
  //       button={true}
  //       onPress={() => this.itemClicked(item)} >
  //           <NB.Left style={HeaderStyle.leftImages}>                  
  //             <ImageLoader 
  //             source={ item.news_image_url }
  //             fallback={ fallbacks }
  //             style={{height: 80, width: 80,}}/>
  //             <NB.Body>
  //             <NB.Text numberOfLines={2} style={{height:51,}} >{item.news_title} </NB.Text>                    
  //             <NB.Text numberOfLines={1} style={HeaderStyle.newsDatetime}>{item.source_newspaper_name} - {item.date_time} </NB.Text>
  //           </NB.Body>    
  //           </NB.Left>         
  //     </ListItem>
  //       {/* <Image source={require('./images/devider.png')}  style={{height:1,width:'100%',}}  /> */}

  //   </TouchableOpacity>   
  // )

    updateValue(text, field) {
      if (field === 'note') {
        this.setState({
          note: text,
        })
      }else if(field ==='medicine'){

        console.log("------- : " + this.state.item_click +" ??? "+text)
        if (this.state.item_click) {
          this.setState({
            item_click: false
          });
        } else {
          this.setState({
            medicine_name: text,
            item_click: false,
          });

          AppConstant.custom_note = ''
          AppConstant.dose_form = ''
          AppConstant.dose_take_times = ''
          AppConstant.dose_repeat_times = ''
          AppConstant.dose_quantity = ''
          AppConstant.dose_unit = ''

          this.timeoutHandle = setTimeout(() => {
            this.setState({
              isLoading: false,
              offset: 0,
              dataMedicine: [],
              medicine_details: '',
            });

            this.getApiResponse('search');
          }, 200);
        }
      }

    }


  setReminderInformation(){
    var details = AppConstant.dose_quantity + ' ' + AppConstant.dose_form + ' X ' + AppConstant.dose_take_times_text + ' ' + AppConstant.dose_repeat_times_text

        console.log(
          AppConstant.dose_form,
          AppConstant.dose_take_times,
          AppConstant.dose_repeat_times,
          AppConstant.dose_quantity,
          AppConstant.dose_unit,
          AppConstant.custom_note,
          details
        )

        var start_date_time = this.state.reminder_start_date + ' ' + this.state.reminder_start_time;
        console.log(" ******* reminderSet: " + start_date_time, ' ? ', this.state.reminder_start_date + ' ' + this.state.reminder_start_time)

        var date_r = new Date(start_date_time); // some mock date
        var milliseconds_reminder = date_r.getTime();

        console.log(' milliseconds: ' + milliseconds_reminder);

        // ????????
        // console.log(" ******* reminderSet: " + start_date_time)
        
        //mm/dd/yy
        // var date = new Date("05/11/2020 16:00"); // some mock date
        // var milliseconds = date.getTime();
        // console.log(" reminderSet: " + milliseconds);

        var interval = 0;
        var interval_time = 0;
        var reminder_list = []

        var dose_time = AppConstant.dose_take_times
        var dose_repeat = AppConstant.dose_repeat_times


        console.log(" ******* Checking: " + (dose_repeat === 1) + " ??? " + (dose_repeat === 3))

        if (dose_repeat === 1) { // 'Daily'
          //24 hours
          interval = 1000 * 60 * 60 * 24  

          var gap_time = 0
          if (dose_time === 1){
            gap_time = 24;
          } else if (dose_time === 2 ) {
            gap_time = 12;
          } else if (dose_time === 3) {
            gap_time = 6;
          } else if (dose_time === 4) {
            gap_time = 4;
          }
          console.log("------&&&&&----Time_List", gap_time)

          var days = Number(this.state.day)

          for (let d = 0; d < days; d++){
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days: ", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----today_time", today_time)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;

              console.log("New------&&&&&----today_time", today_time)
            }

            milliseconds_reminder = milliseconds_reminder + interval
          }
          
          

        } else if (dose_repeat === 2) { //'Weekly'
          //7 Days
          interval = 1000 * 60 * 60 * 24 * 7

          var gap_time = 0
          if (dose_time === 1) {
            gap_time = 168;
          } else if (dose_time === 2) {
            gap_time = 84;
          } else if (dose_time === 3) {
            gap_time = 56;
          } else if (dose_time === 4) {
            gap_time = 42;
          }
          console.log("------&&&&&----Time_List", gap_time)

          var days = (Number(this.state.day) / 7).toFixed();
          console.log("------&&&&&----days", days)

          for (let d = 0; d < days; d++) {
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----Notificatio i: ", i)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;
            }
            milliseconds_reminder = milliseconds_reminder + interval
          }

          
        } else if (dose_repeat === 3 ) { //'Monthly'
          //30 Days
          interval = 1000 * 60 * 60 * 24 * 30

          var gap_time = 0
          if (dose_time === 1) {
            gap_time = 720;
          } else if (dose_time === 2) {
            gap_time = 360;
          } else if (dose_time === 3) {
            gap_time = 240;
          } else if (dose_time === 4) {
            gap_time = 180;
          }

          console.log("------&&&&&----Time_List", gap_time)

          var days = (Number(this.state.day) / 30).toFixed();
          console.log("------&&&&&----days", days)

          for (let d = 0; d < days; d++) {
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----Notificatio i: ", i)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;
            }
            milliseconds_reminder = milliseconds_reminder + interval
          }
        } else if (dose_repeat === 4) { //'Half Monthly'
          //15 Days
          interval = 1000 * 60 * 60 * 24 * 15

          var gap_time = 0
          if (dose_time === 1) {
            gap_time = 360;
          } else if (dose_time === 2) {
            gap_time = 180;
          } else if (dose_time === 3) {
            gap_time = 120;
          } else if (dose_time === 4) {
            gap_time = 90;
          }

          console.log("------&&&&&----Time_List", gap_time)

          var days = (Number(this.state.day) / 15).toFixed();
          console.log("------&&&&&----days", days)

          for (let d = 0; d < days; d++) {
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----Notificatio i: ", i)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;
            }
            milliseconds_reminder = milliseconds_reminder + interval
          }

        } else if (dose_repeat === 5) { //'Yearly'
          //365 Days
          interval = 1000 * 60 * 60 * 24 * 365

          var gap_time = 0
          if (dose_time === 1) {
            gap_time = 8760;
          } else if (dose_time === 2) {
            gap_time = 4380;
          } else if (dose_time === 3) {
            gap_time = 2920;
          } else if (dose_time === 4) {
            gap_time = 2190;
          }

          console.log("------&&&&&----Time_List", gap_time)

          var days = (Number(this.state.day) / 365).toFixed();
          console.log("------&&&&&----days", days)

          for (let d = 0; d < days; d++) {
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----Notificatio i: ", i)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;
            }
            milliseconds_reminder = milliseconds_reminder + interval
          }

        } else if (dose_repeat === 6) { //'Half Yearly'
          //365 Days
          interval = 1000 * 60 * 60 * 24 * 182

          var gap_time = 0
          if (dose_time === 1) {
            gap_time = 4368;
          } else if (dose_time === 2) {
            gap_time = 2184;
          } else if (dose_time === 3) {
            gap_time = 1456;
          } else if (dose_time === 4) {
            gap_time = 1092;
          }

          console.log("------&&&&&----Time_List", gap_time)

          var days = (Number(this.state.day) / 182).toFixed();
          console.log("------&&&&&----days", days)

          for (let d = 0; d < days; d++) {
            var today_time = milliseconds_reminder;
            console.log("------&&&&&----days", d)
            for (let i = 0; i < dose_time; i++) {
              console.log("------&&&&&----Notificatio i: ", i)
              this.notif.scheduleNotif(today_time, this.state.medicine_name, details);
              today_time = today_time + 1000 * 60 * 60 * gap_time;
            }
            milliseconds_reminder = milliseconds_reminder + interval
          }

        }


        this.setState({
          reminder_settings_visible: true
        })

  }


  reminderSet(){
    console.log('reminderSet: ' + AppConstant.custom_note )
    if (AppConstant.custom_note!=''){
      alert('Custom Dose can not set reminder');
    } else if (AppConstant.custom_note === '' && AppConstant.dose_form===''){
      alert('Dose settings required to set reminder.');
    }else{
      // Medicine Notification add
      // this.notif.localNotif();

      this.setState({
        reminder_status: this.state.reminder_status === '0' ? '1' : '0'
      })

      
      this.timeoutHandle = setTimeout(() => {
        if (this.state.reminder_status === '0') {
          alert("Reminder disabled.");
        } else {
          alert("Reminder enabled.");
        }
      }, 300);
      
    }
  }

  numberToMonthConvert(month) {
    // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
    month = month.replace("01", "Jan");
    month = month.replace("02", "Feb");
    month = month.replace("03", "Mar");
    month = month.replace("04", "Apr");
    month = month.replace("05", "May");
    month = month.replace("06", "Jun");
    month = month.replace("07", "Jul");
    month = month.replace("08", "Aug");
    month = month.replace("09", "Sep");
    month = month.replace("10", "Oct");
    month = month.replace("11", "Nov");
    month = month.replace("12", "Dec");
    return month;
  }

  getDate(date){
    console.log('@@@@@@  : ' , date)
    if (date != '' && date != 'Start Date') {
      // "2020-05-12
      var dateArray = date.toString().split('-');
      var day = dateArray[2]
      var month = dateArray[1]
      var year = dateArray[0]

      return date = day + " " + this.numberToMonthConvert(month) + " " + year;
    } else {
      return date;
    }
    // return date;

  }

  renderItem = ({ item, index }) => (
      <TouchableOpacity
    onPress={() =>
      this.setState({
        medicine_name: item.drugs_name,
        id: item.id,
        dataMedicine: [],
        item_click: true,
        item_selected: item
      })
    }>
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: 0.3,
      }}>
      

      <Text style={styles.itemText}>{item.drugs_name} - {item.contains}</Text>
    </View>
    
    {this.state.dataMedicine.length === index + 1 ? (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            offset: this.state.dataMedicine.length,
            item_click: false,
          });
          this.timeoutHandle = setTimeout(() => {
            // if(!this.state.isLoading ){
            console.log(
              this.state.dataMedicine.length,
              this.state.offset,
              
            );
            this.getApiResponse('search');
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
        {this.state.isLoading ? <Loading /> : null}
      </TouchableOpacity>
    ) : null}
  </TouchableOpacity>
  )

  render(){

      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} > 
          
          </Right>

          this.props.navigation.addListener(
            'didFocus',
            payload => {
              //  AppConstant.dose_take_times_text = data_dose_repeat_times[i].label,
              //    AppConstant.dose_repeat_times_text = data_dose_repeat_times[i].label,
              var details = AppConstant.dose_quantity + ' ' + AppConstant.dose_form + ' X ' + AppConstant.dose_take_times_text + ' ' + AppConstant.dose_repeat_times_text

              

              if (AppConstant.custom_note ===''){
                if (AppConstant.dose_form != '') {
                  this.setState({
                    medicine_details: details
                  })
                }
              }else{
                this.setState({
                  medicine_details: '',
                })
              }

              console.log("Payload is called .....................details: " + details)
            }
          );

  return (
    <SafeAreaView style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title="Add Medicine" />
      <ScrollView style={styles.mainContainer}>
        <NB.View style={styles.container}>
        {/* Start-Search-view */}
        <NB.Item
          style={{ }}>
          <NB.Input
            placeholder = "Enter Medicine Name"
            value={this.state.medicine_name}
            onChangeText={text => this.updateValue(text, 'medicine')}
            style={{flex: 1, fontSize: 18, color: '#85858' }}
          />
        </NB.Item>

          <FlatList
            style = {
              {
                height: this.state.dataMedicine.length > 0 ? (this.state.dataMedicine.length * 50) + this.state.load_more_height : 0
              }
            }
            contentContainerStyle={{flexGrow: 1}}
            data={this.state.dataMedicine}
            renderItem={this.renderItem}
            keyExtractor={({id}, index) => id}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />

        {/* End-Search-View */}
{/* 
          <Autocomplete
            style={{
              width: '80%',
              height: 40,
              padding: 5,
              backgroundColor: 'white',
            }}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={{}}
            data={this.state.dataMedicine}
            defaultValue={this.state.medicine_name}
            onChangeText={text => this.updateValue(text, 'medicine')}
            placeholder="Enter Medicine Name"
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    medicine_name: item.drugs_name,
                    id: item.id,
                    dataMedicine: [],
                    item_click: true,
                    item_selected: item
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomColor: '#cbcbcb',
                    borderBottomWidth: 0.3,
                  }}>
                  

                  <Text style={styles.itemText}>{item.drugs_name} - {item.contains}</Text>
                </View>

                {this.state.dataMedicine.length === index + 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        offset: this.state.dataMedicine.length,
                        item_click: false,
                      });
                      this.timeoutHandle = setTimeout(() => {
                        // if(!this.state.isLoading ){
                        console.log(
                          this.state.dataMedicine.length,
                          this.state.offset,
                          
                        );
                        this.getApiResponse('search');
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
                    {this.state.isLoading ? <Loading /> : null}
                  </TouchableOpacity>
                ) : null}
              </TouchableOpacity>
            )}
          /> */}

          {this.state.item_click === true ? (
            <NB.View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NB.Item style={{flex: 1}}>
                <NB.Input
                  style={{color: '#8e9093', fontSize: 16, marginLeft: 5}}
                  placeholder=""
                  style={{ color: '#8e9093' }}
                  placeholderTextColor={'#bfbfbf'}
                  editable={false}
                  value= {this.state.medicine_details}
                  selectTextOnFocus={false}
                  onChangeText={text => this.updateValue(text, 'medicine')}
                />
              </NB.Item>

              <TouchableOpacity
                onPress={() => {

                  console.log('prescription_id :!!!!!!!', this.state.prescription_id)

                  if (this.state.item_selected.hasOwnProperty('drugs_name')) {
                    var dose_unit = this.state.item_selected.unit
                    var dose_form = this.state.item_selected.dosage_form

                    

                    Actions.AddDoseScreen({
                      medicine_name: this.state.item_selected.drugs_name,
                      dose_unit: dose_unit,
                      dose_form: dose_form,

                      });
                    console.log('AddDoseScreen: 1 ' + dose_unit, dose_form);
                  }else{
                    var dose_unit =''
                    var dose_form=''
                    var medicine_name=''

                    if (this.state.action_type === 'edit') {
                      dose_unit = AppConstant.dose_unit
                      dose_form = AppConstant.dose_form 
                    }
                    Actions.AddDoseScreen({
                      medicine_name: '',
                      dose_unit: dose_unit,
                      dose_form: dose_form,
                    });
                    console.log('AddDoseScreen: 2 ' + this.state.item_selected.drugs_name);
                  }
                  
                  
                }}
                style={{
                  backgroundColor: Color.color_theme,
                  height: 35,
                  width: 45,
                  paddingLeft:5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,

                }}>
                <Icon
                  name="edit"
                  style={{
                    fontSize: 20,
                    color: 'white',
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  }}
                />
              </TouchableOpacity>
            </NB.View>
          ) : null}

          <NB.Item>
            <NB.Input
              style={styles.noteText}
              placeholder="Note"
              value= {this.state.note}
              placeholderTextColor={'#bfbfbf'}
              underlineColorAndroid="transparent"
              multiline={true}
              onChangeText={text => this.updateValue(text, 'note')}
            />
          </NB.Item>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 50,
              marginBottom: 20,
              justifyContent: 'space-between',
            }}>
            <NB.View
              
              style={{
                borderBottomColor: '#8e9093',
                borderBottomWidth: 1,
                flex: 1,
                marginRight: 10,
              }}>
              <NB.Text
                onPress={ ()=>{this.datepicker()}}
                style={{
                  width: '100%',
                  padding: 7,
                }}>
                {this.getDate(this.state.start_date)}
              </NB.Text>
              <NB.View style={{position: 'absolute', top: -10, right: 0}}>
                <Button Button onPress = {
                  () => this.datepicker()
                }
                transparent >
                  <Icon
                    name="caret-down"
                    style={{
                      marginRight: Platform.OS === 'ios' ? 10 : 10,
                      fontSize: 20,
                      color: Color.readmore,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                </Button>
              </NB.View>
            </NB.View>
            <NB.View
              style={{
                borderBottomColor: '#8e9093',
                borderBottomWidth: 1,
                flex: 1,
                marginLeft: 10,
              }}>
              <NB.Text 
              onPress={ ()=>{
                if (Platform.OS === 'ios' ){
                  this.setState({
                    time_picker_visible:true
                  })
                }else{
                  this.timepicker()
                }
                
                }}
              style={{width: '100%', padding: 7}}>
                {this.state.start_time}
              </NB.Text>
              <NB.View style={{position: 'absolute', top: -10, right: 0}}>
                <Button Button onPress = {
                  () => {
                    if (Platform.OS === 'ios' ){
                      this.setState({
                        time_picker_visible:true,
                      })
                    }else{
                      this.timepicker()
                    }
                  }
                }
                transparent >
                  <Icon
                    name="caret-down"
                    style={{
                      marginRight: Platform.OS === 'ios' ? 10 : 10,
                      fontSize: 20,
                      color: Color.readmore,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                </Button>
              </NB.View>
            </NB.View>
          </NB.View>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: Platform.OS === 'ios' ? 10 : 0,
              marginBottom: 50,
              alignItems:'center',
              justifyContent: 'flex-start',
            }}>
            <NB.Text
              style={{
                flex: 1,
                paddingBottom: 8,
                paddingTop: 8,
                textAlign:'center'
              }}>
              Until Next
            </NB.Text>

            <NB.View
              style={{
                borderBottomColor: '#8e9093',
                borderBottomWidth: 1,
                flex: 2,
                marginLeft: 10,
                marginRight: 10,
              }}>
              {/* <NB.Text
                style={{
                  width: '100%',
                  color: '#8e9093',
                  padding: 7,
                  marginLeft: 10,
                }}>
                15
              </NB.Text> */}

              <NB.View
              style={{ padding: Platform.OS === 'ios' ? 10:0,  marginLeft:10 }}>

              <RNPickerSelect
              value={this.state.day !='' ? this.state.day : '01'}
              onValueChange={(value) => {
                this.setState({
                  day: value
                })
                console.log(value)}}
              items={day}
              />
                
              </NB.View>

              { Platform.OS === 'ios' ? 
              <NB.View style={{position: 'absolute', top: -7, right: 0}}>
                <Button onPress={() => this.editPatient()} transparent>
                  <Icon
                    name="caret-down"
                    style={{
                      marginRight: Platform.OS === 'ios' ? 10 : 10,
                      fontSize: 20,
                      color: Color.readmore,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                </Button>
              </NB.View> : null }


            </NB.View>

            <NB.Text
              style={{
                flex: 1,
                marginRight: 10,
                padding: 8,
                textAlign:'center'
              }}>
              Days
            </NB.Text>
          </NB.View>

          <TouchableOpacity
          onPress={()=>{
            if (AppConstant.custom_note ===''){
              this.reminderSet()
            }else{
              alert('Custom medicine settings can not set reminder.')
            }
          }

          }
            style={{
              backgroundColor: this.state.reminder_status === '0' ? '#cbcbcb':'#33db1c',
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <NB.View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                height: 50,
                alignItems: 'center',
              }}>
              <Icon
                name="clock"
                style={{
                  marginRight: Platform.OS === 'ios' ? 10 : 10,
                  fontSize: 20,
                  color: 'white',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text style={{color: 'white'}}>SET REMINDER</NB.Text>
            </NB.View>
          </TouchableOpacity>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#c0c0c0',
                borderRadius: 5,
                flex: 1,
                marginRight: 10,
              }}>
              <NB.View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: 50,
                  alignItems: 'center',
                }}>
                <NB.Text style={{color: 'white'}}>CANCEL</NB.Text>
              </NB.View>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
              this.addMedicineInformation()
            }}
              style={{
                backgroundColor: '#0099cb',
                borderRadius: 5,
                flex: 1,
                marginLeft: 10,
              }}>
              <NB.View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  height: 50,
                  alignItems: 'center',
                }}>
                <NB.Text style={{color: 'white'}}>DONE</NB.Text>
              </NB.View>
            </TouchableOpacity>
          </NB.View>

          {this.state.isLoading ? <Loading /> : null}

          {/* Date From Selector */}
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.setDate}
              onTouchOutside={() => this.setState({show: false})}
            />
          )}

       {/* Dialog 1   */}
      {/* <Dialog
          visible={this.state.reminder_settings_visible}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside={() => this.setState({reminder_settings_visible: false})} >
      <NB.View >

      <NB.Text style={{ fontWeight:'bold' }}>Reminder Settings Preview</NB.Text>

      <NB.View>

      <NB.View  style={{ marginTop:10, marginBottom:10 }}>
        <NB.Text>Repeat Time: Daily</NB.Text>
        <NB.Text>Quantity: 1</NB.Text>
        <NB.Text>Dose Times: 4 Times</NB.Text>
      </NB.View>

      <NB.View style={{ height:250 }}>
        <NB.Text style={{ fontWeight:'bold', }}>Dose Time Preview</NB.Text>
        
          <NB.View style={{ flexDirection:'row', marginTop:5 }}>
            <Icon name = "clock" style = {{marginRight:10, marginLeft:  10,fontSize: 40,color: Color.color_theme,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            
            <NB.View>
              <NB.Text>Date: 01-01-2020</NB.Text>
              <NB.Text>Time: 8:00 am</NB.Text> 
            </NB.View>
            
          </NB.View>
    

      </NB.View>
  

      </NB.View>


        


      <NB.View
        style = {styles.action_view } >

        <TouchableOpacity style = {styles.cancel_opasity} 
        onPress={()=>{this.setState({reminder_settings_visible: false})}}>
          <NB.View style={styles.cancel}>
            <NB.Text style={{ color: 'white'}}>CANCEL</NB.Text>
          </NB.View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>{this.setDialogAddData()}}
        style = {styles.add} 
        >
          <NB.View style={{ flexDirection:'row', justifyContent:'center', height:50,alignItems:'center'}}>
            <NB.Text style={{ color: 'white'}}>ADD</NB.Text>
          </NB.View>
        </TouchableOpacity>


        </NB.View>

      
          </NB.View>

          
      </Dialog> */}

      {/*  Dialog 2   */}
      <Dialog
          visible={this.state.time_picker_visible}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside = {
            () => this.setState({
              time_picker_visible: false
            })
          } >
        <Fragment >
        <NB.View style={{  height:100,width:'100%', }}>
          
          <NB.Text >Select Time:</NB.Text>

          <TouchableOpacity
          style={{ position:'absolute', top:0, right:0 }}
          onPress={()=>{
            if(this.state.hours ===''){
              alert('Select an hour')
            } else if (this.state.minutes === '') {
              alert('Select a minutes')
            } else if (this.state.am_pm === '') {
              alert('Select AM/PM')
            }else{
                var final_time = this.state.hours + ':' + this.state.minutes + ':' + this.state.am_pm
                this.setState({
                  start_time: final_time,
                  time_picker_visible: false
                })
            }

          }}>

          <NB.Text >DONE</NB.Text>

          </TouchableOpacity>

          

          <NB.View style={{ flexDirection:'row'  , marginTop:30, justifyContent:'center'}}>
          <NB.View 
          style = {
            {
              width: 80,
              borderBottomColor: '#858585',
              borderBottomWidth: 1,
              paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              marginRight: 5, marginLeft: 10
            }
          } > 

          <RNPickerSelect
                style={{ fontSize:25 , }}
                value={this.state.hours}
                onValueChange={value => {
                  this.setState({
                    hours: value
                  })
                  console.log(value)}}
                items ={hours_list}
              />

          {Platform.OS === 'ios' ? (
                <NB.View style={{position: 'absolute', top: -10, right: 0}}>
                  <Button onPress={() => {}} transparent>
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
              ) : null}
          
          </NB.View>



          <NB.View 
          style = {
            {
              width: 80,
              borderBottomColor: '#858585',
              borderBottomWidth: 1,
              paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              marginRight: 10, marginLeft: 10
            }
          } > 

          <RNPickerSelect
                style={{ fontSize:25 ,}}
                value={this.state.minutes}
                onValueChange={value => {
                  this.setState({
                    minutes: value
                  })
                  console.log(value)}}
                items ={minutes_list}
              />

          {Platform.OS === 'ios' ? (
                <NB.View style={{position: 'absolute', top: -10, right: 0}}>
                  <Button onPress={() => {}} transparent>
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
              ) : null}
          
          </NB.View>


          <NB.View 
          style = {
            {
              width: 80,
              borderBottomColor: '#858585',
              borderBottomWidth: 1,
              paddingBottom: Platform.OS === 'ios' ? 10 : 0,
              marginRight: 10, marginLeft: 10
            }
          } > 

          <RNPickerSelect
                style={{ fontSize:25 ,}}
                value={this.state.am_pm}
                onValueChange={value => {
                  this.setState({
                    am_pm: value
                  })
                  console.log(value)}}
                items ={am_pm_list}
              />

          {Platform.OS === 'ios' ? (
                <NB.View style={{position: 'absolute', top: -10, right: 0}}>
                  <Button onPress={() => {}} transparent>
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
              ) : null}
          
          </NB.View>



          </NB.View>
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flex:1,
    borderRadius: 5,
    borderBottomColor: '#dae4ed',
    borderBottomWidth:2,
  },
  mainContainer: {
    backgroundColor: Color.placeholder_bg,
    height: '92%',
    width: '100%',
    padding:10
  },
  noteText: {
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
  add:
  {
    backgroundColor: '#0099cb',
    borderRadius: 5,
    flex: 1,
    marginLeft: 10
  },
  cancel:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center'
  },
  cancel_opasity:
  {
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
    flex: 1,
    marginRight: 10
  },
  action_view:
  {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  body_view:{
    flexDirection: 'row',
    justifyContent:'space-between',
    padding:10,

  }

});