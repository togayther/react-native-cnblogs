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
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class UserFavoriteRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getFavoriteInfo(){
		let { favorite } = this.props;
		let favoriteInfo = {};
		if (favorite && favorite.Id) {
			favoriteInfo.Title = favorite.Title;
            favoriteInfo.DateAdded = moment(favorite.DateAdded).startOf('minute').fromNow();
		}
		return favoriteInfo;
	}

	renderFavoriteContent(favoriteInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ favoriteInfo.Title }
				</Text>
			</View>
		);
	}

	renderFavoriteMeta(favoriteInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<Text style={ CommonStyles.text_gray }>
					{ favoriteInfo.DateAdded }
				</Text>
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
					favorite row
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserFavoriteRow;
