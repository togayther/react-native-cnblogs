import React, { Component } from 'react';
import {
	View
} from 'react-native';

import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from '@remobile/react-native-toast';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import Spinner from '../component/spinner';
import SearchButton from '../component/button/search';
import SingleButton from '../component/button/single';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import SearchRender from '../component/header/search';
import { storageKey, postCategory } from '../config';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class SearchDetailPage extends Component {

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
			
			offlineAction.savePost(offlineInfo).then((data)=>{
				this.onOfflineResolved(data);
			});
		}
	}

	onOfflineResolved(data){
		Toast.show("离线保存成功");
	}

	getFavoriteTitle(post){
		let title = post.Title;
		let { category } = this.props;
		if(category === postCategory.news){
			title = title + "_IT新闻_博客园";
		}else{
			title = title + " - " + post.Author + " - 博客园";
		}
		return title;
	}

	onFavoritePress(){
		const { post, postAction } = this.props;
		if (post) {
			let title = this.getFavoriteTitle(post);
			let favoriteData = {
				Title: title,
				LinkUrl: post.Url,
				Summary: post.Description,
				Tags: ""
			};
			postAction.addPost({
				category: postCategory.favorite,
				data: favoriteData,
				resolved: (data)=>{
					this.onFavoriteResolved(data);
				}
			});
		}
	}

	onFavoriteResolved(data){
		Toast.show("添加收藏成功");
	}

	renderPost() {
		const { id, postContent, ui, config, router } = this.props;
		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (postContent) {
			return (
				<View style={ [CommonStyles.p_a_3 ] }>
					<HtmlConvertor
						router = { router }
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
		const { post, router } = this.props;
		return (
			<View style={ ComponentStyles.container }>
                <SearchRender
                    post={ post } 
                    router = { router }>
                    { this.renderPost() }
                </SearchRender>
				
				<SearchButton
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
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(SearchDetailPage);