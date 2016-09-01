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
import { CommonStyles } from '../style';
import * as UserAction from '../action/user';
import { Base64 } from '../common/base64';
import { JSEncrypt } from '../common/jsencrypt';

const navTitle = "登录页面";

const publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB\n-----END PUBLIC KEY-----";

class TestPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
        userName: 'mcmurphy',
        password: 'yqhkangming'
    };
  }

  encryptData(data){
     var encrypt = new JSEncrypt({
         default_key_size: 1024,
         default_public_exponent: '010001'
     });
     encrypt.setPublicKey(publicKey);
     return encrypt.encrypt(data);
  }

  handleLogin(){

      let userName = this.state.userName;
      let password = this.state.password;

      userName = this.encryptData(userName);
      password = this.encryptData(password);
      console.warn("加密字符串长度：" + userName.length);
      userName = Base64.encode(userName);
      password = Base64.encode(password);
      console.warn("base64后字符串长度：" + userName.length);
      
      this.props.userAction.login(userName, password);
  }

  renderUserName(){
      return (
          <View style={styles.formGroup}>
            <TextInput 
                    ref="txtUserName"
                    blurOnSubmit= {true}
                    style={ styles.formControl }
                    placeholder={'请输入用户名'}
                    onChangeText = {(val)=>this.setState({userName: val})}
                    value={ this.state.userName } />
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
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
        { this.renderNavbar() }
        { this.renderUserName() }
        { this.renderPassword() }
        { this.renderLoginButton() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({
   formGroup:{
	   paddingHorizontal: 15
   },
   formControl:{
       fontSize:16,
       color:"#666"
   },
   buttonContainer:{
       backgroundColor:'#259d8b',
       paddingVertical: 13,
       marginTop: 15,
       borderRadius: 3
   },
   button:{
       color:'#fff',
       fontSize: 16,
       textAlign:"center"
   }
});

export default connect((state, props) => ({
}), dispatch => ({ 
  userAction : bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(TestPage);