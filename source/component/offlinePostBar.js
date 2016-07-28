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
import { PostBarStyles, StyleConfig } from '../style';
import { postCategory, storageKey } from '../config';

class OfflinePostBar extends Component {

	constructor(props) {
	    super(props);

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onRemovePress(){
		const { post } = this.props;
		if (post && post.id) {
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
				onPress={ ()=> this.props.router.pop() }
				style={ PostBarStyles.barItem }>
    			<Icon 
					name='ios-arrow-round-back' 
					style={ PostBarStyles.barItemIcon }/>
    		</TouchableOpacity>
		);
	}

	renderRemoveItem(){
		return (
			<TouchableOpacity 
				onPress = {()=> this.onRemovePress() }
				style={ PostBarStyles.barItem }>
    			<Icon 
					name='ios-trash-outline' 
					style={ PostBarStyles.barItemIcon }/>
    		</TouchableOpacity>
		);
	}

	render() {
		let { post } = this.props;
	    return (
	    	<View style={ PostBarStyles.container }>
	    		{ this.renderReturnItem() }
	    		{ this.renderRemoveItem() }
	    	</View>
	    )
	}
}

export default OfflinePostBar;


