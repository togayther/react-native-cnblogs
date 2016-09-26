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
import * as PostAction from '../action/post';
import * as CommentAction from '../action/comment';
import * as ConfigAction from '../action/config';
import Spinner from '../component/spinner';
import EndTag from '../component/endtag';
import Navbar from '../component/navbar';
import SingleButton from '../component/button/single';
import QuestionBar from '../component/bar/question';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import { storageKey } from '../config';
import { decodeHTML, getBloggerAvatar }  from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class QuestionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { postAction, commentAction,  id, question, questionDetail, category } = this.props;
		if(!questionDetail || !questionDetail.Qid){
			postAction.getPostById(category, id).then(()=>{
				if(question.AnswerCount > 0){
					commentAction.getCommentsByPost(category, id, {
						pageSize: 100
					});
				}
			});
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onAnswerCommentsPress(answer){
		let { question } = this.props;
		this.props.router.toQuestionAnswerComment({
			id: answer.AnswerID,
			question,
			answer
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

	renderQuestionDate(question){
		let dateAdded = moment(question.DateAdded).startOf('minute').fromNow();
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{ dateAdded }
				</Text>
			</View>
		)
	}

	renderQuestionMedal(question){
		const award = parseInt(question.Award);
		if(award > 0){
			return (
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Icon 
						name={ "ios-flash-outline" }  
						size= { StyleConfig.icon_size }
						color={ StyleConfig.color_danger }  />
					<Text style={ [CommonStyles.p_l_1, CommonStyles.text_danger] }>
						{ question.Award }
					</Text>
				</View>
			);
		}
	}

	renderQuestionMeta(question){
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ]}>
				{ this.renderQuestionDate(question) }
				{ this.renderQuestionMedal(question) }
			</View>
		)
	}

	renderQuestionTitle(question){
		return (
			<View style={[ CommonStyles.m_b_3 ]}>
				<Text style={[ CommonStyles.text_black, CommonStyles.font_md, CommonStyles.line_height_md ]}>
					{ decodeHTML(question.Title) }
				</Text>
			</View>
		)
	}

	renderQuestionDetail(question){
		let questionDetailContent = question.ConvertedContent || question.Content;
		return (
				<HtmlConvertor
					content={ questionDetailContent }>
				</HtmlConvertor>
		)
	}

	renderQuestionAdditionSeparator(questionDetail){
		if(questionDetail.Addition){
			return (
				<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
					<Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
						问题补充
					</Text>
				</View>
			)
		}
	}

	renderQuestionAddition(questionDetail){
		if(questionDetail.Addition){
			let additionContent = questionDetail.Addition.ConvertedContent || questionDetail.Addition.Content;
			return (
				<View style={[ CommonStyles.p_x_3, CommonStyles.p_t_3 ]}>
					<HtmlConvertor
						content={ additionContent }>
					</HtmlConvertor>
				</View>
			)
		}
	}

	renderAnswerSeparator(questionDetail){
		let hintText;
		if(questionDetail.AnswerCount > 0){
			hintText = `共${questionDetail.AnswerCount}条回应`;
		}else{
			hintText = '还没有园友仗义相助';
		}
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
				<Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
					{ hintText }
				</Text>
			</View>
		)
	}

	renderAnswerItemHeader(answer){
		let userAvatar = getBloggerAvatar(answer.AnswerUserInfo.IconName);
		let dateAdded = moment(answer.DateAdded).startOf('minute').fromNow();
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2]}>
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Image ref={view => this.imgView=view}
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ userAvatar }>
					</Image>
					<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
						{ decodeHTML(answer.UserName) }
					</Text>
				</View>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{ dateAdded }
				</Text>
			</View>
		)
	}

	renderAnswerItemContent(answer){
		let answerContent = answer.ConvertedContent || answer.Answer;
		return (
			<HtmlConvertor
				content={ answerContent }>
			</HtmlConvertor>
		)
	}

	renderAnswerItemMeta(answer){
		if(answer.CommentCounts){
			return (
				<View style = { [CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.p_b_3] } >
					<Icon 
						name={ 'ios-return-right' }  
						size= { StyleConfig.icon_size - 4 }
						color={ StyleConfig.color_danger } 
						style= {[CommonStyles.m_r_1]}/>
					<Text style={[CommonStyles.font_xs, CommonStyles.text_danger]}>
						有{answer.CommentCounts}条追问
					</Text>
				</View>
			)
		}
	}

	renderAnswerItem(answer, index){
		if(answer.CommentCounts){
			return (
				<TouchableOpacity
					key = {index}
					activeOpacity={ StyleConfig.touchable_press_opacity }
					onPress={ (e)=>this.onAnswerCommentsPress(answer) }
					style={[ ComponentStyles.list, CommonStyles.p_b_0 ]} key={ index }>
					{ this.renderAnswerItemHeader(answer) }
					{ this.renderAnswerItemContent(answer) }
					{ this.renderAnswerItemMeta(answer) }
				</TouchableOpacity>
			)
		}
		return (
			<View key = {index}
				style={[ ComponentStyles.list, CommonStyles.p_b_0 ]} key={ index }>
				{ this.renderAnswerItemHeader(answer) }
				{ this.renderAnswerItemContent(answer) }
			</View>
		)
	}

	renderAnswers(questionDetail){
		let { question, comments } = this.props;
		if(question.AnswerCount > 0){
			return (
				<View>
					{
						comments && comments.length && comments.map((comment, index)=>{
							return this.renderAnswerItem(comment, index) 
						})
					}
					<EndTag/>
				</View>
			)
		}

		return (
			<HintMessage/>
		)
	}

	renderQuestion(questionDetail){
		return (
			<View style={ [CommonStyles.p_x_3, CommonStyles.p_t_3] }>
				{ this.renderQuestionMeta(questionDetail) }
				{ this.renderQuestionTitle(questionDetail) }
				{ this.renderQuestionDetail(questionDetail) }
			</View>
		)
	}

	renderContent() {
		let { id, questionDetail, ui, config } = this.props;

		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (questionDetail && questionDetail.Qid) {
			return (
				<ScrollView 
					showsVerticalScrollIndicator = {false}
					showsHorizontalScrollIndicator = {false} >
					{ this.renderQuestion(questionDetail) }
					{ this.renderQuestionAdditionSeparator(questionDetail) }
					{ this.renderQuestionAddition(questionDetail) }
					{ this.renderAnswerSeparator(questionDetail) }
					{ this.renderAnswers(questionDetail) }
				</ScrollView>
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
				{ this.renderContent() }
				
				<SingleButton 
					icon="ios-text-outline" 
					position="right"
					color = { StyleConfig.action_color_danger } 
					onPress = { ()=>this.props.router.pop() }/>

				<SingleButton 
					position="left" 
					onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  questionDetail: state.post.posts[props.id],
  comments : state.comment[props.id],
  config: state.config,
  ui: state.postDetailUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch),
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(QuestionPage);