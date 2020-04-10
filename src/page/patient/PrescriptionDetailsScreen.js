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


export default class PrescriptionDetailsScreen extends Component {

  constructor(props){
    super(props)
  }

    renderItem = ({ item }) => (
    <TouchableHighlight style={{ marginBottom:5, backgroundColor:'white', }} >
    <ListItem style={{marginLeft:0,marginRight:0 }}
      key={item.id}
      button={true}
      onPress={() => {}} >
      <NB.View style= {{ flexDirection:'row', flex:1, justifyContent:'flex-start' }}>
      

      <NB.View style={{ width:70, height:70, backgroundColor:'green', marginLeft:8, marginRight:12 }}>
        <Image source={require('../images/happydoctor.jpg')}
          style={{  height: 70, width:70,  }}
        />
       

      </NB.View>

      <NB.View style={{ flex:1 }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Date: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}> 31 Dec 2020</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Type: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}>X-Ray</Text>
            </NB.View>

            

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Description: Need to continue all medicine for three or more months.  </Text>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}> </Text> */}
            </NB.View>

            <NB.View style={{ position: 'absolute', top:0, right:-5 }}>
              <Icon name = "trash" style = {{fontSize: 18,color: '#f35d5d',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
          </NB.View>

            

      </NB.View>

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )

  renderMedicineItem = ({ item }) => (
    <TouchableHighlight style={{ marginBottom:5, backgroundColor:'white', }} >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => {}} >

      <NB.View style= {{ flexDirection:'row' ,justifyContent:'flex-start'}}>
      
      <TouchableHighlight
                style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:0,  }]}
              >
          <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
      </TouchableHighlight>

      <NB.View style={{  marginLeft:0,justifyContent: 'center',flex:1, }}>
            <NB.View style={{ flexDirection: 'row' }}>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}>Date: </Text> */}
              <Text style={{ color: Color.color_app, fontSize: 18 }}>Medicine Name</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:0, justifyContent:'flex-start', alignItems:"center"}}>
              <Text style={{ color: Color.readmore, fontSize: 14 }}>Reminder: </Text>
              <Icon name = "toggle-on" style = {{  marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 25,color: 'green',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View>

            <NB.View style={{ position: 'absolute', top:0, right:-5 }}>
              <Icon name = "trash" style = {{fontSize: 18,color: '#f35d5d',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
            </NB.View>

            

      </NB.View>

      

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )

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
    <SafeAreaView
      style={{backgroundColor: Color.color_theme, paddingBottom: -5}}>
      <Navbar left={left} right={right} title="Prescription Detials" />
      <ScrollView
        style={{
          backgroundColor: Color.chrome_grey,
          height: '92%',
          width: '100%',
        }}>

        <NB.View style={{backgroundColor: Color.chrome_grey, width: '100%'}}>
          
          {/* End Top Section  */}
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

          <NB.View>
            {/*End Top Section */}

            <NB.Text style={{color: Color.color_app,fontSize: 16,marginTop: 15,marginLeft: 10,marginBottom: 15,}}>Prescription</NB.Text>

          <NB.View
            style={{marginRight: 10, marginLeft: 10,marginTop: 0,}}>
            
            
            <NB.View>
              <Image
                source={require('../images/doctor_pescription.jpg')}
                style={{height:396, width:'100%'}}
              />

              <NB.View style={{position: 'absolute', bottom: 40, right: 20}}>
                <Icon
                  name="compress-arrows-alt"
                  style={{
                    paddding: 5,
                    fontSize: 24,
                    backgroundColor: '#0099cb',
                    color: Color.white,
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  }}
                />
              </NB.View>
              {/* compress - arrows - alt */}
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
                <NB.Text style={{color: 'white', fontSize: 16}}>
                  Add +
                </NB.Text>
              </NB.View>
            </NB.View>

            <NB.View
              style={{
                backgroundColor: 'white',
                padddingTop: 10,
                paddingLeft: 5,
                marginLeft:10,
                marginRight:10
                
                
              }}>
              
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                style={{}}
                data={DATA}
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
                <NB.Text style={{color: 'white', fontSize: 16,}}>
                  Add +
                </NB.Text>
              </NB.View>
            </NB.View>

            <NB.View
              style={{
                backgroundColor: 'white',
                padddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 5,
                paddingRight: 5,
                marginLeft: 10,
                marginRight:10,
                
              }}>
              
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                style={{}}
                data={DATA}
                renderItem={this.renderItem}
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
});