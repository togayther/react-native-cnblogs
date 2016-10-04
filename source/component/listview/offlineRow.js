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
import { postCategory } from '../../config';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class OfflineRow extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	renderPostAuthor(postInfo){
		if (postInfo.category != postCategory.news) {
			return (
				<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle,  CommonStyles.m_b_2 ] }>
					<Image ref={view => this.imgView=view}
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ postInfo.Avatar }>
					</Image>
					<Text style={ [ CommonStyles.text_danger, CommonStyles.font_xs ] }>
						{ postInfo.Author }
					</Text>
				</View>
			)
		}
	}

	renderPostTitle(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_1 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ postInfo.Title }
				</Text>
			</View>
		)
	}

	renderPostDescr(postInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
					{ postInfo.Description }
				</Text>
			</View>
		)
	}

	renderPostMeta(postInfo){
		let offlineDate = moment(postInfo.offlineDate).startOf('minute').fromNow();
		let postCategoryLabel,
			postCategoryColor;
		if (postInfo.category == postCategory.news) {
			postCategoryLabel = "#新闻";
			postCategoryColor = StyleConfig.color_danger;
		}else{
			postCategoryLabel = "#博文";
			postCategoryColor = StyleConfig.color_primary;
		}
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<Text style={ [CommonStyles.text_gray, CommonStyles.font_ms] }>
					{ offlineDate }
				</Text>
				<View>
					<Text style={ [ { color: postCategoryColor} ] }>
						{ postCategoryLabel }
					</Text>
				</View>
			</View>
		)
	}

	render() {
		const { post, onRowLongPress=()=>null } = this.props;
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(post) }}
				onLongPress={(e)=>{ onRowLongPress(post) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ post.Id }>
				<View style={ ComponentStyles.list }>
					{ this.renderPostAuthor(post) }
					{ this.renderPostTitle(post) }
					{ this.renderPostDescr(post) }
					{ this.renderPostMeta(post) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default OfflineRow;
