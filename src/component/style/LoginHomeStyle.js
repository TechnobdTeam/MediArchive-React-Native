import React, { Fragment } from 'react';
import * as RC from 'react-native'; 
import Colors from '../Colors';;

const LoginHomeStyle = RC.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color_app,
  },
top_login_back:{
  width: '100%',
  backgroundColor: Colors.color_theme,
},
top_back: {
  width: '100%',
  height: 40,
  backgroundColor: Colors.color_theme,
  flexDirection:'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
top_text: {
  flex:1,
  fontSize:18,
  color:'white',
  textAlign: 'center'
},
top_indicator: {
  flex: 1,
  fontSize: 18,
  color: 'white',
},
body_view:{
  height:'100%',
  width:'100%',
  backgroundColor:'red'
},
login_submit:{
  backgroundColor: Colors.color_theme,
  borderRadius:5,
  marginTop:30,
  marginBottom:40,
  justifyContent: 'center',
  alignItems: 'center',

},
forgot_password:{
  textAlign:'center',
  color: Colors.color_theme,
  textDecorationLine: 'underline',
  fontSize:18,
},
verification_title:{
  fontSize:18,
  fontWeight:'bold',
  color: Colors.menu_item_color,
  marginBottom:10,
},
resend_submit: {
  flex:1,
  backgroundColor: Colors.readmore,
  borderRadius: 5,
  marginTop: 30,
  marginBottom: 40,
  marginLeft:10,
  justifyContent: 'center',
  alignItems: 'center',
},
verification_submit: {
  flex: 1,
  backgroundColor: Colors.color_theme,
  borderRadius: 5,
  marginTop: 30,
  marginBottom: 40,
  marginRight:10,
  justifyContent: 'center',
  alignItems: 'center',
},
verification_message: {
  fontSize: 16,
  color: Colors.readmore,
  marginTop:25,
},

  


});

export default LoginHomeStyle;