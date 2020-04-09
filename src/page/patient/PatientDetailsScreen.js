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
  ImageBackground
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
import { Dialog } from 'react-native-simple-dialogs';


export default class PatientDetailsScreen extends Component {

  constructor(props){
    super(props)

    this.state={
      medicine_reminder: false,

    }
console.log('--------this.state.medicine_reminder: '+this.state.medicine_reminder)

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
      <Navbar left={left} right={right} title='Patient Details' />

      <NB.View style={{ backgroundColor: '#f3f7fa', width:'100%', height:'100%', }}>
        
        <NB.View style={{ backgroundColor: 'white',  height:160, marginTop:50, marginLeft:10, marginRight:10,  alignItems: 'center',  }}>
            
          {/* <NB.View style={{ position: 'absolute', top: 10, right: 10 }}>
              <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 15,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          </NB.View> */}

            <TouchableHighlight
                      style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1,  }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
            </TouchableHighlight>

          
            

            <NB.Text style={{ color : Color.color_theme, fontSize:18, marginTop:10 }}>Medicine Name</NB.Text>
            
            <NB.View style={{ flexDirection:'row' ,marginTop:15}}>
              <NB.Text style={{ color: Color.readmore, fontSize: 16,}}>Start From:</NB.Text>
              <NB.Text style={{ color: Color.color_theme, fontSize: 16, marginLeft: 5 }}>27th September 2017</NB.Text>
            </NB.View>

            <NB.View style={{ flexDirection:'row' ,marginTop:5}}>
              <NB.Text style={{ color: Color.readmore, fontSize: 16,}}>Prescribe by:</NB.Text>
              <NB.Text style={{ color: Color.color_theme, fontSize: 16, marginLeft: 5 }}>Dr. Shariar Mazumder</NB.Text>
            </NB.View>


        </NB.View>

        <NB.View style={{ backgroundColor: 'white',  marginTop:0, marginLeft:10, marginRight:10, marginBottom: 5, marginTop:10}}>
          
            <NB.View style={{ marginTop:15, marginLeft: 10}}>
            
              <NB.Text style={{ color: Color.color_app, fontSize:18 }}>Does Information</NB.Text>
              <NB.Text style={{ color: Color.color_change, fontSize:18, marginLeft: 15, marginTop:10 }}>Before Meal</NB.Text>
          
              <NB.Text style={{ color: Color.color_app, fontSize:18,marginTop:20 }}>Time(s)</NB.Text>
              <NB.View style={{ flexDirection:'row', justifyContent:'space-between',marginBottom:20 }}>
                <NB.Text style={{ color: Color.color_change, fontSize:18, marginLeft: 15, marginTop:10 }}>Morning</NB.Text>
                <NB.Text style={{ color: Color.color_change, fontSize:18,  marginTop:10 }}>Afternoon</NB.Text>
                <NB.Text style={{ color: Color.color_change, fontSize:18,  marginTop:10,marginRight:20,textAlign:'left' }}>Night</NB.Text>
              </NB.View>

              <NB.Text style={{ color: Color.color_app, fontSize:18,marginTop:20 }}>Repeat</NB.Text>
              <NB.View style={{ flexDirection:'row', justifyContent:'space-between',marginBottom:0, marginLeft:20, marginTop:15 }}>
                
                  
                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Sat</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Sun</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Mon</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Tue</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Wed</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Thu</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>

                  <NB.View style={styles.container}>
                    <NB.View style={styles.outerCircle}>
                      <NB.View style={styles.innerCircle} >
                        <NB.Text style={{ color:'white' }}>Fri</NB.Text>
                      </NB.View>
                    </NB.View>
                  </NB.View>


                {/* <NB.Text style={{ color: Color.readmore, fontSize:18,  marginTop:10 }}>Afternoon</NB.Text> */}
                {/* <NB.Text style={{ color: Color.readmore, fontSize:18,  marginTop:10,marginRight:20,textAlign:'left' }}>Night</NB.Text> */}
              
              </NB.View>

                        
            </NB.View>          
        </NB.View>

        <NB.View style={{ backgroundColor: 'white',   marginTop:0, marginLeft:10, marginRight:10, marginBottom:5, padding:15}}>
          
            <NB.View style={{ flexDirection:'row',  justifyContent:'space-between'}}>
              <NB.Text style={{ color: Color.color_theme, fontSize:18, marginTop:5  }}>Reminder</NB.Text>
              
              <Button onPress={() => {
                console.log('--------this.state.medicine_reminder: '+this.state.medicine_reminder)
                this.setState({ medicine_reminder: !this.state.medicine_reminder })
                
                }} transparent>
                  <Icon name = "toggle-on" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 35,color: Color.color_twelve,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
                          
            </NB.View> 

            <NB.View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:15,marginBottom:10}}>
              <NB.Text style={{ color: Color.color_change, fontSize:18, marginTop:5  }}>10:30 AM</NB.Text>
              <Icon name = "edit" style = {{marginRight:10,marginLeft: Platform.OS === 'ios' ? 10 : 10,fontSize: 25,color: Color.color_theme,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            
              <NB.Text style={{ color: Color.color_change, fontSize:18, marginTop:5, marginLeft:10 }}>10:30 AM</NB.Text>
              <Icon name = "edit" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 10,fontSize: 25,color: Color.color_theme,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

            </NB.View> 


        </NB.View>


          {/*  Dialog 1   */}
      <Dialog
          visible={this.state.medicine_reminder}
          animationType	= 'fade' 
          onTouchOutside={() => this.setState({medicine_reminder: false})} >
          <NB.View >

          <NB.View style={{flexDirection: 'row', justifyContent:'space-between' }}>
            <NB.Text style={{ color:Color.color_theme, fontSize:25, width:'70%' }}>Set Reminder For Medicine Name</NB.Text>
            <TouchableHighlight
                      style={[styles.medicineContainer,{ borderColor: Color.readmore, borderWidth:1,  }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.medicineImg} />
            </TouchableHighlight>
          </NB.View>

          <NB.View style={{ backgroundColor: Color.color_theme, height:1, width:'100%' }}></NB.View>

          <NB.View style={{ justifyContent:'space-evenly', flexDirection:'row', marginTop:20 }}>
              <NB.View style={{ justifyContent:'center', flexDirection:'row', alignItems:'center', backgroundColor: Color.readmore, paddingLeft:5, paddingRight:5,marginRight:10}}>
                <NB.Text style={{ color: Color.color_change, fontSize:18 }}>10:30 AM</NB.Text>
                <Icon name = "minus-circle" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 10,fontSize: 25,color: Color.color_five,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </NB.View>

              <NB.View style={{ justifyContent:'center', flexDirection:'row', alignItems:'center', backgroundColor: Color.readmore, paddingLeft:5, paddingRight:5,marginLeft:10}}>
                <NB.Text style={{ color: Color.color_change, fontSize:18 }}>10:30 AM</NB.Text>
                <Icon name = "minus-circle" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 10,fontSize: 25,color: Color.color_five,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

              </NB.View>
          </NB.View>

          <NB.View style={{ marginLeft:10, marginRight:10, marginBottom: 5,  marginTop:30}}>
            {/* <NB.Text style={{ color: Color.color_app, marginTop:25, marginBottom:20, marginLeft:15,fontSize:20 }}>Date Of Birth</NB.Text> */}
            <NB.View style={{ flexDirection:'row' ,marginTop:5 , justifyContent:'space-between'}}>
                <ImageBackground source={require('../images/dateback.png')} style={{width: 100,  padding:5,  }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginRight:30, marginLeft:10, textAlign:'center' }}>Hours</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 100,  }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginLeft: 10,marginRight:10 ,textAlign:'center' }}>Minutes</NB.Text>
                </ImageBackground>

                <ImageBackground source={require('../images/dateback.png')} style={{width: 80,   }}>
                  <NB.Text style={{ color: Color.readmore, fontSize: 18, marginLeft:20, textAlign:'center' }}>AM</NB.Text>
                </ImageBackground>

            </NB.View>             
        </NB.View>

        <NB.View style={{ justifyContent:'center',alignItems:'center', marginTop:10 }}>
            <NB.Text style={{ color: Color.color_theme, fontSize:18,  }}>Add +</NB.Text>
        </NB.View>



        <NB.View style={{ flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:40, marginBottom:10 }}>
              {/* <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white', fontSize:20,alignItems:'center', paddingTop:15, paddingBottom:15,width:100 }}>CANCEL</NB.Text> */}
              <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginLeft:10}}>CANCEL</NB.Text>
              <NB.Text style={{ backgroundColor: Color.color_twelve, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginRight:10}}>SAVE</NB.Text>
        </NB.View>

      
          </NB.View>

          {/* { this.state.isLoading ? <Loading /> : null } */}
      </Dialog>

      </NB.View>
      
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 8,
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: -40,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },


  day_circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: Color.color_theme,
    borderColor: 'white',
    borderWidth: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  outerCircle: {
    borderRadius: 40,
    width: 90,
    height: 90,
    backgroundColor: 'white',
  },
  innerCircle: {
    borderRadius: 30,
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: Color.color_theme,
    justifyContent:'center',
    alignItems:'center'
  },
  medicineContainer: {
      marginLeft: 8,
      height: 80,
      width: 80,
      borderRadius: 40,
      marginTop: -10,
      marginRight:0,
      marginBottom:10
    },
    medicineImg: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },

});
