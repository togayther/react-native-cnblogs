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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Navbar from '../component/navbar';
import * as ConfigAction from '../action/config';
import Config, { storageKey } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const tailContentKey = storageKey.TAIL_CONTENT;

class TailSettingPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false,
      tailContent: null
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount(){
    const { configAction } = this.props;
    configAction.getConfig({
      key: tailContentKey
    });
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  getTailContent(){
    const { config } = this.props;
    let tailContent;
    if(this.state.tailContent != null){
      tailContent = this.state.tailContent;
    }else if(config && config[tailContentKey] && config[tailContentKey].content){
      tailContent = config[tailContentKey].content;
    }else{
      tailContent = Config.commentTail;
    }
    return tailContent;
  }

  tailContentValidator(){
    let tailContent = this.state.tailContent,
        message;
    if(!_.trim(tailContent)){
        message = '请输入小尾巴内容';
    }
    if(message){
        Toast.show(message);
        return false;
    }

    return {
      content: tailContent,
    }
  }

  onTailContentSavePress(){
    this.refs.txtContent.blur();
    const tailContentData = this.tailContentValidator();
    if(tailContentData){
        this.props.configAction.updateConfig({
          key: tailContentKey,
          value: tailContentData,
          resolved: ()=>{
            this.handleTailContentSaveResolved();
          }
        });
    }
  }

  handleTailContentSaveResolved(){
    Toast.show("修改内容成功");
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  renderTailContentHint(){
    return (
      <View style={[ CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
        <Text style={[CommonStyles.text_dark, CommonStyles.font_xs, CommonStyles.line_height_sm]}>
          小尾巴内容，会紧接着评论内容显示。支持 markdown 语法。
        </Text>
      </View>
    )
  }

  renderTailContentInput(){
      const tailContent = this.getTailContent();

      return (
          <View style={[ CommonStyles.p_a_3 ]}>
              <TextInput 
                  ref="txtContent"
                  multiline = { true }
                  style={ [ComponentStyles.input, styles.input] }
                  blurOnSubmit= {true}
                  placeholder={''}
                  placeholderTextColor={ StyleConfig.color_gray }
                  underlineColorAndroid = { 'transparent' }
                  onChangeText = {(val)=>this.setState({tailContent: val})}
                  value={ tailContent } />
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

  renderSaveButton(){
    return (
      <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={[ ComponentStyles.btn, ComponentStyles.btn_sm, ComponentStyles.btn_primary_outline ]}
            onPress={()=>this.onTailContentSavePress()}>
            <Text style={[ComponentStyles.btn_text, CommonStyles.text_primary, CommonStyles.font_xs]}>
              保存
            </Text>
        </TouchableOpacity>
    )
  }

  renderTailContentOp(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          { this.renderUserInfo() }
          { this.renderSaveButton() }
        </View>
    )
  }

  renderContent(){
    return (
        <ScrollView
           keyboardDismissMode= { 'interactive'}
           showsVerticalScrollIndicator  = { false }
           keyboardShouldPersistTaps  = { 'always' }>
            { this.renderTailContentHint() }
            { this.renderTailContentInput() }
            { this.renderTailContentOp() }
        </ScrollView>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderContent() }
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

export default connect((state, props) => ({
  user: state.user,
  config: state.config
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(TailSettingPage);
