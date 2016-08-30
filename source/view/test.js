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

import { JSEncrypt } from '../common/jsencrypt';

const navTitle = "登录页面";
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB";

class TestPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
        userName: '',
        password: ''
    };
  }

  encryptData(data){
      var crypt = new JSEncrypt();
      crypt.setPrivateKey(publicKey);
      return crypt.encrypt(data);
  }

  handleLogin(){
      console.warn(this.state.userName);
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

export default TestPage;