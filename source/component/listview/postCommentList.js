import React, { Component } from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../../action/comment';
import PostCommentRow from './postCommentRow';
import EndTag from '../endtag';
import Spinner from '../spinner';
import ViewPage from '../view';

class PostCommentList extends Component {
	
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
		const { commentAction, comments, category, blogger, id, ui } = this.props;
		if (comments.length && ui.pageEnabled) {
			commentAction.getCommentsByPostWithPage(category, id, {
				blogger: blogger, 
				pageIndex: ui.pageIndex + 1,
				pageSize: ui.pageSize
			});
		}
	}

	renderListFooter() {
		const { ui } = this.props;
		if (ui.pagePending) {
			return <Spinner />
		}
		if(ui.pageEnabled!==true){
			return <EndTag/>
		}
	}

	renderListRow(comment) {
		const { category } = this.props;
		if(comment && comment.Id){
			return (
				<PostCommentRow 
					key={ comment.Id } 
					comment={ comment } 
					category={ category }/>
			)
		}
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
  comments : state.comment[props.id],
  ui: state.commentListUI[props.id]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}))(PostCommentList);