/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  AsyncStorage,
  Platform,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import ImageZoom from 'react-native-image-pan-zoom';

import {ListItem, Button, Left, Right} from 'native-base';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import NavbarBlack from '../../component/NavbarBlack';
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
import ViewPager from '@react-native-community/viewpager';
import { SafeAreaView } from 'react-navigation';



export default class FullImageScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      offset: 0,
      report_id: '',
      title: this.props.title,
      photo: this.props.photo,
      width:100,
      height:100,
      prescription_photo: this.props.prescription_photo,
      index: this.props.index
    };
  }


  componentDidMount(){
    StatusBar.setHidden(true);
    console.log(" GetParam patient_id:" + 'index :', this.props.index);
    
      AsyncStorage.getItem(AppConstant.jwt_token, (error, values) => {
        console.log("####################user_id: " + values)
        jwt_token = values
      })

      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);
        this.setState({
          width: screenWidth,
          height: screenHeight
        })
      // var image = this.state.prescription_photo[0].photo

      // Image.getSize(image, (width, height) => {
      //   var h =0
      //   var w =0

      //   if (width > screenWidth){
      //     w = screenWidth;
      //   }else{

      //   }

      //   if (height>h){
      //     h = screenHeight
      //   }

      //   console.log(" width:" + width, height, " ->> ", screenWidth, screenHeight);

      //   this.setState({
      //     width: screenWidth,
      //     height: screenHeight
      //   })

      // });      

  }


  render(){

  return (
    <Fragment SafeAreaView style = {
      {
        backgroundColor: 'black',
        height: '100%'
      }
    } >

    
    <Fragment style={{backgroundColor: 'black'}}>

      <ViewPager 
      style={styles.viewPager} 
      initialPage={this.state.index}  >

      { this.state.prescription_photo.map((item, i) => {

          return <NB.View key={i} style={{ margin:0,  justifyContent:'center', alignItems:'flex-start', marginTop: Platform.OS === 'ios' ? 0:0}}>
                  
            <ImageZoom cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={this.state.width}
              imageHeight={this.state.height}>

                <ImageLoad
                resizeMode={'contain'}
                source={{ uri:item.photo }}
                loadingStyle={{ size: 'large', color: Color.color_theme}}
                style= {{
                  width: this.state.width,
                  height: this.state.height,
                    }} 
                
                />
                </ImageZoom>
                </NB.View>
            })
        }
        
      </ViewPager>
      
    </Fragment>
      <Button 
      style={{ position:'absolute',top:20,left:15, flexDirection:'row' }}
      onPress={() => {
        StatusBar.setHidden(false);
        Actions.pop()
        }} transparent>
          <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: 'white', transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          <NB.Text style={{ color: 'white', left:10 }}>{this.state.title}</NB.Text>
      </Button>
    </Fragment>
  );
};
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor:'black'
  },
});