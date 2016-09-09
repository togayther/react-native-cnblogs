import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	Alert,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatButton from './floatButton';
import { ComponentStyles } from '../style';

const scrollButtonIcon = "ios-person";
const scrollButtonIconSize = 26;

class MenuButton extends Component {

	constructor(props) {
	    super(props);
	}

	renderButtonContent(){
		return (
			<View>
				<Icon name= { scrollButtonIcon }
					size={ scrollButtonIconSize }
					style={ ComponentStyles.icon }
				/>
			</View>
		)
	}

	render() {

	    return (
	    	<FloatButton onPress = { ()=> this.props.onPress() } style={ this.props.style }>
	    		{ this.renderButtonContent() }
	    	</FloatButton>
	    )
	}
}

export default MenuButton;


