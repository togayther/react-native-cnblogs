import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { getImageSource } from '../../common';
import Navbar from '../navbar';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';

class UserRender extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cover: null
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount(){
		let cover = getImageSource();
		this.setState({
			cover: cover
		});
	}

	componentWillUnmount(){
		this.setState({
			cover: null
		});
	}
	
	renderParallaxScrollComponent(){
		return (
			<ScrollView 
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(postInfo){
		return (
			<View key="parallax-background">
	            <Animatable.Image 
	            	resizeMode="cover"
		            style={ [ComponentStyles.header_img ] } 
		            source={ {uri: this.state.cover } }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ [ ComponentStyles.header_backdrop ] }/>
	        </View>
		)
	}

	renderParallaxForeground(postInfo){
		return (
			<Animatable.View 
				key="parallax-foreground"
				style = { [ CommonStyles.flexColumn, CommonStyles.flexItemsCenter, CommonStyles.p_a_3, styles.foreground ] }
				ref={(view)=>{ this.parallaxForeground = view}}> 
				
	            <View style={ [ ComponentStyles.pos_absolute, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, styles.header_meta ] }>
		            <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }>
		            	<Image style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2 ] } 
		            		source={{ uri: 'http://123.56.135.166/cnblog/public/img/common/author.jpg' }}/>
			            <Text style={ [ CommonStyles.text_white, CommonStyles.font_sm ] }>
			              愤怒的晃晃
			            </Text>
		            </View>
	            </View>
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(postInfo){
		return (
			<Navbar 
				backgroundImage = { {uri: this.state.cover} }
				leftIconName = { 'http://123.56.135.166/cnblog/public/img/common/author.jpg' }
				title={ '愤怒的晃晃' }/>
		);
	}

	render() {

		return (
			<ParallaxScrollView
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        stickyHeaderHeight={ StyleConfig.navbar_height }
		        parallaxHeaderHeight={ StyleConfig.header_height }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground()}
		        renderForeground={() => this.renderParallaxForeground()}
		        renderStickyHeader={() => this.renderParallaxStickyHeader()}>
		        
		        { this.props.children }

			</ParallaxScrollView>
		);
	}
}

const styles = StyleSheet.create({
    foreground:{
      height: StyleConfig.header_height,
	  paddingTop: StyleConfig.space_4
    },
	header_meta:{
		bottom:0,
		width: StyleConfig.screen_width
	}
});

export default UserRender;