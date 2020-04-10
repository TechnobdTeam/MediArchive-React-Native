/**
* This is the Side Menu Drawer Component
**/

// React native and others libraries imports
import Drawer from 'react-native-drawer';
import React, { Component, Fragment } from 'react';
import { Text, I18nManager, Keyboard, StyleSheet, UIManager,  TouchableOpacity, TouchableHighlight, FlatList, AsyncStorage, SafeAreaView,ScrollView,ImageBackground, Platform} from 'react-native';
import { View, ListItem, Body,  } from 'native-base';
import { Actions, } from 'react-native-router-flux';
import Image from 'react-native-remote-svg'
import Colors from './Colors';
import String from './String'
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style/SlideMenuStyle';
import { Dialog } from 'react-native-simple-dialogs';
import * as NB from 'native-base';
import {ImageLoader} from 'react-native-image-fallback';
import moment from 'moment';
import AppConstant from './AppConstant';
const fallbacks = [  
  require('../page/images/placeholder.png'), // A locally require'd image
];


var DATA = DATA = [{
      id: '1',
      title: String.nav_home,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/1.png'
    },
    {
      id: '2',
      title: String.nav_patient,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/2.png'
    },

    {
      id: '3',
      title: String.nav_medicine,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/3.png'
    },
    {
      id: '4',
      title: String.nav_profile,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
    },
    {
      id: '5',
      title: String.nav_login,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '6',
      title: String.nav_profile,
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
    }, 
    {
      id: '7',
      title: "Add Prescription",
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '8',
      title: "Report",
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '9',
      title: "Medicine(s)",
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    }, 
    {
      id: '10',
      title: "Prescription(s)",
      image: require('../page/images/placeholder.png'),
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    
];





export default class SideMenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: false,
      isLoading: false ,
      dataSource: [],
      top_paper_open : true, 
      colorVisible : false,
      timeVissible: false,
      notificationVisible: false,   
      country_name : AppConstant.COUNTRY_NAME,
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key : '^)@$!',  
      offset: 0,
      start_hour: '',
      end_hours: '', 
      push_is_stopped: true,
      switchValue: false,   
      PickerValueHolder : "all",
      user_off_hours: '0',
      push_stop_dialogue: false,
      FROM_TIME_STRING:'',
      TO_TIME_STRING:'',
      THEME_COLOR: '',
      dialoge_search_type: false,
      keyword:'',
      selected_value: 0,
      search_type:'having',
    };


    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

    renderItem = ({ item }) => (
    <TouchableHighlight  >
    <ListItem style={{marginLeft:0, }}
      key={item.id}
      button={true}
      onPress={() => this.navigationItemClicked(item)} >
      <Body>  
      <View style= {styles.firstComponent}>
        <Image
            style={styles.childrensImage}
            source={ item.image }
          />
        <Text style={styles.childrensTitle}> {item.title}
        </Text>
      </View> 
      </Body>
    </ListItem>
    </TouchableHighlight>   
    )

    navigationItemClicked(item){
      if (item.id === '1') {
        Actions.HomeScreen()
      }else if (item.id === '2'){
        Actions.PatientProfileScreen()
      } else if (item.id === '3') {
        Actions.EditPatientScreen();
      } else if (item.id === '4') {
        Actions.PatientListScreen()
      } else if (item.id === '5') {
        Actions.MedicineDetailsScreen()
      } else if (item.id === '6') {
        Actions.DoctorDetailsScreen();
      } else if (item.id === '7') {
        Actions.AddPrescriptionScreen();
      } else if (item.id === '8') {
        Actions.ReportDetailsScreen();
      } else if (item.id === '9') {
        Actions.MedicineListScreen();
      } else if (item.id === '10') {
        Actions.EditMedicineScreen();
      }
      

      

      console.log('........Else.........: ' + item.title )
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
          <View style={styles.headerContainer}>
              <Text style ={styles.headingTitle} >{String.nav_app_name}</Text>           
          </View>

          
  

        {/* New Item List */}
        <FlatList contentContainerStyle={{flexGrow: 1}} style = {styles.listBackground}
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

    });
