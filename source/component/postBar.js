import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { PostBarStyles } from '../style';

class PostBar extends Component {

	constructor(props) {
	    super(props);
	}

	renderLeftButton(){
		let { post } = this.props;

		let { barIcon, barText, onPress = ()=>null } = {};
		if (post.comments && post.comments>0) {
			barIcon = "typing";
			barText = post.comments;
			onPress = ()=>null;
		}else{
			barIcon = "eye";
			barText = post.views;
		}
		return (
			<TouchableOpacity 
				onPress = { onPress }
				style={ PostBarStyles.leftButton }>
    			<Icon 
					name={ barIcon } 
					size={20} style={ PostBarStyles.icon } />
    			<Text style={ PostBarStyles.text }>
    				{ barText }
    			</Text>
    		</TouchableOpacity>
		)
	}

	renderRightButton(){
		return (
			<TouchableOpacity style={ PostBarStyles.rightButton }>
    			<Icon 
					name='arrow-long-up' 
					size={20}  style={ PostBarStyles.icon }/>
    		</TouchableOpacity>
		);
	}

	render() {
		let { post } = this.props;
	    return (
	    	post?
	    	<View style={ PostBarStyles.container }>
	    		{ this.renderLeftButton() }
	    		{ this.renderRightButton() }
	    	</View>
	    	: null
	    )
	}
}

export default PostBar;


