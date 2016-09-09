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

	componentWillUnmount() {
	  TimerMixin.clearTimeout(this.timer);
	}

	renderHeader(){
		let { router } = this.props;
		return (
			<View style={ ComponentStyles.header }>
				<Image 
					style={ ComponentStyles.headerBg }
					resizeMode="stretch"
					source={ {uri:backgroundImageSource} }>
					<View style={ CommonStyles.headerBackgroundMask }/>
					<View style={ ComponentStyles.headerContent }>
						<Image
							style={ ComponentStyles.headerAvatar } 
							source={{uri:"http://123.56.135.166/cnblog/public/img/common/author.jpg"}}/>
						<View style={ ComponentStyles.headerText}>
							<Text style={ ComponentStyles.headerName}>
								愤怒的晃晃
							</Text>
							<Text style={ ComponentStyles.headerDate}>
								个人中心
							</Text>
						</View>
					</View>
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
		            <View style={ [ CommonStyles.listItem ] }>
		              	<View style={ CommonStyles.listItemIcon }>
		              		<Icon 
		              			name={ item.icon } size={ 22 } style={[{color: StyleConfig.secondaryColor }]}/>
		             	</View>
		              	<Text style={ [CommonStyles.listItemText, {color: StyleConfig.secondaryColor }] }>
		                	{ item.text }
		              	</Text>
		              	<Text style={ CommonStyles.listItemTail }>
		                	<Icon
			                	name={ "ios-arrow-round-forward" }
			                	size={22}
								style={[{color: StyleConfig.secondaryColor }]} />
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
	              		<Icon name={ item.icon } size={ 22 } />
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
			<View style={ ComponentStyles.list }>
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


