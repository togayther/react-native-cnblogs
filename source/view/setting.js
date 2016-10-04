import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
	TouchableOpacity,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ConfigAction from '../action/config';
import * as OfflineAction from '../action/offline';
import Panel from '../component/panel';
import Navbar from '../component/navbar';
import ViewPage from '../component/view';
import { storageKey } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "设置";

class SettingPage extends Component {

  constructor (props) {
    super(props);
  }

  onClearCachePress(){
    Alert.alert(
      '系统提示',
      '确定要清除系统缓存记录吗？',
      [
        {text: '取消', onPress: () => null },
        {text: '确定', onPress: () => this.handleClearCachePress() },
      ]
    )
  }

  handleClearCachePress(){
    const { offlineAction } = this.props;
    offlineAction.removePosts().then(()=>{
      Toast.show("已清除相关缓存信息");
    });
  }

  onFeedbackPress(){
    this.props.router.push(ViewPage.feedback());
  }

  renderPushItem(){
    const tailControl = <Switch
            disabled ={ true }
            value={ false }/>

    return (
      <Panel
        title="开启推送"
        descr = "这个牛叉的功能是没有做的"
        tailControl = { tailControl }/>
    )
  }

  renderFeedbackItem(){
    return (
      <Panel
        title="问题反馈"
        descr = "使用中有任何问题或建议，均可联系作者"
        onPress = {()=>this.onFeedbackPress()}/>
    )
  }

  renderCacheItem(){
    return (
      <Panel
        onPress = {()=>this.onClearCachePress()}
        title="清除缓存"
        descr = "该操作会清空离线下载的博文记录"/>
    )
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderPushItem() }
        { this.renderCacheItem() }
        { this.renderFeedbackItem() }
      </View>
    );
  }
}

export default connect((state, props) => ({
  config: state.config
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch),
  offlineAction: bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(SettingPage);