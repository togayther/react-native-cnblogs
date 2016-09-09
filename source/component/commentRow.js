import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import HtmlConvertor from './htmlConvertor';
import CodeAvatar from '../component/codeAvatar';
import Config from '../config';
import { filterCommentData, decodeHTML } from '../common'
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

class CommentRow extends Component {

	constructor(props) {
		super(props);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getCommentInfo(){
		let { comment } = this.props;
		let commentInfo = {};
		if (comment && comment.content) {
			commentInfo.id = comment.id;
			commentInfo.publishDate = moment(comment.published).startOf('minute').fromNow();
			commentInfo.authorName = decodeHTML(comment.author.name);
			commentInfo.authorAvatar = Config.appInfo.avatar;
			commentInfo.commentText = decodeHTML(comment.content);
			commentInfo.commentText = filterCommentData(commentInfo.commentText);
		}
		return commentInfo;
	}

	render() {

		let commentInfo = this.getCommentInfo();

		return (
			<TouchableHighlight
				onPress={ this.props.onPress }
				underlayColor={ StyleConfig.touchablePressColor }
				key={ commentInfo.id }>
				<View style={ CommonStyles.rowContainer }>
					<View style={ ComponentStyles.metaInfo }>
						
						<Image 
							style={ ComponentStyles.metaAvatar }
							source={ {uri: commentInfo.authorAvatar} }/>

						<View style={ ComponentStyles.metaAuthor }>
							<Text style={ ComponentStyles.authorName }>
								{ commentInfo.authorName }
							</Text>
							<Text style={ ComponentStyles.published }>
								{ commentInfo.publishDate }
							</Text>
						</View>
					</View>

					<View>
						<HtmlConvertor 
							renderCode = { false }
							content={ commentInfo.commentText }>
						</HtmlConvertor>
					</View>

				</View>
			</TouchableHighlight>
		)
	}
}

export default CommentRow;
