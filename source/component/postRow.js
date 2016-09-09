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
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

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
	
	render() {
		let postInfo = this.getPostInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(postInfo) }}
				underlayColor={ StyleConfig.color_light }
				key={ postInfo.Id }>

				<View style={ ComponentStyles.list }>
					<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle,  CommonStyles.m_b_2 ] }>
						<Image ref={view => this.imgView=view}
							style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
							source={ {uri:postInfo.Avatar} }>
						</Image>
						<Text style={ [ CommonStyles.text_gray, CommonStyles.fontSize_xs ] }>
							{ postInfo.Author }
						</Text>
					</View>

					<View style={ [ CommonStyles.m_b_1 ] }>
						<Text style={ [CommonStyles.text_dark, CommonStyles.fontSize_md ] }>
							{ postInfo.Title }
						</Text>
					</View>

					{
						postInfo.Description?
						<View style={ [ CommonStyles.m_b_2 ] }>
							<Text style={ [ CommonStyles.text_gray, CommonStyles.fontSize_xs, CommonStyles.text_param ] }>
								{ postInfo.Description }
							</Text>
						</View>
						: null
					}

					<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
						<Text style={ ComponentStyles.metaText }>
							{ postInfo.PostDate }
						</Text>
						
						<View>
							<Text style={ [ CommonStyles.text_primary ] }>
								{ postInfo.CommentCount + ' / ' + postInfo.ViewCount }
							</Text>
						</View>
					</View>

				</View>
			</TouchableHighlight>
		)
	}
}

export default PostRow;
