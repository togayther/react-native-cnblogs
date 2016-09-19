import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Config, { postCategory } from '../config';
import drawerItems from '../config/drawer';
import { getImageSource } from '../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';

const backgroundImageSource = getImageSource(2);

class DrawerPanel extends Component {

	constructor (props) {
	    super(props);
	    this.state = {
	    	flag: postCategory.home
	    };
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onItemPress(item){
		let { onDrawerHide, onDrawerPress } = this.props;
		if (item.action === "refresh") {
			this.setState({
				flag: item.flag
			});
		}
		
		onDrawerHide && onDrawerHide(item);

		this.timer = TimerMixin.setTimeout(() => { 
			onDrawerPress && onDrawerPress(item);
	    }, 300);
	}

	onUserPress(){
		let pressItem = {
			action: "toUser",
			flag:"user"
		};
		this.onItemPress(pressItem);
	}

	componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

	renderHeaderBackground(){
		return (
			<View>
				<Image 
					style={[ComponentStyles.header_img]}
					resizeMode="stretch"
					source={ {uri:backgroundImageSource} }>
				</Image>
				<View style={ ComponentStyles.header_backdrop }/>
			</View>
		)
	}

	renderHeaderForeground(){
		return (
			<View style={ [ ComponentStyles.pos_absolute, styles.header_content ] }>
				<Image
					style={ [ComponentStyles.avatar, CommonStyles.m_b_3] } 
					source={{uri:"http://123.56.135.166/cnblog/public/img/common/author.jpg"}}/>
				<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsMiddle] }>
					<Text style={ [CommonStyles.text_white, CommonStyles.font_md ] }>
						愤怒的晃晃
					</Text>
					<TouchableOpacity 
						activeOpacity={ StyleConfig.touchable_press_opacity }
						onPress={ ()=> this.onUserPress() }>
						<Icon 
							name={ "ios-log-in-outline" }  
							size= { StyleConfig.icon_size }
							color={ StyleConfig.color_white } />
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	renderHeader(){
		let { router } = this.props;
		return (
			<View style={ styles.header_container }>
				{ this.renderHeaderBackground() }
				{ this.renderHeaderForeground() }
			</View>
		)
	}

	renderActiveItem(item, index){
		let onDrawerHide = this.props.onDrawerHide || (()=>null);
		return (
			<TouchableHighlight 
				underlayColor ={ StyleConfig.touchable_press_color }
				key={ index } 
				style={[ CommonStyles.p_a_3 ]}
				onPress={ ()=> onDrawerHide(item) }>
				<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween ] }>
					<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }>
						<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.m_r_3, styles.list_icon] }>
							<Icon 
								name={ item.icon } size={ StyleConfig.icon_size }
								style={ [ CommonStyles.text_danger ] } />
						</View>
						<Text style={ [ CommonStyles.font_sm, CommonStyles.text_danger ] }>
							{ item.text }
						</Text>
					</View>
					<View>
						<Icon name={ "ios-return-right-outline" }
							size={ StyleConfig.icon_size }
							style={[ CommonStyles.text_danger ]} />
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	renderNormalItem(item, index){
		return (
			<TouchableHighlight 
				underlayColor ={ StyleConfig.touchable_press_color }
				key={ index } 
				style={[ CommonStyles.p_a_3 ]}
				onPress={ ()=> this.onItemPress(item) }>
	            <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween ] }>
					<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsMiddle] }>
						<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.m_r_3, styles.list_icon] }>
							<Icon name={ item.icon } 
								size={ StyleConfig.icon_size } 
								style={[ CommonStyles.text_dark ]}/>
						</View>
						<Text style={ [ CommonStyles.font_sm, CommonStyles.text_dark ] }>
							{ item.text }
						</Text>
	                </View>
	            </View>
	        </TouchableHighlight>
		)
	}

	renderItem(item, index){
		let onItemPress;
		if (item.flag === this.state.flag) {
			return this.renderActiveItem(item, index);
		}
		return this.renderNormalItem(item, index);
	}

	renderContent(){
		if(drawerItems && drawerItems.length){
			return (
				<View style={ [ CommonStyles.p_y_1 ] }>
					{
						drawerItems.map((nav, index)=>{
							return this.renderItem(nav, index);
						})
					}
				</View>
			)
		}
	}

	render() {
		return (
			<View style={ [styles.container] }>
				{ this.renderHeader() }
				{ this.renderContent() }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		height: StyleConfig.screen_height,
	},
	header_container: {
		height: StyleConfig.header_height
	},
	header_content: {
		left: StyleConfig.space_3,
		right: StyleConfig.space_3,
		bottom: StyleConfig.space_3,
	},
	list_icon:{
		width: StyleConfig.icon_size
	}
});

export default DrawerPanel;


