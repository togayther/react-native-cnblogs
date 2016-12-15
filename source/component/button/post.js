import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { ComponentStyles, StyleConfig } from '../../style';

const buttons = [{
    title:'评论',
    icon: 'ios-text-outline',
    action:'onCommentPress',
    color: StyleConfig.color_primary
},{
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

class PostButton extends Component {

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
                style = { styles.button_item }
                buttonColor = { item.color } 
                titleBgColor = { item.color }
                titleColor = { StyleConfig.color_white }
                textContainerStyle = {{ borderWidth:0 }}
                onPress={() => this.onButtonPress(item) }>
                <Icon name={ item.icon }  style={ ComponentStyles.button_icon } />
            </ActionButton.Item>
        )
    }

    renderButtonIcon(){
        return (
            <Icon name="ios-add" style={ [ComponentStyles.button_icon, styles.button_icon] }/>
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

const styles = StyleSheet.create({
  button_item:{
      elevation: 0
  },
  button_icon:{
      fontSize: StyleConfig.icon_size + 6
  }
});

export default PostButton;