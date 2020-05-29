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


var data_dose_form = []
var data_dose_take_times = []
var data_dose_repeat_times = []
var data_dose_quantity = []
var data_dose_unit = []

export default class AddDoseScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      medicine_name: false,
      dose_edit_dialog: false,
      dose_type:'',
      medicine_name: this.props.medicine_name,

      dose_unit: this.props.dose_unit,
      dose_form: this.props.dose_form,
      dose_take_times: '',
      dose_repeat_times: '',
      dose_quantity: '',

      dose_form_found: this.props.dose_form === ''  ? false : true,
      dose_unit_found: this.props.dose_unit === '' ? false : true,
      custom_value:'',
      custom_note: '',

    };



    console.log('--------medicine_name: ' 
    + this.state.medicine_name, 
    ' , ', this.props.dose_unit,
    ' , ', this.props.dose_form )

  }

  componentDidMount(){ 
      data_dose_form = []
      data_dose_take_times = []
      data_dose_repeat_times = []
      data_dose_quantity = []
      data_dose_unit = []

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
        this.getApiResponse();
      })

      // this.setState({
      //     dose_form_found: this.props.dose_form === '' ? false : true,
      //     dose_unit_found: this.props.dose_unit === '' ? false : true,
      // })

    console.log('', AppConstant.custom_note,
      ' dose_form: ', AppConstant.dose_form,
      ' dose_take_times: ', AppConstant.dose_take_times,
      ' dose_repeat_times: ', AppConstant.dose_repeat_times,
      ' dose_quantity:', AppConstant.dose_quantity,
      ' dose_unit: ', AppConstant.dose_unit,
      ' prescription_id: ', this.state.prescription_id
    )


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

    // this.setState({
    //   dose_edit_dialog: true,
    //   dose_type: type
    // })
  }

  getApiResponse() {
    this.setState({
      isLoading: true
    })

    console.log(" type:" + jwt_token);

    var Authorization = 'Bearer ' + jwt_token

    var URL = AppConstant.BASE_URL + "prescription/getMedicineDoseSetting";
    var formData = new FormData()
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();
    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    formData.append('offset', '0');


    NetInfo.fetch().then(state => {
      if (state.isConnected) {
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
              var dataSource= responseJson.response.data;
              
              this.setArraySettings(dataSource)

            } else if (responseJson.response.type === "error") {
              this.setState({
                isLoading: false,
              });
              if (responseJson.response.message === 'Session has been expired. Please login again.') {
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

  setArraySettings(dataSource) {
    this.setState({
      isLoading: false,
    });

    for (let step = 0; step < dataSource.form_data.length; step++) {
      
            // dose_unit: this.props.dose_unit,
            //   dose_form: this.props.dose_form,
      if (step === 0 ) {
        var obj = {
          label: "Medicine Form",
          value: this.props.dose_form === '' ? '' : this.props.dose_form,
          key: 'Medicine Form',
          color: 'black'
        }
        data_dose_form.push(obj)
        this.setState({
          dose_form: this.props.dose_form === '' ? '' : this.props.dose_form
        })
      }

      var obj = {
        label: dataSource.form_data[step].name,
        value: dataSource.form_data[step].id,
        key: dataSource.form_data[step].name,
        color: 'black'
      }
      data_dose_form.push(obj)
    }

    for (let step = 0; step < dataSource.dose_times_data.length; step++) {
      
      
      if (step === 0) {
        var obj = {
          label: "Take Times",
          value: '',
          key: 'Take Times',
          color: 'black'
        }
        data_dose_take_times.push(obj)

        this.setState({
          dose_take_times: AppConstant.dose_take_times === '' ? 1 : Number(AppConstant.dose_take_times)
        })
      }

      var obj = {
        label: dataSource.dose_times_data[step].name,
        value: dataSource.dose_times_data[step].id,
        key: dataSource.dose_times_data[step].name,
        color: 'black'
      }
      data_dose_take_times.push(obj)
    }

    for (let step = 0; step < dataSource.dose_repeat_times_data.length; step++) {
      
      
      if (step === 0) {
        var obj = {
          label: "Repeat Times",
          value: '',
          key: 'Repeat Times',
          color: 'black'
        }
        data_dose_repeat_times.push(obj)

        this.setState({
          dose_repeat_times: AppConstant.dose_repeat_times === '' ? '' : Number(AppConstant.dose_repeat_times)
        })
      }

      var obj = {
        label: dataSource.dose_repeat_times_data[step].name,
        value: dataSource.dose_repeat_times_data[step].id,
        key: dataSource.dose_repeat_times_data[step].name,
        color: 'black'
      }
      data_dose_repeat_times.push(obj)
    }

    for (let step = 0; step < dataSource.quantity_data.length; step++) {
      
      
      if (step === 0) {

        var obj = {
          label: "Quantity",
          value: '',
          key: "Quantity",
          color: 'black'
        }
        data_dose_quantity.push(obj)

        this.setState({
          dose_quantity: AppConstant.dose_quantity === '' ? '' : Number(AppConstant.dose_quantity)
        })
      }

      var obj = {
        label: dataSource.quantity_data[step].name,
        value: dataSource.quantity_data[step].id,
        key: dataSource.quantity_data[step].name,
        color: 'black'
      }
      data_dose_quantity.push(obj)
    }

    for (let step = 0; step < dataSource.unit_data.length; step++) {
      
      
      if (step === 0) {
        var obj = {
          label: "Unit",
          value: this.props.dose_unit === '' ? '' : this.props.dose_unit,
          key: 'Unit',
          color: 'black'
        }
        data_dose_unit.push(obj)

        this.setState({
          dose_unit: this.props.dose_unit === '' ? "" : this.props.dose_unit
        })
      }

      var obj = {
        label: dataSource.unit_data[step].name,
        value: dataSource.unit_data[step].id,
        key: dataSource.unit_data[step].name,
        color: 'black'
      }
      data_dose_unit.push(obj)
    }
    if (dataSource.unit_data.length === 0){
      var obj = {
        label: "Unit",
        value: this.props.dose_unit === '' ? '' : this.props.dose_unit,
        key: 'Unit',
        color: 'black'
      }
      data_dose_unit.push(obj)

      this.setState({
        dose_unit: this.props.dose_unit === '' ? "" : this.props.dose_unit
      })

    }


    console.log(" ------- Size: data_dose_form : " +
      data_dose_form.length,
      ' data_dose_take_times: ' + data_dose_take_times.length, ' ---- ', this.state.dose_take_times, 
      ' data_dose_repeat_times:', +data_dose_repeat_times.length,
      ' data_dose_quantity: ' + data_dose_quantity.length,
      ' data_dose_unit: ' + data_dose_unit.length,
      ' form_type: '+ this.state.dose_form
    );
  }

    updateValue(text, field) {
      if (field == 'custom_value') {
        this.setState({
          custom_value: text,
        })
      } else if (field == 'custom_note') {
        this.setState({
          custom_note: text
        })
      } 

    }


  setDialogAddData(){

    // dose_type: dose_form / dose_take_times / dose_quantity / dose_unit
    // dose_form
    // dose_take_times
    // dose_repeat_times
    // dose_quantity
    // dose_unit
    if (this.state.custom_value!='') {

      this.setState({
        dose_edit_dialog: false
      })

      if (this.state.dose_type === 'dose_form'){
        var obj = {
          label: this.state.custom_value,
          value: this.state.custom_value
        }

        data_dose_form.push(obj)
        this.setState({
          dose_form: this.state.custom_value,
        })
      } else if (this.state.dose_type === 'dose_take_times'){
        var obj = {
          label: this.state.custom_value,
          value: this.state.custom_value
        }
        data_dose_take_times.push(obj)
        this.setState({
          dose_take_times: this.state.custom_value,
        })

      } else if (this.state.dose_type === 'dose_repeat_times') {
        var obj = {
          label: this.state.custom_value,
          value: this.state.custom_value
        }
        data_dose_repeat_times.push(obj)
        this.setState({
          dose_repeat_times: this.state.custom_value,
        })

      } else if (this.state.dose_type === 'dose_quantity') {
        var obj = {
          label: this.state.custom_value,
          value: this.state.custom_value
        }
        data_dose_quantity.push(obj)
        this.setState({
          dose_quantity: this.state.custom_value,
        })

      } else if (this.state.dose_type === 'dose_unit') {
        var obj = {
          label: this.state.custom_value,
          value: this.state.custom_value
        }
        data_dose_unit.push(obj)
        this.setState({
          dose_unit: this.state.custom_value,
        })
      }

    }else{
        alert('Field can not be empty.');
    }
  }

  setDoseSettings(){
    AppConstant.dose_form = this.state.dose_form
    AppConstant.dose_take_times = this.state.dose_take_times
    AppConstant.dose_repeat_times = this.state.dose_repeat_times
    AppConstant.dose_quantity = this.state.dose_quantity
    AppConstant.dose_unit = this.state.dose_unit
    AppConstant.custom_note = this.state.custom_note



    console.log('setDoseSettings: '+
        ' *******dose_form*******:', this.state.dose_form,
        ' dose_take_times:', this.state.dose_take_times,
        ' dose_repeat_times:', this.state.dose_repeat_times,
        ' dose_quantity:', this.state.dose_quantity,
        ' dose_unit:', this.state.dose_unit,
        ' custom_note:', this.state.custom_note,
        ' dose_take_times_text', AppConstant.dose_take_times_text,
        ' dose_repeat_times_text', AppConstant.dose_repeat_times_text,
    );
    

    if (this.state.custom_note !='' ){
      Actions.pop()
    } else if (this.state.dose_form === '' ) {
      alert('Dose form type not selected.');
    } else if (this.state.dose_take_times === '') {
      alert('Dose take time not selected.');
    } else if (this.state.dose_repeat_times === '') {
      alert('Dose repeat times not selected.');
    } else if (this.state.dose_quantity === '') {
      alert('Dose quantity type not selected.');
    } else if (this.state.dose_unit === '') {
      alert('Dose unit type not selected.');
    }else{
      Actions.pop()
    }

    
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
              <TouchableOpacity onPress={() => this.setDoseSettings()} >
                  <NB.Text style={{ color:'white', fontSize:14  }}>DONE</NB.Text>
              </TouchableOpacity>

          </Right>

    // dose_form: '',
    // dose_take_times: '',
    // dose_repeat_times: '',
    // dose_quantity: '',
    // dose_unit: ''

  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="Edit Dose" />
      <ScrollView
        style={styles.mainContainer}>

        <NB.View style={styles.container_main}>

        <NB.View style={{  backgroundColor:'white', padding:10, borderBottomColor: '#dae4ed',borderBottomWidth:2,marginBottom:15, borderRadius: 5, }}>
        
        {
          this.state.dose_form_found === false ?
        <NB.View style = {styles.selector_container} >

            <NB.View style = {styles.selector_item} >
            { Platform.OS === 'ios' ? 

            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button  transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View> : null }

              <RNPickerSelect
              style={pickerDayStyle}
            value={this.state.dose_form !='' ? this.state.dose_form : this.state.dose_form}
            onValueChange={(value) => {
              this.setState({
                dose_form: value
              })
              console.log(value)}}
            items={data_dose_form}/>

            

            </NB.View>

            

            <TouchableOpacity
              style={styles.file_background}
              onPress={()=>{this.itemClicked('dose_form')}}>
              
            <Image
                source={require('../images/add_file_icon.png')}
                fadeDuration={0}
                style={{   height: 24, weidth:24  }}
              />
            </TouchableOpacity>
        </NB.View>

        : null}


        <NB.View style={styles.selector_container}>
        
            <NB.View style = {styles.selector_item} >
            { Platform.OS === 'ios' ? 

            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button  transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View> : null}
            
            <RNPickerSelect
            style={pickerDayStyle}
            value={this.state.dose_take_times !='' ? this.state.dose_take_times : this.state.dose_form}
            onValueChange={(value) => {
              for (let i = 0; i < data_dose_take_times.length; i++){
                if(data_dose_take_times[i].value === value){
                  AppConstant.dose_take_times_text = data_dose_take_times[i].label
                      // AppConstant.dose_repeat_times_text: '',
                  console.log('-----------------' + data_dose_take_times[i].label)
                  break
                }
              }
              this.setState({
                dose_take_times: value
              })
              console.log('dose_take_times: ',value)}}
            items={data_dose_take_times}/>

            
            </NB.View>

            <TouchableOpacity
              style={styles.file_background}
              onPress={()=>{this.itemClicked('dose_take_times')}}>
              
            <Image
                source={require('../images/add_file_icon.png')}
                fadeDuration={0}
                style={{   height: 24, weidth:24  }}
              />
            </TouchableOpacity>
        </NB.View>

            <NB.View style={styles.selector_container}>
              

            <NB.View style = {styles.selector_item} >
            { Platform.OS === 'ios' ? 
            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View> : null}
              <RNPickerSelect
              style={pickerDayStyle}
            value = {
              this.state.dose_repeat_times != '' ? this.state.dose_repeat_times : this.state.dose_repeat_times
            }
            onValueChange={(value) => {
              for (let i = 0; i < data_dose_repeat_times.length; i++) {
                if (data_dose_repeat_times[i].value === value) {
                  // AppConstant.dose_take_times_text = data_dose_repeat_times[i].label,
                    AppConstant.dose_repeat_times_text = data_dose_repeat_times[i].label
                    console.log('-----------------' + data_dose_repeat_times[i].label)
                  break
                }
              }
              this.setState({
                dose_repeat_times: value
              })
              console.log(value)}}
            items={data_dose_repeat_times}/>

            
            </NB.View>

            <TouchableOpacity
              style={styles.file_background}
              onPress={()=>{this.itemClicked('dose_repeat_times')}}>
              
            <Image
                source={require('../images/add_file_icon.png')}
                fadeDuration={0}
                style={{   height: 24, weidth:24  }}
              />
            </TouchableOpacity>
        </NB.View>

            <NB.View style={styles.selector_container}>
        
            <NB.View style = {styles.selector_item} >
            { Platform.OS === 'ios' ? 
            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View>

            : null
            }
              <RNPickerSelect
              style={pickerDayStyle}
            value={this.state.dose_quantity !='' ? this.state.dose_quantity : this.state.dose_quantity}
            onValueChange={(value) => {
              this.setState({
                dose_quantity: value
              })
              console.log(value)}}
            items={data_dose_quantity}/>

            {/* { Platform.OS === 'ios' ? : null } */}
            
            </NB.View>

            <TouchableOpacity
              style={styles.file_background}
              onPress={()=>{this.itemClicked('dose_quantity')}}>
              
            <Image
                source={require('../images/add_file_icon.png')}
                fadeDuration={0}
                style={{   height: 24, weidth:24  }}
              />
            </TouchableOpacity>
        </NB.View>
        
        { this.state.dose_unit_found === false ?
          <NB.View style={styles.selector_container}>
        
            <NB.View style = {styles.selector_item} >
            { Platform.OS === 'ios' ? 
            <NB.View style={{ position: 'absolute', top: -15, right: 5, }}>
                <Button transparent>
                    <Icon name = "caret-down" style = {{marginRight: Platform.OS === 'ios' ? 10 : 10,fontSize: 20,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
                </Button>
            </NB.View>
            : null
            }

            <RNPickerSelect
            style={pickerDayStyle}
            value={this.state.dose_unit !='' ? this.state.dose_unit : this.state.dose_unit}
            onValueChange={(value) => {
              this.setState({
                dose_unit: value
              })
              console.log('dose_unit', value)}}
            items={data_dose_unit}/>

            
            </NB.View>

            <TouchableOpacity
              style={styles.file_background}
              onPress={()=>{this.itemClicked('dose_unit')}}>
              
              <Image
                  source={require('../images/add_file_icon.png')}
                  fadeDuration={0}
                  style={{   height: 24, weidth:24  }}
                />
            </TouchableOpacity>
        </NB.View>
      : null
      }

        </NB.View>
    
        <NB.View style={{ height:180, backgroundColor:'white', padding:10, borderBottomColor: '#dae4ed',borderBottomWidth:2, borderRadius: 5, }}>

            <NB.Text style={{ marginTop:15, color:'black' }}>Or Custom Dose</NB.Text>
            <NB.Item >
              <NB.Input 
              style={{ color: '#5a5a5a' }}
              placeholderTextColor={'#bfbfbf'}
              style = {styles.noteText}
              placeholder = "Enter Your Note" 
              underlineColorAndroid = "transparent"
              multiline={true}
              onChangeText={(text)=>this.updateValue(text,'custom_note')}/ >
            </NB.Item>
        </NB.View>

    { this.state.isLoading ? <Loading / > : null }


     {/*  Dialog 1   */}
      <Dialog
          visible={this.state.dose_edit_dialog}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside={() => this.setState({dose_edit_dialog: false})} >
      <NB.View >
      <NB.Text>Form</NB.Text>


        <NB.Item style={{marginTop:40, marginBottom:50 }} >              
            <NB.Input 
            style={{ color: '#5a5a5a' }}
            placeholderTextColor={'#bfbfbf'}
            style={{ fontSize:16, }}
            placeholder = "Enter Value" 
            onChangeText={(text)=>this.updateValue(text,'custom_value')}/ >

        </NB.Item>

      <NB.View
        style = {
          {
            flexDirection: 'row',
            
            marginBottom:10,
            
            justifyContent: 'flex-start',

          }
        } >

        <TouchableOpacity style = {
          {
            backgroundColor: '#c0c0c0',
            borderRadius:5,
            flex:1,
            marginRight:10
          }
        } 
        onPress={()=>{this.setState({dose_edit_dialog: false})}}>
          <NB.View style={{ flexDirection:'row', justifyContent:'center', height:50,alignItems:'center'}}>
            
            <NB.Text style={{ color: 'white'}}>CANCEL</NB.Text>
          </NB.View>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=>{
          this.setDialogAddData();
          
          }
        }
        style = {
          {
            backgroundColor: '#0099cb',
            borderRadius:5,
            flex: 1,
            marginLeft:10
          }
        } 
        
        >
          <NB.View style={{ flexDirection:'row', justifyContent:'center', height:50,alignItems:'center'}}>
            
            <NB.Text style={{ color: 'white'}}>ADD</NB.Text>
          </NB.View>
        </TouchableOpacity>


        </NB.View>

      
          </NB.View>

          
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
    }

});

const pickerDayStyle = {
  inputIOS: {
    color: '#5a5a5a',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: '#bfbfbf',
  },
  inputAndroid: {
    color: '#5a5a5a',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
};