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
	
	renderBackground(){
		let { backgroundImage } = this.props;
		if (!backgroundImage) {
			backgroundImage = { uri: this.state.navCover };
		}
		return (
			<Image 
				style={ [ComponentStyles.pos_absolute, styles.backgroundImage] }
         		source={ backgroundImage }/>
		)
	}

	renderTitle(){
		const { title } = this.props;
		return (
			<Text style={ [CommonStyles.text_white, CommonStyles.font_md ] }>
				{ title }
			</Text>
		)
	}

	renderLeftContentIcon(){
		const { leftIconName, leftIconOnPress } = this.props;
		if(leftIconName){
			return (
				<TouchableOpacity 
					style = { [ CommonStyles.p_r_2 ] } 
					onPress={ ()=> leftIconOnPress() }>
					{
						leftIconName.indexOf("http:") > -1?
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

	renderRightContent(){
		const { rightIconName, rightIconOnPress = (()=>null) } = this.props;
		if ( rightIconName ) {
			return (
				<TouchableOpacity 
					style = { [ CommonStyles.p_l_2 ] } 
					activeOpacity={ 0.2 }
					onPress={ ()=> rightIconOnPress() }>
					<Icon 
						name={ rightIconName }  
						size= { StyleConfig.icon_size }
						color={ StyleConfig.color_white }  />
				</TouchableOpacity>
			)
		}
	}

	renderLeftContent(){
		const { leftIconName, leftIconOnPress, title } = this.props;
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }>
				{ this.renderLeftContentIcon() }
             	{ this.renderTitle() }
			</View>
		)
	}

	render() {
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsBottom, styles.container] }>
				{ this.renderBackground() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
		padding: StyleConfig.space_2 + 2
	},
	backgroundImage:{
	    opacity: 0.2,
	    top:0,
	    height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
	}
});

export default Navbar;
