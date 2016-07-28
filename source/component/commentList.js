import React, { Component } from 'react';
import {
	View,
	Text,
	ListView,
	Dimensions,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import CommentRow from './commentRow';
import Spinner from './spinner';
import { pageSize } from '../config';
import { CommonStyles } from '../style';

class CommentList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.comments)
		};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.comments && nextProps.comments.length && nextProps.comments !== this.props.comments) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.comments)
			});
		}
	}

	onListEndReached() {
		const { commentAction, comments, category, pid, ui } = this.props;
		if (comments.length && ui.pageEnabled) {
			commentAction.getCommentsByPostWithPage(category, pid, {
				pageIndex: ui.pageIndex + 1,
				pageSize: ui.pageSize
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.pagePending) {
			return (
				<View style={ CommonStyles.pageContainer }>
					<Spinner />
				</View>
			)
		}
		return null;
	}

	renderListRow(comment) {
		let { category } = this.props;
		if(comment && comment.id){
			return (
				<CommentRow 
					key={ comment.id } 
					comment={ comment } 
					category={ category }/>
			)
		}
		return null;
	}

	render() {
		return (
			<ListView
				ref = {(view)=> this.listView = view }
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 150 }
				dataSource={ this.state.dataSource }
				renderRow={ this.renderListRow.bind(this) }
				onEndReached={ this.onListEndReached.bind(this) }
				renderFooter={ this.renderListFooter.bind(this) }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  comments : state.comment[props.pid],
  ui: state.commentListUI[props.pid]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}))(CommentList);