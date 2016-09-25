import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Navbar from '../navbar';
import Config from '../../config';
import Logo from '../../component/logo';
import { getImageSource } from '../../common';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

const backgroundImageSource = getImageSource(0);

const { height, width } = Dimensions.get('window');

class HomeRender extends Component {

	constructor(props) {
		super(props);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	
	componentWillReceiveProps(nextProps){
		if (this.props.category !== nextProps.category) {
			this.parallaxView && this.parallaxView.scrollTo({ x: 0, y: 0, animated: false });
			this.changeParallaxHeader();
		}
	}

	changeParallaxHeader(){
		let randomNumber = _.random(1.01, 1.99);
    	this.parallaxBackground.transitionTo({
    		width: width * randomNumber,
    		height: StyleConfig.header_height * randomNumber
    	}, 1000);
	}

	onParallaxViewScroll(e){
		if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height + 20 > e.nativeEvent.contentSize.height){
            if (!this.overThreshold) {
                this.props.onListEndReached && this.props.onListEndReached();
                this.overThreshold = true;
            }
        }else {
            if (this.overThreshold) {
            	this.overThreshold = false
            }
        }
	}

	renderParallaxScrollComponent(){
		return (
			<ScrollView 
				refreshControl = { this.props.refreshControl }
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(){
		return (
			<View key="parallax-background">
	            <Animatable.Image 
	            	resizeMode="cover"
		            style={ [ComponentStyles.header_img ] } 
		            source={ backgroundImageSource }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ [ ComponentStyles.header_backdrop ] }/>
	        </View>
		)
	}

	renderDrawerMenu(){
		return (
			<TouchableOpacity 
				activeOpacity={ 0.2 }
				style = {[ styles.drawerMenu ]}
				onPress={ ()=> this.props.onMenuPress() }>
				<Icon 
					name={ "ios-menu" }  
					size= { StyleConfig.icon_size }
					color={ StyleConfig.color_white } />
			</TouchableOpacity>
		)
	}

	renderSearchMenu(){
		return (
			<TouchableOpacity 
				activeOpacity={ 0.2 }
				style = {[ styles.searchMenu ]}
				onPress={ ()=> this.props.onSearchPress() }>
				<Icon 
					name={ "ios-search-outline" }  
					size= { StyleConfig.icon_size }
					color={ StyleConfig.color_white } />
			</TouchableOpacity>
		)
	}

	renderParallaxForeground(){
		return (
			<Animatable.View 
				key="parallax-foreground"
				style = { [ CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter, styles.foreground ] }
				ref={(view)=>{ this.parallaxForeground = view}}> 
				<Logo style={ [CommonStyles.m_b_2, styles.logo] }/>
	            <Text style={[CommonStyles.text_white, CommonStyles.font_lg, CommonStyles.m_b_1 ]}>
	              {Config.appInfo.name}
	            </Text>
	            <Text style={[CommonStyles.text_light, CommonStyles.font_sm]}>
	              {Config.appInfo.descr}
	            </Text>

				{ /* this.renderDrawerMenu() */ }
				{ /* this.renderSearchMenu() */ }
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(){
		return (
			<Navbar 
				backgroundImage = { backgroundImageSource }
				leftIconName = "ios-menu"
				leftIconOnPress={ ()=>this.props.onMenuPress() }
				title={ Config.appInfo.name }
				rightIconName = "ios-search-outline"
				rightIconOnPress={ ()=>this.props.onSearchPress() }/>
		);
	}
	
	render() {
		return (
			<ParallaxScrollView
		        headerBackgroundColor={ StyleConfig.color_dark }
		        ref={(view)=>{this.parallaxView = view}}
		        parallaxHeaderHeight={ StyleConfig.header_height }
		        stickyHeaderHeight={ StyleConfig.navbar_height }
		        onScroll={(e) => this.onParallaxViewScroll(e) }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground()}
		        renderForeground={() => this.renderParallaxForeground()}
		        renderStickyHeader={() => this.renderParallaxStickyHeader()}>

		        { this.props.children }
				
			</ParallaxScrollView>
		);
	}
}

export const styles = StyleSheet.create({
    foreground:{
      height: StyleConfig.header_height,
	  paddingTop: StyleConfig.space_4
    },
	logo:{
		opacity: 0.8
	},
	drawerMenu:{
		zIndex: 99,
		position:'absolute',
		top: 60,
		left: StyleConfig.space_3,
		width: StyleConfig.icon_size,
		height: StyleConfig.icon_size
	},
	searchMenu: {
		zIndex: 99,
		position:'absolute',
		top: 60,
		right: StyleConfig.space_3,
		width: StyleConfig.icon_size,
		height: StyleConfig.icon_size
	}
});

export default HomeRender;