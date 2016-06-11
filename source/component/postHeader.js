import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Config from '../config';
import { getBloggerName, decodeHTML } from '../common';
import { CommonStyles, PostDetailStyles, StyleConfig } from '../style';

class PostHeader extends Component {

	constructor(props) {
	    super(props);
	}

	render() {
	    let { post, router, authorDetailEnabled = false } = this.props;
		let { author }  = post;
		
		let { name: authorName, avatar:authorAvatar, uri: authorUri } 
			= (author || { name: post.sourceName, avatar: null, uri: null });

		let publishDate = moment(post.published).format("YYYY-MM-DD HH:mm");

		let bloggerName = getBloggerName(authorUri);

		let postTitle = decodeHTML(post.title);

		let onAuthorPress = 
			authorDetailEnabled ?
			()=> router.toAuthor({name:bloggerName})
			:()=>null;

		return (
			<View style={ CommonStyles.detailHeader }>
				
				<View style={ PostDetailStyles.headerAuthor }>
					{
						authorAvatar?
						<TouchableOpacity onPress={ onAuthorPress }>
							<Image style={ PostDetailStyles.headerAvatar }
								source={{ uri: authorAvatar }}>
							</Image>
						</TouchableOpacity>
						:
						<Icon name={ 'ios-paper' } 
							size={18} color={ StyleConfig.mainColor }/>
					}
				</View>
				<View style={ CommonStyles.titleContainer }>
					<Text style={ CommonStyles.title }>
						{ postTitle }
					</Text>
					<View style={ CommonStyles.meta}>
						<Text>
							{ authorName }
						</Text>
						<View style={ CommonStyles.metaRight }>
							<Icon name={ 'ios-clock-outline' } 
								size={16}
								style={ CommonStyles.metaIcon }/>
							<Text>
								{ publishDate }
							</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}


export default PostHeader;


