import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { FloatButtonStyles } from '../style';

const activeOpacity = 0.6;

class FloatButton extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {

	    return (
	    	<TouchableOpacity 
	    		activeOpacity = { activeOpacity }
	    		onPress={ this.props.onPress } style={[ FloatButtonStyles.container, FloatButtonStyles.positionRight, this.props.style ]}>
		    	{ this.props.children }
	    	</TouchableOpacity>
	    )
	}
}

export default FloatButton;


