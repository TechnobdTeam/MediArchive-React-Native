/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler, Image, View, StyleSheet,Text, Animated } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Reducer, Actions, ActionConst } from 'react-native-router-flux';
// import Toast from 'react-native-simple-toast';

// Our custom files and classes import
// import Home from './page/Home';
// import Search from './page/Search';
// import ProductListScreen from './page/ProductListScreen';
// import LoginScreen from './page/LoginScreen';
// import SignupScreen from './page/SignupScreen';
// import SetPasswordScreen from './page/SetPasswordScreen';
// import ProfileScreen2Edit from './page/ProfileEditSecondScreen';
// import ProfileScreen1Edit from './page/ProfileEditFirstScreen';
// import Profile from './page/ProfileScreen';
// import CheckoutScreen from './page/CheckoutScreen'
// import ShoppingCartScreen from './page/ShoppingCartScreen';
// import OrderListScreen from './page/OrderListScreen';
// import OrderDetails from './page/OrderDetailsScreen';
// import Details from './page/ProductDetailsScreen';
// import Splash from './page/SplashScreen';
// import SupportScreen from './page/SupportScreen';
// import FollowScreen from './page/FollowScreen';
// import ChangePassword from './page/ChangePassword';
// import ForgotPassword from './page/ForgotPassword';

import App from './page/App'
import Splash from './page/SplashScreen'


export default class AppIndex extends Component {

  state = {
    backClickCount: 0
  };

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
  }

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
          BackHandler.exitApp()
      }else if(action.type === 'Navigation/BACK' && state.index >= 1){       
        if(scene === 'splash' || scene === 'home' || scene === 'product_list' ){     
          BackHandler.exitApp()
        }    
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
            <Scene key="home" component={App}  type='reset' hideNavBar/>
          </Scene>


          {/* <Scene key="root">            
            <Scene initial key='splash' component={Splash} hideNavBar />
            <Scene key="home" component={Home}  type='reset' hideNavBar/>
            <Scene key="product_list" component={ProductListScreen} type="reset" modal hideNavBar  />                          
            <Scene key='profile' component={Profile} hideNavBar /> 
            <Scene key='profile_edit1' component={ProfileScreen1Edit} hideNavBar />
            <Scene key='profile_edit2' component={ProfileScreen2Edit} hideNavBar />    
            <Scene key="details" component={Details} hideNavBar />
            <Scene key="order" component={OrderListScreen} modal hideNavBar />
            <Scene key="order_details" component={OrderDetails} modal hideNavBar />                
            <Scene key="login" component={LoginScreen} hideNavBar />
            <Scene key="signup" component={SignupScreen} hideNavBar />
            <Scene key='password' component={SetPasswordScreen} hideNavBar />
            <Scene key="search" component={Search} modal hideNavBar /> 
            <Scene key="checkout" component={CheckoutScreen} hideNavBar />
            <Scene key="support" component={SupportScreen} hideNavBar />  
            <Scene key="follow" component={FollowScreen} hideNavBar />  
            <Scene key="cart" component={ShoppingCartScreen} modal hideNavBar /> 
            <Scene key="change_password" component={ChangePassword} modal hideNavBar />
            <Scene key="forgot_password" component={ForgotPassword} modal hideNavBar />          

          </Scene> */}
        </Router>
      </Root>
    );
  }
  


}