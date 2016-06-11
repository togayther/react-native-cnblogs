import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from '../component/spinner';
import NavigationBar from '../component/navbar/';
import * as PostAction from '../action/post';
import { scrollEnabledOffset, postCategory } from '../config';
import { CommonStyles, FloatButtonStyles } from '../style';
import HtmlRender from '../component/htmlRender';
import Backer from '../component/backer';
import PostHeader from '../component/postHeader';
import ScrollButton from '../component/scrollButton';
import CommentButton from '../component/commentButton';

const category = postCategory.news;
const headerText = '新闻详情';

class NewsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false,
			scrollButtonVisiable: false
		}
	}

	componentDidMount() {
		const { postAction, id, post, postContent } = this.props;
		if(!postContent || !postContent.NewsBody || !postContent.NewsBody.Content){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onScrollButtonPress(){
		this.scrollView.scrollTo({y:0});
	}

	onScrollHandle(event){
		let offsetY = event.nativeEvent.contentOffset.y;
		let scrollButtonVisiable = false;
		if (offsetY > scrollEnabledOffset) {
        	scrollButtonVisiable = true;
		}else{
			scrollButtonVisiable = false;
		}

		this.setState({
			scrollButtonVisiable
		});
	}

	onCommentPress(){
		let { router, post, id } = this.props;
		if (router && id) {
			router.toComment({
				post: post,
				category,
				pid: id
			});
		}
	}

	renderPostContent() {
		let { postContent } = this.props;
		return (
			<View style={ CommonStyles.detailContainer }>
				<HtmlRender 
					content={ postContent.NewsBody.Content }>
				</HtmlRender>
			</View>
		)
	}

	renderPost() {
		let { id, postContent, ui } = this.props;
		
		//加载中
		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner size="large" style = { CommonStyles.refreshSpinner } animating={ true }/>
			)
		}

		if (postContent && postContent.NewsBody && postContent.NewsBody.Content) {
			return (
				<ScrollView>
					{ this.renderPostContent() }
				</ScrollView>
			)
		}
		return(
			<HintMessage message="未查询到相关新闻信息"/>
		);
	}

	renderHeaderLeftConfig(){
		let { router } = this.props;
	    return (
	    	<Backer router = { router }/>
	    )
	}

	renderHeaderTitleConfig(){
	    return (
	      <Text style={ CommonStyles.navbarText }>
	        { headerText }
	      </Text>
	    )
	}

	render() {

		let { post, postContent } = this.props;

		return (
			<View style={ CommonStyles.container}>
				<NavigationBar
		            style = { CommonStyles.navbar}
		            leftButton= { this.renderHeaderLeftConfig() }
		            title={ this.renderHeaderTitleConfig() }>
		        </NavigationBar>
		        <ScrollView 
		        	onScroll = { this.onScrollHandle.bind(this) }
		        	ref={(view)=>this.scrollView = view }>
		        	
		        	<PostHeader post={ post}/>

		          	<View style={ CommonStyles.container}>
						{ this.renderPost() }
					</View>
		        </ScrollView>

		        {
		        	postContent && postContent.NewsBody && postContent.NewsBody.Content?
		        	<CommentButton onPress={ this.onCommentPress.bind(this) } style={ FloatButtonStyles.positionLeft }/>
		        	:null
		        }

		        {
		        	this.state.scrollButtonVisiable  === true ?
		        	<ScrollButton onPress={ this.onScrollButtonPress.bind(this) }/>
		        	:null
		        }
			</View>
		)
	}
}

export default connect((state, props) => ({
  postContent: state.post.posts[props.id],
  ui: state.postDetailUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(NewsPage);