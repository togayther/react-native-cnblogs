import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { FloatButtonStyles } from '../style';

const floatButtonSize = 44;

class FloatButton extends Component {

	constructor(props) {
	    super(props);
	}

	render() {

	    return (
	    	<View style={[ FloatButtonStyles.container, FloatButtonStyles.positionRight, this.props.style ]}>
	    		<TouchableOpacity onPress={ this.props.onPress }>
					{ this.props.children }
				</TouchableOpacity>
	    	</View>
	    )
	}
}

export default FloatButton;


