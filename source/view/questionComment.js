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

class QuestionCommentPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		const {commentAction,  id, question, questionDetail, category } = this.props;
		if(!questionDetail || !questionDetail.Qid){
			
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
				leftIconOnPress={ ()=>this.props.router.pop() }
				title={ '回答追问' }/>
		)
	}

    renderAnswerInfo(){
        return (
            <View>
                <Text>
                    这里是回答内容
                </Text>
            </View>
        )
    }

    renderAnswerComments(){
        return (
            <View>
                <Text>
                    这里是追问列表
                </Text>
            </View>
        )
    }

    renderAnswerCommentItem(comment, index){
        return (
            <View>
                <Text>
                    comment item
                </Text>
            </View>
        )
    }

	renderAnswerComments() {
		let { id, comments, ui, config } = this.props;
		if (this.state.hasFocus === false || ui.loadPending[id] !== false) {
			return (
				<Spinner style={ ComponentStyles.message_container }/>
			)
		}
		if (comments && comments.length) {
			return (
				comments.map((comment, index)=>{
                    return this.renderAnswerCommentItem(comment, index);
                })
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
                { this.renderAnswerInfo() }
				{ this.renderAnswerComments() }
				
				<SingleButton 
					position="left" 
					onPress = { ()=>this.props.router.pop() }/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  comments : state.comment[props.id],
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(QuestionCommentPage);