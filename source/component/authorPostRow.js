import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { decodeHTML }  from '../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';

class AuthorPostRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getPostInfo(){
		const { post } = this.props;
		let postInfo = {};
		if (post && post.id) {
			postInfo.id = post.id;
			postInfo.title = decodeHTML(post.title);
			if (post.summary) {
				postInfo.summary = _.truncate(decodeHTML(post.summary), { length : 60 });
			}
			postInfo.published = moment(post.published).startOf('minute').fromNow();
			postInfo.authorName = decodeHTML(post.author.name);
			postInfo.authorAvatar = post.author.avatar;
			postInfo.authorUri = post.author.uri;
			postInfo.views = post.views;
			postInfo.comments = post.comments;
		}
		return postInfo;
	}

	renderPostRowMetas(postInfo){
		let metasContent = [];
		
		metasContent.push(
			<Text key='meta-date' style={ [ComponentStyles.metaText, {color: StyleConfig.mainColor} ] }>
				{ postInfo.published }
			</Text>
		);
		metasContent.push(
			<View key='meta-count' style={ ComponentStyles.metaRight } >
				<Text style={ [ComponentStyles.metaText, {color: StyleConfig.secondaryColor}] }>
					{postInfo.comments + ' / ' + postInfo.views}
				</Text>
			</View>
		);
		return metasContent;
	}

	render() {

		let postInfo = this.getPostInfo();

		return (
			<TouchableHighlight
				onPress={()=>{ this.props.onPress(postInfo) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ postInfo.id }>
				<View style={ CommonStyles.rowContainer }>
					<View>
						<Text style={ [ComponentStyles.title ] }>
							{ postInfo.title }
						</Text>
					</View>

					{
						postInfo.summary?
						<View>
							<Text style={ ComponentStyles.summary }>
								{ postInfo.summary }
							</Text>
						</View>
						: null
					}

					<View style={ ComponentStyles.metaInfo }>
						{ this.renderPostRowMetas(postInfo) }
					</View>

				</View>
			</TouchableHighlight>
		)
	}
}

export default AuthorPostRow;
