import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import Spinner from '../component/spinner';
import EndTag from '../component/endtag';
import Navbar from '../component/navbar';
import SingleButton from '../component/button/single';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import { storageKey, postCategory } from '../config';
import { decodeHTML, getBloggerAvatar }  from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const category = postCategory.answer;

class QuestionAnswerCommentPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { commentAction, question, answer, id } = this.props;
		if(answer.CommentCounts){
			commentAction.getCommentsByPost(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderNavbar(){
		let { Avatar, Author } = this.props.question;
		return (
			<Navbar
				leftIconName = { Avatar }
				leftIconOnPress={ ()=>this.props.router.pop() }
				title={ Author }/>
		)
	}

	renderAnswerHeader(answer){
		let userAvatar = getBloggerAvatar(answer.AnswerUserInfo.IconName);
		let dateAdded = moment(answer.DateAdded).startOf('minute').fromNow();
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2]}>
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Image ref={view => this.imgView=view}
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ userAvatar }>
					</Image>
					<Text style={ [ CommonStyles.text_danger, CommonStyles.font_xs ] }>
						{ decodeHTML(answer.UserName) }
					</Text>
				</View>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{ dateAdded }
				</Text>
			</View>
		)
	}

	renderAnswerContent(answer){
		let answerContent = answer.ConvertedContent || answer.Answer;
		return (
			<HtmlConvertor
				content={ answerContent }>
			</HtmlConvertor>
		)
	}

    renderAnswer(){
		let { answer } = this.props;
        return (
            <View style={[ ComponentStyles.list, CommonStyles.p_b_0, ComponentStyles.panel_bg ]}>
				{ this.renderAnswerHeader(answer) }
				{ this.renderAnswerContent(answer) }
			</View>
        )
    }


	renderCommentHeader(comment){
		let dateAdded = moment(comment.DateAdded).startOf('minute').fromNow();	
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2]}>
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Icon 
						name={ 'ios-return-right' }  
						size= { StyleConfig.icon_size }
						color={ StyleConfig.color_danger } 
						style= {[CommonStyles.m_r_2]}/>
					<Text style={[ CommonStyles.font_xs, CommonStyles.text_danger ]}>
						{ comment.PostUserName }
					</Text>
				</View>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{ dateAdded }
				</Text>
			</View>
		)
	}

	renderCommentContent(comment){
		let commentContent = comment.ConvertedContent || comment.Content;
		return (
			<View style={[ styles.comment_content ]}>
				<HtmlConvertor
					content={ commentContent }>
				</HtmlConvertor>
			</View>
		)
	}

    renderComment(comment, index){
        return (
            <View key = { index } 
				style={[ ComponentStyles.list, CommonStyles.p_b_0 ]}>
					{ this.renderCommentHeader(comment) }
					{ this.renderCommentContent(comment) }
            </View>
        )
    }

	renderComments() {
		let { id, comments, ui } = this.props;
		if (this.state.hasFocus === false || ui.refreshPending !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (comments && comments.length) {
			return (
				<View>
					{
						comments.map((comment, index)=>{
							return this.renderComment(comment, index);
						})
					}
					<EndTag/>
				</View>
			) 
		}
		return(
			<HintMessage />
		);
	}

	render() {
		return (
			<View style={ ComponentStyles.container }>
				{ this.renderNavbar() }
				<ScrollView 
					showsVerticalScrollIndicator = {false}
					showsHorizontalScrollIndicator = {false} >
					{ this.renderAnswer() }
					{ this.renderComments() }
				</ScrollView>

				<SingleButton 
					icon = {'ios-text-outline'}
					position="right" 
					color={ StyleConfig.action_color_danger }
					onPress = { ()=>this.props.router.pop() }/>
				
				<SingleButton 
					position="left" 
					onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	comment_content:{
		paddingLeft: StyleConfig.icon_size + 5
	}
})

export default connect((state, props) => ({
  comments : state.comment[props.id],
  ui: state.commentListUI[props.id]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(QuestionAnswerCommentPage);