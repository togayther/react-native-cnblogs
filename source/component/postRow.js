import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';

import Config from '../config';
import { PostListRowStyles } from '../style';

const rowPressedColor = '#f2f2f2';

class PostRow extends Component {
	
	static defaultProps = {
		onPress: () => null
	};

	renderPostMetas(post){
		let { category } = this.props;
		let metasContent = [];
		let dateText = moment(post.published).format("YYYY-MM-DD HH:mm");

		metasContent.push(
			<Text key={ 'meta-date' } style={ PostListRowStyles.metaDate }>
				{ dateText }
			</Text>
		);
		metasContent.push(
			<Text key={ 'meta-count' } style={ PostListRowStyles.metaCount }>
				{post.comments + ' / ' + post.views}
			</Text>
		);
		return metasContent;
	}

	render() {
		const { post } = this.props;
		let authorAvatar = post.author.avatar || Config.defaultAvatar;

		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(post) }}
				underlayColor={ rowPressedColor }
				key={ post.id }>

				<View style={ PostListRowStyles.rowContainer }>
					<View style={ PostListRowStyles.authorInfo }>
						<Image ref={view => this.imgView=view}
							style={ PostListRowStyles.authorAvatar }
							source={{uri: authorAvatar }}>
						</Image>
						<Text style={ PostListRowStyles.authorName }>
							{ post.author.name }
						</Text>
					</View>

					<View style={ PostListRowStyles.postInfo }>
						<Text style={ PostListRowStyles.postTitle }>
							{ post.title }
						</Text>
					</View>

					<View style={ PostListRowStyles.metaInfo }>
						{ this.renderPostMetas(post) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default PostRow;
