import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import Spinner from '../component/spinner';
import * as PostAction from '../action/post';
import Config from '../config';
import Styles from '../style';

class PostPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		}
	}

	componentDidMount() {
		const { postAction, id, post, category } = this.props;
		if(!post.string){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderPostBody(post) {
		if (this.state.hasFocus && post && post.string) {
			return (
				<View>
					<Text>
			          { post.string }
			        </Text>
				</View>
			)
		}
		return (
			<Spinner size="large" animating={true}/>
		)
	}

	renderPostContent(post) {

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

				{ this.renderPostBody(post) }
			</ScrollView>
		)
	}

	render() {
		const { post } = this.props;

		return (
			<View>
				{ this.renderPostContent(post) }
			</View>
		)
	}
}

export default connect((state, props) => ({
  post: state.post.posts[props.id] || props.post
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
	withRef: true
})(PostPage);