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


export default class DoctorScreen extends Component {

  constructor(props){
    super(props)
  }

    renderItem = ({ item }) => (
    <TouchableHighlight style={{ marginBottom:5, backgroundColor:'white', paddingRight:15}} >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => {}} >
      <NB.View style= {{ flexDirection:'row' }}>
      <Image source={require('../images/happydoctor.jpg')}
        style={{  height: 80, width: '25%', marginLeft:5,marginRight:5,marginTop:0}}
      />

      <NB.View style={{  width: '73%' }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Color.readmore, fontSize: 14 }}>Date: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}> 31 Dec 2020</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Color.readmore, fontSize: 14 }}>Type: </Text>
              <Text style={{ color: Color.color_app, fontSize: 14 }}>X-Ray</Text>
            </NB.View>

            

            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Color.readmore, fontSize: 14 }}>Description: Need to continue all medicine for three or more months.  </Text>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}> </Text> */}
            </NB.View>

            <NB.View style={{ position: 'absolute', top:0, right:0 }}>
              <Icon name = "trash" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 18,color: 'red',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
          </NB.View>

            

      </NB.View>

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )

  renderMedicineItem = ({ item }) => (
    <TouchableHighlight style={{ marginBottom:5, backgroundColor:'white', paddingRight:15}} >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => {}} >
      <NB.View style= {{ flexDirection:'row' }}>
      
      <TouchableHighlight
                style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1,  }]}
              >
          <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
      </TouchableHighlight>

      <NB.View style={{  width: '73%', marginLeft:20,justifyContent: 'center',
 }}>
            <NB.View style={{ flexDirection: 'row' }}>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}>Date: </Text> */}
              <Text style={{ color: Color.color_app, fontSize: 16 }}>Medicine Name</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:10}}>
              <Text style={{ color: Color.readmore, fontSize: 16 }}>Reminder: </Text>
              <Icon name = "toggle-on" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 25,color: Color.color_theme,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
            </NB.View>

            

          

            <NB.View style={{ position: 'absolute', top:0, right:0 }}>
              <Icon name = "trash" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 18,color: 'red',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
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
    <SafeAreaView>
      <Navbar left={left} right={right} title="Details" />
      <ScrollView
        style={{backgroundColor: Color.chrome_grey, height: '100%'}}>
        <NB.View>
          {/* Top Section */}
          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: 'white',
              paddingLeft: 5,
              paddingBottom: 5,
              paddingTop: 10,
              marginLeft: 10,
            }}>
            <Image
              source={require('../images/happydoctor.jpg')}
              style={{
                height: 80,
                width: '20%',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 0,
              }}
            />

            <NB.View style={{width: '75%'}}>
              <NB.View style={{flexDirection: 'row'}}>
                <Text style={{color: Color.readmore, fontSize: 14}}>
                  Date:{' '}
                </Text>
                <Text style={{color: Color.color_app, fontSize: 14}}>
                  {' '}
                  31 Dec 2020
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row'}}>
                <Text style={{color: Color.readmore, fontSize: 14}}>
                  Prescribe by:{' '}
                </Text>
                <Text style={{color: Color.color_app, fontSize: 14}}>
                  Dr. Shopon Chandro Dhor
                </Text>
              </NB.View>

              <NB.View style={{flexDirection: 'row'}}>
                <Text style={{color: Color.readmore, fontSize: 14}}>
                  Medecine:{' '}
                </Text>
                <Text style={{color: Color.color_app, fontSize: 14}}>7</Text>
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
            Prescription
          </Text>
          <NB.View>
            <Image
              source={require('../images/doctor_pescription.jpg')}
              style={{ width: '100%', margin: 10}}
            />

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
              marginTop: 5,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            Description
          </Text>
          <NB.View
            style={{
              backgroundColor: 'white',
              padddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 5,
              paddingRight: 5,
              height: 150,
              margin: 10,
            }}>
            <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text>
            <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text>
          </NB.View>

          {/* Medicine Section */}
          <NB.View>
            <Text
              style={{
                color: Color.color_app,
                fontSize: 16,
                marginTop: 5,
                marginLeft: 10,
                marginBottom: 5,
              }}>
              Medicine(s)
            </Text>

            <NB.View style={{ backgroundColor: Color.color_theme ,padding:5, position:'absolute',top:5, right:10, borderRadius:5,}}>
              <NB.Text style={{ color:'white', fontSize:14 }}>Add +</NB.Text>

            </NB.View>


          </NB.View>

          <NB.View
            style={{
              backgroundColor: 'white',
              padddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 5,
              paddingRight: 5,
              margin: 10,
            }}>
            {/* <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text>
            <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text> */}
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
                marginTop: 5,
                marginLeft: 10,
                marginBottom: 5,
              }}>
              Medical Reports
            </Text>

            <NB.View style={{ backgroundColor: Color.color_theme ,padding:5, position:'absolute',top:5, right:10, borderRadius:5,}}>
              <NB.Text style={{ color:'white', fontSize:14 }}>Add +</NB.Text>

            </NB.View>


          </NB.View>

          <NB.View
            style={{
              backgroundColor: 'white',
              padddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 5,
              paddingRight: 5,
              margin: 10,
            }}>
            {/* <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text>
            <NB.Text style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
              Description goes here if any. Description goes here if any.
            </NB.Text> */}
            <FlatList
          contentContainerStyle={{flexGrow: 1}}
          style={{}}
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
        />
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