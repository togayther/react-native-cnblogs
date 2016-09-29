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
import TimerMixin from 'react-timer-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import * as CommentAction from '../action/comment';
import { getImageSource } from '../common';
import Navbar from '../component/navbar';
import ViewPage from '../component/view';
import Spinner from '../component/spinner';
import { postCategory } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "评论发布";
const backgroundImageSource = getImageSource(15);

class CommentAddPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      commentContent:''
    }
  }

  getCommentPubData(content){
    const { category } = this.props;
    switch( category){
      case postCategory.post:
        return {
          Content: content
        };
      case postCategory.news:
        return {
          ParentId: 1,
          Content: content
        };
      case postCategory.blink:
        return {
          ReplyTo: "",
          ParentCommentId: "",
          Content: content,
        };
      case postCategory.question:
        return {
          Answer: content
        };
      default:
			  return {
          Content: content,
          Answer: content
        };
    }
  }

  commentValidator(){
    let commentContent = this.state.commentContent,
        message;
    if(!_.trim(commentContent)){
        message = '请输入评论内容';
    }
    if(message){
        Toast.show(message);
        return false;
    }
    return this.getCommentPubData(commentContent);
  }

  onCommentSendPress(){
    this.refs.txtContent.blur();
    const commentData = this.commentValidator();
    if(commentData){
        this.setState({ pending: true });
        this.props.commentAction.addComment({
          category: this.props.category, 
          params: {
            blogger: this.props.blogger,
            id: this.props.id
          },
          data: commentData,
          resolved: (data)=>{
            this.onCommentResolved(data);
          },
          rejected: (data)=>{
            this.onCommentRejected(data);
          }
        });
    }
  }

  onCommentResolved(data){
    Toast.show("恭喜你，评论发布成功");
    this.timer = TimerMixin.setTimeout(() => {
        this.props.router.pop();
	  }, 2000);
  }

  onCommentRejected(data){
    this.setState({pending: false});
    Toast.show("评论发布失败，请稍候重试");
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderSourceAuthor(data){
    return (
      <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.m_b_2]}>
        <Image ref={view => this.imgView=view}
          style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
          source={ data.Avatar }>
        </Image>
        <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
          { data.Author }
        </Text>
      </View>
    )
  }

  renderSourceContent(data){
    const sourceContent = data.Title || data.Content;
    return (
      <View>
          <Text style={[ CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_sm ]}>
            { sourceContent }
          </Text>
      </View>
    )
  }

  renderSource(){
    const { data } = this.props; 
    return (
      <View style={[ CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
        { this.renderSourceAuthor(data) }
        { this.renderSourceContent(data) }
      </View>
    )
  }

  renderCommentInput(){
      return (
          <View style={[ CommonStyles.p_a_3 ]}>
              <TextInput 
                  ref="txtContent"
                  multiline = { true }
                  style={ [ComponentStyles.input, styles.input] }
                  blurOnSubmit= {true}
                  placeholder={'请输入评论内容...'}
                  placeholderTextColor={ StyleConfig.color_gray }
                  underlineColorAndroid = { 'transparent' }
                  onChangeText = {(val)=>this.setState({commentContent: val})}
                  value={ this.state.commentContent } />
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
            onPress={()=>this.onCommentSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_primary, CommonStyles.font_xs]}>
              发布
            </Text>
        </TouchableOpacity>
    )
  }

  renderCommentOp(){
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
            { this.renderSource() }
            { this.renderCommentInput() }
            { this.renderCommentOp() }
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
    height: StyleConfig.screen_height / 5,
    textAlign: "left", 
    textAlignVertical: "top"
  }
})

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(CommentAddPage);