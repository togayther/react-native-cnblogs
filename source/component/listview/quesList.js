import React, { Component } from 'react';
import {
	View,
	ListView,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Spinner from '../spinner';
import { CommonStyles } from '../../style';
import { postCategory } from '../../config';

const category = postCategory.ques;

class QuesList extends Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		
	}

	onListEndReached() {
		
	}

	renderListFooter() {
		
	}

	onListRowClick(post){
		
	}

	renderListRow(post) {
		
	}


	render() {
		return (
			<Text>
                ques list
            </Text>
		);
	}
}

export default connect((state, props) => ({
  
}), dispatch => ({ 
  
}))(QuesList);