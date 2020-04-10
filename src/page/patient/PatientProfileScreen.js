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
  TouchableHighlight
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

import RNPickerSelect from 'react-native-picker-select';


export default class PatientProfileScreen extends Component {

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

      var right = <Right style={{flex: 1}} />;

  return (
    <SafeAreaView>
      <Navbar left={left} right={right} title={String.nav_app_name} />
      
      <NB.View style={{ backgroundColor: '#f3f7fa', width:'100%', height:'100%', }}>
        
        <NB.View style={{ backgroundColor: 'white',  height:150, marginTop:38, marginLeft:10, marginRight:10,  alignItems: 'center',  }}>
            
          <NB.View style={{ position: 'absolute', top: 10, right: 10 }}>

              <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 15,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

          </NB.View>
            <TouchableHighlight
                      style={[styles.profileImgContainer, { borderColor: '#dae4ed', borderWidth:1,  }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
            </TouchableHighlight>

 
            <NB.Text style={{ color : Color.color_theme, fontSize:18, marginTop:10 }}>Jane Alam</NB.Text>
            <NB.View style={{ flexDirection:'row' ,marginTop:5}}>

            <NB.Text style={{ color: Color.readmore, fontSize: 14,}}>Gender:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>Male</NB.Text>

            <NB.Text style={{ color: Color.readmore, fontSize: 14, marginLeft: 5}}>Age:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>32</NB.Text>

            <NB.Text style={{ color: Color.readmore, fontSize: 14, marginLeft: 5 }}>Blood Group:</NB.Text>
            <NB.Text style={{ color: Color.color_theme, fontSize: 14, marginLeft: 5 }}>B (Negative)</NB.Text>


            </NB.View>
        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:70, marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5,    marginTop:10}}>
          
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:70}}>
              
              <NB.View style={{ height:70, width:70, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 5 }}>
                <Image
                source={require('../svgicons/prescription_3.svg')}
                fadeDuration={0}
                style={{ justifyContent: 'center', alignItems: 'center', height: 50, weidth:50, }}
              />
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_four, fontSize:18 }}>Prescriptions</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>28</NB.Text>
              </NB.View>
            </NB.View>          
        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5}}>
          
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 5 }}>
                <Image
                source={require('../svgicons/reports.svg')}
                fadeDuration={0}
                style={{   height: 50, weidth:50  }}
              />
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Medical Reports</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>28</NB.Text>
              </NB.View>
            </NB.View>          
        </NB.View>

<NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5,    }}>
          
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 5 }}>
                <Image
                source={require('../svgicons/medicine.svg')}
                fadeDuration={0}
                style={{   height: 50, weidth:50  }}
              />
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Medicine Lists</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>28</NB.Text>
              </NB.View>
            </NB.View>          
        </NB.View>

<NB.View style={{ backgroundColor: 'white',  height:90, marginTop:0, marginLeft:10, marginRight:10, marginBottom:5,    }}>
          
            <NB.View style={{ flexDirection:'row',alignItems:'center', height:90}}>
              
              <NB.View style={{ height:90, width:80, justifyContent:'center', alignItems:'center',textAlign:'center',  marginRight: 5 }}>
                <Image
                source={require('../svgicons/reminders.svg')}
                fadeDuration={0}
                style={{   height: 50, weidth:50  }}
              />
              </NB.View>

              <NB.View>
                  <NB.Text style={{ color: Color.color_theme, fontSize:18 }}>Reminder(s)</NB.Text>
                  <NB.Text style={{ color: Color.readmore, fontSize:18 }}>28</NB.Text>
              </NB.View>
            </NB.View>          
        </NB.View>

        

      </NB.View>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 105,
    width: 105,
    borderRadius: 55,
    marginTop:-30
  },
  profileImg: {
    height: 103,
    width: 103,
    borderRadius: 55,
  },
});
