import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import { CommonStyles, DrawerPanelStyles } from '../style';

const listPressedColor = '#f5f5f5';

class DrawerPanel extends Component {
	
	render() {
		return (
			<View style={ [CommonStyles.container, DrawerPanelStyles.container] }>
				<View style={ DrawerPanelStyles.header }>
					<Image 
						style={ DrawerPanelStyles.headerBg }
						source={{ uri:'http://123.56.135.166/cnblog/public/img/drawer-bg.jpg'}}>
						<Text style={ DrawerPanelStyles.headerTitle }>
							博客园
						</Text>
						<Text style={ DrawerPanelStyles.headerDescr }>
							开发者的网上家园
						</Text>
					</Image>
				</View>
				<View style={ DrawerPanelStyles.list }>
					<TouchableHighlight 
						onPress={()=>{ null }}
						underlayColor={ listPressedColor }>
						<View style={ DrawerPanelStyles.listItem }>
							<Icon name='cog'
								size={ 18 }
								style={ DrawerPanelStyles.listItemIcon }
							/>
							<Text style={ DrawerPanelStyles.listItemText }>
								设置
							</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight 
						onPress={()=>{ null }}
						underlayColor={ listPressedColor }>
						<View style={ DrawerPanelStyles.listItem }>
							<Icon name='code'
								size={ 18 }
								style={ DrawerPanelStyles.listItemIcon }
							/>
							<Text style={ DrawerPanelStyles.listItemText }>
								关于
							</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight 
						onPress={()=>{ null }}
						underlayColor={ listPressedColor }>
						<View style={ DrawerPanelStyles.listItem }>
							<Icon name='message'
								size={ 18 }
								style={ DrawerPanelStyles.listItemIcon }
							/>
							<Text style={ DrawerPanelStyles.listItemText }>
								意见反馈
							</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}


export default DrawerPanel;


