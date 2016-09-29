import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { ComponentStyles, StyleConfig } from '../../style';

class SingleButton extends Component {

	constructor(props) {
	    super(props);
	}

    renderButtonIcon(){
        const { icon = 'ios-arrow-round-back' } = this.props;
        return (
            <Icon 
                name={ icon }
                size = { StyleConfig.icon_size } 
                style={ ComponentStyles.button_icon } />
        )
    }

	render() {
        const { 
            onPress = ()=>null, 
            color = StyleConfig.action_color_primary, 
            position ='left', 
            offsetX = StyleConfig.action_offset_x,
            offsetY = StyleConfig.action_offset_y 
        } = this.props;

	    return (
           <ActionButton
                offsetY = { offsetY }
                offsetX = { offsetX }
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


