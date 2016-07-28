import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import { getRandomColor } from '../common';
import { CommonStyles, StyleConfig } from '../style';

const seedTexts =  ['C', 'N', 'B', 'L', 'O', 'G', 'S'];

class CodeAvatar extends Component {

	constructor(props) {
	    super(props);
	}

	getAvatarText(){
		let { text } = this.props;
		if(!text){
			let randNum = _.random(0, seedTexts.length-1);
			text = seedTexts[randNum];
		}
		return text;
	}

	render() {

		let avatarText = this.getAvatarText();
		let avatarColor = getRandomColor();

	    return (
	    	<View style={[CommonStyles.codeAvatar, {backgroundColor: avatarColor}]}>
				<Text style={CommonStyles.codeAvatarText}>
					{ avatarText }
				</Text>
			</View>
	    )
	}
}

export default CodeAvatar;


