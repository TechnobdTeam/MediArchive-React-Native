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
  ImageBackground,
} from 'react-native';

import {Actions} from 'react-native-router-flux';



import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/PataintStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'


export default class EditPatientScreen extends Component {

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

      var right = <Right style={{flex: 1}} > 
                <Button onPress={() => Actions.pop()} transparent>
                  <NB.Text style={{ color:'white', fontSize:12 }}>SAVE</NB.Text>
                </Button>
                  </Right>


  return (
    <SafeAreaView>
      <Navbar left={left} right={right} title={String.nav_profile} />
      
      <NB.View style={{ backgroundColor: '#f3f7fa', width:'100%', height:'100%', }}>
        


        <NB.View style={{ justifyContent:'center',alignItems:'center' ,marginTop:20,marginBottom:30}}>
            <TouchableHighlight
                          style={[styles.profileImgContainer, {  }]}
                        >

                    <NB.View>
                    <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                    <NB.View style={{ position: 'absolute', bottom: 0, right: 0 }}>

                      
                      <NB.View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60 / 2,
                            backgroundColor: Color.color_theme,
                            borderColor: Color.color_theme,
                            borderWidth: 3,
                            alignItems: 'center', 
                            justifyContent:'center',
                          }}>

                          <Icon name = "camera" style = {{fontSize: 25,color: Color.white ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>



                      </NB.View>
                    </NB.View>
                    </NB.View>    
                    
            </TouchableHighlight>

            

        </NB.View>
        


        <NB.View style={{ backgroundColor: 'white',  height:170, marginTop:10, marginLeft:10, marginRight:10,  alignItems: 'center',  }}>
            
              <NB.Item style={{ marginBottom:30, marginTop:20, marginLeft:20, marginRight:20 }}>
                <NB.Input placeholder = "Patient Name Goes here" / >
              </NB.Item>
            {/* <NB.Text style={{ color : Color.color_theme, fontSize:18, marginTop:10 }}>Jane Alam</NB.Text> */}
            <NB.View style={{ flexDirection:'row' ,marginTop:5 , justifyContent:'space-around'}}>
                <ImageBackground source={require('../images/dateback.png')} style={{width: 140,  padding:5, marginRight:20}}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginRight:30, marginLeft:10}}>Gender:</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 140,  padding:5,marginLeft:20}}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginLeft: 5,marginLeft:10 }}>Blood Group</NB.Text>
                </ImageBackground>

            </NB.View>

        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:150, marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5,    marginTop:10}}>
          <NB.Text style={{ color: Color.color_app, marginTop:25, marginBottom:20, marginLeft:15,fontSize:20 }}>Date Of Birth</NB.Text>
            
            <NB.View style={{ flexDirection:'row' ,marginTop:5 , justifyContent:'space-around'}}>
                <ImageBackground source={require('../images/dateback.png')} style={{width: 120,  padding:5,  }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginRight:30, marginLeft:10}}>Day</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 120,  }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginLeft: 5,marginLeft:10 }}>Month</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 120,   }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginLeft:20 }}>Year</NB.Text>
                </ImageBackground>

            </NB.View>

                    
        </NB.View>




      </NB.View>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 180,
    width: 180,
    justifyContent:'center',
    alignItems:'center',
  },
  profileImg: {
    height: 180,
    width: 180,
    borderRadius: 100,
  },
});
