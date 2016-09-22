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

const buttonSize = 50;

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
        let { onPress = ()=>null, color = 'rgba(60, 177, 158, 0.5)', position ='left' } = this.props;
	    return (
           <ActionButton
                offsetY = { 0 }
                offsetX = { 20 }
                size = { buttonSize }
                position={ position }
                buttonColor = { color }
                onPress = { ()=>onPress() }
                icon = { this.renderButtonIcon() }>
            </ActionButton>
	    )
	}
}


export default SingleButton;


