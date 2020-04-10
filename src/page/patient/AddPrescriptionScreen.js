/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, Fragment} from 'react';
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
  ImageBackground
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


export default class AddPrescriptionScreen extends Component {

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
        

        <Button onPress={() => {}} transparent>
          <NB.Text style={{ fontSize: 12, color: 'white' }}>SAVE</NB.Text>
        </Button>
        
      </Right>
    );

  return (
    <SafeAreaView >
      <Navbar left={left} right={right} title="Prescription" />
      <ScrollView
        style={{backgroundColor: Color.chrome_grey, height: '92%',}}>
        <NB.View>
      
          {/* Middle Section */}
          <NB.View style={{ backgroundColor:'red',  marginLeft:10, marginRight:10, marginTop:10 }}>
            <Image
              source={require('../images/pescription_image.png')}
              style={{ width: '100%',  }}
            />
            <NB.View style={{position: 'absolute', bottom: 15, right: 15}}>
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

            

          </NB.View>
          
          <NB.View >
            

            
            {/* compress - arrows - alt */}
          </NB.View>

          <NB.View style={{ backgroundColor: 'white',  marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5,    marginTop:10}}>
          <NB.Text style={{ color: Color.color_app, marginTop:20, marginBottom:20, marginLeft:15,fontSize:20 }}>Date</NB.Text>
            
            <NB.View style={{ flexDirection:'row' , justifyContent:'space-between',marginRight:15, marginLeft:15,marginBottom:30 }}>
                <ImageBackground source={require('../images/dateback.png')} style={{width: 80,  padding:5,  }}>
                  <NB.Text style={{ color: '#85858', fontSize: 18, }}>Day</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 80,  }}>
                  <NB.Text style={{ color: '#85858', fontSize: 18,  }}>Month</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 80,   }}>
                  <NB.Text style={{ color: '#85858', fontSize: 18,  }}>Year</NB.Text>
                </ImageBackground>
            </NB.View>   
          </NB.View>

          <NB.View style={{ backgroundColor: 'white',   marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5,    marginTop:10}}>
            <NB.Text style={{ color: Color.color_app, marginTop:20, marginBottom:20, marginLeft:15,fontSize:20 }}>Prescribe by</NB.Text>
            <NB.Item style={{ marginBottom:30,  marginLeft:20, marginRight:20 }}>
                <NB.Input placeholder = "Doctor Name" 
                  style={{flex:1, fontSize:18, color: Color.readmore}}
                />
            </NB.Item>
            
          </NB.View>

          <NB.View style={{ backgroundColor: 'white',  height:150, marginTop:0, marginLeft:10, marginRight:10, marginBottom: 15,    marginTop:10}}>
            <NB.Text style={{ color: Color.color_app, marginTop:25, marginBottom:20, marginLeft:15,fontSize:20 }}>Description</NB.Text>
            
            <NB.Item style={{ marginBottom:30,  marginLeft:20, marginRight:20 }}>
                <NB.Input placeholder = "Description note"
                style={{flex:1, fontSize:18, color: '#85858'}} />
            </NB.Item>
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