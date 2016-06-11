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

import * as CommentAction from '../action/comment';
import CommentRow from './commentRow';
import Spinner from './spinner';
import { scrollEnabledOffset, pageSize } from '../config';
import { CommonStyles } from '../style';
import refreshControlConfig from '../config/refreshControlConfig';
import ScrollButton from './scrollButton';
import HintMessage from '../component/hintMessage';

const { height, width } = Dimensions.get('window');

class CommentList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.comments),
			scrollButtonVisiable: false
		};
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
				<View style={ CommonStyles.pageSpinner }>
					<Spinner size="large"/>
				</View>
			)
		}
		return null;
	}

	onScrollHandle(event){
		let offsetY = event.nativeEvent.contentOffset.y;
		let scrollButtonVisiable = false;
		if (offsetY > scrollEnabledOffset) {
        	scrollButtonVisiable = true;
		}else{
			scrollButtonVisiable = false;
		}

		this.setState({
			scrollButtonVisiable
		});
	}

	onScrollButtonPress(){
		this.listView.scrollTo( {y:0} );
	}

	renderListRow(comment) {
		let { category } = this.props;
		if(comment && comment.id){
			return (
				<CommentRow key={ comment.id } comment={ comment } category={ category }/>
			)
		}
		return null;
	}

	render() {
		let { comments } = this.props;
		return (
			<View style={ CommonStyles.container }>
				{
					comments && comments.length?
					<ListView
						ref = {(view)=> this.listView = view }
						showsVerticalScrollIndicator
						removeClippedSubviews
						enableEmptySections
						onScroll = { this.onScrollHandle.bind(this) }
						onEndReachedThreshold={ 10 }
						initialListSize={ 10 }
						pagingEnabled={ false }
						scrollRenderAheadDistance={ 150 }
						dataSource={ this.state.dataSource }
						renderRow={ this.renderListRow.bind(this) }
						onEndReached={ this.onListEndReached.bind(this) }
						renderFooter={ this.renderListFooter.bind(this) }>
					</ListView>
					: 
					<HintMessage message='暂无评论'/>
				}
				
				{
		        	this.state.scrollButtonVisiable  === true ?
		        	<ScrollButton onPress={ this.onScrollButtonPress.bind(this) }/>
		        	:null
		        }
			</View>
		);
	}
}

export default connect((state, props) => ({
  comments : state.comment[props.pid],
  ui: state.commentListUI[props.pid]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}))(CommentList);