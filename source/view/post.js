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
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from '../component/spinner';
import * as PostAction from '../action/post';
import Config from '../config';
import { CommonStyles, PostDetailStyles } from '../style';
import HtmlRender from '../component/htmlRender';

const postStyle = '<style type="text/css">img{width:100%;max-width:100%}img.p{color:#666}</style>';

class PostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
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

	renderPostContent() {
		let { postContent } = this.props;
		if (this.state.hasFocus && postContent && postContent.string) {
			return (
				<View style={ PostDetailStyles.container }>
					<HtmlRender 
						content={postContent.string}>
					</HtmlRender>
				</View>
			)
		}
		return (
			<Spinner size="large" style = { PostDetailStyles.spinner } animating={true}/>
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
		let { author }  = post;
		let { name: authorName, avatar:authorAvatar = Config.defaultAvatar } = author;
		let publishDate = moment(post.createdate).format("YYYY-MM-DD HH:mm");

		return (
			<View style={ PostDetailStyles.header}>
				<View style={ PostDetailStyles.headerAuthor }>
					<TouchableOpacity>
						<Image style={ PostDetailStyles.headerAvatar }
							source={{ uri: authorAvatar }}>
						</Image>
					</TouchableOpacity>
				</View>
				<View style={ PostDetailStyles.headerContent }>
					<Text style={ PostDetailStyles.headerTitle }>
						{ entities.decodeHTML(post.title) }
					</Text>
					<View style={ PostDetailStyles.headerMeta}>
						<Text style={ PostDetailStyles.headerMetaName}>
							{ authorName }
						</Text>
						<Text style={ PostDetailStyles.headerMetaDate}>
							{ publishDate }
						</Text>
					</View>
				</View>
			</View>
		);
	}

	getHeaderLeftConfig(){
	    return (
	      <Icon
	        name='chevron-left'
	        size={22}
	        style={ CommonStyles.navbarMenu }
	      />
	    )
	}

	getHeaderRightConfig(){
	    return (
	      <Icon
	        name='user'
	        size={18}
	        style={ CommonStyles.navbarMenu }
	      />
	    )
	}

	getHeaderTitleConfig(){
	    return (
	      <Text style={ CommonStyles.navbarText }>
	        文章详情
	      </Text>
	    )
	}

	render() {
		return (
			<View style={ CommonStyles.container}>
				<NavigationBar
		            style = { CommonStyles.navbar}
		            leftButton= { this.getHeaderLeftConfig() }
		            rightButton= { this.getHeaderRightConfig() }
		            title={ this.getHeaderTitleConfig() }>
		        </NavigationBar>
		        <ScrollView>
		        	{ this.renderHeader () }
		          	<View style={ CommonStyles.container}>
						{ this.renderPost() }
					</View>
		        </ScrollView>
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