import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	Alert,
	ToastAndroid,
	TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ComponentStyles, StyleConfig } from '../../style';
import { postCategory, storageKey } from '../../config';

class OfflinePostBar extends Component {

	constructor(props) {
	    super(props);

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onRemovePress(){
		const { post } = this.props;
		if (post && post.Id) {
	      Alert.alert(
	        '系统提示',
	        '确定要清除该离线博文记录吗？',
	        [
	          {text: '取消', onPress: () => null },
	          {text: '确定', onPress: () => this.handleRemove() },
	        ]
	      )
	    }
	}

	handleRemove(){
		const { onRemovePress, post } = this.props;
		if (onRemovePress) {
			onRemovePress(post);
		}
	}

	renderReturnItem(){
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=> this.props.router.pop() }
				style={ [ ComponentStyles.bar_item ] }>
    			<Icon 
					name='ios-arrow-round-back' 
					size={ StyleConfig.icon_size }/>
    		</TouchableOpacity>
		);
	}

	renderRemoveItem(){
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress = {()=> this.onRemovePress() }
				style={ [ ComponentStyles.bar_item ] }>
    			<Icon 
					name='ios-trash-outline' 
					size={ StyleConfig.icon_size }/>
    		</TouchableOpacity>
		);
	}

	render() {
		let { post } = this.props;
	    return (
	    	<View style={ [ ComponentStyles.bar_container ] }>
	    		{ this.renderReturnItem() }
	    		{ this.renderRemoveItem() }
	    	</View>
	    )
	}
}

export default OfflinePostBar;


