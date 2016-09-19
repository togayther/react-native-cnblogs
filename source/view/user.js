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
import Spinner from '../component/spinner';
import EndTag from '../component/endtag';
import BlinkBar from '../component/bar/blink';
import HomeButton from '../component/button/home';
import HtmlConvertor from '../component/htmlConvertor';
import HintMessage from '../component/hintMessage';
import UserRender from '../component/header/user';
import { storageKey } from '../config';
import { decodeHTML, filterCommentData }  from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class UserPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hasFocus: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {
		
	}

	componentDidFocus() {
		this.setState({
			hasFocus: true
		});
	}


	renderContent(){
		return (
			<View>
				<Text>
					这里是用户内容
				</Text>
			</View>
		)
	}

	render() {
		let { router } = this.props;
		return (
			<View style={ ComponentStyles.container }>
				<UserRender router = { router }>
					{ this.renderContent() }
				</UserRender>
				<HomeButton router = { this.props.router}/>
			</View>
		)
	}
}

export default connect((state, props) => ({
  
}), dispatch => ({ 

}), null, {
  withRef: true
})(UserPage);