/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  I18nManager,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,  
  FlatList,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {ListItem, Button, Left, Right} from 'native-base';
import Image from 'react-native-remote-svg';
import * as NB from 'native-base';

import Navbar from '../../component/Navbar';
import String from '../../component/String';
import LoginHomeStyle from '../../component/style/PataintStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../component/Colors'
import { Dialog } from 'react-native-simple-dialogs';
import {RadioButton} from 'react-native-paper';

import RNPickerSelect from 'react-native-picker-select';

var DATA = DATA = [{
      id: '1',
      title: String.nav_home,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/1.png'
    },
    {
      id: '2',
      title: String.nav_patient,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/2.png'
    },

    {
      id: '3',
      title: String.nav_medicine,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/3.png'
    },
    {
      id: '4',
      title: String.nav_profile,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
    },
    {
      id: '5',
      title: String.nav_login,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '6',
      title: String.nav_profile,
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/4.png'
    },
    {
      id: '7',
      title: "Add Prescription",
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '8',
      title: "Report",
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '9',
      title: "Medicine(s)",
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
    {
      id: '10',
      title: "Prescription(s)",
      logo_url: 'http://my.n-api.com/assets/v1.0/images/newspaper_logo/malaysia/720/5.png'
    },
  ]


export default class EditMedicineScreen extends Component {

   state = {
    checked: 'first',
  };

  constructor(props){
    super(props)

    this.state={
      medicine_name: false,
      medicine_reminder: false,

  }

    console.log('--------this.state.medicine_name: ' + this.state.medicine_name)

  }

  renderItem = ({ item }) => (
    <TouchableOpacity >
      <ListItem
        style={HeaderStyle.CardItemBorder}
        key={item.id}
        button={true}
        onPress={() => this.itemClicked(item)} >
            <NB.Left style={HeaderStyle.leftImages}>                  
              <ImageLoader 
              source={ item.news_image_url }
              fallback={ fallbacks }
              style={{height: 80, width: 80,}}/>
              <NB.Body>
              <NB.Text numberOfLines={2} style={{height:51,}} >{item.news_title} </NB.Text>                    
              <NB.Text numberOfLines={1} style={HeaderStyle.newsDatetime}>{item.source_newspaper_name} - {item.date_time} </NB.Text>
            </NB.Body>    
            </NB.Left>         
      </ListItem>
        {/* <Image source={require('./images/devider.png')}  style={{height:1,width:'100%',}}  /> */}

    </TouchableOpacity>   
  )

  render(){

    const {checked} = this.state;

      var left = (
            <Left style={{flex: 1}}>
              <Button onPress={() => Actions.pop()} transparent>
                  <Icon name = "arrow-left" style = {{marginLeft: Platform.OS === 'ios' ? 10 : 0,fontSize: 20,color: '#fff',transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}/>
              </Button>
            </Left>
          );

      var right = <Right style={{flex: 1}} />;

  return (
    <SafeAreaView>
      <Navbar left={left} right={right} title="Edit Medicine" />

      <NB.View
        style={{backgroundColor: '#f3f7fa', width: '100%', height: '100%'}}>
        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
          }}>
          <NB.View style={{width: '20%'}}>
            <TouchableHighlight
              style={[
                styles.profileImgContainer,
                {borderColor: '#00000000', borderWidth: 1},
              ]}>
              <Image
                source={{
                  uri:
                    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
          </NB.View>

          <NB.View style={{width: '77%', marginLeft: 10, marginTop: 3}}>
            <NB.View style={{marginTop: Platform.OS === 'ios' ? 28 : 10}}>
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  {label: 'Football', value: 'football'},
                  {label: 'Baseball', value: 'baseball'},
                  {label: 'Hockey', value: 'hockey'},
                ]}
              />

              <NB.View
                style={{
                  width: '95%',
                  height: 2,
                  backgroundColor: Color.readmore,
                  marginRight: 0,
                  marginTop: Platform.OS === 'ios' ? 10 : -5,
                }}
              />
            </NB.View>

            <NB.View
              style={{flexDirection: 'row', marginTop: 18, marginBottom: 30}}>
              <Icon
                name="circle"
                style={{
                  fontSize: 24,
                  color: Color.color_theme,
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                  marginRight: 20,
                }}>
                Before Meal
              </NB.Text>

              <Icon
                name="circle"
                style={{
                  fontSize: 24,
                  color: '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                  marginRight: 20,
                }}>
                After Meal
              </NB.Text>
            </NB.View>

            <NB.View
              style={{flexDirection: 'row', marginTop: 0, marginBottom: 20}}>
              <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color: Color.color_theme,
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginRight: 15,
                  marginTop: 2,
                }}>
                Morning
              </NB.Text>

              <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color: '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginRight: 15,
                  marginTop: 2,
                }}>
                Afternoon
              </NB.Text>

              <Icon
                name="check-square"
                style={{
                  fontSize: 24,
                  color: '#c2c2c2',
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
              <NB.Text
                style={{
                  color: '#c2c2c2',
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 2,
                }}>
                Night
              </NB.Text>
            </NB.View>
          </NB.View>
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 0,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            marginTop: 10,
          }}>
          <NB.View style={{marginLeft: 10, marginBottom:-10}}>
            <NB.Text
              style={{color: Color.color_app, fontSize: 18, marginTop: 20}}>
              Repeat
            </NB.Text>
            <NB.View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 30,
                marginTop: 15,
              }}>
              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}
                    onPress={()=>{
                      this.setState({
                        medicine_reminder:true
                      })

                    }}>Sat</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Sun</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Mon</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Tue</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Wed</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Thu</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>

              <NB.View style={styles.container}>
                <NB.View style={styles.outerCircle}>
                  <NB.View style={styles.innerCircle}>
                    <NB.Text style={{color: 'white'}}>Fri</NB.Text>
                  </NB.View>
                </NB.View>
              </NB.View>
            </NB.View>
          </NB.View>
        </NB.View>

        <NB.View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 25,
            padding: 15,
          }}>
          <NB.View
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <NB.Text
              style={{color: Color.color_theme, fontSize: 18, marginTop: 5}}>
              Start From
            </NB.Text>
          </NB.View>

          <NB.View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 15,
              justifyContent: 'space-between',
            }}>
            <NB.View
              style={{
                marginTop: Platform.OS === 'ios' ? 28 : 10,
                width: '30%',
              }}>
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  {label: 'Day', value: 'Day'},
                  {label: 'Month', value: 'Day'},
                  {label: 'Year', value: 'Day'},
                ]}
              />

              <NB.View
                style={{
                  width: '95%',
                  height: 2,
                  backgroundColor: Color.readmore,
                  marginRight: 0,
                  marginTop: Platform.OS === 'ios' ? 10 : -5,
                }}
              />
            </NB.View>

            <NB.View
              style={{
                marginTop: Platform.OS === 'ios' ? 28 : 10,
                width: '30%',
              }}>
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  {label: 'Day', value: 'Day'},
                  {label: 'Month', value: 'Day'},
                  {label: 'Year', value: 'Day'},
                ]}
              />

              <NB.View
                style={{
                  width: '95%',
                  height: 2,
                  backgroundColor: Color.readmore,
                  marginRight: 0,
                  marginTop: Platform.OS === 'ios' ? 10 : -5,
                }}
              />
            </NB.View>

            <NB.View
              style={{
                marginTop: Platform.OS === 'ios' ? 28 : 10,
                width: '30%',
              }}>
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  {label: 'Day', value: 'Day'},
                  {label: 'Month', value: 'Day'},
                  {label: 'Year', value: 'Day'},
                ]}
              />

              <NB.View
                style={{
                  width: '95%',
                  height: 2,
                  backgroundColor: Color.readmore,
                  marginRight: 0,
                  marginTop: Platform.OS === 'ios' ? 10 : -5,
                }}
              />
            </NB.View>

            {/* <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90, padding: 5, marginRight: -30}}>
              <NB.Text
                style={{
                  color: Color.readmore,
                  fontSize: 18,
                  marginRight: 30,
                  marginLeft: 10,
                }}>
                Day
              </NB.Text>
            </ImageBackground>

            <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90}}>
              <NB.Text
                style={{
                  color: Color.readmore,
                  fontSize: 18,
                  marginLeft: 15,
                  marginLeft: 10,
                }}>
                Month
              </NB.Text>
            </ImageBackground>

            <ImageBackground
              source={require('../images/dateback.png')}
              style={{width: 90}}>
              <NB.Text
                style={{color: Color.readmore, fontSize: 18, marginLeft: 20}}>
                Year
              </NB.Text>
            </ImageBackground> */}
          </NB.View>
        </NB.View>

        {/* Dialog 1  
        <Dialog
          visible={this.state.medicine_name}
          animationType="fade"
          onTouchOutside={() => this.setState({medicine_name: false})}>
          <NB.View style={{height: 400}}>
            <NB.Text style={{fontSize: 20, marginBottom: 20}}>
              Select Medicine Name
            </NB.Text>

            <FlatList
              style={{flex: 1, marginRight: 0, alignContent: 'center'}}
              data={DATA}
              renderItem={({item}) => (
                <NB.View>
                  <TouchableHighlight
                    style={{flex: 1, flexDirection: 'column', margin: 5}}>
                    <NB.Button
                      onPress={() => {
                        console.log(' Selected_value : ' + item.name);
                      }}
                      style={{
                        width: '100%',
                        height: 50,
                        marginLeft: 0,
                        borderRadius: 10,
                        marginRight: 0,
                        marginTop: 5,
                        backgroundColor: Color.button_color_back,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <NB.Text style={{color: 'black'}}>{item.title}</NB.Text>
                    </NB.Button>
                  </TouchableHighlight>
                </NB.View>
              )}
              //Setting the number of column
              numColumns={1}
              keyExtractor={(item, index) => index}
            />

            <TouchableHighlight
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <NB.Button
                onPress={() => this.setState({medicine_name: false})}
                style={{
                  flex: 1,
                  height: 50,
                  width: 150,
                  justifyContent: 'center',
                  backgroundColor: Color.color_theme,
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 10,
                }}>
                <NB.Text>CANCEL</NB.Text>
              </NB.Button>
            </TouchableHighlight>
          </NB.View>
        </Dialog> */}


            {/*  Dialog 1   */}
      <Dialog
          visible={this.state.medicine_reminder}
          animationType	= 'fade' 
          style={{ backgroundColor:'white' }}
          onTouchOutside={() => this.setState({medicine_reminder: false})} >
          <NB.View >

          <NB.View style={{flexDirection: 'row', justifyContent:'space-between' }}>
            <NB.Text style={{ color:Color.color_theme, fontSize:25, width:'70%' }}>Alert For Patient Name</NB.Text>
            <TouchableHighlight
                      style={[styles.medicineContainer,{ borderColor: Color.readmore, borderWidth:1,  }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.medicineImg} />
            </TouchableHighlight>
          </NB.View>

          <NB.View style={{ backgroundColor: Color.color_theme, height:1, width:'100%' }}></NB.View>

          <NB.View style={{ justifyContent:'space-evenly', flexDirection:'row', marginTop:8 }}>
            <TouchableHighlight
                      style={[styles.medicineNameContainer,{ borderColor: Color.readmore, borderWidth:1, marginTop:20 }]}
                    >
                <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.medicineNameImg} />
            </TouchableHighlight>
          </NB.View>



        <NB.View style={{ justifyContent:'center',alignItems:'center', marginTop:8, marginBottom:0 }}>
            <NB.Text style={{ color: Color.color_theme, fontSize:24,  }}>Medicine Name</NB.Text>
        </NB.View>

        <NB.View style={{ justifyContent:'center',alignItems:'center', marginTop:8, marginBottom:0 }}>
            <NB.Text style={{ color: '#c2c2c2',fontSize: 16,  }}>After Meal</NB.Text>
            <NB.Text style={{ color: '#c2c2c2',fontSize: 16, }}>10:30 PM</NB.Text>
        </NB.View>



        <NB.View style={{ flexDirection:'row', justifyContent:'space-between',alignItems:'center', marginTop:28, marginBottom:10 }}>
              {/* <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white', fontSize:20,alignItems:'center', paddingTop:15, paddingBottom:15,width:100 }}>CANCEL</NB.Text> */}
              <NB.Text style={{ backgroundColor: Color.color_change_bookmark, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginLeft:10}}>SKIP</NB.Text>
              <NB.Text style={{ backgroundColor: Color.color_twelve, color:'white',fontSize:20, textAlign:'center',alignItems:'center', paddingTop:15, paddingBottom:15, width:110, borderBottomWidth:1, borderColor: Color.readmore, marginRight:10}}>TAKE</NB.Text>
        </NB.View>

      
          </NB.View>

          {/* { this.state.isLoading ? <Loading /> : null } */}
      </Dialog>


      </NB.View>
    </SafeAreaView>
  );
};
}

const styles = StyleSheet.create({
  profileImgContainer: {
    marginLeft: 14,
    marginRight:10,
    marginTop:12,
    height: 54,
    width: 54,
    borderRadius: 30,
  },
  profileImg: {
    height: 54,
    width: 54,
    borderRadius: 30,
  },


  day_circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: Color.color_theme,
    borderColor: 'white',
    borderWidth: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  outerCircle: {
    borderRadius: 40,
    width: 90,
    height: 90,
    backgroundColor: 'white',
  },
  innerCircle: {
    borderRadius: 30,
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: Color.color_theme,
    justifyContent:'center',
    alignItems:'center'
  },
  medicineContainer: {
      marginLeft: 8,
      height: 80,
      width: 80,
      borderRadius: 40,
      marginTop: -10,
      marginRight:0,
      marginBottom:10
    },
    medicineImg: {
      height: 80,
      width: 80,
      borderRadius: 40,
    },
    medicineNameContainer: {
        marginLeft: 8,
        height: 105,
        width: 105,
        borderRadius: 55,
        
        marginRight: 0,
        marginBottom: 10
      },
      medicineNameImg: {
        height: 105,
        width: 105,
        borderRadius: 55,
      },

});
