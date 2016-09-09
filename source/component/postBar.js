import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	ToastAndroid,
	TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getBloggerName } from '../common';
import { postCategory, storageKey } from '../config';
import { ComponentStyles, StyleConfig } from '../style';

class PostBar extends Component {

	constructor(props) {
	    super(props);

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onCommentPress(){
		let { post, router, category, id } = this.props;
		if (router && category && id) {
			router.toComment({
				post: post,
				category: category,
				pid: id
			});
		}
	}

	onOfflinePress(){
		let { post, postContent, category, offlineAction } = this.props;
		if (post && postContent && postContent.string) {
			let offlineInfo = {};
			let offlineMeta = {
				category: category,
				offlineDate: moment()
			};
			
			offlineInfo[post.id] = {...post, ...postContent, ...offlineMeta};


			offlineAction.savePost(offlineInfo).then(()=>{
				ToastAndroid.show("离线保存成功", ToastAndroid.LONG);
			});
		}
	}

	onAuthorPress(){
		let { router, post, downloadAction } = this.props;
		let bloggerName = getBloggerName(post.authorUri);
		if (bloggerName) {
			router.toAuthor({
				name: bloggerName
			});
		}
	}

	renderReturnItem(){
		return (
			<TouchableOpacity 
				onPress={ ()=> this.props.router.pop() }
				style={ ComponentStyles.barItem }>
    			<Icon 
					name='ios-arrow-round-back' 
					style={ ComponentStyles.barItemIcon }/>
    		</TouchableOpacity>
		);
	}

	renderCommentItem(){
		const { post } = this.props;
		if (post.comments && post.comments!="0") {
			return (
				<TouchableOpacity 
					onPress = {()=> this.onCommentPress() }
					style={ ComponentStyles.barItem }>
	    			<Icon 
						name='ios-chatbubbles-outline' 
						style={ [ComponentStyles.barItemIcon, ComponentStyles.barItemIconActive ] }/>
						<View style={ ComponentStyles.barItemBadge }>
							<Text style={ ComponentStyles.barItemBadgeText }>
								{ post.comments }
							</Text>
						</View>
	    		</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity 
				onPress = {()=> this.onCommentPress() }
				style={ ComponentStyles.barItem }>
    			<Icon 
					name='ios-chatbubbles-outline' 
					style={ [ComponentStyles.barItemIcon, { fontSize: 20 }] }/>
    		</TouchableOpacity>
		);
	}

	
	renderAuthorItem(){
		let { router, category } = this.props;

		let previousRoute = router.getPreviousRoute();
		if (previousRoute && previousRoute.name === "home" && category != postCategory.news) {
			return (
				<TouchableOpacity 
					onPress = {()=>this.onAuthorPress() }
					style={ ComponentStyles.barItem }>
	    			<Icon 
						name='ios-person-outline' 
						style={ ComponentStyles.barItemIcon }/>
	    		</TouchableOpacity>
			);
		}
		return null;
	}

	renderOfflineItem(){
		return (
			<TouchableOpacity 
				onPress = {()=> this.onOfflinePress() }
				style={ ComponentStyles.barItem }>
    			<Icon 
					name='ios-download-outline' 
					style={ ComponentStyles.barItemIcon }/>
    		</TouchableOpacity>
		);
	}

	render() {
		let { post } = this.props;
	    return (
	    	<View style={ ComponentStyles.container }>
	    		{ this.renderReturnItem() }
	    		{ this.renderCommentItem() }
	    		{ this.renderAuthorItem() }
	    		{ this.renderOfflineItem() }
	    	</View>
	    )
	}
}

export default PostBar;


