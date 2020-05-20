/**
* This is the Text component used in the app
* We need to use this component which heritate from native-base text component to have more control on its font
**/

import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class EmptyMessage extends Component {

  constructor(props){
    super(props)
    this.state = {
      message: this.props.message,
    }
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>           
         <Text style={{fontSize: 16, fontWeight: 'bold', color: '#ADADAD'}}>{this.state.message}</Text>
      </View>
    )
  }
}
const styles = {
  containerActivity: {
     
 flex:1,
    alignItems: 'center',
    justifyContent: 'center' ,
       
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  }
};
