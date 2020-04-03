/**
* This is the Text component used in the app
* We need to use this component which heritate from native-base text component to have more control on its font
**/

import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import styles from '../Styles'
import AppConstant from '../constant/AppConstant'

export default class Loading extends Component {
  render() {
    return (
      <View style = {{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'     
      }}>     
            
      <ActivityIndicator              
        color= {AppConstant.THEME_COLOR}
        size = "large"
        style = {{ flex: 1,justifyContent: 'center',alignItems: 'center', height: 80 }}/>
      
      </View>
    )
  }
}
