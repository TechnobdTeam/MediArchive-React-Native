/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Modal,} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import ImageZoom from 'react-native-image-pan-zoom';

import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  {
    // Simplest usage.
    // url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    // url:
    // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660246058&di=6f0f1b19cf05a64317cbc5d2b3713d64&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0112a85874bd24a801219c7729e77d.jpg",
    // You can pass props to <Image />.
    props: {
      // headers: ...
      source: require('./src/page/images/medi_logo.png'),
    },
    freeHeight: true,
  },
  {
    // Simplest usage.
    // url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
    // url:
    // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527660246058&di=6f0f1b19cf05a64317cbc5d2b3713d64&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0112a85874bd24a801219c7729e77d.jpg",
    // You can pass props to <Image />.
    props: {
      // headers: ...
      source: require('./src/page/images/medi_logo.png'),
    },
    freeHeight: true,
  },
];


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