import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class HintMessage extends Component {
	
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {

		let { message = '- 这里什么都没有 -' } = this.props;

		return (
			<View style={ [ComponentStyles.message_container] }>
		        <Text style={ [CommonStyles.text_gray, CommonStyles.font_sm, CommonStyles.text_center ] }>{ message }</Text>
		    </View>
		)
	}
}

export default HintMessage;


