import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	Alert,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatButton from './floatButton';
import { ComponentStyles } from '../style';

const scrollButtonIcon = "ios-person";
const scrollButtonIconSize = 30;

class UserButton extends Component {

	constructor(props) {
	    super(props);
	}

	renderButtonContent(){
		return (
			<View>
				<Icon name= { scrollButtonIcon }
					size={ scrollButtonIconSize }
					style={ ComponentStyles.icon }
				/>
			</View>
		)
	}

	onPress (){
		Alert.alert(
			'温馨提示',
        	'官方未开放登录相关接口，所以这个牛叉的功能目前是没有的。',
        	[
              { text: '知道了', onPress: () => null }
            ]
      	);
	}

	render() {

	    return (
	    	<FloatButton onPress = { ()=> this.onPress() } style={ this.props.style }>
	    		{ this.renderButtonContent() }
	    	</FloatButton>
	    )
	}
}

export default UserButton;


