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

class PostRender extends Component {

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
		            source={ this.state.cover }
	            	ref={(view)=>{this.parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ [ ComponentStyles.header_backdrop ] }/>
	        </View>
		)
	}

	renderParallaxForeground(postInfo){
		
		let postTitle = _.truncate(postInfo.Title, { length : 50 });

		return (
			<Animatable.View 
				key="parallax-foreground"
				style = { [ CommonStyles.flexColumn, CommonStyles.flexItemsCenter, CommonStyles.p_a_3, styles.foreground ] }
				ref={(view)=>{ this.parallaxForeground = view}}> 
				<Text style={ [ CommonStyles.text_white, CommonStyles.font_eg, CommonStyles.line_height_lg, CommonStyles.text_left ] }>
	              { postTitle }
	            </Text>

	            <View style={ [ ComponentStyles.pos_absolute, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, styles.header_meta ] }>
		            <View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ] }>
		            	<Image style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2 ] } 
		            		source={ postInfo.Avatar }/>
			            <Text style={ [ CommonStyles.text_white, CommonStyles.font_sm ] }>
			              { postInfo.Author }
			            </Text>
		            </View>
		            <Text style={ [ CommonStyles.text_light ] }>
		              { postInfo.DateAdded }
		            </Text>
	            </View>
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(postInfo){
		return (
			<Navbar 
				backgroundImage = { this.state.cover }
				leftIconName = { postInfo.Avatar }
				title={ postInfo.Author }/>
		);
	}

	render() {

		let { post } = this.props;

		return (
			<ParallaxScrollView
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        stickyHeaderHeight={ StyleConfig.navbar_height }
		        parallaxHeaderHeight={ StyleConfig.header_height }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground(post)}
		        renderForeground={() => this.renderParallaxForeground(post)}
		        renderStickyHeader={() => this.renderParallaxStickyHeader(post)}>
		        
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
	header_meta:{
		bottom:0,
		width: StyleConfig.width
	}
});

export default PostRender;