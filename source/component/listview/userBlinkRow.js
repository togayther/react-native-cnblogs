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

class UserBlinkRow extends Component {

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getBlinkInfo(){
		let { blink } = this.props;
		let blinkInfo = {};
		if (blink && blink.Id) {
			blinkInfo.Id  = blink.Id;
			blinkInfo.Content = decodeHTML(blink.Content);
			blinkInfo.CommentCount = blink.CommentCount;
			blinkInfo.Author= blink.UserDisplayName;
			blinkInfo.Avatar = blink.UserIconUrl;
			blinkInfo.DateAdded = moment(blink.DateAdded).startOf('minute').fromNow();
		}
		return blinkInfo;
	}

	renderBlinkContent(blinkInfo){
		return (
			<View style={ [ CommonStyles.m_b_2 ] }>
				<Text style={ [CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_md ] }>
					{ blinkInfo.Content }
				</Text>
			</View>
		);
	}

	renderBlinkMeta(blinkInfo){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsBetween ] }>
				<Text style={ CommonStyles.text_gray }>
					{ blinkInfo.DateAdded }
				</Text>
				
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Icon 
						name={ "ios-chatbubbles-outline" }  
						size= { StyleConfig.icon_size - 4 }
						color={ StyleConfig.color_primary }  />
					<Text style={ [ CommonStyles.text_primary, CommonStyles.m_l_1 ] }>
						{ blinkInfo.CommentCount }
					</Text>
				</View>
			</View>
		);
	}

	render() {
		let blinkInfo = this.getBlinkInfo();
		return (
			<TouchableHighlight
				onPress={(e)=>{ this.props.onRowPress(blinkInfo) }}
				underlayColor={ StyleConfig.touchable_press_color }
				key={ blinkInfo.Id }>

				<View style={ ComponentStyles.list }>
					{ this.renderBlinkContent(blinkInfo) }
					{ this.renderBlinkMeta(blinkInfo) }
				</View>
			</TouchableHighlight>
		)
	}
}

export default UserBlinkRow;
