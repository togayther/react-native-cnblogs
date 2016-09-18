import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Markdown from 'react-native-simple-markdown'
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import * as ConfigAction from '../action/config';
import Spinner from '../component/spinner';
import PostBar from '../component/bar/post';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import PostRender from '../component/header/post';
import NewsRender from '../component/header/news';
import { storageKey, postCategory } from '../config';
import { StyleConfig, ComponentStyles, HtmlConvertorStyles, CommonStyles } from '../style';

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
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (postContent) {
			let imgDisabled = config && config[storageKey.IMAGE_LOAD_FLAG] && config[storageKey.IMAGE_LOAD_FLAG].flag === false;
			return (
				<View style={ [CommonStyles.p_a_3 ] }>
					<HtmlConvertor
						imgDisabled = { imgDisabled }
						content={ postContent }>
					</HtmlConvertor>
					<View style={ [ComponentStyles.bar_patch, styles.bar_patch] }>
					</View>
				</View>
			)
		}
		return(
			<HintMessage />
		);
	}

	render() {
		let { post, router, category } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				{
					category === postCategory.news?
					<NewsRender post={ post } router = { router }>
						{ this.renderPost() }
					</NewsRender>
					:
					<PostRender post={ post } router = { router }>
						{ this.renderPost() }
					</PostRender>
				}
				<PostBar {...this.props}/>
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