import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import Spinner from '../component/spinner';
import HomeButton from '../component/button/home';
import SingleButton from '../component/button/single';
import HintMessage from '../component/hintMessage';
import UserRender from '../component/header/user';
import { postCategory } from '../config/index';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const firstLineItems = [{
	title:'我的随笔',
	color: StyleConfig.color_primary,
	icon:'ios-document-outline',
	action:'toUserAsset',
	flag: postCategory.home
},{
	title:'我的闪存',
	color: StyleConfig.color_danger,
	icon:'ios-color-palette-outline',
	action:'toUserAsset',
	flag: postCategory.blink
},{
	title:'我的博问',
	color: StyleConfig.color_warning,
	icon:'ios-help-circle-outline',
	action:'toUserAsset',
	flag: postCategory.question
}];

const secondLineItems = [{
	title:'我的收藏',
	color: StyleConfig.color_primary,
	icon:'ios-filing-outline',
	action:'toUserAsset',
	flag: 'favorite'
},{
	title:'我的离线',
	color: StyleConfig.color_danger,
	icon:'ios-download-outline',
	action:'toOffline'
},{
	title:'设置',
	color: StyleConfig.color_warning,
	icon:'ios-settings-outline',
	action:'toSetting'
}];

class UserPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onNavItemPress(item){
		if(item && item.action && this.props.router[item.action]){
			let params = item.flag ? { category: item.flag } : null;
			this.props.router[item.action](params);
		} 
	}

	renderSpacer(){
		return (
			<View style={ styles.spacer }></View>
		)
	}

	renderUserMeta(){
		const { user } = this.props;
		return (
			<View>
				<View style={[ CommonStyles.p_a_4, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, styles.row ]}>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						账号：{ user.BlogApp }
					</Text>
					<Text style={[CommonStyles.text_gray, CommonStyles.font_xs ]}>
						园龄：{ user.Seniority }
					</Text>
				</View>
				{ this.renderSpacer() }
			</View>
		)
	}

	renderNavItem(item, index){
		return (
			<TouchableHighlight
				key = {index}
				onPress={()=> this.onNavItemPress(item) } 
				style={[ CommonStyles.flex_1, CommonStyles.p_a_3 ]}
				underlayColor ={ StyleConfig.touchable_press_color }>
				<View style={[ CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter ]}>
					<Icon name={ item.icon } 
						size={ 36 } 
						color = { item.color }
						style={[ CommonStyles.m_b_2 ]}/>
					<Text style={[CommonStyles.font_xs, CommonStyles.text_dark]}>
						{ item.title }
					</Text>
				</View>
			</TouchableHighlight>	
		)
	}

	renderNavContent(){
		return (
			<View>
				<View style={[ CommonStyles.flexRow, styles.row ]}>
					{
						firstLineItems && firstLineItems.map((nav, index)=>{
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{ this.renderSpacer() }
				<View style={[ CommonStyles.flexRow, styles.row ]}>
					{
						secondLineItems && secondLineItems.map((nav, index)=>{
							return this.renderNavItem(nav, index)
						})
					}
				</View>
				{ this.renderSpacer() }
			</View>
		)
	}

	renderContent(){
		return (
			<View>
				{ this.renderUserMeta() }
				{ this.renderNavContent() }
			</View>
		)
	}

	render() {
		let { router, user } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				<UserRender router = { router } user={ user }>
					{ this.renderContent() }
				</UserRender>
				<HomeButton router = { this.props.router}/>
				<SingleButton 
					icon="ios-arrow-round-back" 
					position="left" 
					onPress = { ()=>router.pop() }/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row:{
		width: StyleConfig.screen_width
	}, 
	list_icon:{
		width: StyleConfig.icon_size
	},
	spacer: {
		height: 10,
		backgroundColor: StyleConfig.panel_bg_color
	}
});

export default connect((state, props) => ({
  user: state.user
}), dispatch => ({ 

}), null, {
  withRef: true
})(UserPage);