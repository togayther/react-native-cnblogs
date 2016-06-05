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

const scrollButtonIcon = "ios-arrow-round-up";
const scrollButtonIconSize = 32;

class ScrollButton extends Component {

	constructor(props) {
	    super(props);
	}

	renderButtonContent(){
		return (
			<View>
				<Icon name= { scrollButtonIcon }
					size={ scrollButtonIconSize }
					style={ FloatButtonStyles.icon }
				/>
			</View>
		)
	}

	render() {

	    return (
	    	<FloatButton onPress = { this.props.onPress } style={ this.props.style }>
	    		{ this.renderButtonContent() }
	    	</FloatButton>
	    )
	}
}

export default ScrollButton;


