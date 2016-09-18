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

  }

  renderNavbar(){
    return (
      <Navbar
        title={ navTitle }
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        rightIconName = "ios-send-outline"
        rightIconOnPress={ ()=>this.onCommentSendPress() }/>
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

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderCommentInput() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    width: StyleConfig.screen_width - ( StyleConfig.space_3 * 2 ),
    height: StyleConfig.screen_height / 3,
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