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
import { ComponentStyles } from '../style';

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
				style = { ComponentStyles.iconContainer }
				activeOpacity={0.2}
				onPress={ ()=> onPress() }>
		        <Icon 
		        	name={ iconName }  
		        	size= { 22 }
		        	color={ "#fff" } 
		        	style = { ComponentStyles.icon } />
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
         		style={ ComponentStyles.backgroundImage } 
         		source={ backgroundImage }/>
		)
	}

	renderRightContent(){
		const { rightIconName, rightIconOnPress = (()=>null) } = this.props;
		if (rightIconName) {
			return (
				<View style={ ComponentStyles.rightContent }>
					{ this.renderIconItem(rightIconName, rightIconOnPress) }
				</View>
			)
		}
	}

	renderLeftContent(){
		const { leftIconName, leftIconOnPress, title } = this.props;
		return (
			<View style={ ComponentStyles.leftContent }>

				{
					leftIconName?
					leftIconName.indexOf("http:") > -1?
					<TouchableOpacity 
						style = { ComponentStyles.iconContainer } 
						onPress={ ()=>this.leftIconOnPress() }>
				        <Image 
				        	source={ {uri: leftIconName} } 
				        	style={ [ComponentStyles.icon, ComponentStyles.iconImage ]}/>
				    </TouchableOpacity>
				    :
				    this.renderIconItem(leftIconName, leftIconOnPress)
				    : 
				    null
				}

             	<Text style={ ComponentStyles.title }>
             		{ title }
             	</Text>
			</View>
		)
	}

	render() {
		return (
			<View style={ ComponentStyles.container }>
				{ this.renderBackground() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
		);
	}
}

export default Navbar;
