import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

import { CommonStyles } from '../style';

class HintMessage extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {

		let { message = '未查询到相关信息' } = this.props;

		return (
			<View style={ CommonStyles.messageContainer }>
		        <Text style={ CommonStyles.hint }>{ message }</Text>
		    </View>
		)
	}
}

export default HintMessage;


