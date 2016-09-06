import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { CommonStyles, HomeStyles, StyleConfig } from '../style';
import Navbar from './navbar';
import CodeLogo from './codeLogo';
import Config from '../config';
import { getImageSource } from '../common';

const backgroundImageSource = getImageSource(1);

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
    		height: StyleConfig.parallaxHeaderHeight * randomNumber
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
			<View style={ CommonStyles.headerBackground } key="parallax-background">
	            <Animatable.Image 
	            	resizeMode="cover"
		            style={ CommonStyles.headerBackgroundImage } 
		            source={ {uri: backgroundImageSource } }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ CommonStyles.headerBackgroundMask }/>
	        </View>
		)
	}

	renderParallaxForeground(){
		return (
			<Animatable.View 
				style={ HomeStyles.headerContainer } key="parallax-foreground"
				ref={(view)=>{ this.parallaxForeground = view}}> 

				<CodeLogo/>
				
	            <Text style={ HomeStyles.headerTitleText }>
	              {Config.appInfo.name}
	            </Text>
	            <Text style={ HomeStyles.headerSubText }>
	              {Config.appInfo.descr}
	            </Text>
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(){

		console.info(backgroundImageSource);

		return (
			<Navbar 
				backgroundImage = { {uri: backgroundImageSource} }
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
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        stickyHeaderHeight={ StyleConfig.navbarHeight }
		        parallaxHeaderHeight={ StyleConfig.parallaxHeaderHeight }
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

export default HomeRender;