import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getImageSource } from '../common';
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navCover: null
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount(){
		const navCover = getImageSource();
		this.setState({
			navCover: navCover
		});
	}

	componentWillUnmount(){
		this.setState({
			navCover: null
		});
	}
	
	renderCover(){
		let { backgroundImage } = this.props;
		if (!backgroundImage) {
			backgroundImage = this.state.navCover;
		}
		return (
			<Image 	
				style={ [ComponentStyles.pos_absolute, styles.cover] }
				source={ backgroundImage }/>
		)
	}

	renderBackdrop(){
		return (
			<View style={ [ ComponentStyles.pos_absolute, styles.backdrop] }>
			</View>
		)
	}

	renderLeftContentText(){
		const { title } = this.props;
		if(title){
			return (
				<Text style={ [CommonStyles.text_white, CommonStyles.font_md, CommonStyles.background_transparent ] }>
					{ title }
				</Text>
			)
		}
	}

	renderLeftContentIcon(){
		const { leftIconName = 'ios-arrow-round-back' } = this.props;
		if(leftIconName){
			if(typeof(leftIconName) === 'string'){
				return (
					<Icon 
						name={ leftIconName }  
						size= { StyleConfig.icon_size }
						style = { [CommonStyles.m_r_2, CommonStyles.background_transparent] }
						color={ StyleConfig.color_white }  />
				)
			}
			return (
				<Image 
					source={ leftIconName } 
					style={ [ComponentStyles.avatar_mini, CommonStyles.m_r_2 ]}/>
			)
		}
	}

	renderLeftContent(){
		const { leftIconName, leftIconOnPress, title } = this.props;
		return (
			<TouchableOpacity 
				style = { [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] } 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=> leftIconOnPress() }>
				{ this.renderLeftContentIcon() }
             	{ this.renderLeftContentText() }
			</TouchableOpacity>
		)
	}

	renderRightContentIcon(){
		const { rightIconName } = this.props;
		if(rightIconName){
			return (
				<Icon 
					name={ rightIconName }  
					size= { StyleConfig.icon_size }
					style = { [CommonStyles.background_transparent] }
					color={ StyleConfig.color_white }  />
			)
		}
	}

	renderRightContentText(){
		const { rightText = '' } = this.props;
		if(rightText){
			return (
				<Text style={[ CommonStyles.text_white, CommonStyles.font_xs, CommonStyles.m_l_1 ]}>
					{ rightText }
				</Text>
			)
		}
	}

	renderRightContent(){
		const { rightIconOnPress = (()=>null) } = this.props;
		return (
			<TouchableOpacity 
				style = { [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.p_l_2 ] } 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=> rightIconOnPress() }>
				{ this.renderRightContentIcon() }
				{ this.renderRightContentText() }
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsBottom, CommonStyles.pos_absolute, styles.container] }>
				{ this.renderCover() }
				{ this.renderBackdrop() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		top:0,
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
		paddingVertical: StyleConfig.space_2 + 2,
		paddingHorizontal: StyleConfig.space_3
	},
	cover:{
		top: 0,
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
	},
	backdrop:{
		top:0,
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
		backgroundColor:StyleConfig.color_black
	}
});

export default Navbar;
