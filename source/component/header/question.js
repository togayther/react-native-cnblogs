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

class QuestionRender extends Component {

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

	renderParallaxBackground(questionInfo){
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

	renderParallaxForeground(questionInfo){
		
		let postTitle = _.truncate(questionInfo.Title, { length : 50 });

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
		            		source={{ uri: questionInfo.Avatar }}/>
			            <Text style={ [ CommonStyles.text_white, CommonStyles.font_sm ] }>
			              { questionInfo.Author }
			            </Text>
		            </View>
		            <Text style={ [ CommonStyles.text_light ] }>
		              { questionInfo.DateAdded }
		            </Text>
	            </View>
            </Animatable.View> 
		)
	}

	renderParallaxStickyHeader(questionInfo){
		return (
			<Navbar 
				backgroundImage = { {uri: this.state.cover} }
				leftIconName = { questionInfo.Avatar }
				title={ questionInfo.Author }/>
		);
	}

	render() {

		let { question } = this.props;

		return (
			<ParallaxScrollView
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        stickyHeaderHeight={ StyleConfig.navbar_height }
		        parallaxHeaderHeight={ StyleConfig.header_height }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground(question)}
		        renderForeground={() => this.renderParallaxForeground(question)}
		        renderStickyHeader={() => this.renderParallaxStickyHeader(question)}>
		        
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

export default QuestionRender;