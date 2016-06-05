import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatButton from './floatButton';
import { FloatButtonStyles } from '../style';

const commentButtonIcon = "ios-chatbubbles";
const commentButtonIconSize = 20;

class CommentButton extends Component {

	constructor(props) {
	    super(props);
	}

	renderButtonContent(){
		return (
			<View>
				<Icon name={ commentButtonIcon }
					size={ commentButtonIconSize }
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

export default CommentButton;
