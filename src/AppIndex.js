/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler, I18nManager, Animated, AsyncStorage, Alert, Platform, StatusBar, SafeAreaView , Dimensions} from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Reducer, Actions, ActionConst } from 'react-native-router-flux';


import Splash from './page/SplashScreen';
import AppScan from './page/AppScan';
import ReportScan from './page/ReportScan';

import ContactScreen from './page/ContactScreen';
import HomeScreen from './page/HomeScreen';
import HomeLogin from './page/login/LoginHome';
import PatientProfileScreen from './page/patient/PatientProfileScreen';
import PrescriptionListScreen from './page/patient/PrescriptionListScreen';
import PrescriptionDetailsScreen from './page/patient/PrescriptionDetailsScreen';
import AddPatientScreen from './page/patient/AddPatientScreen';
import MedicineDetailsScreen from './page/patient/MedicineDetailsScreen';
import AddPrescriptionScreen from './page/patient/AddPrescriptionScreen';
import ReportDetailsScreen from './page/patient/ReportDetailsScreen';
import MedicineListScreen from './page/patient/MedicineListScreen';
import EditMedicineScreen from './page/patient/EditMedicineScreen';
import AddReportScreen from './page/patient/AddReportScreen';
import ReportListScreen from './page/patient/ReportListScreen';
import AddMedicineScreen from './page/patient/AddMedicineScreen';
import AddDoseScreen from './page/patient/AddDoseScreen';
import TermsAndConditionScreen from './page/patient/TermsAndConditionScreen';
import PrivacyPolicyScreen from './page/patient/PrivacyPolicyScreen';
import MedicineUpdateScreen from './page/patient/MedicineUpdateScreen';
import DoseUpdateScreen from './page/patient/DoseUpdateScreen';
import FullImageScreen from './page/patient/FullImageScreen';
import EditPrescriptionScreen from './page/patient/EditPrescriptionScreen';
import EditReportScreen from './page/patient/EditReportScreen';
import MyProfileScreen from './page/patient/MyProfileScreen';
import EditProfileScreen from './page/patient/EditProfileScreen'

import NotificationService from './NotificationService';
import AppConstant from './component/AppConstant'
import appConfig from '../app.json';

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';

export default class AppIndex extends Component {
  state = {
    backClickCount: 0
  };

  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);

    this.state={
      is_loading: false,
      senderId: appConfig.senderID,
    }

    this.notif = new NotificationService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );


  }

    onRegister(token) {
      console.log('------AppIndex------onRegister', token, );
      // Alert.alert('Registered !', JSON.stringify(token));
      console.log('token: ', token.token);
      this.setState({
        registerToken: token.token,
        fcmRegistered: true
      });
    }

    onNotif(notif) {
      console.log('------AppIndex-------notif', notif, );
      // console.log(notif);
      // Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
      console.log('------AppIndex-------handlePerm', perms, );
      // Alert.alert('Permissions', JSON.stringify(perms));
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

  componentDidMount(){
    // this.notif.localNotif();
    // this.notif.scheduleNotif(30);
    
  }


  reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {      
      // Open this up in your console of choice and dive into this action variable
      const scene = Actions.currentScene;

    
      // Add some lines like this to grab the action you want
      if(action.type === 'Navigation/BACK' && state.index === 0){ 
          // console.log('.....: action.type ',action.type +" state.index: "+state.index)
      
          BackHandler.exitApp()
      }else if(action.type === 'Navigation/BACK' && state.index >= 1){   
        // console.log('#############-----: action.type ', action.type + " state.index: " + state.index + " COUNT: " + AppConstant.INTERSTITIAL_COUNT )
      
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
            {/* <Scene initial key='app' component={App} tabs={true} tabBarStyle={{ backgroundColor: '#FFFFFF' }} hideNavBar /> */}

            <Scene initial key='splash' component={Splash} tabs={true} tabBarStyle={{ backgroundColor: '#FFFFFF' }} hideNavBar />
            <Scene key='AppScan' component={AppScan} hideNavBar />
            <Scene key='ReportScan' component={ReportScan} hideNavBar />

            <Scene key="ContactScreen" component={ContactScreen} hideNavBar /> 
            <Scene key="HomeScreen" component={HomeScreen} type="reset" modal hideNavBar  />     
            <Scene key="HomeLogin" component={HomeLogin} type="reset" modal hideNavBar  />     
            
            <Scene key="PatientProfileScreen" component={PatientProfileScreen} hideNavBar />                       
            <Scene key="AddPatientScreen" component={AddPatientScreen} hideNavBar />                       
            <Scene key="PrescriptionListScreen" component={PrescriptionListScreen} hideNavBar />                      
            <Scene key="PrescriptionDetailsScreen" component={PrescriptionDetailsScreen} hideNavBar />                       
            <Scene key="MedicineDetailsScreen" component={MedicineDetailsScreen} hideNavBar />                       
            <Scene key="AddPrescriptionScreen" component={AddPrescriptionScreen} hideNavBar />                       
            <Scene key="ReportDetailsScreen" component={ReportDetailsScreen} hideNavBar />                       
            <Scene key="MedicineListScreen" component={MedicineListScreen} hideNavBar />                       
            <Scene key="EditMedicineScreen" component={EditMedicineScreen} hideNavBar />  
            

            <Scene key="MedicineUpdateScreen" component={MedicineUpdateScreen} hideNavBar /> 
            <Scene key="AddMedicineScreen" component={AddMedicineScreen} hideNavBar /> 
            <Scene key="AddDoseScreen" component={AddDoseScreen} hideNavBar />                            
            <Scene key="DoseUpdateScreen" component={DoseUpdateScreen} hideNavBar />  
            <Scene key="FullImageScreen" component={FullImageScreen} hideNavBar />    

            <Scene key="EditPrescriptionScreen" component={EditPrescriptionScreen} hideNavBar />                                                    
            <Scene key="EditReportScreen" component={EditReportScreen} hideNavBar />                                                    
            
            <Scene key="TermsAndConditionScreen" component={TermsAndConditionScreen} hideNavBar />                            
            <Scene key="PrivacyPolicyScreen" component={PrivacyPolicyScreen} hideNavBar />
            <Scene key="MyProfileScreen" component={MyProfileScreen} hideNavBar />                                    
            <Scene key="EditProfileScreen" component={EditProfileScreen} hideNavBar />                                    
            
            
            <Scene key = "AddReportScreen" component = { AddReportScreen } hideNavBar / >
            <Scene key = "ReportListScreen" component = { ReportListScreen } hideNavBar / >

          </Scene>
        </Router>
      </Root>
        

      
    );
  }
  


}