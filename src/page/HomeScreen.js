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
  TouchableOpacity,
  FlatList,
  View,
  Text,
  I18nManager,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import * as NB from 'native-base';
import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../component/Colors'


export default class HomeScreen extends Component {

  Item({ id, title }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

  render(){
    var left = (
      <Left style={{flex: 1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name = "bars" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

        </Button>
      </Left>
    );

    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => this.searchButtonClicked()} transparent>
          {/* <Icon name = "search" style = {{fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/> */}
        
        </Button>        
      </Right>
    );

  return (
    <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}> 
      <Navbar left={left} right={right} title={'Patients(s)'} />

      <NB.View style={{ backgroundColor: '#f3f7fa', flex:1 }}>
      <FlatList  
          data={DATA}  
          style={{  paddingLeft:5,paddingRight:5 , marginTop:12}}
            

          renderItem={({ item }) => (
            <View style={{ flex: 1, flex:1, backgroundColor:'#fff', marginLeft:4, marginRight:4,marginTop:4 , height:160, width:'100%'}}>
            <Image
                  source={require('./images/person_background.png')}
                  fadeDuration={0}
                  style={{flex:1,  height: 130,width:125, justifyContent:'center', }}
                  />

              <Text style={{ color: Color.color_theme , fontSize:16,  width:'100%', padding:10}}>{item.title}</Text>

              {/* <NB.View style={{ flex:1, height:130,width:110   }}>
                <Image
                  source={require('./images/person.png')}
                  fadeDuration={0}
                  style={{flex:1,  height: 130,width:130}}
                  />
              </NB.View>


              <View style={{ justifyContent:'flex-start', }}>
                <Text style={{ color: Color.color_theme , fontSize:16, padding:10}}>{item.title}</Text>
              </View> */}
              
            </View>
          )} 
          numColumns={3}
 
        />  

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

        </NB.View>
    </SideMenuDrawer>
  );
};
}


const DATA = [{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Patient Name',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Patient Name',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Patient Name',
  },
];