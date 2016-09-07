import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Navbar from '../component/navbar';
import * as ConfigAction from '../action/config';
import { CommonStyles, StyleConfig } from '../style';
import * as UserAction from '../action/user';
import { Base64 } from '../common/base64';
import CodeLogo from '../component/codeLogo';
import { JSEncrypt } from '../common/jsencrypt';
import { authData, storageKey } from '../config/';
const { height, width } = Dimensions.get('window');

const navTitle = "登录页面";

class LoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
        username: 'mcmurphy',
        password: 'yqhkangming'
    };
  }

  encryptData(data){
     var encrypt = new JSEncrypt({
         default_key_size: 1024,
         default_public_exponent: '010001'
     });
     encrypt.setPublicKey(authData.pubKey);
     return encrypt.encrypt(data);
  }

  handleLogin(){
      let username = this.state.username;
      let password = this.state.password;
      username = this.encryptData(username);
      password = this.encryptData(password);
      
      this.props.userAction.login({
        username,
        password,
        resolved: (data)=>{
          this.props.configAction.updateConfig({
            key: storageKey.USER_TOKEN, 
            value: data
          });

          this.props.router.toHome();
        },
        rejected: (data)=>{}
      });
  }

  renderUserName(){
      return (
        <View style={styles.formGroup}>
            <TextInput 
                    ref="txtUserName"
                    blurOnSubmit= {true}
                    style={ styles.formControl }
                    placeholder={'请输入用户名'}
                    placeholderTextColor={ '#666' }
                    underlineColorAndroid = { StyleConfig.secondaryColor }
                    onChangeText = {(val)=>this.setState({username: val})}
                    value={ this.state.username } />
        </View>
      )
  }

  renderPassword(){
      return (
        <View style={styles.formGroup}>
            <TextInput 
                    ref="txtPassword"
                    style={ styles.formControl }
                    blurOnSubmit= {true}
                    placeholder={'请输入密码'}
                    placeholderTextColor={ '#666' }
                    underlineColorAndroid = { StyleConfig.secondaryColor }
                    onChangeText = {(val)=>this.setState({password: val})}
                    value={ this.state.password } />
        </View>
      )
  }

  renderLoginButton(){
    return (
        <View style={styles.formGroup}>
            <TouchableHighlight
                underlayColor  ={'#3bb09e'}
                style={ styles.buttonContainer }
                onPress={()=>this.handleLogin()}>
                <Text style={ styles.button }>
                    登录
                </Text>
            </TouchableHighlight>
        </View>
    )
  }

  renderNavbar(){
    return (
      <Navbar
        title={ '博客园账号登录' }/>
    )
  }

  render() {
    return (
      <View style={ styles.container }>

        { this.renderNavbar() }

        { this.renderUserName() }
        { this.renderPassword() }
        { this.renderLoginButton() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    alignItems:"center",
    height: height,
    width: width,
    backgroundColor:'#f8f8f8'
  },
  logo:{
    borderWidth: 1,
		borderColor: StyleConfig.secondaryColor
  },
   formGroup:{
	   paddingHorizontal: 15
   },
   formControl:{
       fontSize:16,
       width: width - 50,
       color:"#444"
   },
   buttonContainer:{
       backgroundColor:'#259d8b',
       paddingVertical: 13,
       marginTop: 15,
       borderRadius: 3,
       width: width - 50,
   },
   button:{
       color:'#fff',
       fontSize: 16,
       textAlign:"center"
   }
});

export default connect((state, props) => ({

}), dispatch => ({ 
  userAction : bindActionCreators(UserAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(LoginPage);