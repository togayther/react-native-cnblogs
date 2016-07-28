import React, { Component } from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { CommonStyles, StyleConfig } from '../style';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const { height, width } = Dimensions.get('window');

class HintMessage extends Component {
	
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {

		let { message = '这里什么都没有' } = this.props;

		return (
			<View style={ CommonStyles.messageContainer }>

				<Icon
					name = {'ios-thunderstorm-outline'}
					size = {100}
					style = { CommonStyles.messageIcon }/>

		        <Text style={ [CommonStyles.messageText] }>{ message }</Text>
		    </View>
		)
	}
}

export default HintMessage;


