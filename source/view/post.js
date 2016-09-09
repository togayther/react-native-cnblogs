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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import * as ConfigAction from '../action/config';
import Spinner from '../component/spinner';
import PostBar from '../component/postBar';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import PostRender from '../component/postRender';
import { storageKey } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class PostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { postAction, id, post, postContent, category } = this.props;
		if(!postContent || !postContent.string){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderPost() {
		let { id, postContent, ui, config } = this.props;

		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<View style={ CommonStyles.spinnerContainer }>
					<Spinner />
				</View>
			)
		}
		if (postContent && postContent.string) {

			let imgDisabled = config && config[storageKey.IMAGE_LOAD_FLAG] && config[storageKey.IMAGE_LOAD_FLAG].flag === false;

			return (
				<View style={ CommonStyles.detailContainer }>
					<HtmlConvertor
						imgDisabled = { imgDisabled }
						content={ postContent.string }>
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
				<PostRender post={ this.props.post } router = { this.props.router }>
					{ this.renderPost() }
				</PostRender>
				<PostBar {...this.props}/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  postContent: state.post.posts[props.id],
  config: state.config,
  ui: state.postDetailUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch),
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(PostPage);