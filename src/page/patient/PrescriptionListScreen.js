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
  FlatList,
  I18nManager,
  TouchableOpacity, 
  TouchableHighlight,
  AsyncStorage, 
  Platform,
  Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'


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



export default class PrescriptionListScreen extends Component {

  constructor(props){
    super(props)
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
      onEndReachedCalledDuringMomentum: false,
      patient_id: this.props.patient_id,
      prescription_date:'2020-02-02',
      order_type: 'desc',
      prescription_id:'',
      api_type:'',
      filter_click: false,
      filter_by_doctor:false,
      filter_by_date:false,
      type_name: 'Date (Z-A)'
    };
  }


  componentDidMount(){
    console.log(" GetParam patient_id:" + this.state.patient_id );
    
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################user_id: " + values)
        jwt_token = values

        if(values != null && values !=''){
          this.setState({
            dataSource:[],
            api_type: 'getPrescriptionList'
          })  
          this.timeoutHandle = setTimeout(() => {
            this.getApiResponse()
          }, 200);
        }
        
      })
  }


  getApiResponse() {
    this.setState({
      isLoading: true
    })

    console.log(" prescription/getPrescriptionList type:" 
    + jwt_token,
    );

    var Authorization = 'Bearer ' + jwt_token
    var URL = '';
    var formData = new FormData()

    if (this.state.api_type === 'deletePrescription') {
      URL = AppConstant.BASE_URL + "prescription/deletePrescription";
      formData.append('prescription_id', this.state.prescription_id);
    } else if (this.state.api_type === 'getPrescriptionList') {
      URL = AppConstant.BASE_URL + "prescription/getPrescriptionList";
      formData.append('offset', this.state.offset);
      // formData.append('prescription_date', this.state.prescription_date);
      formData.append('patient_id', this.state.patient_id);
      formData.append('order_type', this.state.order_type);
    }

    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();

    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);

    console.log('patient_id: ' + this.state.patient_id, 
    ' device_uuid: ', device_uuid,
    ' order_type: ', this.state.order_type

    )


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

            if (this.state.api_type === 'getPrescriptionList') {
                if (responseJson.response.type === "success") {
                this.setState({
                  isLoading: false,
                  dataSource: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataSource, ...responseJson.response.data],       
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                });
                console.log(" ???? :" + this.state.dataSource.length 
                + ' ???? ' + responseJson.response.data.length
                +' #### : ' + responseJson.response.total_prescription);

                } else if (responseJson.response.type === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  // alert(responseJson.response.message);
                }
            } else if (this.state.api_type === 'deletePrescription') {
              if (responseJson.response.type === "success") {
                this.setState({
                  isLoading: false,
                  dataSource: [],
                  offset:'0',
                  api_type: 'getPrescriptionList'
                });
                alert(responseJson.response.message);
                
                this.timeoutHandle = setTimeout(() => {
                  this.getApiResponse()
                }, 200);

                } else if (responseJson.response.type === "error") {
                  this.setState({
                    isLoading: false,
                  });
                  alert(responseJson.response.message);
                }

              }



          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
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
      <Text >{title}</Text>
    </TouchableOpacity>
  );
}


// ----------------------------------------------------------------------------
  ListEmpty = () => {
    if(!this.state.isLoading ){
      return (
        <EmptyMessage message={'Press plus icon to add prescription.'}></EmptyMessage>
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
      api_type: 'getPrescriptionList',
      refreshing: true,
      isLoading: true,
      onEndReachedCalledDuringMomentum: false,      
    },
    () => {
      NetInfo.fetch().then(state => {
              

        if(state.isConnected){
          this.timeoutHandle = setTimeout(() => {
            this.getApiResponse()
          }, 200);
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
          api_type: 'getPrescriptionList',
        },
        () => {
          NetInfo.fetch().then(state => {            
    
            if(state.isConnected){
              this.timeoutHandle = setTimeout(() => {
                this.getApiResponse()
              }, 200);
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
  itemClicked(item) {
    console.log('######## ???' + item.name + ' item.dob ' + item.dob)
    Actions.PrescriptionDetailsScreen({
      prescription_id: item.id
    })
  }


  renderItem = ({ item }) => (
    <TouchableHighlight TouchableHighlight style = {
      {
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 2
      }
    } >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress = {() => {this.itemClicked(item)}} >
      <NB.View style= {{ flexDirection:'row' ,justifyContent:'flex-start'}}>
      <NB.View style={{ height: 80, width: 80,marginLeft:8,marginRight:12,marginTop:1, }}>


        <ImageLoader 
        onLoadEnd={() => {
          console.log('@@@@@-------------@@@@@ ImageLoader')
          }}
          source={ item.doctor_profile_image }
          fallback={ fallbacks }
          style={{flex:1,  height: 80,width:80, justifyContent:'center', marginRight:2}}/>

      </NB.View>
      

      

      <NB.View style={{ width:'75%' }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Date: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14 }}> {item.added}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' , marginTop:2}}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Prescribe by: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14, width:'70%',}}>{item.prescribe_by}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row',marginTop:2 }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Medicine: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14 }}>{item.medicine}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:2 }}>
              <Text numberOfLines={2} style={{ color: '#7e7e7e', fontSize: 14,width:270,  }}>Description: {item.description} </Text>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}> </Text> */}
            </NB.View>

            {/* "prescribe_by": "Salimur Rahman(Gestro Liver)",
            "medicine": 0,
            "description": "Minor fiver problem",
            "id": "c4f93580-08cb-468f-8d2f-75a97bf089e6",
            "added": "02 Feb 2020",
            "doctor_profile_image": "https://mediarchive.technobd.com/assets/media/doctor_photo/no-image.jpg" */}

            {/* <NB.View style={{ position: 'absolute', top: -15, right: 10 }}>
              <Button onPress = {
                () => Actions.EditPrescriptionScreen({
                  patient_id: this.state.patient_id,
                  action_type: 'edit',

                  prescribe_by: item.prescribe_by,
                  medicine: item.medicine,
                  description: item.description,
                  prescription_id: item.id,
                  added: item.added,
                  doctor_profile_image: item.doctor_profile_image,
                })
              }
              transparent >
                  <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 15,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </NB.View> */}

      <TouchableOpacity TouchableOpacity 
      onPress = {() => {this.createThreeButtonAlert(item)}}
      style = {{
          position: 'absolute',
          top: -10,
          right: Platform.OS === 'ios' ? -10 : 0,
          width:40,
          height:40,
          justifyContent:'center',
          alignItems:'center'
        }} >
        <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 18,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

      </TouchableOpacity>

            

      </NB.View>

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )




// ===============================================================================
createThreeButtonAlert = (item) =>
    Alert.alert(
      "Do you want to Update or Delete?",
      '',
      [
        {
          text: "Delete",
          onPress: () => {

            this.setState({
              prescription_id: item.id,
              api_type: 'deletePrescription',
            })

            this.timeoutHandle = setTimeout(() => {
              this.getApiResponse('deletePrescription');
            }, 200);

            console.log("Delete " + item.medicine_name)
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Update", 
        onPress: () =>{
            // Actions.EditPrescriptionScreen({
            //   patient_id: this.state.patient_id,
            //   action_type: 'edit',

            //   prescribe_by: item.prescribe_by,
            //   medicine: item.medicine,
            //   description: item.description,
            //   prescription_id: item.id,
            //   added: item.added,
            //   doctor_profile_image: item.doctor_profile_image,
            // });

            Actions.EditPrescriptionScreen({
                prescription_id: item.id,
                patient_id: this.state.patient_id,
                action_type: 'edit',
                prescribe_by: '',
                description: '',
                day: '',
                month: '',
                year: '',
                image_list: [],
                prescription_photo:[],
            });



          console.log("OK Pressed") 
        }}
      ],
      { cancelable: false }
    );  

  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => {
                Actions.pop()
                Actions.pop()

                Actions.PatientProfileScreen({
                  patient_id: this.state.patient_id,
                  blood_group: '',
                  gender: '',
                  age: '',
                  photo: '',
                  p_name: '',
                  p_dob: '',
                })

                }} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} />;

  return (
    <SafeAreaView style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title="Prescriptions" />
      <NB.View
        style={{backgroundColor: Color.chrome_grey, height: '92%'}}>

        
      <NB.View style={{backgroundColor: Color.chrome_grey}}>
        <NB.Text
          style={{color: '#049ccc', marginTop: 20, marginLeft: 10, fontSize:16}}>
          Prescriptions
        </NB.Text>

        <NB.View
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            flexDirection: 'row',
          }}>
          <NB.Text style={{color: '#049ccc', textAlign:'center',marginTop:10}}>Filter by: {this.state.type_name}</NB.Text>

          <Button onPress={() => {
            // var type= '';
            // if (this.state.order_type === 'asc'){
            //   type = 'desc'
            // }else{
            //   type = "asc"
            // }
            // this.setState({
            //   offset:'0',
            //   dataSource:[],
            //   order_type: type
            // })

            // this.timeoutHandle = setTimeout(() => {
            //   this.getApiResponse();
            // }, 200);
            this.setState({
              filter_click: this.state.filter_click === true ? false: true
            })
            
            
          }} transparent>
          <Icon
            name= { this.state.order_type=== 'desc' ? "sort-amount-up" : "sort-amount-down"}
            style={{
              color: Color.color_change,
              marginLeft: 10,
              fontSize: 20,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            }}
          />
          </Button>
          
        </NB.View>


        <FlatList
        style={{marginLeft: 10, marginRight: 10, marginTop: 20, height:'92%',  marginBottom:30}}
        contentContainerStyle={{ flexGrow: 1 }}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        keyExtractor={({id}, index) => id}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        ListEmptyComponent={this.ListEmpty}    
      />

    { this.state.filter_click ? 

    <NB.View style = {
      {
        position: 'absolute',
        top: 50,
        right: 12,
        backgroundColor:'white',
        height:140,
        width:150
      }
    } >

    
          <NB.Content >

          <TouchableOpacity
          style={{ flexDirection:'row', height:25, justifyContent:'flex-start' , marginTop:20,marginLeft:20}}
          onPress={()=>{
              console.log('' + this.state.filter_by_date)

              var type = 'asc';
              this.setState({
                offset:'0',
                dataSource:[],
                order_type: type,
                filter_click: false,
                type_name: 'Date (A-Z)'
              })

              this.timeoutHandle = setTimeout(() => {
                this.getApiResponse();
              }, 200);

            }}>
            <NB.View
              style={this.state.order_type === 'asc' ? styles.round_select: styles.round_deselect}
            />
            <NB.Text style={{ marginLeft:20, size:16 }}>Date (A-Z)</NB.Text>
          

          </TouchableOpacity>

          <TouchableOpacity
          style={{ flexDirection:'row', height:25, justifyContent:'flex-start' , marginTop:15,marginLeft:20}}
          onPress={()=>{
              console.log('' + this.state.filter_by_date)
              // this.setState({
              //   filter_by_date: true,
              //   filter_by_doctor: false
              // })

              var type = 'desc';
              this.setState({
                offset: '0',
                dataSource: [],
                order_type: type,
                filter_click: false,
                type_name: 'Date (Z-A)'
              })

              this.timeoutHandle = setTimeout(() => {
                this.getApiResponse();
              }, 200);
            }}>
            <NB.View
              style={this.state.order_type === 'desc' ? styles.round_select: styles.round_deselect}
            />
            <NB.Text style={{ marginLeft:20, size:16 }}>Date (Z-A)</NB.Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{ flexDirection:'row', height:25, justifyContent:'flex-start' , marginTop:15, marginLeft:20}}
          onPress={()=>{
            console.log('' + this.state.filter_by_doctor)
            // this.setState({
            //   filter_by_date: false,
            //   filter_by_doctor: true
            // })
            var type = 'doctor';
            this.setState({
              offset: '0',
              dataSource: [],
              order_type: type,
              filter_click: false,
              type_name: 'Doctor'
            })

            this.timeoutHandle = setTimeout(() => {
              this.getApiResponse();
            }, 200);
          }}>

          <NB.View
              style={this.state.order_type === 'doctor' ? styles.round_select: styles.round_deselect}
            />
            <NB.Text style={{ marginLeft:20, size:16 }}>Doctor</NB.Text>

          </TouchableOpacity>

          
        </NB.Content>

        </NB.View>

        : null
        }

        
      </NB.View>


      
      </NB.View>
      
        <TouchableOpacity
          onPress={
            ()=>{
              Actions.AddPrescriptionScreen({
                patient_id : this.state.patient_id, 
                action_type:'add',
                prescribe_by: '',
                description: '',
                day: '',
                month: '',
                year: '',
                image_list: []
                });
            }
          }
          
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

        { this.state.isLoading ? <Loading / > : null }
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  
  round_select:
  {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: Color.color_theme
  },
  round_deselect: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderColor: Color.color_theme,
    borderWidth:2,
    backgroundColor: Color.white
  }
});

