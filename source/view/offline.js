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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as OfflineAction from '../action/offline';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import OfflinePostList from '../component/listview/offlineList';
import HintMessage from '../component/hintMessage';
import { ComponentStyles, CommonStyles, StyleConfig  } from '../style';

const navTitle = "离线记录";

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

  onOfflineCleanPress(){
    const { offlineAction, posts } = this.props;
    if (posts && posts.length) {
      Alert.alert(
        '系统提示',
        '确定要清除所有的离线博文记录吗？',
        [
          {text: '取消', onPress: () => null },
          {text: '确定', onPress: () => this.handleOfflineClean() },
        ]
      )
    }
  }

  handleOfflineClean(){
    const { offlineAction, posts } = this.props;
    if (posts && posts.length) {
      offlineAction.removePosts().then(()=>{
        ToastAndroid.show("已清除全部离线博文记录", ToastAndroid.LONG);
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

  renderOfflinePostList(){

    const { posts, router } = this.props;

    if(this.state.hasFocus === false){
      return (
					<Spinner style={ ComponentStyles.message_container }/>
      )
    }
    if (posts && posts.length) {
      return (
        <OfflinePostList router={ router }/>
      )
    }
    return (
      <HintMessage />
    );
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderOfflinePostList() }
      </View>
    );
  }
}

export default connect((state, props) => ({
  posts : state.offline.posts
}), dispatch => ({ 
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(OfflinePage);