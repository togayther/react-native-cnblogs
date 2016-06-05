import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import entities  from 'entities';
import { PostListRowStyles, CommonStyles, StyleConfig } from '../style';

class PostRow extends Component {
	
	static defaultProps = {
		onPress: () => null
	};

	renderPostMetas(post){
		let { category } = this.props;
		let metasContent = [];
		let dateText = moment(post.published).format("YYYY-MM-DD HH:mm");

		metasContent.push(
			<Text key={ 'meta-date' } style={ CommonStyles.hint }>
				{ dateText }
			</Text>
		);
		metasContent.push(
			<Text key={ 'meta-count' } style={ [CommonStyles.hint, CommonStyles.metaRight] }>
				{post.comments + ' / ' + post.views}
			</Text>
		);
		return metasContent;
	}

	render() {
		const { post } = this.props;
		let authorAvatar = post.author.avatar;

		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(post) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ post.id }>

				<View style={ CommonStyles.rowContainer }>
					<View style={ PostListRowStyles.authorInfo }>
						{
							authorAvatar?
							<Image ref={view => this.imgView=view}
								style={ PostListRowStyles.authorAvatar }
								source={{uri: authorAvatar }}>
							</Image>
							:null
						}
						
						<Text style={ PostListRowStyles.authorName }>
							{ post.author.name }
						</Text>
					</View>

					<View>
						<Text style={ CommonStyles.title }>
							{ entities.decodeHTML(post.title) }
						</Text>
					</View>

					<View style={ CommonStyles.meta }>
						{ this.renderPostMetas(post) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default PostRow;
