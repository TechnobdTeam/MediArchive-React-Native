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

import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class HomeScreen extends Component {

  

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
          
          
          <Icon name = "search" style = {{fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>

         
        </Button>        
      </Right>
    );

  return (
    <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}> 
              <Navbar left={left} right={right} title={'Home'} />
              <Text>Home Screen</Text>
    </SideMenuDrawer>
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

