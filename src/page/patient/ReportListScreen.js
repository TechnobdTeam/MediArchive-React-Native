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
  Alert, Platform
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


import ImageLoad from 'react-native-image-placeholder';


export default class ReportListScreen extends Component {

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
      report_id: '',
      filter_click: false,
      filter_by_doctor: false,
      filter_by_date: false,
      type_name: 'Date (Z-A)',
      patient_name: this.props.patient_name
    };
  }


  componentDidMount(){
    console.log(" GetParam patient_id:" + this.state.patient_id );
    
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################user_id: " + values)
        jwt_token = values

        if(values != null && values !=''){
          this.setState({
            dataSource:[]
          })  
        }

        this.timeoutHandle = setTimeout(() => {
          this.getApiResponse('getReportList')
        }, 200);
        
      })
  }


  getApiResponse(method_name) {
    this.setState({
      isLoading: true
    })

    console.log("p------------------:" + method_name, ' --- ', this.state.patient_id);

    var Authorization = 'Bearer ' + jwt_token
    var URL = '';
    var formData = new FormData()

    if (method_name === 'getReportList') {
      URL = AppConstant.BASE_URL + "prescription/getReportList";
    } else if (method_name === 'deleteReport') {
      URL = AppConstant.BASE_URL + "prescription/deleteReport";
      formData.append('report_id', this.state.report_id);
    }

    
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();

    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    formData.append('offset', this.state.offset);
    // formData.append('prescription_date', this.state.prescription_date);
    formData.append('patient_id', this.state.patient_id);
    formData.append('order_type', this.state.order_type);


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

            if (method_name === 'getReportList') {
              if (responseJson.response.type === "success") {
                this.setState({
                  isLoading: false,
                  dataSource: this.state.offset === 0 ? responseJson.response.data : [...this.state.dataSource, ...responseJson.response.data],
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                });

              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
                // alert(responseJson.response.message);
              }

            
            } else if (method_name === 'deleteReport') {
              if (responseJson.response.type === "success") {
                this.setState({
                  isLoading: false,
                  dataSource: [],
                  loading: false,
                  refreshing: false,
                  onEndReachedCalledDuringMomentum: false,
                });

                alert(responseJson.response.message);

                this.timeoutHandle = setTimeout(() => {
                  this.getApiResponse('getReportList');
                }, 200);


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

  Item({ id, title }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}


// ----------------------------------------------------------------------------
  ListEmpty = () => {
    if(!this.state.isLoading ){
      return (
        <EmptyMessage message={'Add report from Prescription Details.'}></EmptyMessage>
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
          this.getApiResponse('getReportList');
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
              this.getApiResponse('getReportList');
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
createThreeButtonAlert = (item) =>
    Alert.alert(
      "Do you want to Delete?",
      ('Report: '+item.type),
      [
        {
          text: "Delete",
          onPress: () => {

            this.setState({
              offset: '0',
              dataSource: [],
              report_id: item.id
            })

            this.timeoutHandle = setTimeout(() => {
              this.getApiResponse('deleteReport');
            }, 200);

            console.log("Delete " + item.type)
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
        ,
        { text: "Update", 
        onPress: () =>{

            // Actions.EditReportScreen({
            //   action_type: 'edit',
            //   report_id: item.id,
            // });

            // {
            //   "id": "78161600-010a-41a7-8e94-6f161e272577",
            //   "patient_id": "173a2f64-60d5-47f8-b943-b1f4b5dd11ab",
            //   "prescription_id": "c97a0e21-14c2-401c-8a48-b76b8a36cf42",
            //   "type": "Blood report",
            //   "prescribe_by": "Mustafizur Rahman",
            //   "attachment": 2,
            //   "description": "Hemoglobin test",
            //   "added": "18 May, 2020",
            //   "report_photo": "https://mediarchive.technobd.com/assets/media/report_photo/1589801052.jpeg"
            // }

            Actions.EditReportScreen({
              prescription_id: item.prescription_id,
              patient_id: item.patient_id,
              doctor_name: item.prescribe_by,
              day: '',
              month: '',
              year: '',
              description: item.description,
              action_type: 'edit',
              report_type: '',
              image_list: [],
              report_photo:[],
              report_id: item.id,
              patient_name: this.state.patient_name,
              screen_from:'report_list',

            })

          console.log("OK Pressed") 
        }}
      ],
      { cancelable: false }
    );  


itemClicked(item) {
    console.log('######## ???' )
    Actions.ReportDetailsScreen({
      report_id: item.id
    })
  }

  renderItem = ({ item }) => (
    <TouchableHighlight 
    style={{ marginBottom:5, 
        backgroundColor:'white', 
        borderRadius: 5,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 2 }} >
    <ListItem style={{marginLeft:0, marginRight:0, }}
      onPress = {() => {this.itemClicked(item)}}
      key={item.id}
      button={true}>
      <NB.View style= {{ flexDirection:'row', flex:1, justifyContent:'flex-start' }}>
      

      <NB.View style={{ width:70, height:70, marginLeft:8, marginRight:12 }}>
        <ImageLoad 
          source={ {uri:item.report_photo} }
          loadingStyle={{ size: 'large', color: Color.color_theme}}
          style={{  height: 70, width:70,  }}
        />
    

      </NB.View>

      <NB.View style={{ flex:1 }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Date: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}>{item.added}</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:2 }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Type: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}>{item.type}</Text>
            </NB.View>

            

            <NB.View style={{ marginTop:2 }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Description: {item.description}  </Text>
              {/* <Text numberOfLines={2} style={{ color: '#545454', fontSize: 14,height:35, marginTop:2  }}>{item.description}</Text> */}
            </NB.View>

            {/* <NB.View style={{ position: 'absolute', top:0, right:-5 }}>
              <Icon name = "trash" style = {{fontSize: 18,color: '#f35d5d',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View> */}

      <TouchableOpacity  
          onPress = {() => {this.createThreeButtonAlert(item)}}
          style = {{
              position: 'absolute',
              top: 0,
              right:-20,
              width:40,
              height:40,
              alignItems:'center'
            }} >
        <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 18,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

      </TouchableOpacity>

            

      </NB.View>

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )

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

      // this.props.navigation.addListener(
      //   'didFocus',
      //   payload => {

      //     if (!this.state.isLoading) {
      //       this.timeoutHandle = setTimeout(() => {
      //         this.getApiResponse('getReportList')
      //       }, 2000);
      //     }

      //     console.log("Payload is called .....................Prescription details: ", (!this.state.isLoading))
      //   }
      // );

  return (
    <SafeAreaView style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title={this.state.patient_name} />
      <NB.View
        style={{backgroundColor: Color.chrome_grey, height: '92%'}}>

        
      <NB.View style={{backgroundColor: Color.chrome_grey}}>
        <NB.Text
          style={{color: '#049ccc', marginTop: 20, marginLeft: 10, fontSize:16}}>
          Reports
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
            //   this.getApiResponse('getReportList');
            // }, 200);

            this.setState({
              filter_click: this.state.filter_click === true ? false : true
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


        {/* <FlatList
          contentContainerStyle={{flexGrow: 1}}
          style={{marginLeft: 10, marginRight: 10, marginTop: 20}}
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
        /> */}

        <FlatList
        style={{marginLeft: 10, marginRight: 10, marginTop: 20, height: '92%', marginBottom:30}}
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

        
      </NB.View>


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
                this.getApiResponse('getReportList');
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
                this.getApiResponse('getReportList');
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
              this.getApiResponse('getReportList');
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
      
        {/* <TouchableOpacity
          onPress={
            ()=>{
              // "id": "0dd83d4d-94cb-4d52-80d3-58d5763687f4",
              // "prescription_id": "c89412cd-92ed-4e57-bf44-c6ca1606027f",
              // "report_id": "2147483647",
              // "patient_id": "f019b0c2-799b-4216-81f7-a40fac1a93f8",
              Actions.EditMedicineScreen({
                action_type: 'edit',
                patient_id: item.patient_id,
                prescription_id: item.prescription_id
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
        </TouchableOpacity> */}

        { ( this.state.isLoading && !this.state.refreshing ) ? <Loading / > : null }
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Color.lighter,

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Color.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Color.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Color.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  profileImgContainer: {
      marginLeft: 5,
      height: 70,
      width: 70,
      borderRadius: 40,
      marginTop: 0
    },
    profileImg: {
      height: 70,
      width: 70,
      borderRadius: 40,
    },
    round_select: {
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
        borderWidth: 2,
        backgroundColor: Color.white
      }
});

