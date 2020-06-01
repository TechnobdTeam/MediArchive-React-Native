/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Image, SafeAreaView,StyleSheet,ScrollView,View,Text,FlatList,I18nManager,TouchableOpacity,TouchableHighlight,AsyncStorage, Platform , Alert} from 'react-native';

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
import EmptyMessage from '../../component/EmptyMessage';
import CommonValues from '../../component/CommonValues'
var month = CommonValues.getMonth()

var jwt_token = ''


import ImageLoad from 'react-native-image-placeholder';
var uri =''

export default class PrescriptionDetailsScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      dataSource: {},
      dataMedicine_info:[],
      dataReport_info:[],
      offset: 0,
      error: null,
      refreshing: false,
      title: 'Home',
      isLoading: false,
      isConnected: false,
      onEndReachedCalledDuringMomentum: false,
      prescription_date: '',
      order_type: 'desc',
      patient_id:'',
      prescription_id: this.props.prescription_id,
      created_date: '',
      doctor_name: '',
      medicine: '',
      description: '',
      doctor_profile_image: this.props.doctor_profile_image,
      prescription_photo:[],
      patient_name: this.props.patient_name
      
    };

  }

  componentDidMount() {
    console.log(" componentDidMount prescription_id:" + this.state.prescription_id);

    AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
      console.log("####################user_id: " + values)
      jwt_token = values

      if (values != null && values != '') {
        this.setState({
          dataSource: []
        })
      }
      this.getApiResponse()
    })
  }


    // ------------------------------------ApiCall-------------------------------
      getApiResponse() {
        this.setState({
          isLoading: true
        })

        
        var Authorization = 'Bearer ' + jwt_token
        var URL = AppConstant.BASE_URL + "prescription/getPrescriptionInfo";

        var formData = new FormData()
        formData.append('api_key', this.state.api_key);
        let device_uuid = DeviceInfo.getUniqueId();

        formData.append('device_type', this.state.device_type);
        formData.append('device_uuid', device_uuid);
        formData.append('prescription_id', this.state.prescription_id);


        console.log("prescription_id:" + this.state.prescription_id, ' device_uuid: ' + device_uuid);

        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            console.log(" state.isConnected:" + state.isConnected + " URL: " + URL, ' device_uuid: ', device_uuid);

            return fetch(URL, {
                method: 'POST',
                headers: {
                  'Authorization': Authorization
                },
                body: formData,
              })
              .then((response) => response.json())
              .then((responseJson) => {

                console.log(responseJson, responseJson.response.data.doctor_info.doctor_profile_image);

                if (responseJson.response.type === "success") {
                  uri = responseJson.response.data.doctor_info.doctor_profile_image;
                  this.setState({
                    dataSource : responseJson.response.data,
                    created_date: responseJson.response.data.doctor_info.created_date,
                    doctor_profile_image: responseJson.response.data.doctor_info.doctor_profile_image,
                    doctor_name: responseJson.response.data.doctor_info.doctor_name,
                    medicine: responseJson.response.data.prescription_info.medicine,
                    description: responseJson.response.data.prescription_info.description,
                    patient_id: responseJson.response.data.prescription_info.patient_id,
                    prescription_date: responseJson.response.data.prescription_info.added,
                    dataMedicine_info: responseJson.response.data.medicine_info,
                    dataReport_info: responseJson.response.data.report_info,
                    isLoading: false,
                    prescription_photo: responseJson.response.data.prescription_photo ,
                  });

                console.log('length: '+responseJson.response.data.prescription_photo.length)

                console.log('medicineList: ' + responseJson.response.data.medicine_info.length,
                'dataReport_info: ' + responseJson.response.data.report_info.length,

                " ???? id:" + responseJson.response.data.doctor_info.id,
                  +responseJson.response.data.doctor_info.created_date,
                  ' patient_id: ', responseJson.response.data.prescription_info.patient_id);

                } else if (responseJson.response.type === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  // alert(responseJson.response.message);
                }

              })
              .catch((error) => {
                console.error(error);
                alert(error);
                this.setState({
                  isLoading: false,
                });
              });
          } else {
            alert('Please connect to internet and try again. ');
            return;
          }
        });
        
      }


      deleteApiResponse(type, id) {
        this.setState({
          isLoading: true
        })

        console.log(" ------deleteApiResponse: " + type, id);

        var Authorization = 'Bearer ' + jwt_token
        var URL = '';
        var formData = new FormData()
        if(type==='report'){
          URL = AppConstant.BASE_URL + "prescription/deleteReport";
          formData.append('report_id', id);
        } else if (type === 'medicine') {
          URL = AppConstant.BASE_URL + "prescription/deleteMedicine";
          formData.append('medicine_id', id);
        }

        
        formData.append('api_key', this.state.api_key);
        let device_uuid = DeviceInfo.getUniqueId();

        formData.append('device_type', this.state.device_type);
        formData.append('device_uuid', device_uuid);

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
                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);

                  this.timeoutHandle = setTimeout(() => {
                    this.getApiResponse()
                  }, 1000);
                  
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
                this.setState({
                  isLoading: false,
                });
              });
          } else {
            alert('Please connect to internet and try again. ');
            return;
          }
        });
        
      }

      // ------------------------------API-Call---------------------------
    getFormattedDate(date){
    // "created_date": "2020-04-19 13:58:14",
    var finalDate = date;
    console.log(date)
      if(date!=''){
      var topDate = date.split(' ');
      var dateArray = topDate[0].split('-');
      var year = dateArray[0];
      var month = this.numberConvertName("" + dateArray[1]);
      var day = dateArray[2];

      finalDate = day + ' ' + month + ' ' + year;

      console.log('########: Date: ', finalDate)
    }
    return finalDate;

    }

    // getMonthId(month_name) {
    //   for (let i = 0; i < month.length; i++) {
    //     console.log('........' + month[i].label + ' ? ' + month_name)
    //     if (month[i].label.substring(0, 3) === month_name) {
    //       console.log('........' + month_name + ' ? ' + month[i].value)
    //       return month[i].value;
    //       break;
    //     }
    //   }
    // }

    numberConvertName(month) {
      // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec 
      month = month.replace("01", "Jan");
      month = month.replace("02", "Feb");
      month = month.replace("03", "Mar");
      month = month.replace("04", "Apr");
      month = month.replace("05", "Jun");
      month = month.replace("06", "Jul");
      month = month.replace("07", "Aug");
      month = month.replace("08", "Sep");
      month = month.replace("09", "Oct");
      month = month.replace("10", "Nov");
      month = month.replace("11", "Nov");
      month = month.replace("12", "Dec");
      return month;
    }

    renderReportItem = ({ item }) => (
    <TouchableOpacity style = {
      {
        marginBottom: 5,
        backgroundColor: 'white',
        borderBottomColor: '#dae4ed',
        borderBottomWidth: 2,
        paddingTop:8,
        paddingBottom:8,
        borderRadius: 5
      }
    }
    onPress = {() => {this.itemClickedReportDetails(item)}}
    >
    
      <NB.View style= {{ flexDirection:'row', flex:1, justifyContent:'flex-start' }}>
      

      <NB.View style={{ width:70, height:70, marginLeft:8, marginRight:12 }}>
        <ImageLoad
          source={{ uri:item.photo }}
          loadingStyle={{ size: 'large', color: Color.color_theme}}
          style={{  height: 70, width:70,  }}
        />
    

      </NB.View>

      <NB.View style={{ flex:1 }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Date: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}>{this.getFormattedDate(item.created_date)}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Type: </Text>
              <Text numberOfLines={1} style={{ color: Color.color_app, fontSize: 14,  width:230 }}>{item.type_name}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Description: {item.description} </Text>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}> </Text> */}
            </NB.View>

            <TouchableOpacity TouchableOpacity style = {
              {
                position: 'absolute',
                top: -10,
                right: 0,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }
            }
            onPress={()=>{
              console.log('Clicked....')
              this.createDeleteAlert('report', item.id)
            }}
            >
            <NB.View >
              <Icon name = "trash" style = {{fontSize: 18,color: '#f35d5d',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View>

            </TouchableOpacity>

      </NB.View>
      </NB.View>
      
    </TouchableOpacity>   
    )

  renderMedicineItem = ({ item }) => (
    <TouchableOpacity  style = {
      {
        marginBottom: 5,
        backgroundColor: 'white',
        borderBottomColor: '#dae4ed',
        borderBottomWidth: 2,
        borderRadius: 5
      }
    } 
    onPress = {() => {this.itemClicked(item)}} 
    >
    

      <NB.View style= {{ flexDirection:'row' ,
      justifyContent:'flex-start', 
      }}>
      
      <TouchableHighlight
                style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:0,  }]}
              >
          <Image 
          source={{ uri:item.photo }} 
          loadingStyle={{ size: 'large', color: Color.color_theme}}
          style={styles.profileImg} />
      </TouchableHighlight>

      <NB.View style={{  marginLeft:0,justifyContent: 'center',flex:1, }}>
            <NB.View style={{ flexDirection: 'row' }}>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}>Date: </Text> */}
              <Text style={{ color: Color.color_app, fontSize: 18 }}>{item.name}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:0, justifyContent:'flex-start', alignItems:"center"}}>
              <Text style={{ color: Color.readmore, fontSize: 14 }}>Reminder: </Text>
              <Icon name =  { item.remindar_staus === '1' ? 'toggle-on': "toggle-off"} style = {{  marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 25,color: item.remindar_staus === '1' ? 'green': Color.readmore,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View>

            <TouchableOpacity style = { { position: 'absolute', top: 0, right: 0, width:40, height:40, justifyContent:'center',alignItems:'center'}} 
            onPress={()=>{
              console.log('Clicked.... medicine')
              this.createDeleteAlert('medicine', item.id)
            }}
            >
            <NB.View >
              <Icon name = "trash" style = {{fontSize: 18,color: '#f35d5d',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View>

            </TouchableOpacity>


            

      </NB.View>
      </NB.View>
      
    
    </TouchableOpacity>   
    )

renderImageItem = ({ item , index}) => (
<NB.View>
  <NB.View style = {{ borderColor: '#0099cb', borderWidth:2, borderRadius:5, marginRight:10}
  } >
  {/* <Image  style={{ width: 175, height:205}} source={{uri:item.image_uri} }/> */}
  
    <ImageLoad 
        source={ { uri:item.photo }}
        loadingStyle={{ size: 'large', color: Color.color_theme}}
        style={{height:202, width:205}}/> 
  
    <NB.View style = {
      {
        position: 'absolute',
        bottom: 5,
        right: 5,
        
      }
    } >
    <Button Button onPress = {() => { 
      this.showFullImage(item, index) }} 
      style={{ backgroundColor: '#0099cb', width:35, height:35, justifyContent:'center', alignItems:'center' }} >
      <Icon
        name = "expand-arrows-alt"
        style={{fontSize: 25,color: 'white',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
      />
    </Button>
    </NB.View>


  </NB.View>
</NB.View> 
)


showFullImage(item, index){
  Actions.FullImageScreen({
    title: 'Prescription',
    photo: item.photo,
    prescription_photo: this.state.prescription_photo,
    index: index
  })

}

// ===============================================================================
createDeleteAlert = (type, id) =>
  Alert.alert(
    "Do you want to Delete?",
    '',
    [{
        text: "Delete",
        onPress: () => {
        this.deleteApiResponse(type,id)
        
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

  itemClicked(item) {
    console.log('######## ???' + item.name + ' item.dob ' + item.dob)
    Actions.MedicineDetailsScreen({
      medicine_id: item.id,
    })
  }

  itemClickedReportDetails(item) {
    console.log('######## ???')
    Actions.ReportDetailsScreen({
      report_id: item.id
    })
  }

  updatePrescription(){
    Actions.EditPrescriptionScreen({
      prescription_id: this.state.prescription_id,
      patient_id: this.state.patient_id,
      action_type: 'edit',
      prescribe_by: '',
      description: '',
      day: '',
      month: '',
      year: '',
      image_list: [],
      prescription_photo: [],
      patient_name: this.state.patient_name,
      screen_form: 'prescription_details',
      doctor_profile_image: this.state.doctor_profile_image
    });
  }



  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => {
                Actions.pop()
                Actions.pop()
                Actions.PrescriptionListScreen({
                  patient_id: this.state.patient_id,
                  patient_name: this.state.patient_name,
                })

              }} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      
      var right = (
      <Right style={{flex:1}}>
        <TouchableOpacity
          onPress={() => {this.updatePrescription()}} >
          <NB.Text style={{ color:'white', fontSize:14 }}>EDIT</NB.Text>
        </TouchableOpacity>       
      </Right> );

    this.props.navigation.addListener(
      'didFocus',
      payload => {

        if(!this.state.isLoading){
          this.getApiResponse();
        }

        console.log("Payload is called .....................Prescription details: ", (!this.state.isLoading))
      }
    );

  return (
    <SafeAreaView
      style={{backgroundColor: Color.color_theme, paddingBottom: -5}}>
      <Navbar left={left} right={right} title="Prescription Detials" />
      <ScrollView
        style={{backgroundColor: Color.chrome_grey,height: '92%',width: '100%', }}>

        <NB.View style={{backgroundColor: Color.chrome_grey, width: '100%', marginBottom:10, marginTop:10}}>
          
          {/* End Top Section  */}
          <NB.View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              marginRight: 10,
              marginLeft: 10,
              marginTop: 0,
              borderRadius: 5,
              borderBottomColor: '#e2e2e2',
              borderBottomWidth: 2
            }}>
            {
              console.log(' ######------######: ',this.state.doctor_profile_image)
            }
            <ImageLoad 
            source={ {uri:this.state.doctor_profile_image} }
              // source={{ uri: this.state.doctor_profile_image}}
              loadingStyle={{ size: 'large', color: Color.color_theme}}
              style={{height: 80,width: '20%',marginLeft: 8,marginRight: 12,marginTop: 12,marginBottom:12,}}/>

            <NB.View style={{ marginTop:12, flex:1}}>
              <NB.View style={{flexDirection: 'row'}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Date:{' '}
                </Text>
                <Text 
                numberOfLines={1}
                style={{color: '#139acc', fontSize: 14}}>
                  {' '}
                  {this.state.prescription_date}
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Prescribe by:{' '}
                </Text>
                <Text 
                numberOfLines={1}
                style={{color: '#139acc', fontSize: 14, width:205 }}>
                  {this.state.doctor_name}
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Medicine:{' '}
                </Text>
                <Text numberOfLines={1} style={{color: '#139acc', fontSize: 14}}>{this.state.medicine}</Text>
              </NB.View>
            </NB.View>
          </NB.View>

          <NB.View>
            {/*End Top Section */}

            <NB.Text style={{color: Color.color_app,fontSize: 16,marginTop: 15,marginLeft: 10,marginBottom: 15,}}>Prescription</NB.Text>

          <NB.View
            style={{marginRight: 10, marginLeft: 10,marginTop: 0, backgroundColor:'white', borderRadius: 5,
            borderBottomColor: '#e2e2e2',
            borderBottomWidth: 2}}>
            
            
            <NB.View style={{  }}>
            

              { console.log('##########-------',this.state.prescription_photo.length) }

              <FlatList
                style={{ width: '95%', height:205, marginLeft:10, marginTop:10, marginBottom:10}}
                data={this.state.prescription_photo}
                horizontal={true}
                renderItem={this.renderImageItem}
                keyExtractor={({id}, index) => id}
                keyExtractor={item => item.id}
                />


            
              {this.state.isLoading ? <Loading / > : null }
            </NB.View>

            </NB.View>

            {/* Description Section */}
            <Text
              style={{
                color: Color.color_app,
                fontSize: 16,
                marginTop: 15,
                marginLeft: 10,
                marginBottom: 5,
              }}>
              Description
            </Text>
            <NB.View
              style={{
                backgroundColor: 'white',
                padddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 20,
                margin: 10,
                height:100,
                borderRadius: 5,
                borderBottomColor: '#e2e2e2',
                borderBottomWidth: 2
              }}>
              <NB.Text
                style={{marginTop: 10, marginLeft: 10, marginRight: 10, color:'#656565', fontSize:16}}>
                {this.state.description}
              </NB.Text>
              
            </NB.View>

            {/* Medicine Section */}
            <NB.View>
              <Text
                style={{
                  color: Color.color_app,
                  fontSize: 16,
                  marginTop: 10,
                  marginLeft: 10,
                  marginBottom: 15,
                }}>
                Medicine(s)
              </Text>

              <NB.View
                style={{
                  backgroundColor: Color.color_theme,
                  padding: 5,
                  position: 'absolute',
                  top:5,
                  right: 10,
                  borderRadius: 5,
                }}>

                <TouchableOpacity
                onPress={()=>{
                  console.log(this.state.prescription_id)
                  Actions.AddMedicineScreen({
                    action_type: 'add',
                    prescription_id: this.state.prescription_id,
                    patient_id: this.state.patient_id,
                    medicine_id: '',
                  });
                  console.log('Add')
                }}>
                    <NB.Text style={{color: 'white', fontSize: 16}}>
                      Add +
                    </NB.Text>
                </TouchableOpacity>
                
                

              </NB.View>
            </NB.View>

            <NB.View
                style={ this.state.dataMedicine_info.length === 0 ? styles.medicine_view_empty: styles.medicine_view}>
              
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                style={{}}
                data={this.state.dataMedicine_info}
                renderItem={this.renderMedicineItem}
                keyExtractor={({id}, index) => id}
              />
            </NB.View>

            {/* Description Section */}
            <NB.View>
              <Text
                style={{
                  color: Color.color_app,
                  fontSize: 16,
                  marginTop: 15,
                  marginLeft: 10,
                  marginBottom: 15,
                  
                }}>
                Medical Reports
              </Text>

              <NB.View
                style={{
                  backgroundColor: Color.color_theme,
                  padding: 5,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  borderRadius: 5,
                }}>
                
                <TouchableOpacity
                onPress={()=>{
                  // Actions.AddReportScreen({
                  //   action_type: 'add',
                  //   prescription_id: this.state.prescription_id,
                  //   patient_id: this.state.patient_id,
                  //   doctor_name: this.state.doctor_name
                  // });

                  Actions.AddReportScreen({
                        prescription_id: this.state.prescription_id,
                        patient_id: this.state.patient_id,
                        doctor_name: this.state.doctor_name,
                        day: '',
                        month: '',
                        year: '',
                        description: '',
                        action_type: 'add',
                        report_type: '',
                        image_list: [],
                  })
                  console.log('Add')
                }}>
                    <NB.Text style={{color: 'white', fontSize: 16}}>
                      Add +
                    </NB.Text>
                </TouchableOpacity>

              </NB.View>
            </NB.View>

            <NB.View
              style={ this.state.dataReport_info.length=== 0 ? styles.medicine_view_empty: styles.medicine_view}>
              
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                style={{}}
                data={this.state.dataReport_info}
                renderItem={this.renderReportItem}
                keyExtractor={({id}, index) => id}
              />
            </NB.View>
          </NB.View>
          
        </NB.View>
      </ScrollView>
    </SafeAreaView>
  );
};
}
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 10,
    height: 70,
    width: 70,
    borderRadius: 40,
    marginTop:10,
    marginBottom:10,
    marginRight:10
  },
  profileImg: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  medicine_view: {
    paddingTop: 0,
    paddingBottom: 0,
    
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    
  }, 
  medicine_view_empty: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
    height:0,
    backgroundColor:'white',
    
    
  },

});