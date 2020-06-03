/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import ImageZoom from 'react-native-image-pan-zoom';

export default class App extends Component {

  constructor(props) {
    super(props);
  }
  


  render() {
          
    return (
 
<ViewPager style={styles.viewPager} initialPage={0}>

      <View key="1">
        <Text>First page</Text>
        <Image
              source={require('./src/page/images/medi_logo.png')}
              resizeMode={'cover'} 
              style = {{justifyContent: 'center',alignItems: 'center',alignSelf: 'center',height: 220, width:220}}
              />
      </View>
      <View key="2">
        <Text>Second page</Text>
      
        <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={Dimensions.get('window').width}
      imageHeight={Dimensions.get('window').height}
      enableSwipeDown={true}
    >
      <Image
        enableHorizontalBounce={true}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        source={require('./src/page/images/medi_logo.png')}
      />
    </ImageZoom>
                
      </View>

    
    </ViewPager>


    );
  }

}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});