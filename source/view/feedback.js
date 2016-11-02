import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Spinner from '../component/spinner';
import Navbar from '../component/navbar';
import { postCategory } from '../config';
import * as CommentAction from '../action/comment';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const feedbackCategory = postCategory.home;
const feedbackBlogger = "mcmurphy";
const feedbackPostId = "5721144";

class FeedbackPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false,
      pending: false,
      feedbackContent: ''
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentWillUnmount() {  
	  this.timer && TimerMixin.clearTimeout(this.timer);
	}

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  feedbackValidator(){
    let feedbackContent = this.state.feedbackContent,
        message;
    if(!_.trim(feedbackContent)){
        message = '请输入反馈内容';
    }
    else if(feedbackContent.length<=3){
        message = '反馈内容不详';
    }
    
    if(message){
        Toast.show(message);
        return false;
    }

    return {
      Content: feedbackContent,
    }
  }

  onFeedbackSendPress(){
    this.refs.txtContent.blur();
    const feedbackData = this.feedbackValidator();
    if(feedbackData){
        this.setState({ pending: true });
        this.props.commentAction.addComment({
          category: feedbackCategory, 
          params: {
            blogger: feedbackBlogger,
            id: feedbackPostId
          },
          data: feedbackData,
          resolved: (data)=>{
            this.onFeedbackResolved(data);
          },
          rejected: (data)=>{
            this.onFeedbackRejected(data);
          }
        });
    }
  }

  onFeedbackResolved(data){
    Toast.show("问题反馈成功");
    this.timer = TimerMixin.setTimeout(() => {
        this.props.router.pop();
	}, 2000);
  }

  onFeedbackRejected(data){
    this.setState({pending: false});
    Toast.show("反馈失败，请稍候重试");
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderPending(){
    if(this.state.pending === true){
      return (
        <Spinner style={ ComponentStyles.pending_container }/>
      )
    }
  }

  renderFeedbackHint(){
    return (
      <View style={[ CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
        <Text style={[CommonStyles.text_dark, CommonStyles.font_xs, CommonStyles.line_height_sm]}>
          作者会仔细阅读你的反馈，并尽快给你回复。感谢理解与支持。
        </Text>
      </View>
    )
  }

  renderFeedbackInput(){
      return (
          <View style={[ CommonStyles.p_a_3 ]}>
              <TextInput 
                  ref="txtContent"
                  multiline = { true }
                  style={ [ComponentStyles.input, styles.input] }
                  blurOnSubmit= {true}
                  placeholder={'请输入反馈内容...'}
                  placeholderTextColor={ StyleConfig.color_gray }
                  underlineColorAndroid = { 'transparent' }
                  onChangeText = {(val)=>this.setState({feedbackContent: val})}
                  value={ this.state.feedbackContent } />
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
            onPress={()=>this.onFeedbackSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_primary, CommonStyles.font_xs]}>
              提交
            </Text>
        </TouchableOpacity>
    )
  }

  renderFeedbackOp(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          { this.renderUserInfo() }
          { this.renderSendButton() }
        </View>
    )
  }

  renderContent(){
    return (
        <ScrollView
           keyboardDismissMode= { 'interactive'}
           showsVerticalScrollIndicator  = { false }
           keyboardShouldPersistTaps  = { true }>
            { this.renderFeedbackHint() }
            { this.renderFeedbackInput() }
            { this.renderFeedbackOp() }
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
  input:{
    width: StyleConfig.screen_width - ( StyleConfig.space_3 * 2 ),
    height: StyleConfig.screen_height / 6,
    textAlign: "left", 
    textAlignVertical: "top"
  }
});

export default connect(state => ({
  user: state.user
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(FeedbackPage);
