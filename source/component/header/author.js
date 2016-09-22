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
import moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as Animatable from 'react-native-animatable';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';
import { getImageSource, getBloggerAvatar, decodeHTML } from '../../common';
import Navbar from '../navbar';


class AuthorRender extends Component {

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

	getAuthorInfo(){
		const { author = {} } = this.props;
		let authorInfo = {};
		if (author && author.id) {
			authorInfo.id = author.id;
			authorInfo.authorName = decodeHTML(author.author.name);
			authorInfo.logo = author.logo;
			authorInfo.postcount = author.postcount;
			authorInfo.authorAvatar =  getBloggerAvatar(author.logo);
			authorInfo.updated = moment(author.updated).startOf('minute').fromNow();
		}
		return authorInfo;
	}

	renderParallaxScrollComponent(){
		return (
			<ScrollView 
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(authorInfo){
		return (
			<View style={ CommonStyles.headerBackground }>
	            <Animatable.Image 
	            	resizeMode="cover"
		            style={ CommonStyles.headerBackgroundImage } 
		            source={ this.state.cover }
	            	ref={(view)=>{parallaxBackground = view}} >
	            </Animatable.Image>		
	            <View style={ CommonStyles.headerBackgroundMask }/>
	        </View>
		)
	}

	renderParallaxForeground(authorInfo){

		if (authorInfo && authorInfo.id) {
			return (
				<Animatable.View 
					ref={(view)=>{ this.parallaxForeground = view}}
					style={ ComponentStyles.headerContainer } > 
					{
						authorInfo.logo?
						<Image 
		            	style={ ComponentStyles.headerAvatar } 
		            	source={ {uri:authorInfo.authorAvatar} }/>
		            	: null
					}
					
		            <Text style={ ComponentStyles.headerTitleText }>
		              { authorInfo.authorName }
		            </Text>

		            <View style={ ComponentStyles.headerMetas}>
		            	{
		            		authorInfo.updated?
		            		<Text style={ ComponentStyles.headerMetaText }>
				              最近：{ authorInfo.updated }
				            </Text>
				            :null
		            	}
		            	{
		            		authorInfo.postcount?
		            		 <Text style={ ComponentStyles.headerMetaText }>
				              博文数：{ authorInfo.postcount }
				            </Text>
				            :null
		            	}
		            </View>
	            </Animatable.View> 
			)
		}

		return null;
	}

	renderParallaxStickyHeader(authorInfo){
		return (
			<Navbar 
				backgroundImage = { this.state.cover }
				leftIconName = { "ios-arrow-round-back" }
				leftIconOnPress={ ()=>this.props.router.pop() }
				title={ authorInfo.authorName||"返回" }/>
		);
	}

	render() {

		let authorInfo = this.getAuthorInfo();
		
		return (
			<ParallaxScrollView
		        headerBackgroundColor="#111"
		        ref={(view)=>{this.parallaxView = view}}
		        onScroll={(e) => this.onParallaxViewScroll(e) }
		        stickyHeaderHeight={ StyleConfig.navbarHeight }
		        parallaxHeaderHeight={ StyleConfig.parallaxHeaderHeight }
		        renderScrollComponent={()=> this.renderParallaxScrollComponent()}
		        renderBackground={() => this.renderParallaxBackground(authorInfo)}
		        renderForeground={() => this.renderParallaxForeground(authorInfo)}
		        renderStickyHeader={() => this.renderParallaxStickyHeader(authorInfo)}>
		        
		        { this.props.children }

			</ParallaxScrollView>
		);
	}
}

export default AuthorRender;