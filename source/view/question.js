import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as PostAction from '../action/post';
import * as OfflineAction from '../action/offline';
import * as ConfigAction from '../action/config';
import Spinner from '../component/spinner';
import Navbar from '../component/navbar';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import QuestionRender from '../component/header/question';
import { storageKey } from '../config';
import { decodeHTML, getQuestionAuthorAvatar }  from '../common';
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
		const { postAction, id, post, questionDetail, category } = this.props;
		if(!questionDetail || !questionDetail.Qid){
			postAction.getPostById(category, id);
		}
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderNavbar(){
		return (
		<Navbar
			leftIconName = { "ios-arrow-round-back" }
			leftIconOnPress={ ()=>this.props.router.pop() }
			title={ '问题详情' }/>
		)
	}

	renderQuestionAuthor(question){
		let Avatar = getQuestionAuthorAvatar(question.QuestionUserInfo.IconName);
		let Author = question.QuestionUserInfo.UserName;
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle ]}>
				<Image ref={view => this.imgView=view}
					style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
					source={ {uri:Avatar} }>
				</Image>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
					{ Author }
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
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween]}>
				{ this.renderQuestionAuthor(question) }
				{ this.renderQuestionMedal(question) }
			</View>
		)
	}

	renderQuestionTitle(question){
		return (
			<View style={[ CommonStyles.m_b_2 ]}>
				<Text style={[ CommonStyles.text_black, CommonStyles.font_md, CommonStyles.line_height_md ]}>
					{ question.Title }
				</Text>
			</View>
		)
	}

	renderQuestionDetail(question){
		return (
			<View style={ [ ComponentStyles.container, CommonStyles.m_b_2 ] }>
				<HtmlConvertor
					content={ question.Content }>
				</HtmlConvertor>
			</View>
		)
	}

	renderQuestion(){
		let { questionDetail } = this.props;
		return (
			<View style={ [ ComponentStyles.container, CommonStyles.p_a_3] }>
				{ this.renderQuestionTitle(questionDetail) }
				{ this.renderQuestionDetail(questionDetail) }
				{ this.renderQuestionMeta(questionDetail) }
			</View>
		)
	}


	renderComments(){
		return (
			<View>
				<Text style={[ CommonStyles.text_center ]}>
					
				</Text>
			</View>
		)
	}

	renderContent() {
		let { id, questionDetail, ui, config } = this.props;

		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<View style={ [ ComponentStyles.message_container ] }>
					<Spinner />
				</View>
			)
		}
		if (questionDetail && questionDetail.Qid) {
			return this.renderQuestion();
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
				{ this.renderComments() }
			</View>
		)
	}
}

export default connect((state, props) => ({
  questionDetail: state.post.posts[props.id],
  config: state.config,
  ui: state.postDetailUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch),
  configAction : bindActionCreators(ConfigAction, dispatch),
  offlineAction : bindActionCreators(OfflineAction, dispatch)
}), null, {
  withRef: true
})(QuestionPage);