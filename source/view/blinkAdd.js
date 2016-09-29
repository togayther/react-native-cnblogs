import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import TimerMixin from 'react-timer-mixin';
import * as PostAction from '../action/post';
import { getImageSource } from '../common';
import Navbar from '../component/navbar';
import ViewPage from '../component/view';
import Spinner from '../component/spinner';
import { postCategory } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "闪存发布";
const backgroundImageSource = getImageSource(15);
const category = postCategory.blink;

class BlinkAddPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      blinkContent:'',
      blinkStatus: true,
      pending: false
    };
  }

  componentWillUnmount() {
	  this.timer && TimerMixin.clearTimeout(this.timer);
	}

  blinkValidator(){
    let blinkContent = this.state.blinkContent;
    let message ;
    if(!_.trim(blinkContent)){
        message = "请输入闪存内容";
    }

    if(message){
       Toast.show(message);
       return false;
    }

    return {
      Content: blinkContent,
      IsPrivate: !this.state.blinkStatus
    };
  }

  onBlinkSendPress(){
    this.refs.txtContent.blur();
    const blinkData = this.blinkValidator();
    if(blinkData){
        this.setState({ pending: true });

        this.props.postAction.addPost({
          category, 
          data: blinkData,
          resolved: (data)=>{
            this.onBlinkResolved(data);
          },
          rejected: (data)=>{
            this.onBlinkRejected(data);
          }
        });
    }
  }

  onBlinkResolved(data){
    const { router } = this.props;
    Toast.show("恭喜你，闪存发布成功");
    this.timer = TimerMixin.setTimeout(() => {
        if(router.getPreviousRoute().name === 'userAsset'){
          router.replacePreviousAndPop(ViewPage.userAsset(), {
            category: category
          });
        }else{
          router.replace(ViewPage.userAsset(), {
            category: category
          });
        }
	  }, 2000);
  }

  onBlinkRejected(){
    this.setState({pending: false});
    Toast.show("闪存发布失败，请稍候重试");
  }

  onBlinkStatusPress(val){
    this.setState({
      blinkStatus: val
    });
  }

  renderNavbar(){
    return (
      <Navbar leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderBlinkContent(){
      return (
          <View style={[ CommonStyles.p_a_3 ]}>
              <TextInput 
                  ref="txtContent"
                  maxLength = { 1000 }
                  multiline = { true }
                  style={ [ComponentStyles.textarea, styles.input_content] }
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
              <Text style={[ CommonStyles.text_danger, CommonStyles.font_xs ]}>
                是否公开
              </Text>
              <Switch value={ this.state.blinkStatus }
                onValueChange={(value) => this.onBlinkStatusPress(value) }/>
         </View>
    )
  }

  renderUserInfo(){
    const { user } = this.props;
    return (
         <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
            <Image ref={view => this.imgView=view}
              style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
              source={ {uri: user.Avatar } }>
            </Image>
            <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
              { user.DisplayName }
            </Text>
        </View>
    )
  }

  renderSendButton(){
    return (
      <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={[ ComponentStyles.btn, ComponentStyles.btn_sm, ComponentStyles.btn_primary_outline ]}
            onPress={()=>this.onBlinkSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_primary, CommonStyles.font_xs]}>
              发布
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

  renderContent(){
    return (
        <ScrollView
           keyboardDismissMode= { 'interactive'}
           showsVerticalScrollIndicator  = { false }
           keyboardShouldPersistTaps  = { true }>
            { this.renderBlinkStatus() }
            { this.renderBlinkContent() }
            { this.renderBlinkOp() }
        </ScrollView>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderContent() }
        { this.renderPending() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input_content:{
    height: StyleConfig.screen_height / 5
  }
})

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(BlinkAddPage);