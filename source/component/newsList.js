import React, { Component } from 'react';
import {
	View,
	ListView,
	RefreshControl
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as PostAction from '../action/post';
import NewsRow from './newsRow';
import Spinner from './spinner';
import { CommonStyles } from '../style';
import refreshControlConfig from '../config/refreshControlConfig';

const category = 'news';
class NewsList extends Component {
	
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows(props.posts)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.posts && nextProps.posts.length && nextProps.posts !== this.props.posts) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
			});
		}
	}

	onListEndReached() {
		const { postAction, posts, ui } = this.props;
		if (posts.length) {
			postAction.getPostByCategoryWithPage(category, {
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

	onListRowClick(post){
		let { router } = this.props;
		router.toNews({
			id: post.id,
			post
		});
	}

	renderListRow(post) {
		if(post && post.id){
			return (
				<NewsRow key={ post.id } post={ post }
					onPress={ this.onListRowClick.bind(this) }/>
			)
		}
		return null;
	}

	renderRefreshControl(){
		let { ui, postAction } = this.props;
		return (
			<RefreshControl { ...refreshControlConfig }
				refreshing={ ui.refreshPending }
				onRefresh={ ()=>{ postAction.getPostByCategory(category) } } />
		);
	}

	render() {
		let { ui, postAction } = this.props;
		return (
			<ListView
				showsVerticalScrollIndicator
				removeClippedSubviews
				enableEmptySections
				onEndReachedThreshold={ 10 }
				initialListSize={ 10 }
				pagingEnabled={ false }
				scrollRenderAheadDistance={ 120 }
				dataSource={ this.state.dataSource }
				renderRow={ this.renderListRow.bind(this) }
				onEndReached={ this.onListEndReached.bind(this) }
				renderFooter={ this.renderListFooter.bind(this) }
				refreshControl={ this.renderRefreshControl() }>
			</ListView>
		);
	}
}

export default connect((state, props) => ({
  posts : state.post[category],
  ui: state.postListUI[category]
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}))(NewsList);