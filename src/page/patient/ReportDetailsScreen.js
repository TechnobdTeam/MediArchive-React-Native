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
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/LoginHomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'

var DATA = DATA = [{
    id: '1',
    title: String.nav_home,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/1.png'
  },
  {
    id: '2',
    title: String.nav_patient,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/2.png'
  },

  {
    id: '3',
    title: String.nav_medicine,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/3.png'
  },
  {
    id: '4',
    title: String.nav_profile,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
  },
  // {
  //   id: '5',
  //   title: String.nav_login,
  //   logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  // },

];


export default class ReportDetailsScreen extends Component {

  constructor(props){
    super(props)
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
        <Button onPress={() =>{}} transparent>
          
          <Icon name='edit'  style={{fontSize: 20,color: "#fff",transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> 
          
        </Button>

        <Button onPress={() => {}} transparent>
          <Icon name='trash' style={{fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
        </Button>
        
      </Right>
    );

  return (
    <SafeAreaView>
      <Navbar left={left} right={right} title="Report" />
      <ScrollView style={{backgroundColor: Color.chrome_grey, height:'92%' }}>
        
        <NB.View style={{  }}>


          {/* Top Section */}
          <NB.View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',marginRight: 10, marginLeft: 10,marginTop: 10,
            }}>
            <Image
              source={require('../images/happydoctor.jpg')}
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
                  {' '}
                  31 Dec 2020
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Prescribe by:{' '}
                </Text>
                <Text style={{color: '#139acc', fontSize: 14}}>
                  Dr. Shopon Chandro Dhor
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row',marginTop:2}}>
                <Text style={{color: '#7e7e7e', fontSize: 14}}>
                  Medecine:{' '}
                </Text>
                <Text style={{color: '#139acc', fontSize: 14}}>7</Text>
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
                paddingBottom: 5,
                paddingTop: 10,
                marginLeft: 10,
              }
            } >
            <Image
              source={require('../images/doctor_pescription.jpg')}
              style={{ width: '100%',}}
            />

          </NB.View>

            

            <NB.View style={{position: 'absolute', bottom: 40, right: 20}}>
              <Icon
                name="compress-arrows-alt"
                style={{
                  paddding: 5,
                  fontSize: 30,
                  backgroundColor: '#0099cb',
                  color: Color.white,
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
            </NB.View>
            {/* compress - arrows - alt */}
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
                style={{marginTop: 10, marginLeft: 10, marginRight: 10, color:'#656565', fontSize:16}}>
                Description goes here if any. Description goes here if any.
              </NB.Text>
              <NB.Text
                style={{marginTop: 10, marginLeft: 10, marginRight: 10,color:'#656565', fontSize:16}}>
                Description goes here if any. Description goes here if any.
              </NB.Text>
            </NB.View>



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