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
import { Dialog } from 'react-native-simple-dialogs';
import Autocomplete from 'react-native-autocomplete-input';
import RNPickerSelect from 'react-native-picker-select';

import AppConstant from '../../component/AppConstant'
import Loading from '../../component/Loading'
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import EmptyMessage from '../../component/EmptyMessage';
var jwt_token = ''

export default class MedicineDetailsScreen extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      medicine_name: this.props.medicine_name,
      medicine_id: this.props.medicine_id,

      medicine_name:'',
      quantity:'',
      dosage_form:'',
      take_times:'',
      repeat_times:'',
      medicine_note:'',
      start_from:'',
      start_time:'',
      medicine_end_days:'',
      remindar_status: '',
      dose:'',
    };

    console.log('--------medicine_name: ' 
    + this.state.medicine_name, 
    ' , ', this.props.dose_unit,
    ' , ', this.props.dose_form )

  }

  componentDidMount(){ 
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################--user_id: " + values)
        jwt_token = values
        this.getApiResponse();
      })

      // medicine_name

      //var dose_info = quantity dosage_form * take_times repeat_times

      // medicine_note
      // start_from
      // start_time

      // medicine_end_days
      // remindar_staus

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

  monthToNumber(month) {
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

  getRepeatTime(time){

    if(time === '1'){
      return "Daily"
    } else if(time === '2') {
      return "Weekly"
    } else if (time === '3') {
      return "Monthly"
    } else if (time === '4') {
      return "Half Monthly"
    } else if (time === '5') {
      return "Yearly"
    } else if (time === '6') {
      return "Half Yearly"
    }else{
      return time;
    }


    // {
    //   "id": 1,
    //   "name": "Daily"
    // }, {
    //   "id": 2,
    //   "name": "Weekly"
    // }, {
    //   "id": 3,
    //   "name": "Monthly"
    // }, {
    //   "id": 4,
    //   "name": "Half Monthly"
    // }, {
    //   "id": 5,
    //   "name": "Yearly"
    // }, {
    //   "id": 6,
    //   "name": "Half Yearly"
    // }
  }

  getApiResponse() {
    this.setState({
      isLoading: true
    })

    console.log(" type:" + jwt_token);

    var Authorization = 'Bearer ' + jwt_token

    var URL = AppConstant.BASE_URL + "prescription/getMedicineInfo";
    var formData = new FormData()
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();
    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    formData.append('medicine_id', this.state.medicine_id);

    console.log("********** medicine_id:" + this.state.medicine_id);

    
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

              var dose_info = dataSource.quantity + dataSource.dosage_form + ' X ' + dataSource.take_times + ' ' + this.getRepeatTime(dataSource.repeat_times)
              
              var date = ''
              if (dataSource.start_from !=''){
                // "2020-05-12
                var dateArray = dataSource.start_from.toString().split('-');
                var day = dateArray[2]
                var month = dateArray[1]
                var year = dateArray[0]

                date = day + " " + this.monthToNumber(month)+ " "+ year
              }else{
                date = dataSource.start_from
              }
              
              this.setState({
                isLoading: false,
                medicine_name: dataSource.medicine_name,
                quantity: dataSource.quantity,
                dosage_form: dataSource.dosage_form,
                take_times: dataSource.take_times,
                repeat_times: dataSource.repeat_times,
                medicine_note: dataSource.medicine_note,
                start_from: date,
                start_time: dataSource.start_time,
                medicine_end_days: dataSource.medicine_end_days,
                remindar_status: "" + dataSource.remindar_status,
                dose: dose_info,
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

      var right = <Right style={{flex: 1}} > 
                      
                  </Right>

    // medicine text size: 16 px
    // top margin: 25 px
    // tab napa text size: 21 px
    // left margin: 25 px
    // dose top margin: 40 px


  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="Medicine Details" />
      <ScrollView
        style={styles.mainContainer}>

        <NB.View style={styles.container_main}>
    
        <NB.View style={{ borderRadius:5, backgroundColor:'white', paddingLeft:25, borderBottomColor: '#dae4ed',borderBottomWidth:2, paddingBottom:25 }}>

            <NB.Text style={{ marginTop:25, color: Color.readmore, fontSize:16 }}>Medicine</NB.Text>
            <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.medicine_name}</NB.Text>

            <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Dose</NB.Text>
            <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.dose}</NB.Text>

            <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Note</NB.Text>
            <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.medicine_note}</NB.Text>

            <NB.View style={{ flexDirection:'row' , justifyContent:'space-between'}}>

              <NB.View style = {styles.details } >
                <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Start Date</NB.Text>
                <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.start_from}</NB.Text>
              </NB.View>
              
              <NB.View style={styles.details}>
                <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Start Time</NB.Text>
                <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.start_time}</NB.Text>
              </NB.View>

            </NB.View>

            <NB.View>
              <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Unit</NB.Text>
              <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>Next {this.state.medicine_end_days} Days</NB.Text>
            </NB.View>

            {console.log('---------: '+this.state.remindar_status)}

            <NB.View>
              <NB.Text style={{ marginTop:40, color: Color.readmore, fontSize:16 }}>Reminder</NB.Text>
              <NB.Text style={{ marginTop:5, color: Color.counter_text_bg, fontSize:21 }}>{this.state.remindar_status === '0' ? 'OFF': 'ON'}</NB.Text>
            </NB.View>

            
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
