import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { CommonStyles, StyleConfig } from '../style';

const { height, width } = Dimensions.get('window');

class HintMessage extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		let { message = '未查询到相关信息' } = this.props;

		return (
			<View style={ CommonStyles.messageContainer }>
		        <Text style={ [CommonStyles.hint] }>{ message }</Text>
		    </View>
		)
	}
}

export default HintMessage;


