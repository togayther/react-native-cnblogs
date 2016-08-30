import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Panel from '../component/panel';
import Navbar from '../component/navbar';
import Config from '../config';

import { PanelStyles, CommonStyles, AboutStyles } from '../style';

const navTitle = "关于";
const { height, width } = Dimensions.get('window');

class AboutPage extends Component {

  constructor (props) {
    super(props);
    this.authorJokes = [
      "少年",
      "别再乱点了",
      "马上行动起来",
      "拔掉网线",
      "关上电脑",
      "读几页自己喜欢的书",
      "出门去阳光里走走",
      "要么骑自行车",
      "要么和朋友找个地方喝点酒",
      "随便做些什么",
      "一天下来",
      "你就会发现",
      "还是在家上网有意思啊！！"
    ];
  }

  onAuthorPress(){
    let jokeMessage = this.authorJokes[0];
    if (jokeMessage) {
      ToastAndroid.show(jokeMessage, ToastAndroid.LONG);
    }
    this.authorJokes.shift();
  }

  renderNavbar(){
    return (
      <Navbar
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  renderAboutItem(){
    return (
      <Panel
        title = { `${Config.appInfo.name} - ${Config.appInfo.descr}` }
        descr = { Config.appInfo.declare }/>
    )
  }

  renderCopyrightItem(){
    return (
      <Panel
        title = "特别声明"
        descr={ Config.authorInfo.declare }/>
    )
  }

  renderAuthorItem(){
    let tailImage = <Image 
              style={ PanelStyles.icon } 
              resizeMode={"cover"}
              source={ {uri: Config.authorInfo.avatar }}/>

    return (
      <Panel
        onPress = { ()=>this.onAuthorPress() }
        title = "作者信息"
        descr = { Config.authorInfo.email }
        tailControl = { tailImage }/>
    )
  }

  renderTestItem(){
    return (
      <Panel
        onPress = { ()=>this.props.router.toTest() }
        title = "测试页面"
        descr = "这里可以进入测试页面"/>
    )
  }

  renderFooter(){
    return (
      <View style={ AboutStyles.footer }>
        <Text style={ AboutStyles.footerText }>
          { Config.appInfo.copyright }
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={ CommonStyles.container }>

        { this.renderNavbar() }
        
        { this.renderAboutItem() }
        { this.renderCopyrightItem() }
        { this.renderAuthorItem() }
        { this.renderTestItem() }
        
        { this.renderFooter() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  backgroundImage:{
    opacity: 0.1,
    width: width,
    height: 200
  }
});

export default AboutPage;