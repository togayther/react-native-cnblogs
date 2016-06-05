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
import Spinner from '../component/spinner';
import * as PostAction from '../action/post';
import { getBloggerName } from '../common';
import NavigationBar from '../component/navbar/';
import { scrollEnabledOffset } from '../config';
import { CommonStyles, FloatButtonStyles, StyleConfig } from '../style';
import HtmlRender from '../component/htmlRender';
import Backer from '../component/backer';
import PostHeader from '../component/postHeader';
import ScrollButton from '../component/scrollButton';
import CommentButton from '../component/commentButton';

const headerText = '博文详情';

class PostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false,
			scrollButtonVisiable: false
		}
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
		let { post, router, category, id } = this.props;
		if (router && category && id) {
			router.toComment({
				post: post,
				category: category,
				pid: id
			});
		}
	}

	renderPostContent() {
		let { postContent } = this.props;
		if (this.state.hasFocus && postContent && postContent.string) {
			return (
				<View style={ CommonStyles.detailContainer }>
					<HtmlRender 
						content={postContent.string}>
					</HtmlRender>
				</View>
			)
		}
		return (
			<Spinner size="large" style = { CommonStyles.refreshSpinner } animating={true}/>
		)
	}

	renderPost() {
		let { post } = this.props;
		return (
			<ScrollView>
				{ this.renderPostContent() }
			</ScrollView>
		)
	}

	renderHeaderLeftConfig(){
		let { router } = this.props;
	    return (
	    	<Backer router = { router }/>
	    )
	}

	renderHeaderRightConfig(){
		let { router, post, authorDetailEnabled = true } = this.props;
		let bloggerName = getBloggerName(post.author.uri);
	    return (
	    	authorDetailEnabled?
	    	<TouchableOpacity onPress={ ()=>{ router.toAuthor({name: bloggerName}) } }>
		      <Icon
		        name='ios-person'
		        size={24}
		        style={ [CommonStyles.navbarMenu, { color: StyleConfig.mainColor }] }
		      />
		    </TouchableOpacity>
		    :null
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
		let { post, postContent, router, authorDetailEnabled = true } = this.props;
		return (
			<View style={ CommonStyles.container}>
				<NavigationBar
		            style = { CommonStyles.navbar}
		            leftButton= { this.renderHeaderLeftConfig() }
		            rightButton = { this.renderHeaderRightConfig() }
		            title={ this.renderHeaderTitleConfig() }>
		        </NavigationBar>
		        <ScrollView 
		        	onScroll = { this.onScrollHandle.bind(this) }
		        	ref={(view)=>this.scrollView = view }>
		        	
		        	<PostHeader post={ post } router = { router } authorDetailEnabled={ authorDetailEnabled }/>

		          	<View style={ CommonStyles.container}>
						{ this.renderPost() }
					</View>
		        </ScrollView>

		        {
		        	postContent && postContent.string?
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
  postContent: state.post.posts[props.id]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(PostPage);