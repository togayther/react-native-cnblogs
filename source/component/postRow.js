import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { decodeHTML, formatNewsImgUri }  from '../common';
import Config from '../config';
import { PostStyles, CommonStyles, StyleConfig } from '../style';

class PostRow extends Component {

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
			if (post.author.avatar) {
				postInfo.authorAvatar = formatNewsImgUri(post.author.avatar);
			}else{
				postInfo.authorAvatar = Config.appInfo.avatar;
			}
			postInfo.comments = post.comments;
			postInfo.views = post.views;
			postInfo.authorUri = post.author.uri;
		}
		return postInfo;
	}
	
	renderPostRowMetas(postInfo){
		
		let metasContent = [];
		metasContent.push(
			<Text key='meta-date' style={ PostStyles.metaText }>
				{ postInfo.published }
			</Text>
		);
		metasContent.push(
			<View key='meta-count' style={ PostStyles.metaRight } >
				<Text style={ [PostStyles.metaText, { color: StyleConfig.mainColor }] }>
					{ postInfo.comments + ' / ' + postInfo.views }
				</Text>
			</View>
		);
		return metasContent;
	}

	render() {
		let postInfo = this.getPostInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(postInfo) }}
				underlayColor={ StyleConfig.touchablePressColor }
				key={ postInfo.id }>

				<View style={ CommonStyles.rowContainer }>
					<View style={ PostStyles.authorInfo }>
						<Image ref={view => this.imgView=view}
							style={ PostStyles.authorAvatar }
							source={ {uri:postInfo.authorAvatar} }>
						</Image>
						<Text style={ PostStyles.authorName }>
							{ postInfo.authorName }
						</Text>
					</View>

					<View>
						<Text style={ PostStyles.title }>
							{ postInfo.title }
						</Text>
					</View>

					{
						postInfo.summary?
						<View>
							<Text style={ PostStyles.summary }>
								{ postInfo.summary }
							</Text>
						</View>
						: null
					}

					<View style={ PostStyles.metaInfo }>
						{ this.renderPostRowMetas(postInfo) }
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export default PostRow;
