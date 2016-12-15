import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
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
const tailConfigKey = storageKey.TAIL_ENABLED;

class SettingPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      tailStatus: true
    };
  }

  componentDidMount(){
    const { configAction } = this.props;
    configAction.getConfig({
      key: tailConfigKey
    });
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

  onTailStatusPress(value){
    this.setState({
      tailStatus : value,
      tailOPStatus: true
    });

    const { configAction } = this.props;
    const configData = { flag: value };

    configAction.updateConfig({
      key: tailConfigKey,
      value: configData
    });
  }

  handleLogoutPress(){
    const { router, configAction } = this.props;
    configAction.removeConfig({
      key: storageKey.USER_TOKEN
    }).then(()=>{
       router.resetTo(ViewPage.login());
    });
  }

  getTailEnabledStatus(){
    const { config } = this.props;
    let tailEnabledStatus = true;
    if (this.state.tailOPStatus === true) {
        tailEnabledStatus = this.state.tailStatus;
    }else{
      if (config && config[tailConfigKey] && config[tailConfigKey].flag === false) {
        tailEnabledStatus = false;
      }
    }
    return tailEnabledStatus;
  }

  renderTailItem(){
    const tailEnabledStatus = this.getTailEnabledStatus();
    const tailControl = <Switch 
      value={ tailEnabledStatus }
      onValueChange={ (val)=>this.onTailStatusPress(val) }/>
    return (
      <Panel
        title="评论小尾巴"
        descr = "开启后可自定义内容"
        tailControl = { tailControl }/>
    )
  }

  renderTailContentItem(){
    let onPress = null,
        titleStyle = null,
        tailEnabledStatus = this.getTailEnabledStatus();
    if(tailEnabledStatus === true){
        onPress = ()=>this.props.router.push(ViewPage.tailSetting());
    }else{
        titleStyle = CommonStyles.text_gray;
    }

    return (
      <Panel
        title="设置小尾巴"
        titleStyle = { titleStyle }
        onPress = { onPress } 
        descr = "自定义小尾巴内容"/>
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
        title={ navTitle }
        leftIconOnPress={ ()=>this.props.router.pop() }/>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        <ScrollView  showsVerticalScrollIndicator = {false}
                     showsHorizontalScrollIndicator = {false}>
          { this.renderTailItem() }
          { this.renderTailContentItem() }
          { this.renderCacheItem() }
          { this.renderFeedbackItem() }
          { this.renderLogoutItem() }
        </ScrollView>
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