import React, { Component } from 'react';
import {
	View,
	Image,
    StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleConfig } from '../../style';

const buttons = [{
    title:'闪存',
    icon: 'md-color-palette',
    action:'toBlinkAdd',
    color: StyleConfig.color_success
},{
    title:'博问',
    icon: 'md-list-box',
    action:'toQuestionAdd',
    color: StyleConfig.color_warning
}];

class HomeButton extends Component {

	constructor(props) {
	    super(props);
        this.state = {
            activeButton: null
        };
	}

    componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

    onButtonPress(item){
        let { router } = this.props;
        this.timer = TimerMixin.setTimeout(() => { 
			router && router[item.action] && router[item.action](item);
	    }, 500);
    }

    renderButtonItem(item, index){
        return (
            <ActionButton.Item 
                size = { 50 }
                key = { index }
                title={ item.title }
                titleBgColor = { '#666' }
                onPress={() => this.onButtonPress(item) }
                buttonColor = { item.color } 
                style = { styles.button_item }
                titleColor = { StyleConfig.color_white }>
                <Icon name={ item.icon }  style={ styles.button_icon } />
            </ActionButton.Item>
        )
    }

	render() {
	    return (
            <ActionButton
                offsetY = { 10 }
                offsetX = { 15 }
                icon = { <Icon name="md-create" style={ styles.button_icon } /> }
                outRangeScale = { 0.9 }
                buttonColor = { 'rgba(199, 85, 74, 0.9)' }>
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
  button_icon: {
    fontSize: 20,
    height: 22,
    color: '#fff',
  },
});

export default HomeButton;


