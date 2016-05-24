import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	WebView,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import Spinner from '../component/spinner';
import * as PostAction from '../action/post';
import Config from '../config';
import { CommonStyles, PostDetailStyles } from '../style';
import HtmlRender from '../component/htmlRender';
import { getPostResetStyle } from '../common/util';

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
			<Spinner size="large" animating={true}/>
		)
	}

	renderPost() {

		let { post } = this.props;

		if(!post){
			return (
				<Spinner size="large" animating={true}/>
			);
		}

		let { author_name, author_avatar }  = post;
		let publishDate = moment(post.createdate).format("YYYY-MM-DD HH:mm");
		author_avatar = author_avatar|| Config.defaultAvatar;

		return (
			<ScrollView>
				<View>
					<View>
						<TouchableOpacity>
							<Image
								source={{ uri:author_avatar }}>
							</Image>
						</TouchableOpacity>
					</View>

					<View>
						<Text>
							{ post.title }
						</Text>

						<View>
							<Text>
								{ author_name }
							</Text>
							<Text>
								{ publishDate }
							</Text>
						</View>
					</View>
				</View>

				{ this.renderPostContent() }
			</ScrollView>
		)
	}

	render() {
		return (
			<View style={ CommonStyles.container }>
				{ this.renderPost() }
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