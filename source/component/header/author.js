import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { CommonStyles, ComponentStyles, StyleConfig } from '../../style';
import { getImageSource } from '../../common';
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
		const cover = getImageSource();
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

	renderParallaxScrollComponent(){
		return (
			<ScrollView 
				refreshControl = { this.props.refreshControl }
        		showsVerticalScrollIndicator = {false}
				showsHorizontalScrollIndicator = {false}>
        	</ScrollView>
		)
	}

	renderParallaxBackground(authorInfo){
		return (
			<View>
	            <Image 
	            	resizeMode="cover"
		            style={ [ComponentStyles.header_img ] } 
		            source={ this.state.cover }>
	            </Image>		
	            <View style={ [ ComponentStyles.header_backdrop ] }/>
	        </View>
		)
	}

	renderAuthorInfo(){
		const { author, avatar } = this.props;
		return (
			<View style={[ CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter, CommonStyles.m_b_4 ]}>
				<Image 
					style={ [ComponentStyles.avatar, CommonStyles.m_b_2] } 
					source={ avatar }/>
				<Text style={[ CommonStyles.font_md, CommonStyles.text_white, CommonStyles.m_b_2 ]}>
					{ author.title }
				</Text>
			</View>
		)
	}

	renderAuthorMeta(){
		const { author, avatar } = this.props;
		return (
			<View style={ [ ComponentStyles.pos_absolute, CommonStyles.p_x_3, CommonStyles.p_y_2, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, styles.foreground_meta ] }>
				<Text style={ [CommonStyles.text_light, CommonStyles.font_xs] }>
					博文数：{ author.postCount }
				</Text>
			</View>
		)
	}

	renderParallaxForeground(){
		const { author } = this.props;

		if (author && author.title) {
			return (
				<View style = { [ CommonStyles.flexColumn, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter, styles.foreground ] }> 
					{ this.renderAuthorInfo() }	
		            { this.renderAuthorMeta() }
	            </View> 
			)
		}
	}

	renderParallaxStickyHeader(){
		const { author, avatar } = this.props;
		if (author && author.title) {
			return (
				<Navbar 
					backgroundImage = { this.state.cover }
					leftIconName = { avatar }
					leftIconOnPress={ ()=>this.props.router.pop() }
					title={ author.title }/>
			);
		}
	}

	render() {
		
		return (
			<ParallaxScrollView
				ref={(view)=>{this.parallaxView = view}}
		        headerBackgroundColor={ StyleConfig.color_dark }
		        onScroll={(e) => this.onParallaxViewScroll(e) }
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
	foreground_meta:{
		bottom: 0,
		backgroundColor:'rgba(0,0,0,0.1)'
	}
});

export default AuthorRender;