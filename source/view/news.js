import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	StyleSheet,
	WebView,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import entities  from 'entities';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from '../component/spinner';
import NavigationBar from '../component/navbar/';
import * as PostAction from '../action/post';
import Config, { scrollEnabledOffset } from '../config';
import { CommonStyles, PostDetailStyles, FloatButtonStyles } from '../style';
import HtmlRender from '../component/htmlRender';
import Backer from '../component/backer';
import ScrollButton from '../component/scrollButton';
import CommentButton from '../component/commentButton';

const category = "news";

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
		let fadeBox = this.refs.fadeBox;
		fadeBox.fadeIn();
	}

	renderPostContent() {
		let { postContent } = this.props;
		if (this.state.hasFocus && postContent 
			&& postContent.NewsBody && postContent.NewsBody.Content) {
			return (
				<View style={ CommonStyles.detailContainer }>
					<HtmlRender 
						content={ postContent.NewsBody.Content }>
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

	renderHeader(){
		let { post } = this.props;
		let publishDate = moment(post.createdate).format("YYYY-MM-DD HH:mm");

		return (
			<View style={ CommonStyles.detailHeader}>
				<View style={ CommonStyles.titleContainer }>
					<Text style={ CommonStyles.title }>
						{ entities.decodeHTML(post.title) }
					</Text>
					<View style={ CommonStyles.meta}>
						<Text>
							{ post.sourceName }
						</Text>
						<Text style={ CommonStyles.metaRight}>
							{ publishDate }
						</Text>
					</View>
				</View>
			</View>
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
	        新闻详情
	      </Text>
	    )
	}

	render() {

		let { postContent } = this.props;

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
		        	{ this.renderHeader () }
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
  postContent: state.post.posts[props.id]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(NewsPage);