import React, { Component } from 'react';
import {
	TouchableOpacity
} from 'react-native';

import { CommonStyles, StyleConfig } from '../style';
import Icon from 'react-native-vector-icons/Entypo';

const backButtonIcon = 'reply';
const backButtonSize = 20;

class BackButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { router } = this.props;

		return (
			<TouchableOpacity onPress={ ()=>{ router.pop() } }>
		      <Icon
		        name={ backButtonIcon }
		        size={ backButtonSize }
		        style={ CommonStyles.navbarMenu }
		      />
		    </TouchableOpacity>
		)
	}
}

export default BackButton;


