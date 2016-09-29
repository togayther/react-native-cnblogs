import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import * as ConfigAction from '../action/config';
import ViewPage from '../component/view';
import Spinner from '../component/spinner';
import PostButton from '../component/button/post';
import SingleButton from '../component/button/single';
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
		if(!postContent){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onOfflinePress(){
		const { post, postContent, category, offlineAction } = this.props;
		if (post && postContent) {
			let offlineInfo = {};
			let offlineData = {
				category: category,
				postContent: postContent,
				offlineDate: moment()
			};
			offlineInfo[post.Id] = {...post,  ...offlineData};
			
			offlineAction.savePost(offlineInfo).then(()=>{
				Toast.show("离线保存成功");
			});
		}
	}

	onCommentPress(){
		const { post, router, category, id } = this.props;
		if (category && id) {
			router.push(ViewPage.commentAdd(), {
				data: post,
				blogger: post.Blogger,
				category: category,
				id: id
			});
		}
	}

	onCommentListPress(){
		const { post, router, category, id } = this.props;
		if (category && id) {
			router.push(ViewPage.postComment(), {
				post: post,
				blogger: post.Blogger,
				category: category,
				id: id
			});
		}
	}

	onAuthorPress(){
		let { post, router } = this.props;
		if (post) {
			router.push(ViewPage.author(), {
				post: post,
				avatar: post.AvatarHdpi,
				blogger: post.Blogger
			});
		}
	}

	onFavoritePress(){
		Toast.show("添加收藏成功");
	}

	renderContent() {
		const { id, postContent, ui, config } = this.props;
		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (postContent) {
			const imgDisabled = config && config[storageKey.IMAGE_LOAD_FLAG] && config[storageKey.IMAGE_LOAD_FLAG].flag === false;
			return (
				<View style={ [CommonStyles.p_a_3 ] }>
					<HtmlConvertor
						imgDisabled = { imgDisabled }
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
		const { post, router, category } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				{
					category === postCategory.news?
					<NewsRender
						post={ post } 
						router = { router }
						onCommentListPress = {()=>this.onCommentListPress()}>
						{ this.renderContent() }
					</NewsRender>
					:
					<PostRender
						post={ post } 
						router = { router }
						onAuthorPress = {()=>this.onAuthorPress()}
						onCommentListPress = {()=>this.onCommentListPress()}>
						{ this.renderContent() }
					</PostRender>
				}

				<PostButton 
					onCommentPress = {()=>this.onCommentPress()}
					onOfflinePress = {()=>this.onOfflinePress()}
					onFavoritePress = {()=>this.onFavoritePress()}
					router = { this.props.router}/>

				<SingleButton onPress = { ()=>this.props.router.pop() }/>
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