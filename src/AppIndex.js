/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler, I18nManager, Animated, AsyncStorage, Alert, Platform } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Reducer, Actions, ActionConst } from 'react-native-router-flux';



import Splash from './page/SplashScreen';
import ContactScreen from './page/ContactScreen';
import HomeScreen from './page/HomeScreen';
import HomeLogin from './page/login/LoginHome'


export default class AppIndex extends Component {

  state = {
    backClickCount: 0
  };

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);

    this.state={
      is_loading: false
    }
  }


  // --------------------------------------------------------------
  _spring() {
    this.setState({backClickCount: 1}, () => {
        Animated.sequence([
            Animated.spring(
                this.springValue,
                {
                    toValue: -.15 * height,
                    friction: 5,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                this.springValue,
                {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }
            ),

        ]).start(() => {
            this.setState({backClickCount: 0});
        });
    });

  }

  handleBackButton = () => {
      this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
      return true;
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }


  reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {      
      // Open this up in your console of choice and dive into this action variable
      const scene = Actions.currentScene;

    
      // Add some lines like this to grab the action you want
      if(action.type === 'Navigation/BACK' && state.index === 0){ 
          console.log('.....: action.type ',action.type +" state.index: "+state.index)
      
          BackHandler.exitApp()
      }else if(action.type === 'Navigation/BACK' && state.index >= 1){   
        console.log('#############-----: action.type ', action.type + " state.index: " + state.index + " COUNT: " + AppConstant.INTERSTITIAL_COUNT )
      
      }
      return defaultReducer(state, action);  
    };
  };



  render() {
    return(
      <Root>
        <Router createReducer={this.reducerCreate}
                backAndroidHandler={this.onBackPress} >
                
          <Scene key="root">            
            <Scene initial key='splash' component={Splash} hideNavBar />
            <Scene key="ContactScreen" component={ContactScreen} hideNavBar /> 
            <Scene key="HomeScreen" component={HomeScreen} type="reset" modal hideNavBar  />     
            <Scene key="HomeLogin" component={HomeLogin} type="reset" modal hideNavBar  />     
            
            {/* <Scene key="home_screen" component={HomeScreen} type="reset" modal hideNavBar  />   
            <Scene key="news_details" component={NewsDetailsScreen} hideNavBar />                       
            <Scene key="country_screen" component={SelectCountryScreen} hideNavBar />                        */}
                              
            {/* <Scene key="news_search_screen" component={SearchNewsScreen} hideNavBar />                       
            <Scene key="news_bookmark_screen" component={NewsBookmarkScreen} hideNavBar />                       
            <Scene key="hashtag_bookmark_screen" component={HashTagBookmarkScreen} hideNavBar />                       
            <Scene key="hashtag_news_screen" component={HashTagNewsScreen} hideNavBar />                       
            <Scene key="web_details" component={WebDetailsScreen} hideNavBar />                      
            <Scene key="push_details" component={PushDetailsScreen} hideNavBar />                       

            */}

          </Scene>
        </Router>


      </Root>
    );
  }
  


}