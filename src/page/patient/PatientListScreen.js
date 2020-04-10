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
  {
    id: '5',
    title: String.nav_login,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },
  {
    id: '6',
    title: String.nav_patient,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/2.png'
  },

  {
    id: '7',
    title: String.nav_medicine,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/3.png'
  },
  {
    id: '8',
    title: String.nav_profile,
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
  }

];


export default class PatientScreen extends Component {

  constructor(props){
    super(props)


  }

  renderItem = ({ item }) => (
    <TouchableHighlight style={{ marginBottom:5, backgroundColor:'white', }} >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => {}} >
      <NB.View style= {{ flexDirection:'row' ,justifyContent:'flex-start'}}>
      <NB.View style={{ backgroundColor:'red' ,height: 80, width: 80,marginLeft:8,marginRight:12,marginTop:1, }}>

        <Image source={require('../images/happydoctor.jpg')}
          style={{  height: 80, width: 80,  }}
        />
      </NB.View>
      

      

      <NB.View style={{ width:'75%' }}>
            <NB.View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Date: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14 }}> 31 Dec 2020</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row' , marginTop:2}}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Prescribe by: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14 }}>Dr. Shopon Chandro Dhor</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row',marginTop:2 }}>
              <Text style={{ color: '#7e7e7e', fontSize: 14 }}>Medecine: </Text>
              <Text numberOfLines={1} style={{ color: '#139acc', fontSize: 14 }}>7</Text>
            </NB.View>

            <NB.View style={{ flexDirection: 'row', marginTop:2 }}>
              <Text numberOfLines={2} style={{ color: '#7e7e7e', fontSize: 14 }}>Description: Need to continue all medicine for three or more months.  </Text>
              {/* <Text style={{ color: Color.readmore, fontSize: 14 }}> </Text> */}
            </NB.View>

            <NB.View style={{ position: 'absolute', top:0, right: Platform.OS === 'ios' ? 0 : 8,}}>
              <Icon name = "cloud-download-alt" style = {{fontSize: 24,color: '#2acc6f',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
          
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

      var right = <Right style={{flex: 1}} />;

  return (
    <SafeAreaView style={{backgroundColor: Color.color_theme}}>
      <Navbar left={left} right={right} title="Prescriptions" />
      <ScrollView
        style={{backgroundColor: Color.chrome_grey, height: '92%'}}>

        
      <NB.View style={{backgroundColor: Color.chrome_grey}}>
        <NB.Text
          style={{color: '#049ccc', marginTop: 20, marginLeft: 10, fontSize:16}}>
          Prescriptions
        </NB.Text>

        <NB.View
          style={{
            position: 'absolute',
            top: 20,
            right: 12,
            flexDirection: 'row',
          }}>
          <NB.Text style={{color: '#049ccc'}}>Filter by: Date</NB.Text>
          <Icon
            name="sort-amount-down"
            style={{
              color: '#aab9bf ',
              marginLeft: 10,
              fontSize: 20,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            }}
          />
        </NB.View>


        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          style={{marginLeft: 10, marginRight: 10, marginTop: 20}}
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor={({id}, index) => id}
        />

        
      </NB.View>


      
      </ScrollView>
      
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Color.color_theme,
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            position: 'absolute',
            bottom:Platform.OS === 'ios' ? 40 : 10,
            right: 10,
            height: 75,
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
  scrollView: {
    backgroundColor: Colors.lighter,

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

