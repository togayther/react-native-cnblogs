import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getImageSource } from '../common';
import { NavbarStyles } from '../style';

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
	
	renderIconItem(iconName, onPress){
		return (
			<TouchableOpacity 
				style = { NavbarStyles.iconContainer }
				activeOpacity={0.2}
				onPress={ ()=> onPress() }>
		        <Icon 
		        	name={ iconName }  
		        	size= { 22 }
		        	color={ "#fff" } 
		        	style = { NavbarStyles.icon } />
		    </TouchableOpacity>
		)
	}

	renderBackground(){
		let { backgroundImage } = this.props;
		if (!backgroundImage) {
			backgroundImage = { uri: this.state.navCover };
		}
		return (
			<Image 
         		style={ NavbarStyles.backgroundImage } 
         		source={ backgroundImage }/>
		)
	}

	renderRightContent(){
		const { rightIconName, rightIconOnPress = (()=>null) } = this.props;
		if (rightIconName) {
			return (
				<View style={ NavbarStyles.rightContent }>
					{ this.renderIconItem(rightIconName, rightIconOnPress) }
				</View>
			)
		}
	}

	renderLeftContent(){
		const { leftIconName, leftIconOnPress, title } = this.props;
		return (
			<View style={ NavbarStyles.leftContent }>

				{
					leftIconName?
					leftIconName.indexOf("http:") > -1?
					<TouchableOpacity 
						style = { NavbarStyles.iconContainer } 
						onPress={ ()=>this.leftIconOnPress() }>
				        <Image 
				        	source={ {uri: leftIconName} } 
				        	style={ [NavbarStyles.icon, NavbarStyles.iconImage ]}/>
				    </TouchableOpacity>
				    :
				    this.renderIconItem(leftIconName, leftIconOnPress)
				    : 
				    null
				}

             	<Text style={ NavbarStyles.title }>
             		{ title }
             	</Text>
			</View>
		)
	}

	render() {
		return (
			<View style={ NavbarStyles.container }>
				{ this.renderBackground() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
		);
	}
}

export default Navbar;
