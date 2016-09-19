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
		let navCover = getImageSource();
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
			backgroundImage = { uri: this.state.navCover };
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

	renderLeftContentTitle(){
		const { title } = this.props;
		return (
			<Text style={ [CommonStyles.text_white, CommonStyles.font_md ] }>
				{ title }
			</Text>
		)
	}

	renderLeftContentIcon(){
		const { leftIconName, leftIconOnPress = ()=>null } = this.props;

		if(leftIconName){
			return (
				<TouchableOpacity 
					activeOpacity={ StyleConfig.touchable_press_opacity }
					style = { [ CommonStyles.p_r_2 ] } 
					onPress={ ()=> leftIconOnPress() }>
					{
						leftIconName.indexOf("http") > -1?
						<Image 
							source={ {uri: leftIconName} } 
							style={ [ComponentStyles.avatar_mini ]}/>
						:
						<Icon 
							name={ leftIconName }  
							size= { StyleConfig.icon_size }
							color={ StyleConfig.color_white }  />
					}
				</TouchableOpacity>
			)
		}
	}

	renderLeftContent(){
		const { leftIconName, leftIconOnPress, title } = this.props;
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }>
				{ this.renderLeftContentIcon() }
             	{ this.renderLeftContentTitle() }
			</View>
		)
	}

	renderRightContent(){
		const { rightIconName, rightIconOnPress = (()=>null) } = this.props;
		if ( rightIconName ) {
			return (
				<TouchableOpacity 
					style = { [ CommonStyles.p_l_2 ] } 
					activeOpacity={ StyleConfig.touchable_press_opacity }
					onPress={ ()=> rightIconOnPress() }>
					<Icon 
						name={ rightIconName }  
						size= { StyleConfig.icon_size }
						color={ StyleConfig.color_white }  />
				</TouchableOpacity>
			)
		}
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
