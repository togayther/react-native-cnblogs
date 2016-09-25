import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import { getImageSource } from '../common';
import { Base64 } from '../common/base64';
import Logo from '../component/logo';
import Toast from '../component/toast';
import Spinner from '../component/spinner';
import { JSEncrypt } from '../common/jsencrypt';
import Config, { authData, storageKey } from '../config/';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "登录";
const backgroundImageSource = getImageSource(8);

class LoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
        username: 'mcmurphy',
        password: 'yqhkangming',
        pending: false
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

  loginValidator(){
      let username = this.state.username;
      let password = this.state.password;
      let message;
      if(!_.trim(username)){
          message = "请输入登录用户名";
      }
      else if(!_.trim(password)){
          message = "请输入登录密码";
      }
      if(message){
          this.refs.toast.show({
            message: message
          });
          return false;
      }
      username = this.encryptData(username);
      password = this.encryptData(password);
      return{
        username, 
        password
      };
  }

  handleLogin(){
      let loginData = this.loginValidator();
      if(loginData){
          this.setState({pending: true});

          this.props.userAction.login({
            username: loginData.username,
            password: loginData.password,
            resolved: (data)=>{
                data.username = loginData.username;
                data.password = loginData.password;
                this.handleLoginResolved(data);
            },
            rejected: (data)=>{
                this.handleLoginRejected(data);
            }
          });
      }
  }

  handleLoginResolved(data){
    this.props.configAction.updateConfig({
      key: storageKey.USER_TOKEN, 
      value: data
    });

    this.refs.toast.show({
      message: "恭喜你，登录成功",
      duration: 2000,
      onHide: ()=>{
        this.props.router.toHome();
      }
    });
  }

  handleLoginRejected(data){
    this.setState({pending: false});
    this.refs.toast.show({
      message: "登录失败，请检查账号密码是否正确"
    });
  }

  renderHeader(){
    return (
      <View style={[ CommonStyles.m_b_4 ]}>
        <Image
              style={ ComponentStyles.header_img } 
              source={ backgroundImageSource } />
        <Logo style={ [ComponentStyles.pos_absolute, styles.header_logo] }/>
      </View>
    );
  }

  renderFormPanel(){
    return (
      <View style={ [ CommonStyles.m_a_4 ] }>
          { this.renderUserName() }
          { this.renderPassword() }
          { this.renderButtons() }
      </View>
    );
  }

  renderCopyRight(){
    return (
      <View style={ [ComponentStyles.pos_absolute, styles.footer_copyright]}>
        <Text style={ [ CommonStyles.text_center, CommonStyles.m_b_4, CommonStyles.text_muted ] }>
          { Config.appInfo.copyright }
        </Text>
      </View>
    )
  }

  renderUserName(){
      return (
        <View style={ [ComponentStyles.input_control ] }>
            <TextInput 
                ref="txtUserName"
                blurOnSubmit= {true}
                style={ [ComponentStyles.input ] }
                placeholder={'请输入用户名'}
                placeholderTextColor={ StyleConfig.color_gray }
                underlineColorAndroid = { 'transparent' }
                onChangeText = {(val)=>this.setState({username: val})}
                value={ this.state.username } />
        </View>
      )
  }

  renderPassword(){
      return (
        <View style={ [ComponentStyles.input_control ] }>
            <TextInput 
                ref="txtPassword"
                style={ [ComponentStyles.input ] }
                blurOnSubmit= {true}
                placeholder={'请输入密码'}
                placeholderTextColor={ StyleConfig.color_gray }
                underlineColorAndroid = { 'transparent' }
                onChangeText = {(val)=>this.setState({password: val})}
                value={ this.state.password } />
        </View>
      )
  }

  renderLoginButton(){
    return (
         <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={ [ComponentStyles.btn, ComponentStyles.btn_primary, styles.btn_login] }
            onPress={()=>this.handleLogin()}>
            <Text style={ ComponentStyles.btn_text }>
                登录
            </Text>
         </TouchableOpacity>
    )
  }

  renderRegisterButton(){
    return (
        <TouchableOpacity
            onPress = {()=>null}
            activeOpacity={ StyleConfig.touchable_press_opacity }>
            <Text style={ CommonStyles.text_gray }>
                没有账号，点此注册
            </Text>
        </TouchableOpacity>
    )
  }

  renderPending(){
    if(this.state.pending === true){
      return (
        <Spinner style={ ComponentStyles.pending_container }/>
      )
    }
  }

  renderButtons(){
    return (
        <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_t_4 ] }>
           { this.renderLoginButton() }
           { this.renderRegisterButton() }
        </View>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderHeader() }
        { this.renderFormPanel() }
        { this.renderCopyRight() }
        { this.renderPending() }
        <Toast ref="toast"/>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
    header_logo:{
      left: StyleConfig.screen_width / 2 - StyleConfig.avatarSize_lg / 2,
      bottom: StyleConfig.avatarSize_lg / 2 - StyleConfig.avatarSize_lg
    },
    footer_copyright: {
      bottom : 0
    }
});

export default connect((state, props) => ({

}), dispatch => ({ 
  userAction : bindActionCreators(UserAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(LoginPage);