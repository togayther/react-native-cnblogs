import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import Spinner from '../component/spinner';
import SingleButton from '../component/button/single';
import OfflinePostBar from '../component/bar/offlinePost';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import OfflinePostRender from '../component/header/offlinePost';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class DownloadPostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		}
	}

	componentDidMount(){
		let { post, offlineAction } = this.props;
		offlineAction.getPost(post.Id);
	}

	onRemovePress(){
		const { post } = this.props;
		if (post && post.Id) {
	      Alert.alert(
	        '系统提示',
	        '确定要清除该离线记录吗？',
	        [
	          {text: '取消', onPress: () => null },
	          {text: '确定', onPress: () => this.handleRemove() },
	        ]
	      )
	    }
	}

	handleRemove(){
		const { post, offlineAction } = this.props;
		if (post && post.Id) {
			offlineAction.removePost(post.Id).then(()=>{
				this.props.router.pop();
			});
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderPost() {
		let { postContent } = this.props;
		if (this.state.hasFocus === false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (postContent) {
			return (
				<View style={ [CommonStyles.p_a_3 ] }>
					<HtmlConvertor
						content={ postContent }>
					</HtmlConvertor>
				</View>
			)
		}
		return(
			<HintMessage />
		);
	}

	render() {
		let { post, router } = this.props;

		return (
			<View style={ ComponentStyles.container }>
				<OfflinePostRender post={ this.props.post } router = { this.props.router }>
					{ this.renderPost() }
				</OfflinePostRender>

				<SingleButton 
					icon="ios-trash-outline" 
					position="right"
					color = { StyleConfig.action_color_danger } 
					onPress = { ()=>this.onRemovePress() }/>

				<SingleButton  
					position="left" 
					onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bar_patch:{
		height: StyleConfig.bottomBar_height - 15
	}
});

export default connect((state, props) => ({
  postContent: state.offline.postContent
}), dispatch => ({ 
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(DownloadPostPage);