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


export default class MedicineListScreen extends Component {

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
        style={{  height: 80, marginLeft:5,marginRight:5,marginTop:0}}
      />

      <NB.View style={{  }}>
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
              <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 18,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
          </NB.View>

            

      </NB.View>

      

      </NB.View>
      
    </ListItem>
    </TouchableHighlight>   
    )

  renderMedicineItem = ({ item }) => (
    <TouchableHighlight style={{  backgroundColor:'white',  marginTop:5}} >
    <NB.View style= {{ flexDirection:'row',paddingTop:10, paddingBottom:10 }}>
      
      <TouchableHighlight
                style={[styles.profileImgContainer]}
              >
          <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
      </TouchableHighlight>

      <NB.View style={{   marginLeft:10,justifyContent: 'center'}}>
            <NB.View style={{ flexDirection: 'row' }}>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}>Date: </Text> */}
              <Text style={{ color: Color.color_app, fontSize: 20 }}>Medicine Name</Text>
            </NB.View>

            
            <NB.View style={{ flexDirection:'row' ,marginTop:10}}>
              <NB.Text style={{ color: Color.readmore, fontSize: 15,}}>Start From - </NB.Text>
              <NB.Text style={{ color: Color.color_theme, fontSize: 16, marginLeft: 5 }}>27th September 2017</NB.Text>
            </NB.View>

            <NB.View style={{ flexDirection:'row' ,marginTop:0}}>
              <NB.Text style={{ color: Color.readmore, fontSize: 15,}}>Prescribed by - </NB.Text>
              <NB.Text style={{ color: Color.color_theme, fontSize: 16, marginLeft: 5 }}>Dr. Shariar Mazumder</NB.Text>
            </NB.View>

            

          

            <NB.View style={{ position: 'absolute', top:0, right: Platform.OS === 'ios' ? -10 : 0}}>
              <Icon name = "ellipsis-v" style = {{marginLeft: Platform.OS === 'ios' ? 0 : 0,fontSize: 18,color: Color.readmore ,transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
          </NB.View>

            

      </NB.View>

      

      </NB.View>

      
    
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
          
          <Icon name='ellipsis-v'  style={{fontSize: 20,color: "#fff",transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> 
          
        </Button>
        
      </Right>
    );

  return (
    <SafeAreaView>
      <Navbar left={left} right={right} title="Medicine(s)" />
      <ScrollView
        style={{backgroundColor: Color.chrome_grey, height: '100%'}}>
        <NB.View>
          <NB.View
            style={{
              backgroundColor: 'white',
              padddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 5,
              paddingRight: 5,
              margin: 10,
            }}>
            
            <FlatList
              data={DATA}
              style={{backgroundColor: Color.chrome_grey,}}
              renderItem={this.renderMedicineItem}
              keyExtractor={({id}, index) => id}
            />
          </NB.View>





        
        </NB.View>
      </ScrollView>
      <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Color.color_theme,
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 100,
            right: 10,
            height: 70,
            backgroundColor: Color.color_theme,
            borderRadius: 100,
          }}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
    </SafeAreaView>
  );
};
}
const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 5,
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