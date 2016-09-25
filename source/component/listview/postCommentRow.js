import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import moment from 'moment';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import HtmlConvertor from '../htmlConvertor';
import Config from '../../config';
import { filterCommentData, getBloggerAvatar, decodeHTML } from '../../common'
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class PostCommentRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getCommentInfo(){
		let { comment } = this.props;
		let commentInfo = {};
		if (comment && comment.Body) {
			commentInfo.Id = comment.Id;
			commentInfo.DateAdded = moment(comment.DateAdded).startOf('minute').fromNow();
			commentInfo.Author = decodeHTML(comment.Author);
			commentInfo.Avatar = getBloggerAvatar(comment.FaceUrl);
			commentInfo.Body = filterCommentData(decodeHTML(comment.Body));
		}
		return commentInfo;
	}

	renderCommentHeader(commentInfo){
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ] }>	
				<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }>	
					<Image 
						style={[ ComponentStyles.avatar_mini, CommonStyles.m_r_2]}
						source={ commentInfo.Avatar }/>
					<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
						{ commentInfo.Author }
					</Text>
				</View>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_ms ] }>
					{ commentInfo.DateAdded }
				</Text>
			</View>
		)
	}

	renderCommentBody(commentInfo){
		return (
			<HtmlConvertor 
				renderCode = { false }
				content={ commentInfo.Body }>
			</HtmlConvertor>
		)
	}

	render() {
		let commentInfo = this.getCommentInfo();
		return (
			<TouchableHighlight
				onPress={ this.props.onPress }
				underlayColor={ StyleConfig.touchable_press_color }
				key={ commentInfo.id }>
				<View style={ [ComponentStyles.list, CommonStyles.p_b_2] }>
					{ this.renderCommentHeader(commentInfo) }
					{ this.renderCommentBody(commentInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default PostCommentRow;
