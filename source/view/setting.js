import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ConfigAction from '../action/config';
import * as OfflineAction from '../action/offline';
import Panel from '../component/panel';
import Navbar from '../component/navbar';
import { storageKey } from '../config';
import { PanelStyles, StyleConfig,  CommonStyles } from '../style';

const navTitle = "设置";

class SettingPage extends Component {

  constructor (props) {
    super(props);

    this.state = {
      imageLoadStatus: true
    };
  }

  componentDidMount(){
    const { configAction } = this.props;
    configAction.getConfig(storageKey.IMAGE_LOAD_FLAG);
  }

  onImageItemPress(value){
    const { configAction } = this.props;
    let configData = {
      flag: value
    };
    configAction.updateConfig(storageKey.IMAGE_LOAD_FLAG, configData);

    this.setState({
      imageLoadStatus : value,
      imageLoadOPStatus: true
    });
  }

  onClearCachePress(){
    Alert.alert(
      '系统提示',
      '确定要清除系统存储的缓存记录吗？',
      [
        {text: '取消', onPress: () => null },
        {text: '确定', onPress: () => this.handleClearCachePress() },
      ]
    )
  }

  handleClearCachePress(){
    const { offlineAction } = this.props;
    //only clean offline posts
    offlineAction.removePosts().then(()=>{
      ToastAndroid.show("已清除相关缓存信息", ToastAndroid.LONG);
    });
  }

  getImageLoadStatus(){
    const { config } = this.props;
    let imageLoadStatus = true;
    if (this.state.imageLoadOPStatus === true) {
        imageLoadStatus = this.state.imageLoadStatus;
    }else{
      if (config && config[storageKey.IMAGE_LOAD_FLAG] && config[storageKey.IMAGE_LOAD_FLAG].flag === false) {
        imageLoadStatus = false;
      }
    }
    return imageLoadStatus;
  }

  renderImageItem(){
    let imageLoadStatus = this.getImageLoadStatus();
    
    let tailControl = <Switch
            style={ PanelStyles.tail }
            value={ imageLoadStatus }
            onValueChange={(value) => this.onImageItemPress(value) }/>

    return (
      <Panel
        title="加载图片"
        descr = "关闭图片加载可节省网络流量"
        tailControl = { tailControl }/>
    )
  }

  renderPushItem(){

    let tailControl = <Switch
            disabled ={ true }
            value={ false }/>

    return (
      <Panel
        title="开启推送"
        descr = "这个牛叉的功能也是没有做的"
        tailControl = { tailControl }/>
    )
  }

  renderCacheItem(){
    return (
      <Panel
        onPress = {()=>this.onClearCachePress()}
        title="清除缓存"
        descr = "该操作其实仅仅清空了离线下载的博文记录"/>
    )
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
        { this.renderNavbar() }

        { this.renderImageItem() }
        { this.renderPushItem() }
        { this.renderCacheItem() }
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