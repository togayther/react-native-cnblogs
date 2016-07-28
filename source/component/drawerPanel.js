import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Config, { drawerItems, postCategory } from '../config';
import { getImageSource } from '../common';
import { CommonStyles, DrawerPanelStyles, StyleConfig } from '../style';

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

	componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

	renderHeader(){
		let { router } = this.props;
		return (
			<View style={ DrawerPanelStyles.header }>
				<Image 
					style={ DrawerPanelStyles.headerBg }
					resizeMode="stretch"
					source={ {uri:backgroundImageSource} }>
					<Text style={ DrawerPanelStyles.headerTitle }>
						{ Config.appInfo.name }
					</Text>
					<Text style={ DrawerPanelStyles.headerSub }>
						{ Config.appInfo.descr }
					</Text>
				</Image>
			</View>
		)
	}

	renderItem(item, index){
		
		if (item.flag === this.state.flag) {

			let onDrawerHide = this.props.onDrawerHide || (()=>null);
			let activeForeColor = StyleConfig.foregroundColor;

			return (
				<TouchableHighlight 
					underlayColor ={ StyleConfig.touchablePressColor }
					key={ index } 
					onPress={ ()=> onDrawerHide(item) }>
		            <View style={ [ CommonStyles.listItem, { backgroundColor: StyleConfig.secondaryColor } ] }>
		              	<View style={ CommonStyles.listItemIcon }>
		              		<Icon 
		              			name={ item.icon } size={ 22 }
			                	style={ { color: activeForeColor } } />
		             	</View>
		              	<Text style={ [ CommonStyles.listItemText, { color: activeForeColor } ] }>
		                	{ item.text }
		              	</Text>
		              	<Text style={ CommonStyles.listItemTail }>
		                	<Icon
			                	name={ "ios-return-right" }
			                	size={22}
			                	style={ [{ color: activeForeColor }] } />
		              	</Text>
		            </View>
		        </TouchableHighlight>
			)
		}

		return (
			<TouchableHighlight 
				underlayColor ={ StyleConfig.touchablePressColor }
				key={ index } 
				onPress={ ()=> this.onItemPress(item) }>
	            <View style={ CommonStyles.listItem }>
	            	<View style={ CommonStyles.listItemIcon }>
	              		<Icon name={ item.icon } size={ 22 }/>
	                </View>
	              	<Text style={ CommonStyles.listItemText }>
	                	{ item.text }
	              	</Text>
	            </View>
	        </TouchableHighlight>
		)
	}

	renderContent(){
		return (
			drawerItems && drawerItems.length ?
			<View style={ DrawerPanelStyles.list }>
	          	{
	          		drawerItems.map((nav, index)=>{
	          			return this.renderItem(nav, index);
	          		})
	          	}
	     	</View>
	     	: null
		)
	}
	
	render() {
		return (
			<View style={ CommonStyles.container }>
				{ this.renderHeader() }
				{ this.renderContent() }
			</View>
		)
	}
}


export default DrawerPanel;


