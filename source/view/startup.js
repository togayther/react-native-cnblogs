import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  BackAndroid,
  TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import * as Animatable from 'react-native-animatable';
import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import Config, { storageKey } from '../config';
import { getImageSource } from '../common';
import Logo from '../component/logo';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';

const backgroundImageSource = getImageSource();
const hintText = "提示：进一步使用，需要先授权登录。如果你还没有博客园账户，请前往其官方网站注册。";
const declareText = "声明：本软件为开源软件，将不会以任何形式保存您的账户信息，请放心使用。";

class StartupPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalVisiable : false,
      modalBackdropVisiable: false
    };
  }

  componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

  checkUserToken(){
    this.props.configAction.getConfig({
      key: storageKey.USER_TOKEN,
      resolved: (data)=>{
        if(data && data.access_token){
          this.refreshUserToken(data.refresh_token);
        }else{
          this.showLoginModal();
        }
      },
      rejected: (data)=>{
        console.warn("调用本地存储失败");
      }
    });
  }
  
  refreshUserToken(refreshToken){
    this.props.userAction.refreshToken({
      token: refreshToken,
      resolved: (data)=>{
        this.updateUserToken(data);
      }
    })
  }

  updateUserToken(data){
    const { configAction, router } = this.props;
    configAction.updateConfig({
        key: storageKey.USER_TOKEN, 
        value: data,
    }).then(()=>{
        router.toHome();
    });
  }

  showLoginModal(){
    this.setState({
      modalBackdropVisiable: true
    });
  }

  onCancelPress(){
    BackAndroid.exitApp();
  }

  onLoginPress(){
    this.setState({
      modalVisiable: false
    });

    this.timer = TimerMixin.setTimeout(() => {
        this.props.router.toLogin();
	  }, 500);
  }

  onPageContentShow(){
    this.timer = TimerMixin.setTimeout(() => {
			 this.checkUserToken();
	  }, 1000);
  }

  onModelBackdropShow(){
    this.setState({
      modalVisiable: true
    });
  }

  renderModalBackdrop(){
    if(this.state.modalBackdropVisiable === true){
      return (
          <Animatable.View
            style={ ComponentStyles.modal_backdrop } 
            animation="fadeIn"
            onAnimationEnd = {()=> this.onModelBackdropShow() } 
            duration={ 500 }>
          </Animatable.View>
      ) 
    }
  }

  renderModalHeader(){
    return (
      <View style={ ComponentStyles.modal_header }>
        <Image
          style={ ComponentStyles.modal_header_img } 
          source={ {uri:backgroundImageSource} } />
      </View>
    )
  }

  renderModalBody(){
    return (
      <View style={ ComponentStyles.modal_body }>
        <Text style={[ CommonStyles.text_center, CommonStyles.m_b_1, CommonStyles.font_lg, CommonStyles.text_dark ]}>
          { Config.appInfo.name }
        </Text>
        <Text style={[ CommonStyles.text_center, CommonStyles.m_b_3, CommonStyles.font_md, CommonStyles.text_dark ]}>
          { Config.appInfo.descr }
        </Text>
        <Text style={[ CommonStyles.text_left, CommonStyles.m_b_1, CommonStyles.font_xs,  CommonStyles.text_dark, CommonStyles.line_height_sm ]}>
          { hintText }
        </Text>
        <Text style={[ CommonStyles.text_left, CommonStyles.text_dark, CommonStyles.font_xs, CommonStyles.line_height_sm ]}>
          { declareText }
        </Text>
      </View>
    )
  }

  renderModalFooterLogin(){
    return (
        <TouchableOpacity
          activeOpacity={ StyleConfig.touchable_press_opacity }
          style = { [ ComponentStyles.btn, ComponentStyles.btn_primary, ComponentStyles.modal_button ] }
          onPress={()=>this.onLoginPress() }>
          <Text style={ ComponentStyles.btn_text }>
              登录
          </Text>
        </TouchableOpacity>
    )
  }

  renderModalFooterCancel(){
    return (
       <TouchableOpacity
          activeOpacity={ StyleConfig.touchable_press_opacity }
          style={ CommonStyles.m_t_3 }
          onPress={()=>this.onCancelPress() }>
          <Text style={ CommonStyles.text_dark }>
              放弃
          </Text>
        </TouchableOpacity>
    )
  }

  renderModalFooter(){
    return (
      <View style={ ComponentStyles.modal_footer }>
          { this.renderModalFooterLogin() }
          { this.renderModalFooterCancel() }
      </View>
    )
  }

  renderModal(){
    return (
      <Modal 
          animationType={ 'slide' }
          transparent={ true }
          onRequestClose = {()=> null }
          visible={ this.state.modalVisiable }>
          <View style={ ComponentStyles.modal_container }>
            
            { this.renderModalHeader() }
            { this.renderModalBody() }
            { this.renderModalFooter() }
            
          </View>  
      </Modal>
    )
  }

  renderContent(){
    return (
        <Animatable.View 
          onAnimationEnd = {()=>this.onPageContentShow() }
          animation="fadeInDown">
            <Logo />
        </Animatable.View>
    )
  }

  render() {
    return (
      <View style={ [ ComponentStyles.container, CommonStyles.flexItemsCenter, CommonStyles.flexItemsMiddle, styles.container ] }>
          { this.renderContent() }
          { this.renderModal() }
          { this.renderModalBackdrop() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: StyleConfig.screen_width,
    height: StyleConfig.screen_height
  }
});

export default connect((state, props) => ({
  config: state.config
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch),
  userAction : bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(StartupPage);