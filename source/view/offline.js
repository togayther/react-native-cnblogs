import React, { Component } from 'react';
import {
  View,
  Text,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as OfflineAction from '../action/offline';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import SingleButton from '../component/button/single';
import OfflineRender from '../component/header/offline';
import OfflinePostList from '../component/listview/offlineList';
import HintMessage from '../component/hintMessage';
import { ComponentStyles, CommonStyles, StyleConfig  } from '../style';

class OfflinePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount(){
    const { offlineAction } = this.props;
    offlineAction.getPosts();
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onRemoveAllPress(){
    const { offlineAction, posts } = this.props;
    if (posts && posts.length) {
      Alert.alert(
        '系统提示',
        '确定要清除所有的离线记录吗？',
        [
          {text: '取消', onPress: () => null },
          {text: '确定', onPress: () => this.handleOfflineClean() },
        ]
      )
    }
  }

  onRemovePress(data){
    if(data){
			Alert.alert(
				'系统提示',
				'确定删除该离线记录？',
				[
					{text: '取消', onPress: () => null },
					{text: '确定', onPress: (e) => this.handleRemovePress(data) },
				]
			)
		}
  }

  handleRemovePress(data){
    const { offlineAction } = this.props;
		if (data && data.Id) {
			offlineAction.removePost(data.Id).then(()=>{
        Toast.show("删除离线记录成功");
      });
		}
  }

  handleRemove(){
    const { offlineAction, posts } = this.props;
    if (posts && posts.length) {
      offlineAction.removePosts().then(()=>{
        Toast.show("已清除全部离线博文记录");
      });
    }
  }

  renderNavbar(){
    return (
      <Navbar
        title={ navTitle }
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        rightIconName = "ios-trash-outline"
        rightIconOnPress={ ()=>this.onOfflineCleanPress() }/>
    )
  }

  renderContent(){
    const { posts, router } = this.props;
    if(this.state.hasFocus === false){
      return (
					<Spinner style={ ComponentStyles.message_container }/>
      )
    }
    if (posts && posts.length) {
      return (
        <OfflinePostList 
          router={ router }
          onRemovePress = { (e)=>this.onRemovePress(e) }/>
      )
    }
    return (
      <HintMessage message={ ' - 暂无离线记录 - ' }/>
    );
  }

  render() {
    const { router, user } = this.props;
    return (
      <View style={ ComponentStyles.container }>
        <OfflineRender
					user={ user } 
					router = { router }>
					{ this.renderContent() }
				</OfflineRender>

        <SingleButton 
          icon="ios-trash-outline" 
          position="right"
          color = { StyleConfig.action_color_danger } 
          onPress = { ()=>this.onRemoveAllPress() }/>

        <SingleButton 
          position="left" 
          onPress = { ()=>this.props.router.pop() }/>
      </View>
    );
  }
}

export default connect((state, props) => ({
  user: state.user,
  posts : state.offline.posts
}), dispatch => ({ 
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(OfflinePage);