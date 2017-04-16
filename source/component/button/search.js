import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { ComponentStyles, StyleConfig } from '../../style';

const buttons = [{
    title:'离线',
    icon: 'ios-download-outline',
    action:'onOfflinePress',
    color: StyleConfig.color_primary
},{
    title:'收藏',
    icon: 'ios-filing-outline',
    action:'onFavoritePress',
    color: StyleConfig.color_primary
}];

class SearchButton extends Component {

	constructor(props) {
	    super(props);
	}

    componentWillUnmount() {
	  this.timer && TimerMixin.clearTimeout(this.timer);
	}

    onButtonPress(item){
        if(this.props[item.action]){
            this.timer = TimerMixin.setTimeout(() => { 
                this.props[item.action](item);
            }, 500);
        }
    }

    renderButtonItem(item, index){
        return (
            <ActionButton.Item 
                size = { StyleConfig.action_size }
                key = { index }
                title={ item.title }
                buttonColor = { item.color } 
                titleBgColor = { item.color }
                textContainerStyle = { ComponentStyles.action_button_container }
                textStyle = { ComponentStyles.action_button_text }
                onPress={() => this.onButtonPress(item) }>
                <Icon name={ item.icon }  style={ ComponentStyles.button_icon } />
            </ActionButton.Item>
        )
    }

    renderButtonIcon(){
        return (
            <Icon name="ios-add" style={ [ComponentStyles.button_icon, ComponentStyles.action_button_icon] }/>
        )
    }   

	render() {
	    return (
            <ActionButton
                offsetY = { StyleConfig.action_offset_y }
                offsetX = { StyleConfig.action_offset_x }
                size = { StyleConfig.action_size }
                bgColor = { StyleConfig.action_background_color }
                btnOutRange = { StyleConfig.action_color_danger_active }
                buttonColor = { StyleConfig.action_color_danger }
                hideShadow = { true }
                icon = {  this.renderButtonIcon() }>
                {
                    buttons && buttons.map((button, index)=>{
                        return this.renderButtonItem(button, index)
                    })
                }
            </ActionButton>
	    )
	}
}

export default SearchButton;