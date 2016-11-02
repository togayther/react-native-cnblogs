import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  NetInfo,
  Platform,
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
import ViewPage from '../component/view';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';

const backgroundImageSource = getImageSource(8);
const hintText = "提示：进一步使用，需要先授权登录。如果你还没有博客园账户，请前往其官方网站注册。";
const declareText = "声明：本软件已开源，且不会以任何非法形式保存并利用你的账户信息，请放心使用。";

class StartupPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalVisiable : false,
      modalBackdropVisiable: false
    };
  }

  componentWillUnmount() {
	  this.timer && TimerMixin.clearTimeout(this.timer);
	}

  checkUserToken(){
    this.props.configAction.getConfig({
      key: storageKey.USER_TOKEN,
      resolved: (data)=>{
        if(data && data.access_token && data.username && data.password){
          this.refreshUserToken(data);
        }else{
          this.onCheckUserTokenRejected();
        }
      },
      rejected: (data)=>{
        this.onCheckUserTokenRejected();
      }
    });
  }

  onCheckUserTokenRejected(){
    NetInfo.fetch().then((netinfo=> {
      if(netinfo.toUpperCase() != 'NONE'){
        this.showLoginModal();
      }
    }));
  }
  
  refreshUserToken(tokenData){
    const { userAction, router } = this.props;
    userAction.login({
        username: tokenData.username,
        password: tokenData.password,
        resolved: (data)=>{
            data.username = tokenData.username;
            data.password = tokenData.password;
            this.handleLoginResolved(data);
        },
        rejected: (data)=>{
            this.showLoginModal();
        }
    });
  }

  handleLoginResolved(data){
    const { configAction, router } = this.props;
    configAction.updateConfig({
        key: storageKey.USER_TOKEN, 
        value: data,
    }).then(()=>{
        router.resetTo(ViewPage.home());
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
        this.props.router.resetTo(ViewPage.login());
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
          source={ backgroundImageSource } />
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
    if(Platform.OS === 'android'){
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