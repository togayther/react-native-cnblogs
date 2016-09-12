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

const category = postCategory.blink;

class BlinkList extends Component {
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
                blink list
            </Text>
		);
	}
}

export default connect((state, props) => ({
  
}), dispatch => ({ 
  
}))(BlinkList);