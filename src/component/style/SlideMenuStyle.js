import React, { Fragment } from 'react';
import * as RC from 'react-native'; 
import Colors from '../Colors';
import AppConstant from '../AppConstant';

const SlideMenuStyle = RC.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppConstant.THEME_COLOR,    
  },
  container2: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green', 
    position: 'absolute',
    left:     0,
    top:      'auto',
    bottom: 0,
    width: '100 %',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  },
  tabBar: {
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    left:     0,
    top:      'auto',
    bottom: 0,
    width: '100 %',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 14,
    color: Colors.navbarBackgroundColor,
    paddingTop: 4
  }
  ,
  textContent: {
    fontSize: 14,
    color: 'white',
    paddingTop: 4
  },
  containerActivity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTitle:{    
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#ffffff'
  },
  headerContainer:{ 
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft:15, 
    marginRight:15, 
    width: 250, 
    height: Platform.OS === 'ios' ? 110 : 60, 
    color: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 0
     
  },
  firstComponent:{
    flexDirection:'row',
    backgroundColor: Colors.menu_item_color,
       
  },
  childrensImage:{           
      width: 24,
      height: 24,
      marginRight: 20,
      marginLeft: 20,
      marginTop: 15,
      marginBottom: 15,
      transform: [{scaleX: RC.I18nManager.isRTL ? -1 : 1}]
  },
  childrensTitle:{           
    fontSize: 18,
    color: '#ffffff',
    alignItems:'center',
    marginTop: 15,
    marginBottom: 15,
},
topComponent:{
  backgroundColor: '#fff',
  borderColor: Colors.color_default,
  borderRadius: 1, 
  alignItems: 'center',
    justifyContent: 'center'

},
childrensTop:{           
  justifyContent: 'center',
  alignItems: 'center',
},
topheadingTitle:{    
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  color: '#e84c3d',
  height: 50,
},
paperIconImage:{           
  width: '100%',
  height: 50,
  marginRight: 20,
  marginLeft: 20,
  backgroundColor: Colors.color_default,
  borderRadius: 5,
  marginBottom: -15
},
paperIconTopNews:{           
  width: '40%',
  height: 25, 
  
},
button: {
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  padding: 10
},
listBackground:{ 
  backgroundColor: Colors.menu_item_color 
},
newsPaperList:{ 
  backgroundColor: Colors.readmore ,
  marginBottom:0,
  marginTop:0,
  paddingBottom:0,
  paddingTop:0,
},
paperIconBac:{flex: 1,
  justifyContent: 'center', 
  alignItems: 'center',
  marginBottom:0,
  marginTop:0,
  paddingBottom:0,
  paddingTop:0
},

paperTopNews:{
  justifyContent: 'center', 
  alignItems: 'center',
  marginBottom:0,
  marginTop:0,
  paddingBottom:0,
  paddingTop:0,
}
  


});

export default SlideMenuStyle;