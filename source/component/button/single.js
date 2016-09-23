import React, { Component } from 'react';
import {
	View,
	Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { ComponentStyles, StyleConfig } from '../../style';

class SingleButton extends Component {

	constructor(props) {
	    super(props);
	}

    renderButtonIcon(){
        let { icon = 'ios-menu' } = this.props;
        return (
            <Icon 
                name={ icon }
                size = { StyleConfig.icon_size } 
                style={ ComponentStyles.button_icon } />
        )
    }

	render() {
        let { onPress = ()=>null, color = StyleConfig.action_color_primary, position ='left' } = this.props;
	    return (
           <ActionButton
                offsetY = { StyleConfig.action_offset_y }
                offsetX = { StyleConfig.action_offset_x }
                size = { StyleConfig.action_size }
                position={ position }
                buttonColor = { color }
                onPress = { ()=>onPress() }
                icon = { this.renderButtonIcon() }>
            </ActionButton>
	    )
	}
}


export default SingleButton;


