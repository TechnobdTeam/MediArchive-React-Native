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
      <FlatList  
          data={DATA}  
          style={{ backgroundColor: Color.readmore, paddingLeft:5,paddingRight:5 }}
            

          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, margin:5, }}>
            <Image
              source={require('./svgicons/logo.svg')}
              fadeDuration={0}
              style={{flex:1, backgroundColor:'white',width: 118, height: 120,}}
              />
              <View style={{ height:35, backgroundColor: 'white',justifyContent:'center',alignItems:'center',  }}>
                <Text style={{ color: Color.color_theme ,textAlign:'center' }}>{item.title}</Text>
              </View>
            </View>
          )} 
          numColumns={3}
 
        />  
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