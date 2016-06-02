import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import FloatButton from './floatButton';
import { FloatButtonStyles } from '../style';

class AuthorButton extends Component {

	constructor(props) {
	    super(props);
	}

	renderButtonContent(){
		return (
			<View>
				<Icon
					name='user'
					size={20}
					style={ FloatButtonStyles.icon }
				/>
			</View>
		)
	}

	render() {

	    return (
	    	<FloatButton onPress = { this.props.onPress }  style={ this.props.style }>
	    		{ this.renderButtonContent() }
	    	</FloatButton>
	    )
	}
}

export default AuthorButton;


