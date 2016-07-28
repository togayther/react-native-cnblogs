import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import Spinner from '../component/spinner';
import OfflinePostBar from '../component/offlinePostBar';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import OfflinePostRender from '../component/offlinePostRender';
import { CommonStyles, PostDetailStyles, StyleConfig } from '../style';

class DownloadPostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		}
	}

	componentDidMount(){
		let { post, offlineAction } = this.props;
		offlineAction.getPost(post.id);
	}

	onRemovePress(post){
		const { offlineAction } = this.props;
		if (post && post.id) {
			offlineAction.removePost(post.id).then(()=>{
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
				<View style={ CommonStyles.spinnerContainer }>
					<Spinner />
				</View>
			)
		}
		if (postContent) {
			return (
				<View style={ CommonStyles.detailContainer }>
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
			<View style={ CommonStyles.container }>
				<OfflinePostRender post={ this.props.post } router = { this.props.router }>
					{ this.renderPost() }
				</OfflinePostRender>
				<OfflinePostBar onRemovePress={(e)=>this.onRemovePress(e)}
					{...this.props} />
			</View>
		)
	}
}

export default connect((state, props) => ({
  postContent: state.offline.postContent
}), dispatch => ({ 
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(DownloadPostPage);