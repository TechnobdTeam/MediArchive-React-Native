/**
* This is the Side Menu Drawer Component
**/

// React native and others libraries imports
import Drawer from 'react-native-drawer';
import React, { Component, Fragment } from 'react';
import {
  Image,
  Text,
  I18nManager,
  Keyboard,
  StyleSheet,
  UIManager,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

import { View, ListItem, Body,  } from 'native-base';
import { Actions, } from 'react-native-router-flux';
import Colors from './Colors';
import styles from './style/SlideMenuStyle';
import * as NB from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from './AppConstant';


var DATA = []
export default class SideMenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false ,   
      country_name : AppConstant.COUNTRY_NAME, 
      jwt_token:'',
      welcome_mediarchive: 'Welcome to MediArchive',
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
    };


    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount(){
    AsyncStorage.getItem(AppConstant.jwt_token, (error, value) => {
      this.setState({
        jwt_token : value
      })
      console.log("-------SideMenuDrawer--------jwt_token: " + value)

      var login_title= ''
      if (value === '' || value === null){
        login_title = 'Login'
        if (AppConstant.LOGIN_REQUIRED === false){
          // AppConstant.LOGIN_REQUIRED = true;
          Actions.HomeLogin();
        }
      }else{
        login_title = 'Logout'
      }

      // 
      // Patients
      // Add Patient
      // My Profile
      // Privacy Policy
      // Terms & Conditions
      // Logout

  DATA = [{
    id: '1',
    title: 'Patients',
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/1.png'
  },
  {
    id: '2',
    title: 'Add Patient',
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },
  {
    id: '3',
    title: 'My Profile',
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },
  {
    id: '4',
    title: 'Privacy Policy',
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },
  {
    id: '5',
    title: 'Terms & Conditions',
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },
  {
    id: '6',
    title: login_title,
    image: require('../page/images/placeholder.png'),
    logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
  },

];

if (login_title === 'Login'){
  DATA.splice(2, 1);
}


  this.setState({
    isLoading:false
  })
  })
  }



    renderItem = ({ item }) => (
    <TouchableOpacity 
    >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => this.navigationItemClicked(item)}
      >
      <Body>  
      <View View style = {styles.firstComponent} >
        <Text Text Text style = {styles.childrensTitle } >
        {item.title}
        </Text>
      </View> 
      </Body>
    </ListItem>
    </TouchableOpacity>   
    )

    navigationItemClicked(item){
      if (item.title === 'Patients') {
        Actions.HomeScreen()
      } else if (item.title === 'Add Patient') {
        
        if (this.state.jwt_token === '' || this.state.jwt_token == null) {
          this.createThreeButtonAlert()
        } else {
          Actions.AddPatientScreen({
            action_type: 'add',
            patient_id: '',
            blood_group: '',
            gender: '',
            age: '',
            p_dob: '',
            photo: '',
            p_name: '',
          });
        }
      } else if (item.title === 'My Profile') {
        Actions.MyProfileScreen();
      } else if (item.title === 'Privacy Policy') {
        Actions.PrivacyPolicyScreen()
      } else if (item.title === 'Terms & Conditions') {
        Actions.TermsAndConditionScreen()
      } else if (item.title === 'Login' || item.title === 'Logout') {
        // Actions.HomeLogin();
        if (this.state.jwt_token === '' || this.state.jwt_token === null) {
          Actions.HomeLogin();
        } else {
          this.loginDialog()
          // alert('You already login!');
        }
      }
      console.log('........Else.........: ' + item.title )
    }

    loginDialog(){
      Alert.alert(
        "Are you sure?",
        '',
        [{
            text: "Logout",
            onPress: () => {
              this.getApiResponse();
              console.log("Delete ")
            }
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }

        ], {
          cancelable: false
        }
      );
    }


    addPatient() {
      if (jwt_token === '' || jwt_token == null) {
        this.createThreeButtonAlert()
      } else {
        Actions.AddPatientScreen({
          action_type: 'add',
          patient_id: '',
          blood_group: '',
          gender: '',
          age: '',
          p_dob: '',
          photo: '',
          p_name: '',
        });
      }

      console.log('Add')
    }

    createThreeButtonAlert = () =>
      Alert.alert(
        "Might be you are not logged in!",
        'Login / Register ',
        [{
            text: "Login",
            onPress: () => {

              Actions.HomeLogin();

            }
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ], {
          cancelable: false
        }
      );

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }



  
    renderFooter(action) {
      return (
        <TouchableOpacity
          style={styles.headerFooterContainer}
          onPress={() => {
            Alert.alert('Footer', "You've click the footer!", [
              {
                text: 'OK'
              },
              {
                text: 'Close Dropdown',
                onPress: action.close.bind(this)
              }
            ])
          }}
        >
          <Text>This is footer, click me!</Text>
        </TouchableOpacity>
      )
    }
  
    renderField(settings) {
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={{
          borderColor: 'grey',
          borderWidth: 1,
          padding: 15
        }}>
          <View>
            {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
            {selectedItem && (
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.clearButton} onPress={clear}>
                  <Text style={{ color: '#fff' }}>Clear</Text>
                </TouchableOpacity>
                <Text style={[styles.text, { color: selectedItem.color }]}>
                  {getLabel(selectedItem)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }

    renderOption(settings) {
      const { item, getLabel } = settings
      return (
        <View style={styles.optionContainer}>
          <View style={styles.innerContainer}>
            <View style={[styles.box, { backgroundColor: item.color }]} />
            <Text style={{ color: item.color, alignSelf: 'flex-start' }}>{getLabel(item)}</Text>
          </View>
        </View>
      )
    }



    // --------------------------------------------Api-Call-------------------------
        getApiResponse() {
          console.log(" user/logout:" );

          var Authorization = 'Bearer ' + this.state.jwt_token

          var URL = AppConstant.BASE_URL + "user/logout";
          var formData = new FormData()
          formData.append('api_key', this.state.api_key);
          let device_uuid = DeviceInfo.getUniqueId();
          formData.append('device_type', this.state.device_type);
          formData.append('device_uuid', device_uuid);


          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              console.log(" GetParam device_uuid:" + device_uuid);

              return fetch(URL, {
                  method: 'POST',
                  headers: {
                    'Authorization': Authorization
                  },
                  body: formData,
                })
                .then((response) => response.json())
                .then((responseJson) => {

                  console.log(responseJson);

                  if (responseJson.response.type === "success") {
                    console.log(" message : " + responseJson.response.message);
                    this.clearAsyncStorage();
                    Actions.HomeScreen()
                  } else if (responseJson.response.type === "error") {
                    
                    alert(responseJson.response.message);
                  }

                })
                .catch((error) => {
                  console.error(error);
                  alert(error);
                });
            } else {
              alert('Please connect to internet and try again. ');
              return;
            }
          });
        }

  // --------------------------------------------Resder View------------------------------
  render() {
    return(
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={
          <Fragment style={style.container}>

          <ScrollView style={style.container} contentContainerStyle={{flexGrow: 1}}>

          <View style={{ flex: 1, backgroundColor: AppConstant.THEME_COLOR,   }}>
          
          {/* Header Name */}
          {/* <View style={styles.headerContainer}>
              <Text style ={styles.headingTitle} >{String.nav_app_name}</Text>           
          </View> */}

        <NB.View style = {
          {
            backgroundColor: Colors.color_theme,
          }
        } >
        <NB.View style = {
          {
            marginTop: Platform.OS === 'ios' ? 40 : 30,
            marginBottom: Platform.OS === 'ios' ? 30 : 25,
            marginLeft:10,
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
          }
        } >
        {/* require('../page/images/ic_launcher_round.png') */}
        <Image
          resizeMode={'contain'}
          source = {
            require('../page/images/nav_top_logo.png')
          }
          style={{ height:75,width:75, flex:Platform.OS === 'ios' ? 2 : 2.5 }}    
          />
          {/* style={{ height:75,width:75, flex:Platform.OS === 'ios' ? 2 : 2.5 }}  */}
          <Text style={{ fontSize:24, color:'white' ,marginLeft:10, width:150, flex:5}}>{this.state.welcome_mediarchive}</Text>
        

        </NB.View>
        
      </NB.View>

      {/* New Item List */}
      <FlatList 
        contentContainerStyle={{flexGrow: 1}} 
        style = {styles.listBackground}
        data={DATA}          
        renderItem={this.renderItem}
        keyExtractor={({id}, index) => id}
      />

      </View>

      </ScrollView>

      </Fragment>

        }
        tapToClose={true}
        type="overlay"
        openDrawerOffset={0.3}
        onCloseStart={() => Keyboard.dismiss()}
        >
          {this.props.children}
      </Drawer>
      );
    }

    close() {
      this._drawer.close();
    }

    open() {
      this._drawer.open();
    }
  }



const style = StyleSheet.create({
  container:{
    flex: 1,
  },
  cancel_button:{    
    marginTop:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#727272',
    borderRadius:10,
    borderWidth: 1,
    width:150,
    borderColor: '#fff',    
    },
    submit:{    
    marginTop:20,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:AppConstant.THEME_COLOR,
    borderRadius:10,
    borderWidth: 1,
    width:'80%',
    borderColor: '#fff',    
    },
    submitText:{
      color:'#fff',
      textAlign:'center',
    },
    bodyNotification:{
    flexDirection:'row',
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    text: {
      fontSize: 18
    },
    headerFooterContainer: {
      padding: 10,
      alignItems: 'center'
    },
    clearButton: { backgroundColor: 'grey', borderRadius: 5, marginRight: 10, padding: 5 },
    optionContainer: {
      padding: 10,
      borderBottomColor: 'grey',
      borderBottomWidth: 1
    },
    optionInnerContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    box: {
      width: 20,
      height: 20,
      marginRight: 10
    },
    buttonStyle: {
      flex: 1,
      height: 50,
      width:150,
      justifyContent: 'center',
      backgroundColor: AppConstant.THEME_COLOR,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 50
  },
  childrensTitle: {
    fontSize: 18,
    color: '#ffffff',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 30,
  },
  firstComponent: {
    flexDirection: 'row',
    backgroundColor: Colors.menu_item_color,

  },

    });
