import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import { getImageSource } from '../common';
import { Base64 } from '../common/base64';
import Navbar from '../component/navbar';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "新增回应";
const backgroundImageSource = getImageSource(15);

class CommentAddPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      commentContent:''
    }
  }

  onCommentSendPress(){
    this.props.router.pop();
  }

  renderNavbar(){
    return (
      <Navbar
        title={ navTitle }
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderSourceAuthor(data){
    return (
      <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.m_b_2]}>
        <Image ref={view => this.imgView=view}
          style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
          source={ {uri:data.Avatar} }>
        </Image>
        <Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
          { data.Author }
        </Text>
      </View>
    )
  }


  renderSourceContent(data){
    let sourceContent = data.Title || data.Content;
    return (
      <View>
          <Text style={[ CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_sm ]}>
            { sourceContent }
          </Text>
      </View>
    )
  }

  renderSource(){
    let { data } = this.props; 
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
                  ref="txtComment"
                  multiline = { true }
                  style={ [ComponentStyles.input, styles.input] }
                  blurOnSubmit= {true}
                  placeholder={'请输入回应内容...'}
                  placeholderTextColor={ StyleConfig.color_gray }
                  underlineColorAndroid = { 'transparent' }
                  onChangeText = {(val)=>this.setState({commentContent: val})}
                  value={ this.state.commentContent } />
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
            onPress={()=>this.onCommentSendPress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_danger, CommonStyles.font_xs]}>
              提交
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

  renderCommentMessage(){
    return (
      <View style={[CommonStyles.p_a_4]}>
        <Text style={[ CommonStyles.font_xs, CommonStyles.text_gray, CommonStyles.text_center ]}>
          请输入评论内容
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderSource() }
        { this.renderCommentInput() }
        { this.renderCommentOp() }
        { this.renderCommentMessage() }
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

}), dispatch => ({ 
  userAction : bindActionCreators(UserAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(CommentAddPage);