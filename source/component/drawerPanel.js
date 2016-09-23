import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Config, { postCategory } from '../config';
import drawerItems from '../config/drawer';
import { getImageSource } from '../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../style';

const backgroundImageSource = getImageSource(0);

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
					source={ backgroundImageSource }>
				</Image>
				<View style={ ComponentStyles.header_backdrop }/>
			</View>
		)
	}

	renderHeaderUserAvatar(){
		const { user } = this.props;
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=> this.onUserPress() }>
				<Image
					style={ [ComponentStyles.avatar, CommonStyles.m_b_3] } 
					source={{uri: user.Avatar }}/>
			</TouchableOpacity>
		)
	}

	renderHeaderUserMeta(){
		const { user } = this.props;
		return (
			<View style={ [CommonStyles.flexRow, CommonStyles.flexItemsBetween, CommonStyles.flexItemsMiddle] }>
				<Text style={ [CommonStyles.text_white, CommonStyles.font_md ] }>
					{ user.DisplayName }
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
		)
	}

	renderHeaderForeground(){
		return (
			<View style={ [ ComponentStyles.pos_absolute, styles.header_content ] }>
				{ this.renderHeaderUserAvatar() }
				{ this.renderHeaderUserMeta() }
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

	renderNavActiveItem(item, index){
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
						<Icon name={ "ios-checkbox-outline" }
							size={ StyleConfig.icon_size }
							style={[ CommonStyles.text_danger ]} />
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	renderNavNormalItem(item, index){
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

	renderNavItem(item, index){
		if (item.flag === this.state.flag) {
			return this.renderNavActiveItem(item, index);
		}
		return this.renderNavNormalItem(item, index);
	}

	renderContentFooter(){
		return (
			<TouchableHighlight 
				underlayColor ={ StyleConfig.touchable_press_color }
				style={[ CommonStyles.p_a_3, styles.border ]}
				onPress={ ()=> this.props.router.toAbout() }>
	            <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }>
					<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsCenter, CommonStyles.m_r_3, styles.list_icon] }>
						<Icon name={ 'ios-code-outline' } 
							size={ StyleConfig.icon_size } 
							style={[ CommonStyles.text_dark ]}/>
					</View>
					<Text style={ [ CommonStyles.font_sm, CommonStyles.text_dark ] }>
						关于
					</Text>
				</View>
			</TouchableHighlight>
		)
	}

	renderContent(){
		if(drawerItems && drawerItems.length){
			return (
				<ScrollView
					showsVerticalScrollIndicator  = { false } 
					style={ [ CommonStyles.p_y_1 ] }>
					{
						drawerItems.map((nav, index)=>{
							return this.renderNavItem(nav, index);
						})
					}
					{ this.renderContentFooter() }
				</ScrollView>
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
	},
	border: {
		borderTopWidth: .5,
		borderTopColor: StyleConfig.border_color
	}
});

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({ 

}))(DrawerPanel);


