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
import Icon from 'react-native-vector-icons/Ionicons';
import { decodeHTML }  from '../../common';
import { postCategory } from '../../config';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class UserFavoriteRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	formatFavoriteMeta(favoriteInfo){
		let favoriteMeta = {};
		if(favoriteInfo.Title){
			let favoriteTitle = favoriteInfo.Title;

			if(favoriteTitle.indexOf("_IT新闻_博客园") > 0){
				favoriteMeta.type = postCategory.news;
			}else{
				favoriteMeta.type = postCategory.home;
			}

			favoriteTitle = _.replace(favoriteTitle, '_IT新闻_博客园', ' - IT新闻 - 博客园');
			favoriteTitle = _.replace(favoriteTitle, ' - 博客园', '');
			let sourceIndex = favoriteTitle.lastIndexOf(' - ');
			if(sourceIndex > 0){
				favoriteMeta.source = favoriteTitle.substring(sourceIndex + 3);
				favoriteMeta.title = favoriteTitle.substring(0, sourceIndex);
			}else{
				favoriteMeta.source = "未知";
				favoriteMeta.title = favoriteTitle;
			}
		}

		if(favoriteInfo.Tags){
			let tags =  _.remove(favoriteInfo.Tags, function(n) {
				return n !== 'untaged';
			});

			favoriteMeta.tags = tags.join(",");
		}	

		if(favoriteInfo.LinkUrl){
			if((favoriteInfo.LinkUrl.match(/\/p\/[1-9][0-9]*.html/g)) || (favoriteInfo.LinkUrl.match(/\/n\/[1-9][0-9]*\//g))){
				let tempId = favoriteInfo.LinkUrl.match(/[1-9][0-9]*/g)
				favoriteMeta.id = (tempId && tempId.length) ? tempId[0] : null;
			}
		}

		return favoriteMeta;
	}



	getFavoriteInfo(){
		let { favorite } = this.props;
		let favoriteInfo = {};
		if (favorite && favorite.WzLinkId) {
			let favoriteMeta = this.formatFavoriteMeta(favorite);
			favoriteInfo.Title = decodeHTML(favoriteMeta.title);
			favoriteInfo.Source = decodeHTML(favoriteMeta.source);
			favoriteInfo.Type = favoriteMeta.type;
			favoriteInfo.Tags = favoriteMeta.tags;
			favoriteInfo.Id = favoriteMeta.id; 

			favoriteInfo.LinkUrl = favorite.LinkUrl;
			favoriteInfo.Summary = decodeHTML(favorite.Summary);
			favoriteInfo.FromCNBlogs = favorite.FromCNBlogs;
			favoriteInfo.WzLinkId = favorite.WzLinkId;
            favoriteInfo.DateAdded = moment(favorite.DateAdded).startOf('minute').fromNow();
		}
		return favoriteInfo;
	}

	renderFavoriteHeader(favoriteInfo){
		let sourceStyle;
		if(favoriteInfo.Type === postCategory.home){
			sourceStyle = CommonStyles.text_danger;
		}else{
			sourceStyle = CommonStyles.text_primary;
		}
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ]}>
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
					<Text style={ [sourceStyle, CommonStyles.font_xs ] }>
						{ favoriteInfo.Source }
					</Text>
				</View>
			</View>
		)
	}

	renderFavoriteContent(favoriteInfo){
		return (
			<View>
				<View>
					<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md, CommonStyles.m_b_2 ] }>
						{ favoriteInfo.Title }
					</Text>
				</View>
				{
					favoriteInfo.Summary?
					<View style={ [ CommonStyles.m_b_2 ] }>
						<Text style={ [CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm ] }>
							{ favoriteInfo.Summary }
						</Text>
					</View>
					:null
				}
			</View>
		)
	}

	renderFavoriteMeta(favoriteInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween ] }>
				<Text style={ CommonStyles.text_gray, CommonStyles.font_xs }>
					{ favoriteInfo.DateAdded }
				</Text>
				{
					favoriteInfo.Tags?
					<Text style={ CommonStyles.text_primary, CommonStyles.font_xs }>
						#{ favoriteInfo.Tags }
					</Text>
					: null
				}
			</View>
		);
	}

	render() {
		let favoriteInfo = this.getFavoriteInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(favoriteInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ favoriteInfo.Id }>

				<View style={ ComponentStyles.list }>
					{ this.renderFavoriteHeader(favoriteInfo) }
					{ this.renderFavoriteContent(favoriteInfo) }
					{ this.renderFavoriteMeta(favoriteInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserFavoriteRow;
