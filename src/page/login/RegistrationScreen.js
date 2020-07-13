import React, {Component, Fragment} from 'react';
import {
  StatusBar,
  AsyncStorage,
  I18nManager,
  NativeModules,
  Platform,
  SafeAreaView,
  Alert,
  TouchableOpacity, 
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as NB from 'native-base';
import {Image} from 'react-native';
import Color from '../../component/Colors';
import String from '../../component/String'
import LoginHomeStyle from '../../component/style/LoginHomeStyle';

import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import AppConstant from '../../component/AppConstant';
import Loading from '../../component/Loading'
// import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
// import Toast from 'react-native-simple-toast';


export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device_type: Platform.OS === 'ios' ? '2' : '1',
      api_key: 'cp/W?^,([{,O_+T',
      isLoading: false,
      name: '',
      email:'',
      password: '',
      re_password:'',
      check_box:false,

    };
    this.secondTextInputRef = React.createRef();
  }


  // ----------------------KeyBoard--------------------
  scrolldown(ref) {
    const self = this;
    this.refs[ref].measure((ox, oy, width, height, px, py) => {
      self.refs.scrollView.scrollTo({
        y: oy - 200
      });
    });
  }

  // -----------------------KeyBoard-------------------

  componentDidMount() {
    
  }

    getApiResponse() {
      this.setState({
        isLoading: true
      })

      var URL = AppConstant.BASE_URL + "user/emailExistCheck";
      var formData = new FormData()
      formData.append('api_key', this.state.api_key);
      let device_uuid = DeviceInfo.getUniqueId();
      formData.append('device_type', this.state.device_type);
      formData.append('device_uuid', device_uuid);
      formData.append('email', this.state.email);


      NetInfo.fetch().then(state => {
        if (state.isConnected) {

          return fetch(URL, {
              method: 'POST',
              body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {

              console.log(responseJson);

              if (responseJson.response.type === "success") {
                var dataSource = responseJson.response.data;

                this.setState({
                  isLoading: false,
                })

                  AppConstant.name = this.state.name;
                  AppConstant.email = this.state.email;
                  AppConstant.password = this.state.password;

                  console.log('Name: ' + this.state.name + " email: " +
                    this.state.email + " password:" +
                    this.state.password + " re_password: " +
                    this.state.re_password)

                  this.props.updateState();

              } else if (responseJson.response.type === "error") {
                this.setState({
                  isLoading: false,
                });
                this.showToast(responseJson.response.message, 'success')

                // alert(responseJson.response.message);
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
    showToast(message, type) {
      NB.Toast.show({
        text: message,
        position: 'bottom',
        // type: type,
        duration: 2000,
        textStyle: {
          textAlign: 'center'
        }
      })
    }

  handleClick = () => {
    AppConstant.login_response_status='';
    this.registrationApi()
    // this.props.updateState();
  }

validate = (text) => {
  console.log(text);

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    console.log("Email is Not Correct");
    // alert('Email is Not Correct');
    // this.setState({ email: text })
    return false;
  }
  else {
    this.setState({ email: text })
    console.log("Email is Correct.....");
    return true;
  }
}

  updateValue(text, field) {
    if (field == 'name') {
      this.setState({
        name: text,
      })
    } else if (field == 'email') {
      this.setState({ email: text })
    } else if (field == 'password') {
      this.setState({
        password: text,
      })
    } else if (field == 're_password') {
      this.setState({
        re_password: text,
      })
    }

  }

  //  ---------------------------Api Calling------------------------------
  registrationApi() {

    if (this.state.name === '') {
      console.log("Name field can not be empty.");
      alert('Name field can not be empty.');
    } else if (this.state.email === '' ) {
      console.log(" Email field can not be empty.");
      alert('Email field can not be empty.');
    } else if (this.state.password === '') {
      console.log(" Password field can not be empty.");
      alert('Password field can not be empty.');
    } else if (this.state.re_password === '') {
      console.log("Password field can not be empty.");
      alert('Re-Password field can not be empty.');
    } else if (this.state.re_password != this.state.password) {
      console.log("Password not matched.");
      alert('Re-Password not matched.');
    } else if (!this.validate(this.state.email)) {
      console.log("Email is Not Correct.");
      alert('Email is Not Correct.');
    } else if (!this.state.check_box) {
      console.log('Please accept terms and conditions.');
      alert('Please accept terms and conditions.');
    } else {

      this.getApiResponse();

    }
  }

  focusTextInput(node) {
    node.focus();
  }

  render() {
    return (
      <Fragment >
        <NB.View style={{height:600, backgroundColor:'white',width:'100%',paddingLeft:20, paddingRight:20,paddingTop:30,paddingBottom:40 }}>
          <NB.Content >
          
              <NB.Item>
                <NB.Input 
                placeholder = "Name" 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                returnKeyType = "next"
                autoCorrect={false}
                blurOnSubmit={false}
                ref={(input) => this._name = input}
                onSubmitEditing={() => this._email._root.focus()}
                onChangeText={(text)=>this.updateValue(text,'name')}/ >
              </NB.Item>

              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Email" 
                autoCapitalize = "none"
                autoCorrect={false}
                returnKeyType = "next"
                blurOnSubmit={false}
                ref={(input) => this._email = input}
                onSubmitEditing={() => this._password._root.focus()}
                onChangeText={(text)=>this.updateValue(text,'email')}/ >
              </NB.Item>
              
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Password" 
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize = "none"
                returnKeyType = { "next" }
                blurOnSubmit={false}
                ref={(input) => this._password = input}
                onSubmitEditing={() => this._re_password._root.focus()}
                onChangeText={(text)=>this.updateValue(text,'password')}/ >
              </NB.Item>
              <NB.Item style={{ marginTop:20 }}>
                <NB.Input 
                style={{ color: '#5a5a5a' }}
                placeholderTextColor={'#bfbfbf'}
                placeholder = "Retype Password" 
                secureTextEntry={true}
                autoCapitalize = "none"
                returnKeyType = { "done" }
                autoCorrect={false}
                blurOnSubmit={false}
                onSubmitEditing={()=> Keyboard.dismiss()}
                ref={(input) => this._re_password = input}
                onChangeText={(text)=>this.updateValue(text,'re_password')}


              
                />
              </NB.Item>



              <NB.View 
              
              style={{ flexDirection:'row', marginTop:20}}>
                <NB.CheckBox onPress={()=>{ this.setState({check_box: !this.state.check_box}) 
                  console.log('Checked........:'+this.state.check_box)}}  checked={this.state.check_box} style={{ marginLeft:0, fontSize:14, color: Color.readmore }} />
                <NB.Body style={{ flexDirection:'row',marginLeft:15}}>
                  <NB.Text 
                  style={{  fontSize:14, color: Color.readmore, margin:0 }}>{String.accept_terms}</NB.Text>
                  <NB.Text 
                  onPress={()=>{
                    Actions.TermsAndConditionScreen()
                  }}
                  style={{ fontSize:15, color: Color.color_theme,textDecorationLine: 'underline', }}>{String.terms_and_condition}</NB.Text>
                </NB.Body>

                {/* <NB.Body>
                  <NB.Text style={{ fontSize:14, color: Color.color_theme }}>{String.terms_and_condition}</NB.Text>
                </NB.Body> */}
                
              </NB.View>

              
            


            <TouchableOpacity
            onPress={()=>this.handleClick()}
            style={LoginHomeStyle.login_submit}>
              <NB.Text 
              style={{ fontSize:18, paddingBottom:20, paddingTop:20, color:'white',  width:'100%' , alignItems:'center', justifyContent:'center',textAlign:'center'}}>{String.continue}</NB.Text>
            </TouchableOpacity>

            
            { this.state.isLoading ? <Loading / > : null }


          </NB.Content>

          

        </NB.View>
      </Fragment>
    );
  }
}
