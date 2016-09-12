import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import { getImageSource } from '../common';
import { Base64 } from '../common/base64';
import Logo from '../component/logo';
import { JSEncrypt } from '../common/jsencrypt';
import Config, { authData, storageKey } from '../config/';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "登录";
const backgroundImageSource = getImageSource(15);

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

  renderHeader(){
    return (
      <View style={[ CommonStyles.m_b_4 ]}>
        <Image
              style={ ComponentStyles.header_img } 
              source={ {uri:backgroundImageSource} } />
        <Logo style={ [ComponentStyles.pos_absolute, styles.header_logo] }/>
      </View>
    );
  }

  renderFormPanel(){
    return (
      <View style={ [ CommonStyles.m_a_4 ] }>
          { this.renderUserName() }
          { this.renderPassword() }
          { this.renderLoginButton() }
      </View>
    );
  }

  renderMessage(){
    return (
      <View style={[ CommonStyles.p_a_4 ]}>
        <Text style={ [ CommonStyles.text_center] }>
          用户名或密码错误
        </Text>
      </View>
    )
  }

  renderCopyRight(){
    return (
      <View style={ [ComponentStyles.pos_absolute, styles.footer_copyright]}>
        <Text style={ [ CommonStyles.text_center, CommonStyles.m_b_4, CommonStyles.text_light ] }>
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
        <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_t_4 ] }>
            <TouchableHighlight
                style={ [ComponentStyles.btn, ComponentStyles.btn_primary, styles.btn_login] }
                onPress={()=>this.handleLogin()}>
                <Text style={ ComponentStyles.btn_text }>
                    登录
                </Text>
            </TouchableHighlight>
            <TouchableHighlight>
                <Text style={ CommonStyles.text_gray }>
                    没有账号，点此注册
                </Text>
            </TouchableHighlight>
        </View>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderHeader() }
        { this.renderFormPanel() }
        { this.renderMessage() }
        { this.renderCopyRight() }
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