import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Panel from '../component/panel';
import Navbar from '../component/navbar';
import Config from '../config';
import ViewPage from '../component/view';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "关于";
const authorAvatar = require('../image/author.png');

class AboutPage extends Component {

  constructor (props) {
    super(props);
  }

  renderNavbar(){
    return (
      <Navbar
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

  renderDeclareItem(){
    return (
      <Panel
        title = "特别声明"
        descr={ Config.authorInfo.declare }/>
    )
  }

  renderAuthorItem(){
    const tailImage = <Image 
        style={[ ComponentStyles.avatar, styles.avatar ]}
        resizeMode={"cover"}
        source={ authorAvatar }/>

    return (
      <Panel
        title = "作者信息"
        descr = { Config.authorInfo.email }
        tailControl = { tailImage }/>
    )
  }

  renderUpdateItem(){
    if(Platform.OS === 'android'){
      const tailIcon = <Icon 
					name={ "ios-arrow-round-forward" }  
					size= { 24 }
					style = { [CommonStyles.background_transparent, CommonStyles.m_r_2] }/>

      return (
        <Panel
          title = "更新历史"
          onPress = {()=>this.props.router.push(ViewPage.update())}
          descr = { "这里可以查看更新历史记录" }
          tailControl = { tailIcon }/>
      )
    }
  }
renderFooterPatch(){
  return (
    <View style={ styles.footerPatch }>
    </View>
  )
}


  renderCopyright(){
    return (
      <View style={ [ComponentStyles.pos_absolute, CommonStyles.background_white, styles.footer]}>
        <Text style={ [ CommonStyles.text_center, CommonStyles.p_y_4, CommonStyles.text_muted ] }>
          { Config.appInfo.copyright }
        </Text>
      </View>
    )
  }
  
  renderContent(){
    return (
      <ScrollView 
        		showsVerticalScrollIndicator = {false}
				    showsHorizontalScrollIndicator = {false}>
        { this.renderAboutItem() }
        { this.renderUpdateItem() }
        { this.renderDeclareItem() }
        { this.renderAuthorItem() }
        { this.renderFooterPatch() }
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderContent() }
        { this.renderCopyright() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  avatar:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  footer:{
    bottom : 0
  },
  footerPatch: {
    height: 60
  }
});

export default AboutPage;