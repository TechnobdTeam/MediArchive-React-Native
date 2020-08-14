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
  View,
  Text,
  I18nManager,
  TouchableHighlight,
  TouchableOpacity,   
  AsyncStorage, Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
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


var DATA = [
    {
      id: '1',
      title: 'Sat',
    },
    {
      id: '2',
      title: 'Sun',
    },
    {
      id: '3',
      title: 'Mon',
    },
    {
      id: '4',
      title: 'Tue',
    },
    {
      id: '5',
      title: 'Wed',
    },
    {
      id: '6',
      title: 'Thu',
    },
    {
      id: '7',
      title: "Fri",
    },
    
  ]

  var day = []
  var month = [{
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
  var days_list = ""


export default class EditMedicineScreen extends Component {

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
      start_from:'',
      medicine_name:'',
      medicine_id:'',
      action_type: this.props.action_type,
      prescription_id: this.props.prescription_id,
      before_meal:'',
      dose_times:'',
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
      query: '',
      item_click: false,
      offset: '0',
      isLoading: false,
      id: '',
    };
    // console.log('--------this.state.medicine_name: ' + this.state.medicine_name)

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
        // console.log("####################user_id: " + values)
        jwt_token = values
      })


  }


    addMedicine(){
      console.log('*******day :' 
      + this.state.sat_day+','
      +this.state.sun_day + ','
      +this.state.mon_day+','
      +this.state.tue_day+','
      +this.state.wed_day+','
      +this.state.thu_day+','
      +this.state.fri_day)

      days_list = ""
      if (this.state.sat_day === '1') {
        if (days_list==''){
          days_list =  this.state.sat_day
        }else{
          days_list = days_list + ',' + this.state.sat_day
        }
      }  
      if (this.state.sun_day === '2') {
        if (days_list == '') {
          days_list = this.state.sun_day
        } else {
          days_list = days_list + ',' + this.state.sun_day
        }
      }
      if (this.state.mon_day === '3') {
        if (days_list == '') {
          days_list = this.state.mon_day
        } else {
          days_list = days_list + ',' + this.state.mon_day
        }
      } 
      
      if (this.state.tue_day === '4') {
      if (days_list==''){
          days_list = this.state.tue_day
        }else{
          days_list = days_list + ',' + this.state.tue_day
        }
        
      } 

      if (this.state.wed_day === '5') {
        if (days_list == '') {
          days_list = this.state.wed_day
        } else {
          days_list = days_list + ',' + this.state.wed_day
        }
      } 

      if (this.state.thu_day === '6') {
        if (days_list == '') {
          days_list = this.state.thu_day
        } else {
          days_list = days_list + ',' + this.state.thu_day
        }

      } 
      
      if (this.state.fri_day === '7') {
        if (days_list == '') {
          days_list = this.state.fri_day
        } else {
          days_list = days_list + ',' + this.state.fri_day
        }
      }

      console.log('..days_list... : ' + days_list)

      

      if(this.state.query===''){
        alert('Enter medicine name');
      } else if (this.state.before_meal === '') {
        alert('Select before or after meal');
      } else if (this.state.morning_dose === '' && this.state.afternoon_dose === '' && this.state.night_dose === '' ) {
        alert('Dose time not checked');
      }else if (days_list===''){
        alert('Medicine days not selected');
      } else if (this.state.day === '' || this.state.month === '' || this.state.year === '') {
        alert('Start date time not selected');
      }else{
        this.getApiResponse('add')
      }

    }

// =========================================================
          getApiResponse(action_type) {
            this.setState({
              isLoading: true
            })

            var Authorization = 'Bearer ' + jwt_token

            var URL = ''
            var formData = new FormData()
            formData.append('api_key', this.state.api_key);
            let device_uuid = DeviceInfo.getUniqueId();
            formData.append('device_type', this.state.device_type);
            formData.append('device_uuid', device_uuid);
            formData.append('offset', this.state.offset);

            if(action_type==='search'){
              formData.append('search', this.state.query);
              URL = AppConstant.BASE_URL + "prescription/searchMedicineList";
            } else if (action_type === 'add' || action_type === 'edit') {
              URL = AppConstant.BASE_URL + "prescription/addMedicine";
              
              var start_from = this.state.year + '-' + this.state.month + '-' + this.state.day

              
              formData.append('before_meal', this.state.before_meal);
              formData.append('dose_times', this.state.morning_dose); //morning after noon
              formData.append('days', days_list);
              formData.append('start_from', start_from);
              formData.append('medicine_name', this.state.query); 
              formData.append('action_type', action_type);

              // if (action_type === 'edit'){
              //     formData.append('medicine_id', '14');  
              // }

              if (this.props.prescription_id != null) {
                formData.append('prescription_id', this.props.prescription_id);
              }
              if (this.props.patient_id != null) {
                // formData.append('patient_id', this.props.patient_id); 
              } 
              
            }

            console.log(" type:" + jwt_token + ' search_: ' + this.state.query + 'url: ' + URL);

            // console.log(action_type, 
            //   'device_uuid', device_uuid,
            //   'prescription_id', this.props.prescription_id,
            //   'this.props.patient_id', this.props.patient_id,
            //   'start_from', start_from,
            //   'before_meal', this.state.before_meal,
            //   'dose_times', this.state.morning_dose,
            //   'days', days_list,
            //   'medicine_name', this.state.query,
            //   'action_type', action_type,
            //   'morning_dose', this.state.morning_dose,
            //   'Authorization: ', Authorization
            //   )


            // for (var p of formData) {
            //   let name = p
            //   let value = p[1];

            //   console.log(name, value)
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

                    // if(action_type==='add'){
                    //   if (responseJson.response.type === "success") {
                    //     this.setState({
                    //       isLoading: false,
                    //     });
                    //     alert(responseJson.response.message);
                    //   } else if (responseJson.response.type === "error") {
                    //     this.setState({
                    //       isLoading: false,
                    //     });
                    //     alert(responseJson.response.message);
                    //   }

                    // } else if (action_type === 'edit') {
                    //   if (responseJson.response.type === "success") {
                    //     this.setState({
                    //       isLoading: false,
                    //     });
                    //     alert(responseJson.response.message);
                    //   } else if (responseJson.response.type === "error") {
                    //     this.setState({
                    //       isLoading: false,
                    //     });
                    //     alert(responseJson.response.message);
                    //   }

                    // }else if (action_type === 'search') {
                    // if (responseJson.response.type === "success") {

                    //   this.setState({
                    //     isLoading: false,
                    //     dataMedicine: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataMedicine, ...responseJson.response.data],
                    //     loading: false,
                    //     refreshing: false,
                    //     onEndReachedCalledDuringMomentum: false,
                    //   });


                    //   this.setState({
                    //     isLoading: false,
                    //   });

                    //   // console.log(" GetParam device_uuid:" + this.state.dataMedicine.length);

                    // } else if (responseJson.response.type === "error") {
                    //   this.setState({
                    //     isLoading: false,
                    //   });
                    //   console.log(" GetParam device_uuid:")
                    //   // alert(responseJson.response.message);
                    // } else if (responseJson.response.type === "userError") {
                    //   this.setState({
                    //     isLoading: false,
                    //   });
                    //   // alert(responseJson.response.message);
                    // }

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









  renderItem = ({ item }) => (
    <TouchableOpacity >
      <ListItem
        style={HeaderStyle.CardItemBorder}
        key={item.id}
        button={true}
        onPress={() => this.itemClicked(item)} >
            <NB.Left style={HeaderStyle.leftImages}>                  
              <ImageLoad 
              source={ { uri: item.news_image_url} }
              loadingStyle={{ size: 'large', color: Color.color_theme}}
              style={{height: 80, width: 80,}}/>
              <NB.Body>
              <NB.Text numberOfLines={2} style={{height:51,}} >{item.news_title} </NB.Text>                    
              <NB.Text numberOfLines={1} style={HeaderStyle.newsDatetime}>{item.source_newspaper_name} - {item.date_time} </NB.Text>
            </NB.Body>    
            </NB.Left>         
      </ListItem>
        {/* <Image source={require('./images/devider.png')}  style={{height:1,width:'100%',}}  /> */}

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
          <TouchableOpacity 
            onPress={() => {this.addMedicine('add')}} >
            <NB.Text style={{ color:'white',}}>SAVE</NB.Text>
          </TouchableOpacity>
          </Right>

  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="Edit Medicine" />

      <NB.View
        style={{backgroundColor: '#f3f7fa', width: '100%', height: '100%'}}>
        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
          }}>
          <NB.View style={{width: '20%'}}>
            <TouchableHighlight
              style={[
                styles.profileImgContainer,
                {borderColor: '#00000000', borderWidth: 1},
              ]}>
              <Image
                source={{
                  uri:
                    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
          </NB.View>


          <NB.View style={{width: '77%', marginLeft: 10, marginTop: 3}}>
            <NB.View style={{marginTop: Platform.OS === 'ios' ? 18 : 10}}>
          <Autocomplete
          style={{width: '80%',height:40,padding:5,backgroundColor:'white'}}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data = { this.state.dataMedicine }
          defaultValue={this.state.query}
          onChangeText={text =>{
            console.log('---------text' + text)
            if (this.state.item_click){
              this.setState({ item_click: false })
            }else{
              this.setState({ query: text })

              // this.timeoutHandle = setTimeout(() => {
              //   if(!this.state.isLoading ){
              //       this.getApiResponse();
              //   }  
              // }, 200);

            }
            
          } }
          placeholder="Enter Medicine Name"
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress = {
              () => this.setState({
                query: item.drugs_name,
                id: id,
                dataMedicine: [],
                item_click:true
              })
            } >
            
              <View style={{ flexDirection:'row',padding:10 ,borderBottomColor:'#cbcbcb',borderBottomWidth:0.3}}>
              <ImageLoad 
              source={ {uri:item.photo} } 
              loadingStyle={{ size: 'large', color: Color.color_theme}}
              style={{  height: 30,width:30,  marginRight:5, marginLeft:5}}/>
                  
                  <Text style={styles.itemText}>{item.drugs_name}</Text>
                
              </View>
              {  
                this.state.dataMedicine.length === (index + 1) ?
                <TouchableOpacity
                onPress={()=>{
                  this.setState({
                    offset: this.state.dataMedicine.length
                  })
                  this.timeoutHandle = setTimeout(() => {
                    // if(!this.state.isLoading ){
                      console.log(this.state.dataMedicine.length, this.state.offset)
                      this.getApiResponse('search');
                    // }                   
                  }, 200);

                }}
                >

                <Text                
                style={{ flex:1, alignItems:'center',textAlign:'center',justifyContent:'center',padding:10,backgroundColor:'#cbcbcb', color:'white' }}
                >Load more</Text> 
                {this.state.isLoading ? <Loading / > : null }
                </TouchableOpacity>
                
                : null
              }

              
              
            </TouchableOpacity>
          )}>
          </Autocomplete>
          

              {/* <NB.View
                style={{
                  width: '95%',
                  height: 2,
                  backgroundColor: Color.readmore,
                  marginRight: 0,
                  marginTop: Platform.OS === 'ios' ? 0 : -5,
                }}
              /> */}

              

              
            </NB.View>

            <NB.View
              style={{flexDirection: 'row', marginTop: 18, marginBottom: 30}}>
              <NB.View style = {{flexDirection: 'row',}}>

              <TouchableOpacity
              onPress = {
                () => {this.setState({
                  before_meal:'1'
                })}
              } >
              <Icon
                name="circle"
                style={{
                  fontSize: 24,
                  color: this.state.before_meal === '1' ? Color.color_theme : '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />

              </TouchableOpacity
              
              >
                
              <NB.Text
                style={{
                  color: this.state.before_meal === '1' ? '#545454' : '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                  marginRight: 20,
                }}>
                Before Meal
              </NB.Text>
              </NB.View>

              <NB.View style = {{flexDirection: 'row',}} >
              <TouchableOpacity
              onPress = {
                () => {
                  this.setState({
                    before_meal: '0'
                  })
                }
              } >
              <Icon
                name="circle"
                style={{
                  fontSize: 24,
                  color: this.state.before_meal === '0' ? Color.color_theme : '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />

              </TouchableOpacity>
              
              <NB.Text
                style={{
                  color: this.state.before_meal === '0' ? '#545454' : '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                  marginRight: 20,
                }}>
                After Meal
              </NB.Text>
                
              </NB.View>
              

              

            </NB.View>

            <NB.View
              style={{flexDirection: 'row', marginTop: 0, marginBottom: 20}}>
              {/* <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color:  Color.color_theme,
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              /> */}
              <TouchableOpacity
              onPress = {
                () => {
                  this.setState({
                    morning_dose: this.state.morning_dose === '0' ? '1' : '0'
                  })
                }
              } >
              <Icon
                name = "check-square"
                style={{
                  fontSize: 24,
                  color: this.state.morning_dose != '0' ? Color.color_theme : '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />

              </TouchableOpacity>

              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginRight: 15,
                  marginTop: 2,
                }}>
                Morning
              </NB.Text>

              {/* <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color: '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              /> */}
              <TouchableOpacity
              onPress = {
                () => {
                  this.setState({
                    afternoon_dose: this.state.afternoon_dose === '0' ? '1' : '0'
                  })
                }
              } >
              <Icon
                name = "check-square"
                style={{
                  fontSize: 24,
                  color: this.state.afternoon_dose != '0' ? Color.color_theme : '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />

              </TouchableOpacity>

              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginRight: 15,
                  marginTop: 2,
                }}>
                Afternoon
              </NB.Text>

              {/* <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color: '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              /> */}

              <TouchableOpacity
              onPress = {
                () => {
                  this.setState({
                    night_dose: this.state.night_dose === '0' ? '1' : '0'
                  })
                }
              } >
              <Icon
                name = "check-square"
                style={{
                  fontSize: 24,
                  color: this.state.night_dose != '0' ? Color.color_theme : '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />

              </TouchableOpacity>
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                }}>
                Night
              </NB.Text>
            </NB.View>
          </NB.View>
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            marginTop: 10,
          }}>




          <NB.View style={{marginLeft: 10, marginBottom:-10}}>
            <NB.Text
              style={{color: Color.color_app, fontSize: 18, marginTop: 20}}>
              Repeat
            </NB.Text>

            {/* <FlatList          
                data={DATA}    
                horizontal={true}     
                style={{ flex:7 }} 
                renderItem={({ item }) => ( 
                <NB.View style = {{
                  flex:1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white'
                }} >
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        medicine_reminder:true
                      })

                    }}>{item.title}</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>      
                )}          
                keyExtractor={item => item.email}  
                ItemSeparatorComponent={this.renderSeparator} 
                ListHeaderComponent={this.renderHeader}                             
              />      */}

            <NB.View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 30,
                marginTop: 15,
              }}>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {  this.state.sat_day === '1' ? styles.innerCircleSelect : styles.innerCircle } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        sat_day: this.state.sat_day  === '1' ? '':'1'
                      })
                    }}
                    >Sat</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>


              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.sun_day === '2' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text 
                    style={{color: 'white'}} 
                    onPress={()=>{
                      this.setState({
                        sun_day: this.state.sun_day === '2' ? '' : '2'
                      })

                    }}>Sun</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.mon_day === '3' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        mon_day: this.state.mon_day  === '3' ? '':'3'
                      })

                    }}>Mon</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.tue_day === '4' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        tue_day: this.state.tue_day === '4' ? '' : '4'
                      })

                    }}>Tue</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.wed_day === '5' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        wed_day: this.state.wed_day === '5' ? '' : '5'
                      })

                    }}>Wed</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.thu_day === '6' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        thu_day: this.state.thu_day === '6' ? '' : '6'
                      })

                    }}>Thu</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style = {
                    this.state.fri_day === '7' ? styles.innerCircleSelect : styles.innerCircle
                  } >
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        fri_day: this.state.fri_day  === '7' ? '':'7'
                      })

                    }}>Fri</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>
            </NB.View>
          </NB.View>
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 25,
            padding: 15,
          }}>
          <NB.View
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <NB.Text
              style={{color: Color.color_theme, fontSize: 18, marginTop: 5}}>
              Start From
            </NB.Text>
          </NB.View>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 15,
              marginLeft:10,
              marginRight:10,
              justifyContent: 'space-between',
            }}>
            <NB.View
              style={{ marginTop: Platform.OS === 'ios' ? 28 : 10,width: '25%',borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0}}>
              
              <RNPickerSelect
                    value={this.state.day !='' ? this.state.day : '01'}
                    onValueChange={(value) => {
                      this.setState({
                        day: value
                      })
                      console.log(value)}}
                    items={day}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -15, right: 0 }}>
                        <Button  transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
            </NB.View>

            <NB.View
              style={{ marginTop: Platform.OS === 'ios' ? 28 : 10,width: '25%',borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0}}>
                  <RNPickerSelect
                    value={this.state.month !='' ? this.state.month : '01'}
                    onValueChange={(value) => {
                      this.setState({
                        month: value
                      })
                      console.log(value)}}
                    items={month}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -15, right: 0 }}>
                        <Button  transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
            </NB.View>

            <NB.View
              style={{ marginTop: Platform.OS === 'ios' ? 28 : 10,width: '25%',borderBottomWidth:1, paddingBottom:Platform.OS === 'ios' ? 10 :0}}>
              <RNPickerSelect
                    value={this.state.year !='' ? this.state.year : '2020'}
                    onValueChange={(value) => {
                      this.setState({
                        year: value
                      })
                      console.log(value)}}
                    items={year}/>

                    {Platform.OS === 'ios' ? 
                    <NB.View style={{ position: 'absolute', top: -15, right: 0 }}>
                        <Button  transparent>
                            <Icon name = "caret-down" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                        </Button>
                    </NB.View>
                    : null
                    }
            </NB.View>

            {/* <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90, padding: 5, marginRight: -30}}>
              <NB.Text
                style={{
                  color: Color.readmore,
                  fontSize: 18,
                  marginRight: 30,
                  marginLeft: 10,
                }}>
                Day
              </NB.Text>
            </ImageBackground>

            <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90}}>
              <NB.Text
                style={{
                  color: Color.readmore,
                  fontSize: 18,
                  marginLeft: 15,
                  marginLeft: 10,
                }}>
                Month
              </NB.Text>
            </ImageBackground>

            <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90}}>
              <NB.Text
                style={{color: Color.readmore, fontSize: 18, marginLeft: 20}}>
                Year
              </NB.Text>
            </ImageBackground> */}
          </NB.View>
        </NB.View>

        { this.state.isLoading ? <Loading / > : null }

        {/* Dialog 1  
        <Dialog
          visible={this.state.medicine_name}
          animationType="fade"
          onTouchOutside={() => this.setState({medicine_name: false})}>
          <NB.View style={{height: 400}}>
            <NB.Text style={{fontSize: 20, marginBottom: 20}}>
              Select Medicine Name
            </NB.Text>

            <FlatList
              style={{flex: 1, marginRight: 0, alignContent: 'center'}}
              data={DATA}
              renderItem={({item}) => (
                <NB.View>
                  <TouchableHighlight
                    style={{flex: 1, flexDirection: 'column', margin: 5}}>
                    <NB.Button
                      onPress={() => {
                        console.log(' Selected_value : ' + item.name);
                      }}
                      style={{
                        width: '100%',
                        height: 50,
                        marginLeft: 0,
                        borderRadius: 10,
                        marginRight: 0,
                        marginTop: 5,
                        backgroundColor: Color.button_color_back,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <NB.Text style={{color: 'black'}}>{item.title}</NB.Text>
                    </NB.Button>
                  </TouchableHighlight>
                </NB.View>
              )}
              //Setting the number of column
              numColumns={1}
              keyExtractor={(item, index) => index}
            />

            <TouchableHighlight
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <NB.Button
                onPress={() => this.setState({medicine_name: false})}
                style={{
                  flex: 1,
                  height: 50,
                  width: 150,
                  justifyContent: 'center',
                  backgroundColor: Color.color_theme,
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 10,
                }}>
                <NB.Text>CANCEL</NB.Text>
              </NB.Button>
            </TouchableHighlight>
          </NB.View>
        </Dialog> */}


            {/*  Dialog 1   */}
      <Dialog
          visible={this.state.medicine_reminder}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside={() => this.setState({medicine_reminder: false})} >
          <NB.View >

          <NB.View style={{flexDirection: 'row', justifyContent:'space-between' }}>
            <NB.Text style={{ color:Color.color_theme, fontSize:25, width:'70%' }}>Alert For Patient Name</NB.Text>
            <TouchableHighlight
                      style={[styles.medicineContainer,{ borderColor: Color.readmore, borderWidth:1,  }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.medicineImg} />
            </TouchableHighlight>
          </NB.View>

          <NB.View style={{ backgroundColor: Color.color_theme, height:1, width:'100%' }}></NB.View>

          <NB.View style={{ justifyContent:'space-evenly', flexDirection:'row', marginTop:8 }}>
            <TouchableHighlight
                      style={[styles.medicineNameContainer,{ borderColor: Color.readmore, borderWidth:1, marginTop:20 }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.medicineNameImg} />
            </TouchableHighlight>
          </NB.View>



        <NB.View style={{ justifyContent:'center',alignItems:'center', marginTop:8, marginBottom:0 }}>
            <NB.Text style={{ color: Color.color_theme, fontSize:24,  }}>Medicine Name</NB.Text>
        </NB.View>

        <NB.View style={{ justifyContent:'center',alignItems:'center', marginTop:8, marginBottom:0 }}>
            <NB.Text style={{ color: '#c2c2c2',fontSize: 16,  }}>After Meal</NB.Text>
            <NB.Text style={{ color: '#c2c2c2',fontSize: 16, }}>10:30 PM</NB.Text>
        </NB.View>



        <NB.View style={{ flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:28, marginBottom:10 }}>
              {/* <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white', fontSize:20,alignItems:'center', paddingTop:15, paddingBottom:15,width:100 }}>CANCEL</NB.Text> */}
              <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginLeft:10}}>SKIP</NB.Text>
              <NB.Text style={{ backgroundColor: Color.color_twelve, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginRight:10}}>TAKE</NB.Text>
        </NB.View>

      
          </NB.View>

          {/* { this.state.isLoading ? <Loading /> : null } */}
      </Dialog>


      </NB.View>
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 14,
    marginRight:10,
    marginTop:12,
    height: 54,
    width: 54,
    borderRadius: 30,
  },
  profileImg: {
    height: 54,
    width: 54,
    borderRadius: 30,
  },
  day_circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: Color.color_theme,
    borderColor: 'white',
    borderWidth: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  outerCircle: {
    borderRadius: 40,
    width: 90,
    height: 90,
    backgroundColor: 'white',
  },
  innerCircleSelect: {
    borderRadius: 30,
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: Color.color_theme,
    justifyContent:'center',
    alignItems:'center'
  },
  innerCircle: {
    borderRadius: 30,
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: Color.readmore,
    justifyContent: 'center',
    alignItems: 'center'
  },
  medicineContainer: {
      marginLeft: 8,
      height: 80,
      width: 80,
      borderRadius: 40,
      marginTop: -10,
      marginRight:0,
      marginBottom:10
    },
    medicineImg: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    medicineNameContainer: {
        marginLeft: 8,
        height: 105,
        width: 105,
        borderRadius: 55,
        
        marginRight: 0,
        marginBottom: 10
      },
      medicineNameImg: {
        height: 105,
        width: 105,
        borderRadius: 55,
      },

      container2: {
          flex: 1,
          alignItems: 'center',
          height: 100,
          justifyContent: 'center',
        },
        center: {
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        behind: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }

});
