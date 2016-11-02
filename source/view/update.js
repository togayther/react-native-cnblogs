import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../component/navbar';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "更新历史";

const updateRecodes = [{
    name: "V3.1.0",
    date: "2016/11/05",
    func: [
        "新增退出登录功能",
        "调整应用更新逻辑，显示更新内容",
        "应用内新增版本号显示",
        "调整排行接口，返回48小时阅读排行数据"
    ],
    bug: [
        "修复启动页路由跳转的一点问题",
        "修复个人博文列表无法刷新的问题",
        "修复一个会导致应用闪退的bug"
    ]
},{
    name: "V3.0.0",
    date: "2016/10/12",
    func: [
        "调整登录弹出框提示说明文字",
        "搜索页添加清空搜索结果的功能",
        "调整列表页未获取到数据时空提示说明文字",
        "优化资源图片大小，减小打包体积"
    ],
    bug: [
        "修复登录凭据失效后无法自动登录的问题",
        "修复首页侧边栏昵称过长导致显示错位的问题"
    ]
}];

class UpdatePage extends Component {

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

  renderUpdateFuncItem(func, index){
      return (
          <Text key={ index } style={[ CommonStyles.text_dark, CommonStyles.font_xs, CommonStyles.m_b_1 ]}>
            {`${index+1}，${func}`}
          </Text>
      )
  }

  renderUpdateBugItem(bug, index){
      return (
          <Text key={ index } style={[ CommonStyles.text_dark, CommonStyles.font_xs, CommonStyles.m_b_1 ]}>
            {`${index+1}，${bug}`}
          </Text>
      )
  }

  renderUpdateBugContent(record){
      if(record.bug && record.bug.length){
          return (
              <View style={[ CommonStyles.m_a_3 ]}>
                <Text style= { [CommonStyles.text_danger, CommonStyles.font_sm, CommonStyles.m_b_2 ] }>
                    问题修复
                </Text>
                {
                    record.bug.map((bug, index)=>{
                        return this.renderUpdateBugItem(bug, index);
                    })
                }
              </View>
          )
      }
  }

  renderUpdateFuncContent(record){
      if(record.func && record.func.length){
          return (
              <View style={[ CommonStyles.m_x_3, CommonStyles.m_t_3 ]}>
                <Text style= { [CommonStyles.text_primary, CommonStyles.font_sm, CommonStyles.m_b_2] }>
                    功能更新
                </Text>
                {
                    record.func.map((func, funcIndex)=>{
                        return this.renderUpdateFuncItem(func, funcIndex);
                    })
                }
              </View>
          )
      }
  }

  renderUpdateTitle(record){
      return (
          <View style={[ CommonStyles.p_a_3, ComponentStyles.panel_bg, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween ]}>
            <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
                <Text style={[ CommonStyles.font_xs, CommonStyles.text_dark, CommonStyles.font_italic ]}>
                    { record.name }
                </Text>
            </View>
            <Text style={[ CommonStyles.font_xs, CommonStyles.text_dark ]}>
                { record.date }
            </Text>
          </View>
      )
  }

  renderContentItem(record, index){
      return (
          <View key={ index }>
            { this.renderUpdateTitle(record) }
            { this.renderUpdateFuncContent(record) }
            { this.renderUpdateBugContent(record) }
          </View>
      )
  }

  renderContent(){
      return (
          <ScrollView 
            showsVerticalScrollIndicator = {false}
			showsHorizontalScrollIndicator = {false}>
            {
                updateRecodes.map((record, index)=>{
                    return this.renderContentItem(record, index);
                })
            }
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

export default connect((state, props) => ({
}), dispatch => ({ 
}), null, {
  withRef: true
})(UpdatePage);