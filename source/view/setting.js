import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from '@remobile/react-native-toast';
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

  onLogoutPress(){
    Alert.alert(
      '系统提示',
      '该操作会清除缓存的登录授权信息，确定要退出登录吗？',
      [
        {text: '取消', onPress: () => null },
        {text: '确定', onPress: () => this.handleLogoutPress() },
      ]
    )
  }

  handleLogoutPress(){
    const { router, configAction } = this.props;
    configAction.removeConfig({
      key: storageKey.USER_TOKEN
    }).then(()=>{
       router.resetTo(ViewPage.login());
    });
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

  renderLogoutItem(){
    return (
      <Panel
        onPress = {()=>this.onLogoutPress()}
        title="退出登录"
        descr = "该操作会清除缓存的登录授权信息"/>
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
        { this.renderLogoutItem() }
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