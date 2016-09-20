import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
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
import Navbar from '../component/navbar';
import Toast from '../component/toast';
import Spinner from '../component/spinner';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "新增闪存";
const backgroundImageSource = getImageSource(15);

class BlinkAddPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      blinkContent:'',
      blinkStatus: true,
      pending: false
    };
  }

  blinkValidator(){
    let blinkContent = this.state.blinkContent;
    let message ;
    if(!_.trim(blinkContent)){
        message = "请输入闪存内容";
    }

    if(message){
       this.refs.toast.show({
         message: message
       });
       return false;
    }

    return {
      Content: blinkContent,
      IsPrivate: !this.state.blinkStatus
    };
  }

  onBlinkSendPress(){
    let blinkData = this.blinkValidator();
    if(blinkData){
        console.info("onBlinkSendPress");
        console.info(blinkData);
    }
  }

  onBlinkStatusPress(val){
    this.setState({
      blinkStatus: val
    });
  }

  renderNavbar(){
    return (
      <Navbar
        title={ navTitle }
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderBlinkContent(){
      return (
          <View style={[ CommonStyles.p_a_3 ]}>
              <TextInput 
                  ref="txtBlink"
                  maxLength = { 1000 }
                  multiline = { true }
                  style={ [ComponentStyles.input, styles.txtBlinkContent] }
                  placeholder={'请输入闪存内容...'}
                  placeholderTextColor={ StyleConfig.color_gray }
                  underlineColorAndroid = { 'transparent' }
                  onChangeText = {(val)=>this.setState({blinkContent: val})}
                  value={ this.state.blinkContent } />
          </View>
      )
  }

  renderBlinkStatus(){
    return (
         <View style={[ CommonStyles.p_a_3, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, ComponentStyles.panel_bg ]}>
              <Text style={[ CommonStyles.text_gray, CommonStyles.font_xs ]}>
                是否公开
              </Text>
              <Switch value={ this.state.blinkStatus }
                onValueChange={(value) => this.onBlinkStatusPress(value) }/>
         </View>
    )
  }

  renderUserInfo(){
    return (
         <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
            <Image ref={view => this.imgView=view}
              style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
              source={ {uri: 'http://123.56.135.166/cnblog/public/img/common/author.jpg' } }>
            </Image>
            <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
              愤怒的晃晃
            </Text>
        </View>
    )
  }

  renderSendButton(){
    return (
      <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={[ ComponentStyles.btn, ComponentStyles.btn_sm, ComponentStyles.btn_danger_outline ]}
            onPress={()=>this.onBlinkSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_danger, CommonStyles.font_xs]}>
              提交
            </Text>
        </TouchableOpacity>
    )
  }

  renderBlinkOp(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          { this.renderUserInfo() }
          { this.renderSendButton() }
        </View>
    )
  }

  renderPending(){
    if(this.state.pending === true){
      return (
        <Spinner style={ ComponentStyles.pending_container }/>
      )
    }
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderBlinkStatus() }
        { this.renderBlinkContent() }
        { this.renderBlinkOp() }
        { this.renderPending() }
        <Toast ref="toast"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtBlinkContent:{
    width: StyleConfig.screen_width - ( StyleConfig.space_3 * 2 ),
    height: StyleConfig.screen_height / 5,
    textAlign: "left", 
    textAlignVertical: "top"
  }
})

export default connect((state, props) => ({

}), dispatch => ({ 

}), null, {
  withRef: true
})(BlinkAddPage);