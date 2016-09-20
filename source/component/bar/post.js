import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Toast from '../toast';
import { getBloggerName } from '../../common';
import { postCategory } from '../../config';
import { ComponentStyles, CommonStyles, StyleConfig } from '../../style';

class PostBar extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onCommentPress(){
		let { post, router, category, id } = this.props;
		if (router && category && id) {
			router.toPostComment({
				post: post,
				blogger: post.blogger,
				category: category,
				id: id
			});
		}
	}

	onOfflinePress(){
		let { post, postContent, category, offlineAction } = this.props;
		if (post && postContent) {
			let offlineInfo = {};
			let offlineData = {
				category: category,
				postContent: postContent,
				offlineDate: moment()
			};
			offlineInfo[post.Id] = {...post,  ...offlineData};
			
			offlineAction.savePost(offlineInfo).then(()=>{
				this.refs.toast.show({
					message: "离线保存成功"
				});
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
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=> this.props.router.pop() }
				style={ [ ComponentStyles.bar_item ] }>
    			<Icon 
					name='ios-arrow-round-back' 
					size = { StyleConfig.icon_size }/>
    		</TouchableOpacity>
		);
	}

	renderCommentItem(){
		const { post } = this.props;
		if (post.CommentCount && post.CommentCount!="0") {
			return (
				<TouchableOpacity 
					activeOpacity={ StyleConfig.touchable_press_opacity }
					onPress = {()=> this.onCommentPress() }
					style={ [ ComponentStyles.bar_item ] }>
	    			<Icon 
						name='ios-chatbubbles-outline' 
						size = { StyleConfig.icon_size - 4 }/>
					<View style={ ComponentStyles.bar_item_badge }>
						<Text style={ ComponentStyles.bar_item_badge_text }>
							{ post.CommentCount }
						</Text>
					</View>
	    		</TouchableOpacity>
			);
		}

		return (
			<TouchableOpacity
				activeOpacity={ StyleConfig.touchable_press_opacity } 
				onPress = {()=> this.onCommentPress() }
				style={ [ ComponentStyles.bar_item ] }>
    			<Icon 
					name='ios-chatbubbles-outline' 
					size = { StyleConfig.icon_size -4 }/>
    		</TouchableOpacity>
		);
	}

	
	renderAuthorItem(){
		let { router, category } = this.props;
		let previousRoute = router.getPreviousRoute();
		if (previousRoute && previousRoute.name === "home" && category != postCategory.news) {
			return (
				<TouchableOpacity 
					activeOpacity={ StyleConfig.touchable_press_opacity }
					onPress = {()=>this.onAuthorPress() }
					style={ [ ComponentStyles.bar_item ] }>
	    			<Icon 
						name='ios-person-outline' 
						size = { StyleConfig.icon_size }/>
	    		</TouchableOpacity>
			);
		}
		return null;
	}

	renderOfflineItem(){
		return (
			<TouchableOpacity 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress = {()=> this.onOfflinePress() }
				style={ [ ComponentStyles.bar_item ] }>
    			<Icon 
					name='ios-download-outline' 
					size = { StyleConfig.icon_size }/>
    		</TouchableOpacity>
		);
	}

	render() {
	    return (
	    	<View style={ [ ComponentStyles.bar_container ] }>
	    		{ this.renderReturnItem() }
	    		{ this.renderCommentItem() }
	    		{ this.renderAuthorItem() }
	    		{ this.renderOfflineItem() }

				<Toast ref="toast"/>	
	    	</View>
	    )
	}
}

export default PostBar;


