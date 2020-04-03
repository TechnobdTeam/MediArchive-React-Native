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
import StringValuesEn from './StringValuesArr'
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


var DATA = []





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

    componentDidMount() {
      this.getNavigationItem();
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

      {(item.id == '4' && this.state.notificationVisible)?
      
      <NB.View style={{backgroundColor: '#fff', padding:10, flex:1, marginRight: -18, marginTop:15, marginBottom: -15, alignContent: 'center',justifyContent: 'center' }}>

        <NB.View >
        <NB.View style={{borderBottomWidth:1,borderBottomColor:'#ccc',paddingBottom:5,}} >
          <NB.Text style={{display:'flex',alignItems:'center',fontSize:20,justifyContent:'center',}}> <NB.Icon name="md-notifications-outline" /> {StringValuesEn.notification} </NB.Text>
        </NB.View>
        </NB.View>

        <NB.ListItem icon style={{paddingLeft:0,marginLeft:0,paddingRight:0,marginRight:0,flexWrap: 'wrap',justifyContent: 'space-between',marginTop:15,}}>
          <NB.Text style={{fontSize:13,}}>{this.state.switchValue ? StringValuesEn.notification_is_on : StringValuesEn.notification_will_stop }</NB.Text>
          <NB.Switch 
            trackColor={{false: 'red' ,true: 'green' }} 
            value={this.state.switchValue}  
            onValueChange ={(switchValue)=>{              
              // console.log("switchValue: "+switchValue)

              if(switchValue){
                this.setState({
                  switchValue : switchValue,
                  push_stop_dialogue: false,
                  })
                this.callApi("startPushNotification");
              }else{
                this.setState({
                  switchValue : switchValue,
                  push_stop_dialogue: true,
                  isLoading: false,
                  })
              }

            }
            } />
        </NB.ListItem>

        {(!this.state.switchValue && this.state.push_is_stopped && !this.state.push_stop_dialogue) ? 
          <NB.View>
            <NB.ListItem icon style={{paddingLeft:0,marginLeft:0,paddingRight:0,marginRight:0,marginTop:7,}}>
            <NB.Left style={{width:60,}}>
            <NB.Text style={{color:'#000'}} >{StringValuesEn.from} </NB.Text>
            </NB.Left>
            <NB.Right style={{borderBottomWidth:0,}}>
            <NB.Text style={{color:'#000'}}> {this.state.FROM_TIME_STRING}</NB.Text>
            </NB.Right>
            </NB.ListItem>
            <NB.ListItem icon style={{paddingLeft:0,marginLeft:0,paddingRight:0,marginRight:0,marginTop:5,}}>
            <NB.Left style={{width:60,}}>
            <NB.Text style={{color:'#000'}} >{StringValuesEn.to}</NB.Text>
            </NB.Left>
            <NB.Right style={{borderBottomWidth:0,}}>
            <NB.Text style={{color:'#000'}}> {this.state.TO_TIME_STRING}</NB.Text>
            </NB.Right>
            </NB.ListItem>
        </NB.View>  : null }      

        </NB.View>              
      
      : null}


      

      </Body>
    </ListItem>
    </TouchableHighlight>   
    )



    onPress = () => {
    // Toast.show("Clicked ");
    this.setState({
    count: this.state.count+1
    })
    }



    itemThemeClicked(item){
    // console.log("Item Clicked: "+item)
    this._storeData(StringValuesEn.theme_colro, item)
    AppConstant.THEME_COLOR = item;

    this.setState({
      THEME_COLOR : item,
      colorVisible:false,
    })
    Actions.home_screen({ selected_tab: 0 , source_news_id: '1' });

    }

    _storeData = async (key, value) => {
    try {
    await AsyncStorage.setItem(key, value);
    } catch (error) {
    // Error saving data
    }
    };

    submitTurnOFF(){
    // console.log("user_off_hours: "+ this.state.user_off_hours)
    this.callApi("stopPushNotification");

    }
    submitCancel(){
    this.setState({ isLoading: false, push_stop_dialogue:false })  
    console.log("submitCancel: ")   
    }

    state = {user_off_hours: ''}

    updateUser = (user_off_hours) => {
    // console.log( " user_off_hours: "+ user_off_hours)
    this.setState({ user_off_hours: user_off_hours })
    }

    _storeData = async (key, value) => {
    try {
    await AsyncStorage.setItem(key, value);
    } catch (error) {
    // Error saving data
    }
    };

    menuDrawerItem(){
      
    }


    searchNews(boolean_){
      if(boolean_ == false){
        this.setState({
          dialoge_search_type: false
        })
      }else{
  
        if(this.state.keyword ==''){
          var empty_message = StringValuesEn.key_word_can_not_empty;
          Toast.show(empty_message);
        }else{
  
          if(this.state.selected_value == 0){
            this.setState({
              dialoge_search_type: false,
              search_type:'start_with',
            })
          }else if(this.state.selected_value == 1){
            this.setState({
              dialoge_search_type: false,
              search_type:'having',
            })
          }
  
          console.log("Actions.news_search_screen: "
          +this.state.keyword+" selected_value: "
          +this.state.selected_value+" search_type: "
          +this.state.search_type)
  
          Actions.news_search_screen({keyword: this.state.keyword, selected_value: this.state.selected_value , search_type: this.state.search_type})
        }
      }
    }


    getNavigationItem(){
      DATA = [
        {
          id: '1',
          title: StringValuesEn.nav_search,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/1.png'
        },
        {
          id: '2',
          title: StringValuesEn.nav_bookmark,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/2.png'
        },
      
        {
          id: '3',
          title: StringValuesEn.nav_hash_tag,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/3.png'
        },
        {
          id: '4',
          title: StringValuesEn.nav_notification,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
        },
        {
          id: '5',
          title: StringValuesEn.nav_change_theme,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
        },
        {
          id: '6',
          title: StringValuesEn.nav_contact,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/6.png'
        },
        {
          id: '7',
          title: StringValuesEn.nav_country,
          image: require('../page/images/placeholder.png'),
          logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/7.png'
        },
      
      ];
    }

    renderHeader() {
      return (
        <View style={styles.headerFooterContainer}>
          <Text>This is header</Text>
        </View>
      )
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
              <Text style ={styles.headingTitle} >Newsello</Text>           
          </View>

          {/* Top News List */}
          <View style = {{ backgroundColor : Colors.menu_item_color}}>
          <TouchableOpacity style ={{paddingLeft: 0, backgroundColor : Colors.color_default}} onPress={()=> Actions.HomeScreen()}>
              <View style= {styles.firstComponent}>
                      <Image
                          style={styles.childrensImage}
                          source={ require('../page/images/placeholder.png') }
                        />
                      <Text style={styles.childrensTitle}>{StringValuesEn.newspaper}</Text>
                </View>  
          </TouchableOpacity>
          <View style = { { width: '100%', height:1, backgroundColor : Colors.color_change , paddingLeft: 20} }></View>
                  

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
