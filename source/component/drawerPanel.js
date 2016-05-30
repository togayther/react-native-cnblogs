import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { CommonStyles, DrawerPanelStyles, StyleConfig } from '../style';

const listIconSize = 18;

const listItems = [{
	name:'设置',
	icon:'cog',
	page:'toSetting'
},{
	name:'关于',
	icon:'code',
	page:'toAbout'
},{
	name:'意见反馈',
	icon:'message',
	page:'toFeedback'
}]

class DrawerPanel extends Component {

	renderPage(item){
		let { router, hideDrawerFunc } = this.props;
		hideDrawerFunc && hideDrawerFunc();
		router && router[item.page]();
	}

	renderHeader(){
		let { router } = this.props;
		return (
			<View style={ DrawerPanelStyles.header }>
				<Image 
					style={ DrawerPanelStyles.headerBg }
					source={{ uri:'http://123.56.135.166/cnblog/public/img/drawer-bg.jpg'}}>
					<Text style={ DrawerPanelStyles.headerTitle }>
						博客园
					</Text>
					<Text style={ DrawerPanelStyles.headerHint }>
						开发者的网上家园
					</Text>
				</Image>
			</View>
		)
	}

	renderContentItem(item, index){
		return (
			<TouchableHighlight key={ index }
				onPress={ this.renderPage.bind(this, item)}
				underlayColor={ StyleConfig.touchablePressColor }>
				<View style={ [CommonStyles.listItem, DrawerPanelStyles.listItem] }>
					<Icon name={ item.icon }
						size={ listIconSize }
						style={ CommonStyles.listItemIcon }
					/>
					<Text style={ CommonStyles.listItemText }>
						{ item.name }
					</Text>
				</View>
			</TouchableHighlight>
		);
	}

	renderContent(){
		
		return (
			<View style={ DrawerPanelStyles.list }>
				{
					listItems && listItems.map((item, index)=>
						this.renderContentItem(item, index)
					)
				}
			</View>
		)
	}
	
	render() {
		return (
			<View style={ [CommonStyles.container, DrawerPanelStyles.container] }>
				{ this.renderHeader() }
				{ this.renderContent() }
			</View>
		)
	}
}


export default DrawerPanel;


