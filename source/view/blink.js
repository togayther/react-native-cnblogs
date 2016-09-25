import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableOpacity
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import EndTag from '../component/endtag';
import BlinkBar from '../component/bar/blink';
import SingleButton from '../component/button/single';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import PostRender from '../component/header/post';
import { storageKey } from '../config';
import { decodeHTML, filterCommentData }  from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class BlinkPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const { commentAction, id, category } = this.props;
		commentAction.getCommentsByPost(category, id, {
			pageSize: 100
		});
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}

	renderBlinkHeader(blink){
		return (
			<View style={ [ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2 ] }>
				<Text style={ [ CommonStyles.text_gray, CommonStyles.font_ms ] }>
					{ blink.DateAdded }
				</Text>
			</View>
		)
	}

	renderBlinkContent(blink){
		return (
			<View style={[ CommonStyles.m_b_3 ]}>
				<Text style={[ CommonStyles.text_black, CommonStyles.font_sm, CommonStyles.line_height_sm ]}>
					{ decodeHTML(blink.Content) }
				</Text>
			</View>
		)
	}

	renderBlink(blink){
		return (
			<View style={ [CommonStyles.p_x_3, CommonStyles.p_t_3] }>
				{ this.renderBlinkHeader(blink) }
				{ this.renderBlinkContent(blink) }
			</View>
		)
	}

	renderBlinkCommentSeparator(blink){
		return (
			<View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
				<Text style={[CommonStyles.text_danger, CommonStyles.font_xs]}>
					园友回应
				</Text>
			</View>
		)
	}

	renderBlinkCommentItemHeader(comment){
		let dateAdded = moment(comment.DateAdded).startOf('minute').fromNow();
		let avatar = comment.UserIconUrl;
		let author = comment.UserDisplayName;
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.m_b_2]}>
				<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle]}>
					<Image ref={view => this.imgView=view}
						style={ [ ComponentStyles.avatar_mini, CommonStyles.m_r_2] }
						source={ {uri: avatar } }>
					</Image>
					<Text style={ [ CommonStyles.text_gray, CommonStyles.font_xs ] }>
						{ decodeHTML(author) }
					</Text>
				</View>
				<Text style={[CommonStyles.text_gray, CommonStyles.font_ms]}>
					{ dateAdded }
				</Text>
			</View>
		)
	}

	renderBlinkCommentItemContent(comment){
		let commentContent = filterCommentData(decodeHTML(comment.Content));

		return (
			<HtmlConvertor
				content={ commentContent }>
			</HtmlConvertor>
		)
	}

	renderBlinkCommentItem(comment, index){
		return (
			<View style={[ ComponentStyles.list, CommonStyles.p_b_2 ]} key={ index }>
				{ this.renderBlinkCommentItemHeader(comment) }
				{ this.renderBlinkCommentItemContent(comment) }
			</View>
		)
	}

	renderBlinkComments(){
		let { blink, comments } = this.props;
		if(blink.CommentCount > 0){
			return (
				<View>
					{
						comments && comments.length && comments.map((comment, index)=>{
							return this.renderBlinkCommentItem(comment, index) 
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


	renderContent() {
		let { id, blink, blinkDetail, ui  } = this.props;

		if (this.state.hasFocus === false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (blink && blink.Id) {
			return (
				<ScrollView 
					showsVerticalScrollIndicator = {false}
					showsHorizontalScrollIndicator = {false} >
					{ this.renderBlink(blink) }
					{ this.renderBlinkCommentSeparator(blink) }
					{ this.renderBlinkComments(blink) }
				</ScrollView>
			)
		}
		return(
			<HintMessage />
		);
	}

	renderNavbar(){
		let { blink } = this.props;
		return (
			<Navbar
				leftIconName = { blink.Avatar }
				title = { blink.Author } 
				leftIconOnPress={ ()=>this.props.router.pop() } />
		)
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
  comments : state.comment[props.id],
  ui: state.postDetailUI
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(BlinkPage);