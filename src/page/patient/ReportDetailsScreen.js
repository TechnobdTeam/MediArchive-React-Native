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
  AsyncStorage, Platform,
  StatusBar
} from 'react-native';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';
import {Actions} from 'react-native-router-flux';
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

export default class ReportDetailsScreen extends Component {

  constructor(props){
    super(props)

    // Actions.EditReportScreen({
    //   prescription_id: this.state.prescription_id,
    //   patient_id: this.state.patient_id,
    //   doctor_name: this.state.doctor_name,
    //   day: '',
    //   month: '',
    //   year: '',
    //   description: item.description,
    //   action_type: 'edit',
    //   report_type: '',
    //   image_list: [],
    //   report_photo: [],
    //   report_id: this.state.report_id,
    //   patient_name: '',
    //   screen_from: 'report_list',
    // })

    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      dataSource: {},
      error: null,
      title: 'Home',
      isLoading: false,
      isConnected: false,
      report_id: this.props.report_id,
      prescribe_by: '',
      date: '',
      type: '',
      description:'',
      doctor_profile_image:'',
      report_photo: [],
      prescription_id:''

    };

  }

    componentDidMount(){
      StatusBar.setHidden(false);
    console.log(" GetParam patient_id:" + this.state.patient_id );
    
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################user_id: " + values)
        jwt_token = values

        if(values != null && values !=''){
          this.setState({
            dataSource:[]
          })  
        }
        this.getApiResponse()
      })
  }


  getApiResponse() {
    this.setState({
      isLoading: true
    })



    var Authorization = 'Bearer ' + jwt_token
    var URL = AppConstant.BASE_URL + "prescription/getReportInfo";

    var formData = new FormData()
    formData.append('api_key', this.state.api_key);
    let device_uuid = DeviceInfo.getUniqueId();

    formData.append('device_type', this.state.device_type);
    formData.append('device_uuid', device_uuid);
    // formData.append('offset', this.state.offset);
    formData.append('report_id', this.state.report_id);
    // formData.append('order_type', this.state.order_type);

    console.log("#####getReportInfo report_id:" + this.state.report_id, ' device_uuid: ' + device_uuid);

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
            this.setState({
              isLoading: false,
              dataSource: responseJson.response.data,
              prescribe_by: responseJson.response.data.prescribe_info.prescribe_by,
              date: responseJson.response.data.prescribe_info.date,
              type: responseJson.response.data.prescribe_info.type,
              description: responseJson.response.data.description,
              report_photo: responseJson.response.data.report_photo,
              doctor_profile_image: responseJson.response.data.prescribe_info.doctor_profile_image,
              prescription_id: responseJson.response.data.prescribe_info.prescription_id
            });

              
            this.setState({
              isLoading: false,
            });

            console.log(" ???? :" + this.state.dataSource.length 
            + ' ???? ' + responseJson.response.data.length
            +' #### : ' + responseJson.response.total_prescription+
            'report_photo: ' + responseJson.response.data.report_photo[0]);

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

  renderImageItem = ({ item , index}) => (
  <NB.View>
    <NB.View style = {{ borderColor: '#0099cb', borderWidth:2, borderRadius:5, marginRight:10}
    } >
    {/* <Image  style={{ width: 175, height:205}} source={{uri:item.image_uri} }/> */}
    
      <ImageLoad 
          source={{ uri: item.photo } }
          loadingStyle={{ size: 'large', color: Color.color_theme}}
          style={{height:175, width:205}}/> 
    
      <NB.View style = {
        {
          position: 'absolute',
          bottom: 5,
          right: 5,
        }
      } >
      <Button Button onPress = {() => { 
        this.showFullImage(item.photo, index) }} 
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


  showFullImage(item, index) {
    Actions.FullImageScreen({
      title: 'Report',
      photo: item,
      prescription_photo: this.state.report_photo,
      index: index
    })

  }

  updateReport(){
            Actions.EditReportScreen({
              prescription_id: this.state.prescription_id,
              patient_id: '',
              doctor_name: this.state.doctor_name,
              day: '',
              month: '',
              year: '',
              description: this.state.description,
              action_type: 'edit',
              report_type: '',
              image_list: [],
              report_photo:[],
              report_id: this.state.report_id,
              patient_name: '',
              screen_from: 'report_details',
            })
  }

  render(){
      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      
      var right = (
      <Right style={{flex:1}}>
          <TouchableOpacity
            onPress={() => {this.updateReport()}} >
            <NB.Text style={{ color:'white', fontSize:14 }}>EDIT</NB.Text>
          </TouchableOpacity> 
        
      </Right>
    );

  return (
    <SafeAreaView style = {{backgroundColor: Color.color_theme}} >
      <Navbar left={left} right={right} title="Report Details" />
      <ScrollView style={{backgroundColor: Color.chrome_grey, height:'92%' }}>
        
        <NB.View style={{  }}>


          {/* Top Section */}
          <NB.View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',marginRight: 10, marginLeft: 10,marginTop: 10,
            }}>
            <ImageLoad
              source={ {uri:this.state.doctor_profile_image}}
              loadingStyle={{ size: 'large', color: Color.color_theme}}
              style={{
                height: 80,
                width: '20%',
                marginLeft: 8,
                marginRight: 12,
                marginTop: 12,
                marginBottom:12,  
              }}
            />

            <NB.View style={{ marginTop:12, flex:1}}>
              <NB.View style={{flexDirection: 'row'}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Date:{' '}
                </Text>
                <Text style={{color: '#139acc', fontSize: 14}}>
                  
                  {this.state.date}
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Prescribe by:{' '}
                </Text>
                <Text numberOfLines={1} style={{color: '#139acc', fontSize: 14, width:200,}}>
                  {this.state.prescribe_by}
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Type: 
                </Text>
                <Text style={{color: '#139acc', fontSize: 14}}>
                  {this.state.type}
                </Text>
              </NB.View>
              
            </NB.View>
          </NB.View>

          {/* Middle Section */}
          <Text
            style={{
              color: Color.color_app,
              fontSize: 16,
              marginTop: 15,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            Report
          </Text>
          <NB.View>

          <NB.View 
            style = {
              {
                marginTop: 10,
                backgroundColor: 'white',
                marginRight: 10,
                marginLeft: 10,
              }
            } >
            

            <FlatList
              style={{ width: '100%', height:205,}}
              data={this.state.report_photo}
              horizontal={true}
              renderItem={this.renderImageItem}
              keyExtractor={({id}, index) => id}
              keyExtractor={item => item.id}
            />

          </NB.View>

          </NB.View>

          {/* Description Section */}
          <Text
            style={{
              color: Color.color_app,
              fontSize: 16,
              marginTop: 15,
              marginLeft: 10,
              marginBottom: 10,
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

              }}>
              <NB.Text
                style={{marginTop: 10, marginLeft: 10, marginRight: 10, color:'#656565', fontSize:16,height:80}}>
                {this.state.description}
              </NB.Text>
              {/* <NB.Text
                style={{marginTop: 10, marginLeft: 10, marginRight: 10,color:'#656565', fontSize:16}}>
                Description goes here if any. Description goes here if any.
              </NB.Text> */}
            </NB.View>

          { this.state.isLoading ? <Loading / > : null }

        </NB.View>
      </ScrollView>
    </SafeAreaView>
  );
};
}
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop:0
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});