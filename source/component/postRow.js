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
import { decodeHTML, getBloggerAvatar }  from '../common';
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
		if (post && post.Id) {
			postInfo.Id = post.Id;
			postInfo.Title = decodeHTML(post.Title);
			if (post.Description) {
				postInfo.Description = _.truncate(decodeHTML(post.Description), { length : 60 });
			}
			postInfo.PostDate = moment(post.PostDate).startOf('minute').fromNow();
			postInfo.Author = decodeHTML(post.Author);
			if (post.Avatar) {
				postInfo.Avatar = getBloggerAvatar(post.Avatar);
			}else{
				postInfo.Avatar = Config.appInfo.avatar;
			}
			postInfo.CommentCount = post.CommentCount;
			postInfo.ViewCount = post.ViewCount;
			postInfo.Url = post.Url;
		}
		return postInfo;
	}
	
	renderPostRowMetas(postInfo){
		
		let metasContent = [];
		metasContent.push(
			<Text key='meta-date' style={ PostStyles.metaText }>
				{ postInfo.PostDate }
			</Text>
		);
		metasContent.push(
			<View key='meta-count' style={ PostStyles.metaRight } >
				<Text style={ [PostStyles.metaText, { color: StyleConfig.mainColor }] }>
					{ postInfo.CommentCount + ' / ' + postInfo.ViewCount }
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
				key={ postInfo.Id }>

				<View style={ CommonStyles.rowContainer }>
					<View style={ PostStyles.authorInfo }>
						<Image ref={view => this.imgView=view}
							style={ PostStyles.authorAvatar }
							source={ {uri:postInfo.Avatar} }>
						</Image>
						<Text style={ PostStyles.authorName }>
							{ postInfo.Author }
						</Text>
					</View>

					<View>
						<Text style={ PostStyles.title }>
							{ postInfo.Title }
						</Text>
					</View>

					{
						postInfo.Description?
						<View>
							<Text style={ PostStyles.summary }>
								{ postInfo.Description }
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
